import React, { Component } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import BookCovers from './components/BookCovers';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    axios.post(`http://nyx.vima.ekt.gr:3000/api/books`)
      .then(response => this.setState({ books: response.data.books }))
  }

  render() {
    if (this.state.books.length > 0) {
      return (
        <div className="App">
          <Container>
            <BookCovers books={this.state.books} />
          </Container>
        </div>
      )
    } else {
      return <div className="App">Loading..</div>
    }
  }

}

export default App;
