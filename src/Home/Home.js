import React from 'react'
import styled from 'react-emotion'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'

// import { Observable } from 'rxjs'
import { Subject } from 'rxjs/Subject'
import Dropdown from './Dropdown'

// youtube api
import { getVideosList } from './Youtube'

// Stream
const inputStream = new Subject()

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      results: [],
    }
  }

  componentWillMount() {
    inputStream.subscribe(query => {
      console.log(`input subscribibtion value ${query}`)
      // sets results to an empty array as input changed
      this.setState({ name: query, results: [] }, () =>
        this.getSearchResults(this.state.name)
      )
    })
  }

  getSearchResults(query) {
    console.log(`getSearchResults`)
    getVideosList(query).then(songs => {
      console.log(`getSearchResults res ${songs}`)
      this.setState({
        results: songs,
      })
    })
  }

  getSearchContents(query) {
    console.log(`getSearchContents with query ${JSON.stringify(query)}`)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { results } = this.state
    return (
      <Root>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <WhitePaper center="true" elevation={10}>
              <Title>Songs Translator</Title>
              <Dropdown
                items={results}
                onChange={selectedItem => this.getSearchContents(selectedItem)}
                onInputChange={e => inputStream.next(e.target.value)}
                // onInputChange={(e: any) => console.log(`input change ${e.target.value}`)}
              />
            </WhitePaper>
          </Grid>

          <Grid item md={6} xs={12}>
            <WhitePaper center="true">
              <Body>Lyrics</Body>
            </WhitePaper>
          </Grid>

          <Grid item md={6} xs={12}>
            <WhitePaper center="true">
              <Body>Translated</Body>
            </WhitePaper>
          </Grid>
        </Grid>
      </Root>
    )
  }
}

const Title = styled('h1')`
  font-family: 'Oswald', sans-serif;
  font-size: 42px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: orange;
`

const Body = styled('p')`
  font-family: 'Lato', sans-serif;
`

const WhitePaper = styled(Paper)`
  padding: 20px;
  margin: 30px;
  ${props => props.center && `text-align: center`};
`

const Root = styled('div')`
  flex-grow: 1;
  max-width: 960px;
  margin: 0 auto;
`
