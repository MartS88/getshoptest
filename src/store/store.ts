import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Api} from "../services/Api";


const rootReducer = combineReducers({

    [Api.reducerPath]: Api.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(Api.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


