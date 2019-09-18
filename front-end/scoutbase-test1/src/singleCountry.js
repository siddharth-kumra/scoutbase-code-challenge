import React from 'react'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import styled, {keyframes} from 'styled-components'
import ApolloClient from 'apollo-boost';
import { Twemoji } from 'react-emoji-render';
const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com'
  });

const GET_SPECIFIC_COUNTRY = gql `
query c($code:String){
    country(code: $code){
      name
      currency
      phone
      emojiU
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
const Container = styled.div`
position: absolute;
top:0;
left:0;
height: 100%;
width: 100%;
background-color: white;
`

const Title = styled.div`
font-family: 'Alegreya Sans SC', sans-serif;
font-size: 5em;
font-weight: bolder;
`
const Wrap = styled.div`
margin-top: 10%;
text-align: center;
`
const Field = styled.div`
font-size: 2em;
`
const FlagSize = styled.div`
font-size: 4em;
`
const FieldData = styled.span`
font-weight: bold;
text-decoration: underline;
font-size: 1.1em;
`
 const SingleCountry = (props) => {
     const {loading, error, data} = useQuery(GET_SPECIFIC_COUNTRY, {
         variables: {
             code: props.match.params.id.toUpperCase(),
         },
         client
     })
    return(
        <div>
            {loading ? <Container><Loading>Loading..</Loading></Container>: ''}
            {error ? 'ERROR!' : ''}
            {data ? 
                data.country ? 
                    <Wrap>
                    <Title>{data.country.name}</Title>
                    <FlagSize><Twemoji text={String.fromCodePoint('0x' +
                        (data.country.emojiU.slice(2,7))) + String.fromCodePoint('0x' + 
                        (data.country.emojiU.slice(-5)))}/></FlagSize>
                   <Field>Phone Number Code : <FieldData> +{data.country.phone}</FieldData></Field> 
                   <Field>Currency: <FieldData>{data.country.currency}</FieldData></Field>  
                    </Wrap>
                : 
                    <h1>Incorrect Country Code</h1>
            : 
                ''
            }
        </div>
    )
}

export default withRouter(SingleCountry)
