import React from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled, {keyframes} from 'styled-components'
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com'
  });
  const GET_COUNTRIES = gql `
  {
    countries{
      name
      code
      languages{
        name
        native
      }
      continent{
        name
      }
    }
  }`
  const rotateScale = keyframes`
  0% {
      -webkit-transform: scale(1) rotateX(0);
              transform: scale(1) rotateX(0);
              background: #19dcea;
    }
    50% {
      -webkit-transform: scale(2) rotateX(-180deg);
              transform: scale(2) rotateX(-180deg);
              background: #ea2222;
    }
    100% {
      -webkit-transform: scale(1) rotateX(-360deg);
              transform: scale(1) rotateX(-360deg);
              background: #3bd80d;
    }
  `
const Loading = styled.div`
position: absolute;
z-index: 4;
top:40%;
left: 40%;
background-color: red;
display: flex;
line-height: 100px;
justify-content: center;
align-content: center;
color: black;
height: 100px;
width: 100px;
-webkit-animation: ${rotateScale} 2s linear infinite both;
animation: ${rotateScale} 2s linear infinite both;
`

const ColumnStyled = styled.div`
float: left;
width: 30% ;
color: black;
display: table-column;
`
const ThinColumn = styled.div`
float: left;
width: 10% ;
color: black;
display: table-column;
`
const RowStyled = styled.div`
&:after {
  content: "";
  display: table;
  clear: both;
  padding: 10px;
}
&:hover {
    color: blue;
    background-color: grey;
}
&:nth-child(2n+1) {
    background-color: lightgrey;
}
`
const InnerRow = styled.div`
&:after {
  content: "";
  display: table;
  clear: both;
}
`

const IndexLetter = styled.div`
font-size: 3em;
text-transform: uppercase;
font-family: 'Arvo', serif;
font-weight: bolder;
position: -webkit-sticky;
position: sticky;
top: 40px;
background-color: white;
text-align: center;
box-shadow: 0 0 11px 0px ${props => props.useColor};
border-radius: 10px;
;
`
const TableContainer = styled.div`
margin: 10px;
padding: 10px;
font-family: 'Lato', sans-serif;
`
const IndexOfLetters = styled.div`
text-align: center;
font-family: 'Arvo', serif;
font-size: 1em;
padding: 3px;
position: relative;
`
const NormalHeading = styled.p`
font-family: 'Arvo', serif;
font-weight: bold;
font-size: 1.3em;
`
const ToTop = styled.button`
position: fixed;
display: inline-block;
bottom: 20px;
right: 20px;
background-color: lightslategrey;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
z-index: 10;
&:hover{
    background-color: lightgrey;
    color: black;
}
`
const StyledAnchor = styled.button`
:nth-child(odd){
    color: lightgrey;
}
:nth-child(even){
    color: black;
}
text-decoration: none;
border: none;
background-color: white;
padding: 3px;
`
const TableHeader = styled.div`
position: relative;
position: sticky;
top: 105px;
font-weight: bold;
border: 1px solid black;
vertical-align: middle;

`
var abc = {}

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
var refObj = {}
const Countries = (props) => {
    const handleClick = (e) => {
        window.scrollTo(0, 0);
    }
    const handleIndexClick = (e) => {
        var val = e.target.value;
        window.scrollTo(0, refObj[val].offsetTop - 25)
    }
        return (
            
            <Query query={GET_COUNTRIES} client={client}>
                {({loading, error, data}) => {
                    if(loading) return <Loading>Loading..</Loading>
                    if(error) {
                        return <p>Error..</p>
                    }
                    abc = {}
                    data.countries.forEach(c => {
                        if(abc[c.name[0]]){
                            if(abc[c.name[0]].length>0){
                            abc[c.name[0]].push(c)
                            }
                            else{
                                abc[c.name[0]] = c
                            }
                        }
                        else {
                            abc[c.name[0]] = [c]
                        }
                    })
                    var k = Object.keys(abc).sort()

                    return(
                    <div>
                    
                    <IndexOfLetters id="top">
                    <NormalHeading>
                        List by Initial Letter
                    </NormalHeading>
                    <ToTop onClick={handleClick}>Top</ToTop>
                    { k.map(i => {                  
                        return(
                        <span key={i}><StyledAnchor onClick={handleIndexClick} value={i}>{i}</StyledAnchor>&nbsp;</span>
                        )})}
                        </IndexOfLetters>
                        
                   {
                       k.map(i => {
                           return(
                               <TableContainer key={i}>
                           <div ref={(ref) => {
                               refObj = {
                                   ...refObj,
                                   [i]: ref
                               }
                           }}>
                           <IndexLetter useColor={colorArray[Math.floor(Math.random()*colorArray.length)]}>{i}</IndexLetter>
                           <hr />
                           <TableHeader>
                           <RowStyled>
                           <ThinColumn>
                                    Code
                                </ThinColumn>
                                <ColumnStyled>
                                    Country Name
                                </ColumnStyled>
                                <ColumnStyled>
                                    Continent Name
                                </ColumnStyled>
                                <ColumnStyled>
                                <ColumnStyled>Language (Eng) </ColumnStyled>
                                <ColumnStyled>Language (Native) </ColumnStyled>
                                </ColumnStyled>
                                </RowStyled>
                           </TableHeader>
                           {abc[i].map(c => {
                            return(
                                <RowStyled key={c.code}>
                                <ThinColumn>
                                    {c.code}
                                </ThinColumn>
                                <ColumnStyled>
                                    {c.name}
                                </ColumnStyled>
                                <ColumnStyled>
                                    {c.continent.name}
                                </ColumnStyled>
                                <ColumnStyled>
                                    {c.languages.map(l=>{
                                        return <InnerRow key={c.code+l.name}><ColumnStyled>{l.name ? l.name : 'None'}</ColumnStyled><ColumnStyled>{l.native ? l.native : 'None'}</ColumnStyled></InnerRow>
                                    })}
                                </ColumnStyled>
                                </RowStyled>
                                
                            )
                           })}
                           </div>
                           </TableContainer>
                    )})
                   }
                    </div>

                        
                    )
                }}
            </Query>
        )
}
export default Countries;
