import { createSlice } from "@reduxjs/toolkit";
export const currentFormSlice = createSlice({
    initialState:{
        curValue:1,
    },
    name:'currentFormState',
    reducers:{
       changeForm:(state,action)=>{
           state.curValue=action.payload
       }
    }
})

export const {changeForm}=currentFormSlice.actions
export default currentFormSlice.reducer