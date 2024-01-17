"use client";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/timeUtils";

export default function Home() {
  /*Main Timer Functionality Start*/

  const [isMainTimerActive, setIsMainTimerActive] = useState(false); //seconds
  const [mainTimer, setMainTimer] = useState(-60); //seconds
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    if (isMainTimerActive) {
      intervalId = setInterval(() => {
        setMainTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      // При відмонтажі компоненту чи при зміні isMainTimerActive очистити інтервал
      setMainTimer(0);
      clearInterval(intervalId);
    };
  }, [isMainTimerActive]);

  const startGameHandler = () => setIsMainTimerActive(true);

  const endGameHandler = () => setIsMainTimerActive(false);
  /*Main Timer Functionality End*/

  const [respown1, setRespown1] = useState(0);
  
  const [respown2, setRespown2] = useState(0);

  const roshKilledButtonHandler = () => {
    setRespown1(mainTimer + 480);
    setRespown2(mainTimer + 660);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 gap-5">
      <div className="flex w-full flex-row items-center justify-between">
        <div>
          <button
            onClick={() => startGameHandler()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Start Game
          </button>
        </div>
        <div>{formatTime(mainTimer)}</div>
        <div>
          <button
            onClick={() => endGameHandler()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            End Game
          </button>
        </div>
      </div>
      <div className="flex w-full flex-row">
        <div className="flex w-5/6">main events</div>
        <div className="flex w-1/6 flex-col items-center gap-5">
          <button onClick={() => roshKilledButtonHandler()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            Rosh Killed
          </button>
          <div className="flex flex-col items-center gap-5">
            <h4>Respown Start</h4>
            <h6>{formatTime(respown1)}</h6>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h4>Restpown End</h4>
            <h6>{formatTime(respown2)}</h6>
          </div>
        </div>
      </div>
    </main>
  );
}
