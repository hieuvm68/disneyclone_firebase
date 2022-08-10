import React from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import Viewers from './Viewers'
import Recommend from './Recommend'
import Starwar from './Starwar'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import db from "../firebase"
import {setMovies} from "../features/movies/movieSlice"
import {selecUserName} from '../features/user/userSlice'

function Home() {
const dispatch=useDispatch();
const userName=useSelector(selecUserName);
let recommends=[];
let starwars=[];

useEffect(()=>{

db.collection('recommend').onSnapshot((snapshot)=>{
    
    snapshot.docs.map((doc)=>{
        
        switch(doc.data().type){
            case 'recommends':
                recommends=[...recommends,{id:doc.id,...doc.data()}]
                break;
             case 'starwars':
                 starwars=[...starwars,{id:doc.id,...doc.data()}]
                 break;
            
        }
        
    }
    )
dispatch(setMovies({
    recommend:recommends,
    starwar:starwars,
}),[userName])
}

)


})


    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommend />
            <Starwar />
            <Recommend />
            <Starwar />
            <Recommend />
            <Starwar />
            <Recommend />
            <Starwar />
        </Container>
    )
}

export default Home

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px) 50px calc(3.5vw + 5px);
    position: relative;
    overflow: hidden;
    
    &:before {
        background: url("/images/home-background.png") center center / cover
        no-repeat fixed;        
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`
