import React from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Countries from './countries'
import SingleCountry from './singleCountry'
import Dashboard from './dashboard'
import NavBar from './NavBar'
import Footer from './Footer'

const Head = styled.div`
height: 40px;
width: 100%;
position: sticky;
position: -webkit-sticky;
top: 0;
z-index: 1;
`
const Body = styled.div`
height: 100%;
min-height: 100%;
margin-bottom: 40px;
`
const FooterStyle = styled.div`
height: 40px;
`
function App() {
  return (     
    <div>
      <Router>
        <Head><Route path={'/'} component = {NavBar} /></Head>
        <Body><Route path={'/'} exact component={Dashboard} />
        <Route path={'/countries'} exact component={Countries}/>
        <Route path={'/countries/:id'} component={SingleCountry} />
        </Body>
        <FooterStyle><Footer></Footer></FooterStyle>
      </Router>
      </div>
  );
}

export default App;
