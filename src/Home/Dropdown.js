import React from "react";
import Downshift from "downshift";

// Components
import {
  ItemThumbWrapper,
  SearchWrapper,
  InputWrapper,
  ItemsWrapper,
  ItemThumb,
  ItemBody,
  Item
} from "./Components";
import SearchExplanation from "./SearchExplanation";

function Dropdown({ items, onChange, onInputChange }) {
  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item == null ? "" : String(item.match))}
      render={({
        getInputProps,
        isOpen,
        getItemProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        openMenu,
        closeMenu
      }) => {
        return (
          <div style={{ width: "400px", margin: "10px auto" }}>
            <SearchWrapper onClick={() => openMenu()} isOpen={isOpen}>
              <InputWrapper
                {...getInputProps({
                  placeholder: "Search",
                  onChange: onInputChange,
                  id: "search-input"
                })}
              />
              <DropdownBody
                closeMenu={closeMenu}
                isOpen={isOpen}
                items={items}
                inputValue={inputValue ? inputValue : ""}
                getItemProps={getItemProps}
              />
            </SearchWrapper>
          </div>
        );
      }}
    />
  );
}

// filter function will be changed to -> Array not empty.
const DropdownBody = props => {
  const { isOpen, items, inputValue, getItemProps } = props;
  const isInputEmpty = inputValue.length === 0;

  if (isOpen) {
    return (
      <ItemsWrapper>
        {isInputEmpty === true ? (
          <SearchExplanation />
        ) : (
          items.map((item, index) => (
            <Item
              {...getItemProps({ item })}
              key={item.id}
              onMouseDown={() => setTimeout(() => props.closeMenu(), 200)}
            >
              <ItemThumbWrapper>
                {item.thumb && (
                  <ItemThumb
                    height={item.thumb.height}
                    width={item.thumb.width}
                    src={item.thumb.url}
                  />
                )}
              </ItemThumbWrapper>

              <ItemBody>
                <h3>{item.match}</h3>
                <p>{item.type}</p>
              </ItemBody>
            </Item>
          ))
        )}
      </ItemsWrapper>
    );
  } else {
    return null;
  }
};

export default Dropdown;
