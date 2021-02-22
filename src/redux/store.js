import { createStore } from 'redux'
import reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, reducers)


export default  function store() {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }
