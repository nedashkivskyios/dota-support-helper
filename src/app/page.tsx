"use client";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/timeUtils";
import { START_MAIN_TIMER_VALUE } from "@/common/constants";
import { type DotaEvent, dotaEvents } from "@/data/events";
import { sortDotaEvents } from "@/utils/sortUtils";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const [isMainTimerActive, setIsMainTimerActive] = useState(false); //seconds
  const [mainTimer, setMainTimer] = useState(START_MAIN_TIMER_VALUE); //seconds
  const [roshRespownStart, setRoshRespownStart] = useState(0);
  const [roshRespownEnd, setRoshRespownEnd] = useState(0);
  const [tormentorRespown, setTormentorRespown] = useState(1200);
  const [mainEvents, setMainEvents] = useState<DotaEvent[]>(dotaEvents);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    setMainTimer(START_MAIN_TIMER_VALUE);
    setMainEvents(dotaEvents);

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
  useEffect(() => {
    const handleEvent = () => {
      const currentEvent = mainEvents.find((event) => event.time === mainTimer);

      if (currentEvent) {
        switch (currentEvent.eventId) {
          case "water_rune":
            return <AudioPlayer src="/assets/audio/water_rune.mp3" />;
          default:
            return null;
        }
      }
    };

    handleEvent(); // Викликаємо функцію для обробки подій
    const updatedEvents = mainEvents.map((event) => {
      if (mainTimer > event.time && !event.past) {
        return { ...event, past: true };
      }
      return event;
    });

    setMainEvents(updatedEvents);
  }, [mainTimer]);

  const startGameHandler = () => setIsMainTimerActive(true);

  const endGameHandler = () => setIsMainTimerActive(false);

  const roshKilledButtonHandler = () => {
    const roshRespownStartTime = mainTimer + 480;
    const roshRespownEndTime = mainTimer + 660;
    setRoshRespownStart(roshRespownStartTime);
    setRoshRespownEnd(roshRespownEndTime);
    setMainEvents((prev) => [
      ...prev,
      {
        time: roshRespownStartTime,
        event: "Rosh Respown Start",
        eventId: "rosh_respown_start",
      },
      {
        time: roshRespownEndTime,
        event: "Rosh Respown End",
        eventId: "rosh_respown_end",
      },
    ]);
  };

  const tormentorKilledButtonHandler = () => {
    const tormentorRespownTime = mainTimer + 600;
    setTormentorRespown(tormentorRespownTime);
    setMainEvents((prev) => [
      ...prev,
      {
        time: tormentorRespownTime,
        event: "Tormentor Respown",
        eventId: "tormentor_respown",
      },
    ]);
  };

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
        <div className="flex w-5/6 flex-col gap-3">
          {sortDotaEvents(mainEvents).map(
            ({ event, eventId, time, past }, idx) => (
              <div
                key={idx}
                className={`flex flex-row gap-3 ${
                  past && "line-through text-gray-700"
                }`}
              >
                <div>{formatTime(time)}</div>
                <div>{event}</div>
              </div>
            )
          )}
        </div>
        <div className="flex w-1/6 flex-col items-center gap-5">
          <button
            onClick={() => roshKilledButtonHandler()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Rosh Killed
          </button>
          <div className="flex flex-col items-center gap-5">
            <h4>Respown Start</h4>
            <h6>{formatTime(roshRespownStart)}</h6>
          </div>
          <div className="flex flex-col items-center gap-5">
            <h4>Restpown End</h4>
            <h6>{formatTime(roshRespownEnd)}</h6>
          </div>
        </div>
        <div className="flex w-1/6 flex-col items-center gap-5">
          <button
            onClick={() => tormentorKilledButtonHandler()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Tormentor Killed
          </button>
          <div className="flex flex-col items-center gap-5">
            <h4>Respown tormentor</h4>
            <h6>{formatTime(tormentorRespown)}</h6>
          </div>
        </div>
      </div>
    </main>
  );
}
