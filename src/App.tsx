import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./app.module.scss";

import { StitchesButton } from "./components/stitches-button";
import { modernTheme } from "./components/theme";
import { shake } from "./effects/shake";
import { Sound } from "./experiments/sound";
import { turnOff, turnOn } from "./state-mutators";
import { shadowTheme } from "./theme/shadows";

const SOUNDS = {
  eerieChoir: "./sounds/eerie-choir.mp3",
  eerieChoirLight: "./sounds/eerie-choir-long.mp3",
  dead: "./sounds/noise.mp3",
};

function ClickFirst() {
  const [hasClicked, setClicked] = useState(false);

  if (hasClicked) return <App />;

  return (
    <div className={styles.clickWall}>
      <div className={styles.card}>
        <StitchesButton onClick={turnOn(setClicked)}>
          Click here to start
        </StitchesButton>
        <p style={{ textAlign: "center" }}>
          (Some browsers require user interaction before making sounds)
          <br />
          <b>🔉 please turn on your audio 🔊</b>
        </p>
      </div>
    </div>
  );
}

function App() {
  const [hoveringContainer, setHoveringContainer] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [dead, setDead] = useState(false);

  // const animation = useRunningArray(contrastAnimations, running);
  useEffect(() => {
    if (dead) setHoveringContainer(false);
    if (dead) setHoveringButton(false);
  }, [dead]);

  return (
    <div className={cn(modernTheme(), shadowTheme())}>
      <div
        className={styles.card}
        onMouseEnter={turnOn(setHoveringContainer)}
        onMouseLeave={turnOff(setHoveringContainer)}
      >
        <h3>Delete Account</h3>
        {dead && (
          <span onClick={turnOff(setDead)} className={styles.skull}>
            ☠️
          </span>
        )}
        {!dead && (
          <StitchesButton
            intent="danger"
            onClick={turnOn(setDead)}
            className={cn(hoveringButton && shake())}
            onMouseEnter={turnOn(setHoveringButton)}
            onMouseLeave={turnOff(setHoveringButton)}
          >
            delete forever
          </StitchesButton>
        )}
        <Sound src={SOUNDS.eerieChoirLight} play={hoveringContainer} loop />
        <Sound
          src={SOUNDS.eerieChoir}
          play={hoveringButton}
          loop
          fadeIn={3000}
        />
        <Sound src={SOUNDS.dead} play={dead} loop fadeIn={500} />
      </div>
    </div>
  );
}

export default ClickFirst;
