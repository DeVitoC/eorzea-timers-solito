import { useDevice } from 'app/provider/device';

export const useScale = () => {
  const { width } = useDevice();
  const refWidthDesktop = 1440;
  const refWidthLaptop = 1080;
  const refWidthTablet = 880;
  const refWidthSmallTablet = 640;
  const refWidthPhone = 375;
  const isLarge = width > refWidthTablet;

  const calculateScaledValue = ({
    values,
  }: {
    values: [number, number, number, number, number];
  }) => {
    return (
      width *
      (width < 440
        ? values[0] / refWidthPhone
        : width < 640
        ? values[1] / refWidthSmallTablet
        : width < 880
        ? values[2] / refWidthTablet
        : width < 1080
        ? values[3] / refWidthLaptop
        : values[4] / refWidthDesktop)
    );
  };

  const scaleByWidth = (
    valuesArray:
      | [number]
      | [number, number]
      | [number, number, number]
      | [number, number, number, number]
      | [number, number, number, number, number]
  ) => {
    if (valuesArray.length < 1) return;
    let scaledValue: number;

    switch (valuesArray.length) {
      case 1:
        scaledValue = calculateScaledValue({
          values: [
            valuesArray[0],
            valuesArray[0],
            valuesArray[0],
            valuesArray[0],
            valuesArray[0],
          ],
        });
        break;
      case 2:
        scaledValue = calculateScaledValue({
          values: [
            valuesArray[0],
            valuesArray[1] as number,
            valuesArray[1] as number,
            valuesArray[1] as number,
            valuesArray[1] as number,
          ],
        });
        break;
      case 3:
        scaledValue = calculateScaledValue({
          values: [
            valuesArray[0],
            valuesArray[1] as number,
            valuesArray[2] as number,
            valuesArray[2] as number,
            valuesArray[2] as number,
          ],
        });
        break;
      case 4:
        scaledValue = calculateScaledValue({
          values: [
            valuesArray[0],
            valuesArray[1] as number,
            valuesArray[2] as number,
            valuesArray[3] as number,
            valuesArray[3] as number,
          ],
        });
        break;
      case 5:
        scaledValue = calculateScaledValue({
          values: [
            valuesArray[0],
            valuesArray[1] as number,
            valuesArray[2] as number,
            valuesArray[3] as number,
            valuesArray[4] as number,
          ],
        });
        break;
    }

    return scaledValue;
  };

  const scaleNumberByWidth = ({
    valuesArray,
  }: {
    valuesArray:
      | [number]
      | [number, number]
      | [number, number, number]
      | [number, number, number, number]
      | [number, number, number, number, number];
  }) => {
    if (valuesArray.length < 1) return;
    let firstValue: number;
    let secondValue: number;
    let thirdValue: number;
    let fourthValue: number;
    let fifthValue: number;
    let scaledValue: number;

    switch (valuesArray.length) {
      case 1:
        return valuesArray[0];
      case 2:
        firstValue = valuesArray[0];
        secondValue = valuesArray[1] as number;
        thirdValue = valuesArray[1] as number;
        fourthValue = valuesArray[1] as number;
        fifthValue = valuesArray[1] as number;
      case 3:
        firstValue = valuesArray[0];
        secondValue = valuesArray[1] as number;
        thirdValue = valuesArray[2] as number;
        fourthValue = valuesArray[2] as number;
        fifthValue = valuesArray[2] as number;
      case 4:
        firstValue = valuesArray[0];
        secondValue = valuesArray[1] as number;
        thirdValue = valuesArray[2] as number;
        fourthValue = valuesArray[3] as number;
        fifthValue = valuesArray[3] as number;
      default:
        firstValue = valuesArray[0];
        secondValue = valuesArray[1] as number;
        thirdValue = valuesArray[2] as number;
        fourthValue = valuesArray[3] as number;
        fifthValue = valuesArray[4] as number;
    }

    scaledValue =
      width < 440
        ? firstValue
        : width < 640
        ? secondValue
        : width < 880
        ? thirdValue
        : width < 1080
        ? fourthValue
        : fifthValue;

    return scaledValue;
  };

  const singleValueScale = (value: number) => {
    return (value * width) / refWidthTablet;
  };

  return {
    scaleByWidth,
    scaleNumberByWidth,
    singleValueScale,
    isLarge,
  };
};
