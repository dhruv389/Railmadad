import React from 'react'
import { useEffect, useState } from 'react'

const Station = () => {

  const [location, setLocation] = useState(null);

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const error = () => {
      console.error('Error getting location');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      {location && (
        <p>Your current location is: ({location.latitude}, {location.longitude})</p>
      )}
    </div>
  )
}

export default Station