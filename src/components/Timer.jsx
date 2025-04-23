import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSeconds((seconds) => {
        if (seconds < 59) {
          return seconds + 1;
        } else {
          setMinutes((minutes) => minutes + 1);
          return seconds = 0;
        }
      });
    }, 1000);
  }, []);

  return (
    <small>
      Elapsed time: <span>{minutes}</span> min <span>{seconds}</span> sec
    </small>
  );
}

export default Timer;
