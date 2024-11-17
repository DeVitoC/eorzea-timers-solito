import { Pressable, TextInput, View } from 'dripsy';
import { StyleSheet } from 'react-native';
// import MagnifyingGlass from 'app/assets/magnifiying-glass.svg';
// import XCircle from 'app/assets/circle-quarters.svg';
import { useState } from 'react';
// import { SolitoImage } from 'solito/image';

interface Props {
  handleChange: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ handleChange }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View sx={styles.container}>
      {/* <SolitoImage
        src={MagnifyingGlass}
        height={24}
        width={24}
        alt="magnifying glass"
        contentFit={'contain'}
        resizeMode={'contain'}
        onLayout={() => {}}
      /> */}
      <TextInput
        sx={styles.searchInput}
        placeholder="Search..."
        value={searchText}
        onChangeText={(value) => {
          setSearchText(value);
          handleChange(value);
        }}
      />

      {searchText?.length > 0 && (
        <Pressable
          sx={{ position: 'absolute', right: 10 }}
          onPress={() => {
            setSearchText('');
            handleChange('');
          }}
        >
          {/* <SolitoImage
            src={XCircle}
            height={24}
            width={24}
            alt="cancel"
            contentFit={'contain'}
            resizeMode={'contain'}
            onLayout={() => {}}
          /> */}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '$inputBackground',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  searchInput: {
    height: 40,
    marginLeft: 6,
    width: '100%',
  },
  nodeText: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default SearchBar;
