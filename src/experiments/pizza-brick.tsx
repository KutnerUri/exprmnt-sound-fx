import { css } from "@stitches/react";
import classNames from "classnames";

const cube = css({
  position: "relative",
  transformStyle: "preserve-3d",
});

const rotate = css({
  transform: "rotateX(-22.5deg) rotateY(-45deg) rotate(0deg)",
});

// a face is a 2D "side" of a 3D object
const cubeFace = css({
  background: "var(--brick-color, rgb(251, 80, 123))", // consider var
  position: "absolute",
  width: "100%",
  height: "100%",

  variants: {
    side: {
      front: {
        transform: "rotateY(0deg)  translateX(50%) translateZ(var(--brick-z))",
        height: "10%",
        filter: "brightness(90%)",
        // display: "none",
      },
      back: {
        transform: "rotateY(180deg) translateX(-50%) ",
        height: "10%",
        filter: "brightness(61%)",
        // display: "none"
      },
      right: {
        transform: "rotateY(90deg) translateX(-50%) translateZ(var(--brick-z))",
        height: "10%",
        filter: "brightness(76%)",
        // display: "none"
      },
      left: {
        transform: "rotateY(-90deg) translateX(50%)",
        height: "10%",
        filter: "brightness(55%)",
        // display: "none"
      },
      top: {
        transform: "rotateX(90deg) translateZ(var(--brick-z))",
        width: "100%",
        height: "100%",
        // display: "none"
      },
      bottom: {
        transform: "rotateX(-90deg) translateZ(var(--brick-z))",
        width: "100%",
        height: "100%",
        filter: "brightness(38%)",
        // display: "none"
      },
    },
  },
});

export function PizzaBrick({ size = 128 }) {
  return (
    <div
      className={classNames(cube(), rotate())}
      style={{ width: size, height: size }}
    >
      <div
        className={classNames(cubeFace({ side: "front" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * 1}px`,
        }}
      />
      <div
        className={classNames(cubeFace({ side: "back" }))}
        style={
          {
            // @ts-ignore
            // "--brick-z": `${size * 0.5}px`,
          }
        }
      />
      <div
        className={classNames(cubeFace({ side: "right" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * 1}px`,
        }}
      />
      <div
        className={classNames(cubeFace({ side: "left" }))}
        style={
          {
            // @ts-ignore
            // "--brick-z": `${size * 0.5}px`,
          }
        }
      />
      <div
        className={classNames(cubeFace({ side: "top" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * 0.2}px`,
        }}
      />
      <div
        className={classNames(cubeFace({ side: "bottom" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * -0.11}px`,
        }}
      />
    </div>
  );
}
