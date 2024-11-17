import { Text, Pressable, View } from 'dripsy';
import { StyleSheet } from 'react-native';
import { SegmentedControlParams } from 'app/features/Components/SegmentedControl/SegmentedControl';

interface Option {
  label: string;
  value: number;
  default: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlParams> = ({
  title,
  values,
  handleChange,
  index = 0,
}) => {
  const options: Option[] = values.map((value: string, indexNum: number) => ({
    label: value.toUpperCase(),
    value: indexNum,
    default: indexNum === 0,
  }));

  return (
    <View sx={styles.container}>
      <Text sx={styles.label}>{title}</Text>
      <View sx={styles.segmentedControl}>
        {options.map((item, i) => (
          <Pressable
            key={item.value}
            onPress={() => handleChange(i)}
            sx={{
              alignItems: 'center',
              paddingVertical: 10,
              paddingX: 20,
              backgroundColor: i === index ? '#5465ff' : 'transparent',
              borderRadius: 8,
            }}
          >
            <Text
              sx={{
                fontWeight: '700',
                color: i === index ? 'white' : 'black',
                transition: 'color 0.5s ease',
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 18,
  },
  segmentedControl: {
    marginLeft: 6,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '$lightGray',
    borderWidth: 1,
  },
});

export default SegmentedControl;
