import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './user/slice'
import { componentsSlice } from './components/slice'
import { pageInfoSlice } from './pageInfo/slice'

const persistConfig = {
  key: 'root',
  // 使用默认的存储方式
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
  components: componentsSlice.reducer,
  pageInfo: pageInfoSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([]),
  devTools: true
})

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

// 获取函数返回类型
export type RootState = ReturnType<typeof store.getState>

export default { store, persistor }
