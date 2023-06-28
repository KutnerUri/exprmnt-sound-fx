import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./app.module.scss";

import { StitchesButton } from "./components/stitches-button";
import { modernTheme } from "./components/theme";
import { shake, shakeHover } from "./effects/shake";
import { Sound } from "./experiments/sound";
import { turnOff, turnOn } from "./state-mutators";
import { shadowTheme } from "./theme/shadows";
import { Brick } from "./components/brick";
import { times } from "./effects/times";

const SOUNDS = {
  eerieChoir: "./sounds/eerie-choir.mp3",
  eerieChoirLight: "./sounds/eerie-choir-long.mp3",
  dead: "./sounds/noise.mp3",
  exploration: "./sounds/journey-through-solar-system.mp3",
  success: "./sounds/correct.mp3",
};

// the browser may block sounds if played before the user has a chance to interact.
// this screen forces the user to interact
function ClickFirst() {
  const [hasClicked, setClicked] = useState(false);

  if (hasClicked) return <App />;

  return (
    <div className={styles.clickWall}>
      <div className={styles.card}>
        <Brick />
        <StitchesButton onClick={turnOn(setClicked)}>
          Click here to start
        </StitchesButton>
        <p style={{ textAlign: "center" }}>
          <b>🔉 please turn on your audio 🔊</b>
          <br />
          (Some browsers require user interaction before making sounds)
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className={cn(modernTheme(), shadowTheme())}>
      <BuyPremium />
      <DelAccount />

      <div className={styles.explanation}>
        <h1>Sound showcase</h1>
        <p>This demos how sounds could be used in a web application.</p>
        <p>
          Of course, this is a dramatic exaggeration, showing a button we don't
          want the user to click, but using sounds.
        </p>
      </div>
    </div>
  );
}

function BuyPremium() {
  const [hoveringContainer, setHoveringContainer] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [dead, setDead] = useState(false);

  return (
    <div
      className={styles.card}
      // manually track hover - we don't have css for sound
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
          className={shakeHover()}
          // manually track hover - we don't have css for sound
          onMouseEnter={turnOn(setHoveringButton)}
          onMouseLeave={turnOff(setHoveringButton)}
        >
          delete forever
        </StitchesButton>
      )}
      <p>All your data will be deleted</p>

      {/* sounds effects: */}
      <Sound
        src={SOUNDS.eerieChoirLight}
        play={!dead && hoveringContainer}
        loop
      />
      <Sound
        src={SOUNDS.eerieChoir}
        play={!dead && hoveringButton}
        fadeIn={times.sloth}
        loop
      />
      <Sound src={SOUNDS.dead} play={dead} loop fadeIn={times.relaxed} />
    </div>
  );
}

function DelAccount() {
  // const [hoveringContainer, setHoveringContainer] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [purchased, setPurchased] = useState(false);

  // stop hover effects when in the "dead"
  useEffect(() => {
    if (purchased) setHoveringButton(false);
  }, [purchased]);

  return (
    <div className={styles.card}>
      <h3>Premium subscription</h3>
      {purchased && (
        <span onClick={turnOff(setPurchased)} className={styles.skull}>
          ✅
        </span>
      )}
      {!purchased && (
        <StitchesButton
          intent="success"
          onClick={turnOn(setPurchased)}
          className={shakeHover()}
          // manually track hover - we don't have css for sound
          onMouseEnter={turnOn(setHoveringButton)}
          onMouseLeave={turnOff(setHoveringButton)}
        >
          Buy now!
        </StitchesButton>
      )}
      {!purchased && (
        <p style={{ textAlign: "center" }}>
          Get AccountPlus for
          <br />
          just <code>3.99$</code>/mo
        </p>
      )}
      {purchased && <p style={{ textAlign: "center" }}>purchased!</p>}

      {/* sounds effects: */}
      <Sound
        src={SOUNDS.exploration}
        play={hoveringButton}
        fadeIn={times.relaxed}
        loop
      />
      <Sound src={SOUNDS.success} play={purchased} autoReset />
    </div>
  );
}

export default ClickFirst;
