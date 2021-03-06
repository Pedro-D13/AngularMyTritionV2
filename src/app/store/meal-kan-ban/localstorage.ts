export interface RehydrateState {
  SelectFrom: [];
  MealPlan: [];
  type?: any;
}

export const loadstate = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    const rehydratedState: RehydrateState = JSON.parse(
      serializedState,
      (key, value) => {
        return value;
      }
    );
    return rehydratedState;
  } catch (err) {
    return undefined;
  }
};

export const savestate = (state: Object) => {
  try {
    const serializableState = JSON.stringify(state);
    return localStorage.setItem("state", serializableState);
  } catch (err) {
    return console.error(err);
  }
};
