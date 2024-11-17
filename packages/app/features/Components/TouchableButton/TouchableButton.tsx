import { Text, Pressable } from 'dripsy';
import TouchableButtonProps from 'app/features/Components/TouchableButton/types';

export const TouchableButton: React.FC<TouchableButtonProps> = ({
  title,
  onPress,
  buttonsx = {
    backgroundColor: '$systemBlue',
    padding: 10,
    borderRadius: 8,
    width: 250,
  },
  textsx = { color: '$textWhite', fontSize: 16, textAlign: 'center' },
  disabled = false,
}) => {
  return (
    <Pressable onPress={onPress} sx={buttonsx} disabled={disabled}>
      <Text sx={textsx}>{title}</Text>
    </Pressable>
  );
};
