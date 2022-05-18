import React, { useState, useEffect } from "react";

function ProgressBar() {
  const [Counter, setCounter] = useState(400);
  const [Time1, setTime1] = useState(1000 * 60 * 4);
  const [Time2, setTime2] = useState(1000 * 60 * 6);
  useEffect(() => {
    if (localStorage.getItem("Counter") !== null) {
      let data = JSON.parse(localStorage.getItem("Counter"));
      console.log(data);
      setCounter(parseInt(data.counter));
      setTime1(data.time1);
      setTime2(data.time2);
    } else {
      localStorage.setItem(
        "Counter",
        JSON.stringify({
          counter: Counter,
          time1: 1000 * 60 * 4,
          time2: 1000 * 60 * 6,
        })
      );

      setCounter(400);
    }
  }, []);
  useEffect(() => {
    console.log(parseInt(localStorage.getItem("Counter")));

    if (Counter <= 820) {
      localStorage.setItem(
        "Counter",
        JSON.stringify({
          counter: Counter,
          time1: Time1 - 0.57,
          time2: 1000 * 60 * 6,
        })
      );
      const interval = setInterval(() => setCounter(Counter + 1), 0.57 * 1000);
      return () => {
        clearInterval(interval);
      };
    } else if (821 <= Counter && Counter < 997) {
      localStorage.setItem(
        "Counter",
        JSON.stringify({
          counter: Counter,
          time1: 0,
          time2: 1000 * 2,
        })
      );
      const interval = setInterval(() => setCounter(Counter + 1), 2 * 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [Counter]);

  return (
    <div className="">
      <h3 className="text-base  text-white xl:text-base">{Counter} / 999</h3>
      {/* <div class="w-full relative  rounded-full h-2.5 bg-white">
        <div
          class="bg-[#25770b] h-full rounded-full"
          style={{ width: `${Counter * 0.1}%` }}
        ></div>
        <div
          class={`absolute bg-[#26770a] h-[20px] -top-[50%] left-[${
            Counter * 0.1 - 5
          }%] w-[20px] rounded-full z-10`}
        ></div>
      </div> */}
    </div>
  );
}

export default ProgressBar;
