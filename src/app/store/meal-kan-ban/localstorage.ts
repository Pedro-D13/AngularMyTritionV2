export const loadstate = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const savestate = (state) => {
  try {
    const serializableState = JSON.stringify(state);
    localStorage.setItem("state", serializableState);
  } catch (err) {
    console.error(err);
  }
};
