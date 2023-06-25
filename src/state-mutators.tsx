type StateChanger = (state: boolean) => boolean;

// export const flip = (f: (fn: StateChanger) => void) => {
//   return () => f((x: boolean) => !x);
// };

export const turnOn = (f: (fn: StateChanger | boolean) => void) => {
  return () => f(true);
};

export const turnOff = (f: (fn: StateChanger | boolean) => void) => {
  return () => f(false);
};
