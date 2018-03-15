import styled from 'react-emotion'
import TextField from 'material-ui/TextField'

// SEARCH
export const SearchWrapper = styled('div')`
  width: 245px;
  height: 32px;
  right: 15px;
  top: 15px;
  align-items: center;
  z-index: 10;
  padding-top: 5px;
  border-radius: 100px;
`

export const InputWrapper = styled(TextField)`
  position: relative;
  text-align: center;
  top: 5px;
  left: 40px;

  min-width: 300px;
  border: none;
  background: transparent;
  font-weight: normal;
  font-size: 16px;
`

export const ItemExplain = styled('div')`
  padding: 10px 0;
  background-color: white;
  color: #96a1ae;
`

// SEARCH RESULTS
export const ItemsWrapper = styled('div')`
  margin-top: 20px;
  padding: '10px';
  z-index: 10;
  position: relative;
  right: 40px;
  background: white;
  color: #96a1ae;
  min-width: 440px;
`

export const Item = styled('div')`
  z-index: 5;
  margin: 10px 0;
  height: 110px;

  &:hover {
    background: grey;
  }

  cursor: pointer;
  ${props =>
    props.highlighted
      ? `
  background-color: #96a1ae;
  color: white;
    `
      : `
  background-color: white;
  color:#96a1ae;
  `};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
`

// ITEM COMPONENTS
export const ItemThumbWrapper = styled('div')`
  display: inline-block;
  width: 100px;
  /* padding: 8px; */
`

export const ItemThumb = styled('img')`
  margin: 10px;
  width: ${props => props.width};
  height: ${props => props.height};
`

export const ItemBody = styled('div')`
  position: relative;
  display: inline-block;
  height: 50px;
  width: 340px;

  h3 {
    color: orange;
    font-weight: 700;
    size: 20px;
  }

  p {
    size: 16px;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 1.5px;
    color: black;
  }
`
