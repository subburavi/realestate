import { configureStore } from '@reduxjs/toolkit'
import Appdataslice from './Appdataslice'


export const store = configureStore({
    reducer: {
        appdata: Appdataslice,
    },
})