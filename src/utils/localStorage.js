/**
 * Load state from storage
 */
 export const loadState = (name) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    logger.error(error, '13');
    return undefined;
  }
};

/**
 * Persist state in localStorage
 */
export const saveState = (state, name) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (error) {
    logger.error(error, '14');
  }
};

export const clearStorage = (name) => {
  try {
    localStorage.removeItem(name);
  } catch (error) {
    logger.error(error, '15');
  }
};
