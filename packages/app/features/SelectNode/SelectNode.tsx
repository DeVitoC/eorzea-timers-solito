import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'dripsy';
import { Node } from 'app/features/SelectNode/SelectNodeRowTypes';
// import { useRouter } from 'solito/router';
import Header from 'app/features/Components/Header/Header';
import SegmentedControl from 'app/features/Components/SegmentedControl/SegmentedControl';
import SearchBar from 'app/features/Components/SearchBar/SearchBar';
// import Gear from 'app/assets/gear.svg';
import SelectNodeRow from 'app/features/SelectNode/SelectNodeRow';
import { secondsUntil } from 'app/features/SharedHooks/useTime';
// import { SolitoImage } from 'solito/image';
import { useDevice } from 'app/provider/device';

interface SelectNodesProps {
  profession: 'botany' | 'mining' | 'fishing';
}

interface Settings {
  searchText: string;
  expacIndex: number;
  sortIndex: number;
  currentNodes: Node[];
}

const loadNodeList = async (profession: string) => {
  let nodeList: Node[] = [];
  //   if (profession === 'botany') {
  //     const botanyData = await import('app/features/Data/botany.json');
  //     nodeList = botanyData.default;
  //   } else if (profession === 'mining') {
  //     const miningData = await import('app/features/Data/mining.json');
  //     nodeList = miningData.default;
  //   } else if (profession === 'fishing') {
  //     const fishingData = await import('app/features/Data/fishing.json');
  //     nodeList = fishingData.default;
  //   } else {
  //     return [];
  //   }

  nodeList = nodeList.sort((a: Node, b: Node) => {
    return a.name.localeCompare(b.name);
  });
  return nodeList;
};

