import { createStore, applyMiddleware } from "redux";
import allReducer from "../Reducers/AllReducer/AllReducer";
import createEngine from "redux-storage-engine-localstorage";
import * as storage from "redux-storage";

const engine = createEngine("my-save-key");
const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const load = storage.createLoader(engine);

load(store);

export default store;
