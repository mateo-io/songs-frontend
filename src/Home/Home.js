import React from 'react'
import styled from 'react-emotion'

import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

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
    inputStream.subscribe(val => {
      console.log(`input subscribibtion value ${val}`)
      this.setState({ name: val, results: [] }, () =>
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
        // [
        //   { id: 4, type: 'artist', match: 'Metallica' },
        //   { id: 5, match: 'Mark Anthony' },
        // ],
      })
    })

    // Api.fetchByDates('query')
    //   .then((res:Array<any>) => console.log(`fetchByDates respone ${res}`))
  }

  getSearchContents(query) {
    // fires when search element is clicked
    // redirect to a new route.
    // fetch Contents with actual query.
    // Render ContentCollection or get Contents from Redux and just update it.
    console.log(`getSearchContents with query ${query}`)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { results, name } = this.state
    return (
      <Root>
        <Grid container spacing={24}>
          <Grid item md={12}>
            <WhitePaper center elevation={10}>
              <Title>observable world</Title>
              <form noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="name"
                  value={name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
              </form>
              <Body>Introduce el nombre de una cancion</Body>
            </WhitePaper>
          </Grid>

          <Grid item md={12}>
            <WhitePaper>
              <Dropdown
                items={results}
                onChange={selectedItem => this.getSearchContents(selectedItem)}
                onInputChange={e => inputStream.next(e.target.value)}
                // onInputChange={(e: any) => console.log(`input change ${e.target.value}`)}
              />
            </WhitePaper>
          </Grid>
        </Grid>
      </Root>
    )
  }
}

const Title = styled('h1')``

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
`
