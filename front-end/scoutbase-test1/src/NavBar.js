import React from 'react'
import styled, { keyframes } from 'styled-components'
import BackArrow from './icons/round_arrow_back_white_18.png'
import forwardArrow from './icons/round_arrow_forward_ios_black_18.png'
import {Link} from 'react-router-dom'

const easeIn = keyframes`
from {
    -webkit-transform: scaleX(0.4);
            transform: scaleX(0.4);
  }
to {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
  }`

const StyledTopBar = styled.div`
position: sticky;
position: -webkit-sticky;
top: 0;
width: 100%;
height: 40px;
background-color: black;
box-shadow: 0px 5px 8px 0px black;
`
const fadeinButton = keyframes`
from{
    opacity: 0;
}
to {
    opacity: 0.5;
}
`
const StyledBackButton = styled.button`
opacity: 0.5;
animation: ${fadeinButton} 0.2s linear;
background: url(${BackArrow});
background-size: contain;
width: 40px;
height: 40px;
position: absolute;
top: 0;
left: 0;
text-decoration: none;
font-size: 0;
border: none;
transition: opacity 0.3s linear;
display: inline-block;
margin-right: 50px;
:hover{
    opacity: 1;
}
cursor: pointer;
`

const HomePageTypo = styled.div`
font-family: 'Muli', sans-serif;
font-size: 200%;
letter-spacing: 30px;
color: white;
z-index: 1;
text-align: center;
animation: ${easeIn} 0.6s cubic-bezier(0.550, 0.055, 0.675, 0.190) 0.3s both;
:after{
    content:"BASE";
    color: red;
}
`
const SearchBar = styled.input`
text-decoration: none;
font-family: "Lato";
width: 50px;
height: 40px;
position: absolute;
right: 5%;
top: 0;
background-color: slategrey;
color: white;
border: none;
font-size: 0;
float: right;
z-index: 2;
transition: width 0.4s linear;
opacity: 0;
transition: opacity 0.3s linear;
:focus{
    width: 20%;
    font-size: 40px;
    color: white;
    z-index:1;
    opacity: 0.5;
}
:focus:hover{
    border-bottom: 1px solid grey;
}
::placeholder{
    color: white;
    font-size: 47%;
}
`
const SubmitSearch = styled.button`
text-decoration: none;
border: none;
background: url(${forwardArrow}) center center no-repeat;
background-size: cover;
height: 42px;
width: 40px;
display: inline-block;
position: absolute;
background-color: slategrey;
top: 0;
right: 5%;
z-index: 1;
`
const NavButton = styled(Link)`
text-decoration: none;
border: none;
padding: 2px;
font-family: "Lavo";
display: flex;
justify-content: center;
align-content: center;
line-height: 40px;
font-size: 1.3em;
height: 40px;
width: auto;
color: white;
transition: background-color 0.2s linear;
transition: color 0.2s linear;
margin-left: 10px;
border-radius: 10px;
:hover{
background-color: slategrey;
color: black;
}

`
const NavButtonContainer = styled.div`
position: absolute;
display: flex;
align-items: left;
top:0;
left: 50px;
right: 200px;
`
const NavBar = (props) => {
    const [values, setValues] = React.useState({
        search: ''
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSearchClick = (e) => {
        e.preventDefault();
        props.history.push('/countries/' + values.search)
    }
    const handleClick = () => {
        props.history.goBack()
    }
        return (
            <div>
                <StyledTopBar>
                {props.location.pathname === "/" ? <HomePageTypo>SCOUT</HomePageTypo>:<div><StyledBackButton onClick={handleClick}></StyledBackButton><NavButtonContainer> <NavButton to="/">Home</NavButton><NavButton to="/countries">List of Countries</NavButton></NavButtonContainer>
                <form onSubmit={handleSearchClick}><SearchBar value={values.search} onChange={handleChange} name="search" type="text" placeholder="Enter Country Code." /><SubmitSearch type="submit"></SubmitSearch></form></div>}
               

                
                </StyledTopBar>
            </div>
        )
}
export default NavBar;

