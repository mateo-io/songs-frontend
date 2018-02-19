import React from 'react'
import Downshift from 'downshift'

// Components
import { SearchWrapper, InputWrapper, ItemsWrapper, Item } from './Components'
import SearchExplanation from './SearchExplanation'

function Dropdown({ items, onChange, onInputChange }) {
  return (
    <Downshift
      onChange={onChange}
      itemToString={item => (item == null ? '' : String(item.match))}
      render={({
        getInputProps,
        isOpen,
        getItemProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        openMenu,
        closeMenu,
      }) => {
        return (
          <div>
            <SearchWrapper onClick={() => openMenu()} isOpen={isOpen}>
              <InputWrapper
                {...getInputProps({
                  placeholder: 'Search',
                  onChange: onInputChange,
                  id: 'search-input',
                })}
              />
              <DropdownBody
                closeMenu={closeMenu}
                isOpen={isOpen}
                items={items}
                inputValue={inputValue ? inputValue : ''}
                getItemProps={getItemProps}
              />
            </SearchWrapper>
          </div>
        )
      }}
    />
  )
}

// filter function will be changed to -> Array not empty.
const DropdownBody = props => {
  const { isOpen, items, inputValue, getItemProps } = props
  const isInputEmpty = inputValue.length === 0

  if (isOpen) {
    return (
      <ItemsWrapper>
        {isInputEmpty === true ? (
          <SearchExplanation />
        ) : (
          items
            .filter(
              i =>
                !inputValue ||
                i.match.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item, index) => (
              <Item
                {...getItemProps({ item })}
                key={item.id}
                onMouseDown={() => setTimeout(() => props.closeMenu(), 200)}
              >
                <div
                  style={{
                    display: 'inline-block',
                    width: '42px',
                    padding: '12px',
                  }}
                >
                  {item.thumb && <img src={item.thumb} />}
                </div>
                <div style={{ display: 'inline-block' }}>
                  <h3 style={{ size: '18px', color: '#2e353b' }}>
                    {item.match}
                  </h3>
                  <p
                    style={{
                      size: '11px',
                      color: '#96a1ae',
                      fontWeight: 'normal',
                    }}
                  >
                    {item.type}
                  </p>
                </div>
              </Item>
            ))
        )}
      </ItemsWrapper>
    )
  } else {
    return null
  }
}

export default Dropdown
