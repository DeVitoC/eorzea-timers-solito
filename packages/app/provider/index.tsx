import { DeviceProvider } from './device';
import { Dripsy } from './dripsy';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <DeviceProvider>
      <Dripsy>{children}</Dripsy>
    </DeviceProvider>
  );
}
