import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./app.module.scss";

import { StitchesButton } from "./components/stitches-button";
import { modernTheme } from "./components/theme";
import { shake } from "./effects/shake";
import { Sound } from "./experiments/sound";
import { turnOff, turnOn } from "./state-mutators";
import { shadowTheme } from "./theme/shadows";

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
  const [running, setRunning] = useState(false);
  const [running02, setRunning02] = useState(false);
  const [dead, setDead] = useState(false);

  // const animation = useRunningArray(contrastAnimations, running);
  useEffect(() => {
    if (dead) setRunning(false);
    if (dead) setRunning02(false);
  }, [dead]);

  return (
    <div className={cn(modernTheme(), shadowTheme())}>
      <div
        className={styles.card}
        onMouseEnter={turnOn(setRunning)}
        onMouseLeave={turnOff(setRunning)}
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
            className={cn(running02 && shake())}
            onMouseEnter={turnOn(setRunning02)}
            onMouseLeave={turnOff(setRunning02)}
          >
            delete forever
          </StitchesButton>
        )}
        <Sound src="/sounds/eerie-choir-long.mp3" play={running} loop />
        <Sound
          src="/sounds/eerie-choir.mp3"
          play={running02}
          loop
          fadeIn={3000}
        />
        <Sound src="/sounds/noise.mp3" play={dead} loop fadeIn={500} />
      </div>
    </div>
  );
}

export default ClickFirst;
