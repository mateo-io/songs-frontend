import React, { Component } from 'react'
import Home from './Home'
import WebFont from 'webfontloader'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Fonts />
      </div>
    )
  }
}

const Fonts = () => [
  <script
    key={`webfont-script`}
    src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
  />,
  <span key={`webfont-load`}>
    {WebFont.load({
      google: {
        families: ['Oswald', 'Lato'],
      },
    })}
  </span>,
]

export default App
