import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import forwardArrow from './icons/round_arrow_forward_ios_black_48.png'


const HeadingFade = keyframes `
from { opacity: 0;
}
to{
    opacity:1;
}
`

const Heading = styled.h1`
text-align: center;
font-family: 'Raleway', sans-serif;
font-size: 5em;
font-stretch: ultra-condensed;
font-weight: bold;
line-height: 60%;
position: static;
animation: ${HeadingFade} 0.3s linear;
:after{
  content: ".";
  font-size: 2em;
  font-weight: bolder;
  font-family: 'Candal', serif;
  color: red;
  
}
`
const rotateAndTransition = keyframes `
from {
    transform: rotate(0deg);

}
to {
    transform: rotate(180deg);
}
`
const fadeIn = keyframes `
from {
    background-color: white;
}
to {
    background-color: grey;
}
`
const StyledLink = styled(Link)`
color: white;
background-color: grey;
padding: 10px;
width: 80%;
left: 10%;
animation: ${fadeIn} 2s linear;
text-decoration: none;
position: absolute;
text-align: center;
top: 80%;
`
const StyledInput = styled.input`
 height: 60px;
  font-size: 40px;
  display: inline-block;
  font-family: "Lato";
  font-weight: 100;
  border: none;
  outline: none;
  color: #555;
  padding: 5px;
  padding-right: 60px;
  width: 30px;
  position: relative;
  opacity: 0;
  top: 0;
  right: 0;
  background: none;
  z-index: 3;
  transition: width .4s cubic-bezier(0.000, 0.795, 0.000, 1.000);
  fill:red;
  cursor: pointer;
  :focus:hover {
  border-bottom: 1px solid #BBB;
  }
  :focus {
  width: 700px;
  opacity: 1;
  z-index: 1;
  border-bottom: 1px solid #BBB;
  cursor: text;
}
`
const SubmitInput = styled.button`
height: 67px;
  width: 95px;
  display: inline-block;
  color:red;
  background: url(${forwardArrow}) center center no-repeat;
  font-size: 0;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity .4s ease;
:hover {
    animation: ${rotateAndTransition} .4s linear;
  opacity: 0.8;
  transform: rotate(180deg);
}
`
const Wrap = styled.div`
margin: 50px 100px;
  display: inline-block;
  position: fixed;
  top:45%;
  left: 20%;
  height: 60px;
  padding: 0;
  `
export default class Dashboard extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            value: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/countries/' + this.state.value)

    }
    render() {
        return (
            <div>
                <Heading>country search ends <br />here</Heading>
                <Wrap> <form onSubmit={this.handleSubmit}>
               <StyledInput type="text" name="search" onChange={this.handleChange} placeholder="type a country code.. press Enter" />
               <SubmitInput type="submit" />
                </form></Wrap>
                <StyledLink to={'/countries'}>List of Countries</StyledLink>
            </div>
        )
    }
}
