'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Dimensions, Platform } from 'react-native';

interface Device {
  width: number;
  height: number;
  platform: string;
  prefix: string;
}

export const deviceContext = createContext<Device>({
  width: 0,
  height: 0,
  platform: '',
  prefix: '',
});

export const useDevice = (): Device => {
  return useContext(deviceContext);
};

const sizes = [
  { name: 'xs', size: 0 },
  { name: 'xs', size: 440 },
  { name: 'sm', size: 640 },
  { name: 'md', size: 880 },
  { name: 'lg', size: 1024 },
  { name: 'xl', size: 9999 },
];

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [device, setDevice] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    platform: Platform.OS,
    prefix:
      sizes.find((_) => _.size >= Dimensions.get('window').width)?.name ?? 'xs',
  });

  useEffect(() => {
    const width = Dimensions.get('window').width;

    const prefix = sizes.find((_) => _.size >= width)?.name ?? 'xs';

    setDevice({
      width: width,
      height: Dimensions.get('window').height,
      platform: Platform.OS,
      prefix: prefix,
    });

    Dimensions.addEventListener('change', () => {
      const width = Dimensions.get('window').width;
      const prefix = sizes.find((_) => _.size >= width)?.name ?? 'xs';

      setDevice({
        width: width,
        height: Dimensions.get('window').height,
        platform: Platform.OS,
        prefix: prefix,
      });
    });
  }, []);

  return (
    <deviceContext.Provider value={device}>{children}</deviceContext.Provider>
  );
};
