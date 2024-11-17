import { memo, useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'dripsy';
import { useRouter } from 'solito/router';
import { updateTime } from 'app/features/SharedHooks/useTime';
// import ChevronLeft from 'app/assets/chevronleft.svg';
// import { SolitoImage } from 'solito/image';

interface TimeDisplayProps {
  eorzeaTime: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = memo(({ eorzeaTime }) => {
  return (
    <Text sx={{ fontSize: 16, fontWeight: 'bold', lineHeight: 20 }}>
      {eorzeaTime}
    </Text>
  );
});
TimeDisplay.displayName = 'TimeDisplay';

const Header = () => {
  const [eorzeaTime, setEorzeaTime] = useState<string>('');
  const { back } = useRouter();

  const updateTimer = useCallback(() => {
    const currentEorzeaTime = updateTime();
    setEorzeaTime(currentEorzeaTime);
  }, []);

  useEffect(() => {
    const timer = setInterval(updateTimer, 100);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Back Button */}
      <Pressable
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onPress={() => back()}
      >
        {/* <SolitoImage
          src={ChevronLeft}
          height={24}
          width={24}
          alt="back button"
          contentFit={'contain'}
          resizeMode={'contentFit'}
          onLayout={() => {}}
        /> */}
        <Text
          sx={{
            fontSize: 16,
            color: '$systemBlue',
          }}
        >
          Back
        </Text>
      </Pressable>

      <TimeDisplay eorzeaTime={eorzeaTime} />
    </View>
  );
};

export default Header;
