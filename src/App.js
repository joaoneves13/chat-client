import React, { Component } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent'

// 1. Remove allMessages import
// 2. Remove mapDispatchToProps object
// 3. Pass only mapStateToProps to connected (not mapDispatchToProps)
// 4. Dispatch action directly from componenetDidMount wiht this.props.dispatch

class App extends Component {
  state = {
    text: ''
  }

  stream = new EventSource('http://localhost:4000/stream')

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log('event.data test:', event.data);
      
      const action = JSON.parse(event.data)
      console.log('parsed test', action);

      this.props.dispatch(action)
      
    }
  }

  onChange = (event) => {
    // const value = event.target.value
    // OR 
      const { target: { value } } = event
    // target === undefined
    // value === 'some string value'

    this.setState( { text: value } )
  }

  reset = () => {
    this.setState( { text: '' } )
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const url = 'http://localhost:4000/message'

    const response = await superagent
    .post(url)
    .send(this.state)

    this.reset()

    console.log('response test:', response);
  
  }

  render () {
    console.log('this.props test:', this.props);
    
    const { messages } = this.props

    const list = messages.map(message => 
      <p key={message.id}>{message.text}</p>)

    return <main>
      <form onSubmit={this.onSubmit}>
        <input 
        onChange={this.onChange} 
        type='text'
        value={this.state.text}/>
        <button>Submit</button>
      </form>

      <button onClick={this.reset}>Reset</button>

      {list}
      </main>
  }
}


  //Get data from store
function mapStateToProps (state) {
  //State is the current data in the redux store
  //Each property of the object becomes a props of the component 
  return {
    messages: state // Inside of the component, this.props.messages will be the entire state of the redux store
  }
}


export default connect(mapStateToProps)(App);

// OR

// const anotherFunction = connect(mapStateToProps)
// const connected = anotherFunction(App)
// export default connected
