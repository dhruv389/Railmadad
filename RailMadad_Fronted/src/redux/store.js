import { configureStore } from '@reduxjs/toolkit'
import currentFormSlice from './features/currentForm'
export const store = configureStore({
    reducer: {
        currentForm: currentFormSlice
    },
})
