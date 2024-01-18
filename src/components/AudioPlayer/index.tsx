import { LegacyRef, useEffect, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer = ({src}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current?.play();
  }, [src]);

  return <audio ref={audioRef} src={src} />;
};

export default AudioPlayer;