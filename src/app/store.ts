import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices } from "@reduxjs/toolkit"

import { makeStore } from "codeforlife/utils/store"

import api from "../api"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const reducer = combineSlices(api)

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof reducer>

const store = makeStore({ reducer, middlewares: [api.middleware] })

export default store
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
