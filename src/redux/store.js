import mapDataSlice from './mapDataReducer';
import { combineReducers, createStore } from "redux";

const reducers = combineReducers({
  mapData: mapDataSlice,
})

let store = createStore(reducers);
export default store;