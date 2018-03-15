import React from 'react'
import styled from 'react-emotion'

const SearchExplanation = () => {
  return (
    <Wrapper>
      <h2>Search for your favorite songs</h2>
      {<br />}
      {<br />}
      <div>
        <Span>artist name</Span>
      </div>
      {<br />}
      {<br />}
      <div>
        <Span>SONG TITLE</Span>
      {<br />}
      {<br />}
      <Span>Despacito</Span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  height: 300px;
  padding: 20px 0;
  text-align: center;
  background: white;

  h2 {
    color: grey;
    font-weight: 300;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 30px;
  }
`

const Span = styled('span')`
  font-weight: 600;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  line-height: 20px;
  padding: 0 20px;
`

export default SearchExplanation
