import React from "react";
import styled from "react-emotion";
import TextField from "material-ui/TextField";

// SEARCH
export const SearchWrapper = styled("div")`
  width: 245px;
  height: 32px;
  right: 15px;
  top: 15px;
  align-items: center;
  z-index: 10;
  padding-top: 5px;
  border-radius: 100px;
`;

export const InputWrapper = styled(TextField)`
  position: relative;
  top: 5px;
  min-width: 400px;
  margin-left: 33px;
  border: none;
  background: transparent;
  font-family: "SFUIText";
  font-weight: normal;
  font-size: 16px;
`;

export const ItemExplain = styled("div")`
  padding: 10px 0;
  background-color: white;
  color: #96a1ae;
`;

// SEARCH RESULTS
export const ItemsWrapper = styled("div")`
  margin-top: 20px;
  padding: ${props => (props.paddingTop ? "10px" : "0 10px")};
  z-index: 10;
  position: relative;
  background: white;
  color: #96a1ae;
  min-width: 500px;
`;

export const Item = styled("div")`
  padding: 15px 0;
  z-index: 5;

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
  font-weight: ${props => (props.selected ? "bold" : "normal")};
`;

// ITEM COMPONENTS
export const ItemThumbWrapper = styled("div")`
  display: inline-block;
  width: 120px;
  padding: 12px;
`;

export const ItemThumb = styled("img")`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const ItemBody = styled("div")`
  display: inline-block;
  width: 300px;

  h3 {
    color: orange;
    size: 16px;
    font-style: italic;
  }

  p {
    size: 20px;
    text-transform: uppercase;
    color: black;
  }
`;
