import { DeviceProvider } from './device';
import { Dripsy } from 'app/provider/dripsy';
import { SafeArea } from 'app/provider/safe-area';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <DeviceProvider>
        <Dripsy>{children}</Dripsy>
      </DeviceProvider>
    </SafeArea>
  );
}
