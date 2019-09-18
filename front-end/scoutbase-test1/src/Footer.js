import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.div`
   background-color: #F8F8F8;
    border-top: 1px solid #E7E7E7;
    text-align: center;
    padding: 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 40px;
    width: 100%;
    font-family: "Lato";
`
const InnerStyle = styled.div`
color: black;
`

const Footer = (props) => {
    return(
        <StyledFooter>
        <InnerStyle>
            Web App created by Siddharth Kumra for ScoutBase coding challenge!
        </InnerStyle>


        </StyledFooter>
    )
}
export default Footer;