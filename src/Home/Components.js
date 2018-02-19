import React from 'react'
import styled from 'react-emotion'
import TextField from 'material-ui/TextField'

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
  top: 5px;
  width: 300px;
  margin-left: 33px;
  border: none;
  background: transparent;
  font-family: 'SFUIText';
  font-weight: normal;
  font-size: 16px;
`

export const ItemsWrapper = styled('div')`
  margin-top: 20px;
  width: 300px;
  padding: ${props => (props.paddingTop ? '10px' : '0 10px')};
  z-index: 10;
  background: white;
  color: #96a1ae;
  size: 11px;
`

export const Item = styled('div')`
  padding: 15px 0;
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

export const ItemExplain = styled('div')`
  padding: 10px 0;
  background-color: white;
  color: #96a1ae;
`
