import { configureStore } from "@reduxjs/toolkit";
import { MusicSlice } from "./slices/musicSlice";

export const store = configureStore({
    reducer:{
        music:MusicSlice.reducer
    }
})

