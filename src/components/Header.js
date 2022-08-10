import { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selecUserName,
  selecUserEmail,
  selecUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selecUserName);
  const userphoto = useSelector(selecUserPhoto);
  
  useEffect(()=>{
    auth.onAuthStateChanged(async (user)=>{
        if(user){
            setUser(user);
            navigate("/home")
        }
    })
  },[userName])

  const handleAuth = () => {
    if(!userName){
    auth.signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .cath((error) => {
        alert(error.message);
      });
  } else if(userName){
    auth.signOut().then(()=>{
        dispatch(setSignOutState())
        navigate("/")

    }).cath((error) => {
        alert(error.message);
      });
  }
  };
  
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
  <>

      {!userName ? (
        <Nav>
        <Logo src="/images/logo.svg" />
        <Login onClick={handleAuth}>Login</Login>
        </Nav>
      ) : (
        <>
         <Nav>
      <Logo src="/images/logo.svg" />
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tBftYQdD99GmAkyY3HjxOs3vcSZpWlsZqA&usqp=CAU"
              alt={userName}
            />
        

            <DropDown>
            <Transparent>
                <div></div>
                </Transparent>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
    </Nav>

        </>
      )}
  </>

  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  z-index:3;
  background: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  overflow: initial;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  height: 48px;
  width:48px;
`;
const Login = styled.a`
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  letter-spacing: 1px;
  width: 100px;
  opacity: 0;
  
`;

const SignOut = styled.div`
  position: relative;
  height: 70%;
  display: flex;
  width: 48px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    
  }
  &:hover {
    ${DropDown} {
        
      opacity: 1;
      transition-duration: 1s;
      z-index:1000;
    }
  }
`;
const Transparent=styled.div`
width: 100%;
    padding: 10px;
    background: transparent;
    top: -10px;
    position: absolute;"
`
