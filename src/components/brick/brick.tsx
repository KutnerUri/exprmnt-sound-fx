import { css } from "@stitches/react";
import classNames from "classnames";

const cube = css({
  position: "relative",
  transformStyle: "preserve-3d",
});

const rotate45 = css({
  transition: "all 300ms",
  transform: "rotateX(-9deg) rotateY(-80deg) rotate(0deg)",
});

// might be half the surface size
const translate = "32px";

// a face is a 2D "side" of a 3D object
const cubeFace = css({
  position: "absolute",
  width: "100%",
  height: "100%",

  variants: {
    side: {
      front: {
        background:
          "linear-gradient(to bottom left, hsl(0, 0%, 23%), hsl(0, 0%, 9%))",
      },
      right: {
        transform: "rotateY(90deg) translateZ(var(--brick-z)) translateX(50%)", // TODO 121.5 = size - 10%/2
        width: "9%",
        background: "linear-gradient(150deg, hsl(0, 0%, 23%), hsl(0, 0%, 9%))",
      },
      top: {
        transform:
          "rotateX(90deg) translateZ(var(--brick-z)) translateX(0px) translateY(-50%)",
        width: "100%",
        height: "9%",
        background: "linear-gradient(336deg, hsl(0deg 0% 38%), hsl(0 0% 23%));",
      },
    },
  },
});

export function Brick({ size = 128 }) {
  return (
    <div
      className={classNames(cube(), rotate45())}
      style={{ width: size, height: size }}
    >
      <div className={classNames(cubeFace({ side: "front" }))} />
      <div
        className={classNames(cubeFace({ side: "right" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * 0.95}px`,
        }}
      />
      <div
        className={classNames(cubeFace({ side: "top" }))}
        style={{
          // @ts-ignore
          "--brick-z": `${size * 0.045}px`,
        }}
      />
    </div>
  );
}
