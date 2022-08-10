import {createSlice} from "@reduxjs/toolkit"

const initialState={
    recommend : null,
    starwar:null,
}

export const movieSlice=createSlice({
name:'movie',
initialState,
reducers:{
    setMovies:(state,action)=>{
        state.recommend=action.payload.recommend;
        state.starwar=action.payload.starwar;
    }
}

});

export const {setMovies}=movieSlice.actions
export const selectRecommend=(state)=>state.movie.recommend
export const selectStarwar=(state)=>state.movie.starwar
export default movieSlice.reducer;

