import { useEffect, useRef } from "react";
// using Howler instead of built in Audio() because it provides .fade() controls
import { Howl } from "howler";

export type AudioProps = {
  src: string;
  play?: boolean;
  loop?: boolean;
  fadeIn?: number;
  // fadeOut?: number;
};

/** React wrapper for sound player */
export const Sound = ({
  src,
  play = false,
  loop = false,
  fadeIn = 300,
}: AudioProps) => {
  const audioElement = useRef<null | Howl>();

  useEffect(() => {
    audioElement.current = new Howl({ src });
    audioElement.current.loop(loop);

    return () => {
      audioElement.current?.pause();
      audioElement.current = null;
    };
  }, [src]);

  useEffect(() => {
    const elem = audioElement.current;
    if (!elem) return;

    if (play) {
      elem.fade(0, 1, fadeIn);
      elem.play();
    } else {
      elem.pause();
    }
  }, [play]);

  // This component does not render anything
  return null;
};
