const EORZEAMULTIPLIER = 3600 / 175;

export const updateTime = () => {
  const { hour, minute } = getEorzeanHourAndMinute();
  const currentDate = new Date();
  const currentEorzeanDate = new Date(currentDate);
  currentEorzeanDate.setHours(hour, minute, 0, 0);

  return currentEorzeanDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getEorzeanHour = () => {
  const timeSince1970 = Date.now() / 1000;
  const timeSinceFF1970 = timeSince1970 * EORZEAMULTIPLIER;
  const secondsElapsedTodayFF = timeSinceFF1970 % 86400;
  const currentHour = Math.floor(secondsElapsedTodayFF / 3600);
  return currentHour;
};

const getEorzeanHourAndMinute = () => {
  const timeSince1970 = Date.now() / 1000;
  const timeSinceFF1970 = timeSince1970 * EORZEAMULTIPLIER;
  const secondsElapsedTodayFF = timeSinceFF1970 % 86400;

  const currentHour = Math.floor(secondsElapsedTodayFF / 3600);
  const secondsInCurrentHour = secondsElapsedTodayFF % 3600;
  const currentMinute = Math.floor(secondsInCurrentHour / 60);
  const currentSecond = Math.floor(secondsInCurrentHour % 60);

  return {
    hour: currentHour,
    minute: currentMinute,
    second: currentSecond,
  };
};

export const availabilityLabel = (time: number, duration: number) => {
  // Get current hour and minute in Eorzea
  const { hour, minute } = getEorzeanHourAndMinute();
  const endTime = time + duration;

  // Determine if this is currently available, if so, return "Now" instead of time
  if (
    (hour >= time && endTime > hour) ||
    (endTime > 24 && endTime - 24 > hour)
  ) {
    return 'Available Now';
  }

  // Get current and next times in seconds
  // Get difference in earth seconds
  const currentTimeInSeconds = hour * 3600 + minute * 60;
  let nextNodeTimeInSeconds = time * 3600;
  if (nextNodeTimeInSeconds < currentTimeInSeconds) {
    nextNodeTimeInSeconds += 86400;
  }
  const differenceInEorzeanSeconds =
    nextNodeTimeInSeconds - currentTimeInSeconds;
  const differenceInEarthSeconds =
    (differenceInEorzeanSeconds * 175.0) / 3600.0;

  const timeString = formatTimeDifference(differenceInEarthSeconds);
  return `Available in ${timeString}`;
};

export const secondsUntil = (nextTime: number) => {
  const { hour, minute, second } = getEorzeanHourAndMinute();

  // Get current and next times in seconds
  // Get difference in earth seconds
  const currentTimeInSeconds = hour * 3600 + minute * 60 + second;
  let nextNodeTimeInSeconds = nextTime * 3600;
  if (nextNodeTimeInSeconds < currentTimeInSeconds) {
    nextNodeTimeInSeconds += 86400; // Add a day in seconds
  }
  const differenceInEorzeanSeconds =
    nextNodeTimeInSeconds - currentTimeInSeconds;
  const differenceInEarthSeconds =
    (differenceInEorzeanSeconds * 175.0) / 3600.0;

  return Math.floor(differenceInEarthSeconds);
};

export const timeFromInt = (time: number) => {
  const adjustedTime = time % 24;
  const currentDate = new Date();
  const eorzeanDate = new Date(currentDate);
  eorzeanDate.setHours(adjustedTime, 0, 0, 0); // Set hour, minute, and second to zero

  return eorzeanDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTimeDifference = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  if (minutes > 0) {
    return `${minutes} min`;
  } else {
    return `${remainingSeconds} sec`;
  }
};
