import { SxProp } from "dripsy";

interface TouchableButtonProps {
	title: string;
	onPress: () => void;
	buttonsx?: SxProp;
	textsx?: SxProp;
	disabled?: boolean;
  }

 export default TouchableButtonProps