import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const greeting = hours < 12 ? 'Good Morning' : hours < 17 ? 'Good Afternoon' : 'Good Evening';

      const formattedTime = `${greeting}, Boluwatife`;
      const formattedDateTime = `${date.toLocaleDateString()} ${hours}:${minutes}:${seconds}`;

      setCurrentTime({ greeting: formattedTime, dateTime: formattedDateTime });
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, []);

  return (
    <View>
      <Text className="mb-4 text-2xl font-extrabold">{currentTime.greeting}</Text>
      <Text className=" text-base text-gray-400">{currentTime.dateTime}</Text>
    </View>
  );
};

export default Header;
