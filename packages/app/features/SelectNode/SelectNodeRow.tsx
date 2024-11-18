import { useEffect, useState } from 'react';
import { Text, View } from 'dripsy';
import { StyleSheet } from 'react-native';
// import { SolitoImage } from 'solito/image';
import { availabilityLabel } from '../SharedHooks/useTime';
import { Node } from 'app/features/SelectNode/SelectNodeRowTypes';

interface SelectNodeRowProps {
  node: Node;
}

const SelectNodeRow: React.FC<SelectNodeRowProps> = ({ node }) => {
  const [timeText, setTimeText] = useState<string>('');
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    setupLayout();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  const setupLayout = () => {
    if (node?.time) {
      timer = setInterval(updateTime, 50);
    }
  };

  const updateTime = () => {
    let duration = node.type.toLowerCase() === 'minion' ? 0 : 3; // Default duration
    const availableInText = availabilityLabel(node.time ?? 0, duration);
    setTimeText(availableInText);

    if (availableInText === 'Available Now') {
      setBackgroundColor('rgba(0, 128, 128, 0.5)'); // systemTeal with alpha
    } else {
      let timeRemainingString = availableInText.replace('Available in ', '');
      const [timeRemaining, timeType] = timeRemainingString.split(' ');
      let remaining = parseInt(timeRemaining || '', 10);

      if (timeType === 'sec') remaining = 1;

      switch (remaining) {
        case 0:
        case 1:
        case 2:
        case 3:
          setBackgroundColor('rgba(255, 255, 0, 0.5)'); // systemYellow
          break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
          setBackgroundColor('rgba(255, 165, 0, 0.5)'); // systemOrange
          break;
        default:
          setBackgroundColor('rgba(255, 0, 0, 0.5)'); // systemRed
          break;
      }
    }
  };

  const imageName = node?.name.replace(/\s+/g, '');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View sx={styles.nodeImg} />
      {/* <SolitoImage
        src={fetchImage(imageName)} // Assuming fetchImage returns the correct image URI
        style={styles.nodeImg}
      /> */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameLabel}>{node?.name}</Text>
        <Text style={styles.locationLabel}>{node?.location}</Text>
        <Text style={styles.levelLabel}>
          {node?.type.toLowerCase() === 'minion'
            ? node.type.toUpperCase()
            : `Level ${node.lvl} ${'★'.repeat(node.stars)}`}
        </Text>
      </View>
      <Text style={styles.timeLabel}>{timeText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  nodeImg: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationLabel: {
    fontSize: 14,
  },
  levelLabel: {
    fontSize: 14,
  },
  timeLabel: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default SelectNodeRow;
