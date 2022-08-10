import {createSlice} from "@reduxjs/toolkit"

const initialState={
    name:"",
    email:"",
    photo:"",

};

export const userSlice =createSlice({
name:"user",
initialState,
reducers:{
    setUserLoginDetails: (state,action)=>{
        state.name=action.payload.name;
        state.email=action.payload.email;
        state.photo=action.payload.photo;
    },

    setSignOutState:state=>{
        state.name=null;
        state.email=null;
        state.photo=null;

    },
},

});
export const { setUserLoginDetails,setSignOutState}=userSlice.actions;
export const selecUserName=(state)=>state.user.name
export const selecUserEmail=(state)=>state.user.email
export const selecUserPhoto=(state)=>state.user.photo

export default userSlice.reducer;