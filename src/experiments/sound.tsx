import { useEffect, useRef } from "react";
import { Howl } from "howler";

export type AudioProps = {
  src: string;
  play?: boolean;
  loop?: boolean;
  fadeIn?: number;
  // fadeOut?: number;
};

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
      // elem.
      elem.play();
    } else {
      elem.pause();
    }
  }, [play]);

  return null; // This component does not render anything
};
