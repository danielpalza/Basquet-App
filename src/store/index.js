import { createStore, combineReducers } from 'redux';
import statReducer from './stats/reducer';

//Creando store
const reducers = combineReducers({statReducer});
const store = createStore(reducers);

export default store;
