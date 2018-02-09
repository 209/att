export const makeActionTypes = (namespace = '', syncTypes = [], asyncTypes = []) => {
  const syncActionTypes = syncTypes.reduce((accamulator, item) => {
    accamulator[item] = `${namespace}/${item}`;

    return accamulator;
  }, {});

  const asyncActionTypes = asyncTypes.reduce((accamulator, item) => {
    accamulator[item] = `${namespace}/${item}`;
    accamulator[`${item}_REQUEST`] = `${namespace}/${item}_REQUEST`;
    accamulator[`${item}_FAILURE`] = `${namespace}/${item}_FAILURE`;
    accamulator[`${item}_SUCCESS`] = `${namespace}/${item}_SUCCESS`;

    return accamulator;
  }, {});

  return {
    ...syncActionTypes,
    ...asyncActionTypes,
  };
};

export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };

  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });

  return action;
};

export const makeReducer = (defaultState, obj) => (state = defaultState, action) => {
  if (!Object.prototype.hasOwnProperty.call(obj, action.type)) {
    return state;
  }

  return obj[action.type](state, action);
};
