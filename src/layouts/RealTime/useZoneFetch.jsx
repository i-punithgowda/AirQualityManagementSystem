import { useState, useEffect } from "react";

const useZoneFetch = (url, options) => {
  const [data, setData] = useState({
    id: 0,
    ZoneId: "",
    Temperature: 0.0,
    Humidity: 0.0,
    RainLevel: 0,
    FlammableConcentration: 0,
    AirQuality: 0,
    timestamp: "",
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((x) => x + 1);
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw Error("some error");
          }
          return response.json();
        })
        .then((jsonData) => {
          setData(jsonData[0]);
          console.log(jsonData[0]);
        })
        .catch((err) => {
          //   console.log(err.message);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, [data]);

  return { data, count };
};

export default useZoneFetch;
