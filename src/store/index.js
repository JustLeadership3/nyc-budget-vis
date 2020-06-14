import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  parseAgencyApi,
  processCapitalExpenditures,
  parseExpenseActuals,
} from '../functions';

// Initial State
const defaultState = {
  currentDataSet: '',
  capitalExp: null,
  agencyExp: null,
  expenseActuals: [0, 1, 2],
};

// Action Types
const STORE_CAPITAL_EXP = 'STORE_CAPITAL_EXP';
const STORE_AGENCY_EXP = 'STORE_AGENCY_EXP';
const STORE_EXPENSE_ACTUALS = 'STORE_EXPENSE_ACTUALS';
const UPDATE_CURRENT_DATASET = 'UPDATE_CURRENT_DATASET';

// Action Creators
const storeCapitalExp = (capitalExp) => ({
  type: STORE_CAPITAL_EXP,
  capitalExp,
});

const storeAgencyExp = (agencyExp) => ({
  type: STORE_AGENCY_EXP,
  agencyExp,
});

const storeExpenseActuals = (expenseActuals) => ({
  type: STORE_EXPENSE_ACTUALS,
  expenseActuals,
});

const updateCurrentDataSet = (currentDataSet) => ({
  type: UPDATE_CURRENT_DATASET,
  currentDataSet,
});

// Thunk Creators
export const getCapitalExp = () => async (dispatch) => {
  try {
    let res = await axios.get(
      'https://data.cityofnewyork.us/resource/hukm-snmq.json'
    );
    const processedData = processCapitalExpenditures(res.data);

    dispatch(storeCapitalExp(processedData));
    dispatch(updateCurrentDataSet('capitalExp'));
  } catch (err) {
    console.error(err);
  }
};

export const getAgencyExp = () => async (dispatch) => {
  try {
    let res = await axios.get(
      'https://data.cityofnewyork.us/resource/cwjy-rrh3.json'
    );
    const processedData = parseAgencyApi(res.data);

    dispatch(storeAgencyExp(processedData));
    dispatch(updateCurrentDataSet('agencyExp'));
  } catch (err) {
    console.error(err);
  }
};

export const getExpenseActuals = () => async (dispatch) => {
  try {
    let res = await axios.get(
      'https://data.cityofnewyork.us/resource/7yay-m4ae.json'
    );
    const processedData = parseExpenseActuals(res.data);

    dispatch(storeExpenseActuals(processedData));
    dispatch(updateCurrentDataSet('expenseActuals'));
  } catch (err) {
    console.error(err);
  }
};

// Reducer
const reducer = (state = defaultState, action) => {
    let newState;
  switch (action.type) {
    case STORE_CAPITAL_EXP:
       newState = {...state, capitalExp: action.capitalExp}
      return newState;
    case STORE_AGENCY_EXP:
       newState = {...state, agencyExp: action.agencyExp}
      return newState;
    case STORE_EXPENSE_ACTUALS:
       newState = {...state, expenseActuals: action.expenseActuals}
      return newState;
    case UPDATE_CURRENT_DATASET:
      newState = {...state, currentDataSet: action.currentDataSet};
      return newState;
    default:
      return state;
  }
};

// Store
const store = createStore(
  reducer,
  applyMiddleware(thunk, createLogger({ collapsed: true }))
);

export default store;