const SelectNode: React.FC<SelectNodesProps> = ({ profession }) => {
  const [nodeList, setNodeList] = useState<Node[]>([]);
  const [settings, setSettings] = useState<Settings>({
    searchText: '',
    expacIndex: 0,
    sortIndex: 0,
    currentNodes: nodeList,
  });
  // const { push } = useRouter();
  const maxTimeUntil = 24 * (2 * 60 + 55);
  const thresholdTIme = 21 * (2 * 60 + 55);
  const { height } = useDevice();

  useEffect(() => {
    const fetchNodeList = async () => {
      const nodeList = await loadNodeList(profession);
      setNodeList(nodeList);
      setSettings((prevSettings) => ({
        ...prevSettings,
        currentNodes: nodeList,
      }));
    };

    fetchNodeList();
  }, [profession]);

  const handleSelectExpac = (expac: number, nodes: Node[]): Node[] => {
    return expac === 0
      ? nodes.filter((node: Node) => true)
      : nodes.filter((node: Node) => node.expac === expac - 1);
  };

  const handleSearchText = (text: string, nodes: Node[]): Node[] => {
    if (!!text) {
      var searchResults = nodes.filter((node: Node) => {
        return node.name.toLowerCase().includes(text.toLowerCase());
      });
      return searchResults;
    } else {
      return nodes;
    }
  };

  const sortByName = (a: Node, b: Node): number => {
    const nameComparison = a.name.localeCompare(b.name);
    return nameComparison;
  };

  const sortBytime = (a: Node, b: Node): number => {
    const aTime = a.time;
    const bTime = b.time;

    if (aTime === undefined && bTime === undefined) return 0;
    if (!!aTime && bTime === undefined) return -1;
    if (aTime === undefined && !!bTime) return 1;

    if (aTime === bTime) {
      return 0;
    }
    const timeUntilA = secondsUntil(aTime!);
    const timeUntilB = secondsUntil(bTime!);
    const isAAvailable =
      timeUntilA <= maxTimeUntil && timeUntilA >= thresholdTIme;
    const isBAvailable =
      timeUntilB <= maxTimeUntil && timeUntilB >= thresholdTIme;

    // Check if only one or the other is currently available
    if (isAAvailable && !isBAvailable) return -1;
    if (!isAAvailable && isBAvailable) return 1;

    return timeUntilA - timeUntilB;
  };

  const sortByLocation = (a: Node, b: Node): number => {
    return a.location.localeCompare(b.location);
  };

  const handleSelectSort = (sort: number, nodes: Node[]): Node[] => {
    var newNodes = nodes;
    console.log('starting to sort: ', nodes.length);
    switch (sort) {
      case 0:
        newNodes = newNodes.sort((a: Node, b: Node) => {
          // Sort by name first and return if names don't match
          const nameComparison = sortByName(a, b);
          if (nameComparison !== 0) return nameComparison;

          // Sort by times if names are the same
          // Sort items with time first and items without times after
          const timeComparison = sortBytime(a, b);
          if (timeComparison !== 0) return timeComparison;

          // If neither has a time or times are the same, sort by location
          return sortByLocation(a, b);
        });
        return newNodes;
      case 1:
        newNodes = newNodes.sort((a: Node, b: Node) => {
          // Sort by Time first
          const timeComparison = sortBytime(a, b);
          if (timeComparison !== 0) return timeComparison;

          // Sort by Name second
          const nameComparison = sortByName(a, b);
          if (nameComparison !== 0) return nameComparison;

          // Sort by location last
          return sortByLocation(a, b);
        });

        return newNodes;
      case 2:
        newNodes = newNodes.sort((a: Node, b: Node) => {
          // Sort by location first
          const locationComparison = sortByLocation(a, b);
          // return locationComparison;
          if (locationComparison !== 0) return locationComparison;

          // Sort by Name second
          const nameComparison = sortByName(a, b);
          // return nameComparison;
          if (nameComparison !== 0) return nameComparison;

          // Sort by time last
          return sortBytime(a, b);
        });
        return newNodes;
      default:
        return newNodes;
    }
  };

  const handleSortAndSearch = (updates: Partial<Settings>) => {
    const newSettings = {
      ...settings,
      ...updates,
    };
    const { expacIndex, sortIndex, searchText } = newSettings;
    const nodes = nodeList;

    // filter by expac
    const expacNodes = handleSelectExpac(expacIndex, nodes);

    // filter by search Text
    const searchNodes = handleSearchText(searchText, expacNodes);

    // sort based on sort index
    const sortedNodes = handleSelectSort(sortIndex, searchNodes);

    setSettings({
      expacIndex: expacIndex,
      sortIndex: sortIndex,
      searchText: searchText,
      currentNodes: sortedNodes,
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (settings.sortIndex === 1) {
      timer = setInterval(() => {
        handleSortAndSearch({});
      }, 5000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.sortIndex, settings.expacIndex, settings.searchText]);

  return (
    <View
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '$backgroundWhite',
      }}
    >
      {/* Header */}
      <Header />

      {/* Expansion Selection */}
      <View sx={{ marginTop: 16, paddingX: 16 }}>
        <SegmentedControl
          title={'Expac:'}
          index={settings.expacIndex}
          handleChange={(newIndex) =>
            handleSortAndSearch({ expacIndex: newIndex })
          }
          values={['All', 'ARR', 'HW', 'SB', 'ShB', 'EW', 'DT']}
        />
      </View>

      {/* Sort and filter Selection */}
      <View
        sx={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingX: 16,
        }}
      >
        <View sx={{ width: '80%' }}>
          <SegmentedControl
            title={'Sort By:'}
            index={settings.sortIndex}
            handleChange={(newIndex) =>
              handleSortAndSearch({ sortIndex: newIndex })
            }
            values={['NAME', 'TIME', 'ZONE']}
          />
        </View>
        {/* <Pressable onPress={() => {}}>
          <SolitoImage
            src={Gear}
            height={24}
            width={24}
            alt="settings"
            contentFit={'contain'}
            resizeMode={'contain'}
            onLayout={() => {}}
          />
        </Pressable> */}
      </View>

      <View
        sx={{
          height: 1,
          width: '100%',
          backgroundColor: '$lightGray',
          marginY: 6,
        }}
      />
      <SearchBar
        handleChange={(text) => handleSortAndSearch({ searchText: text })}
      />
      <View
        sx={{
          height: 1,
          width: '100%',
          backgroundColor: '$lightGray',
          marginY: 6,
        }}
      />

      {/* Nodes List */}
      <View
        sx={{
          height: height - 190,
          width: '100%',
        }}
      >
        <FlatList
          data={settings.currentNodes}
          renderItem={({ item }) => <SelectNodeRow node={item as Node} />}
          keyExtractor={(item: unknown, index: number) => {
            const node = item as Node;
            return `${node.name}-${index}`;
          }}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default SelectNode;
