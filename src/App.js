import React, { Component } from 'react';
import ListInput from './ListInput.js';
import './App.css';

class App extends Component {
  actionState = {
    listInput: 1,
    sort: 2
  }

  constructor(props){
    super(props);

    this.state = {userList: [], appState: this.actionState.listInput};

    this.submitListInput = this.submitListInput.bind(this);
    this.activateListInput = this.activateListInput.bind(this);
  }

  submitListInput(list){
    this.setState({userList: list, appState: this.actionState.sort});
  }

  activateListInput(event){
    this.setState({appState: this.actionState.listInput});
  }

  render() {
    return (
      <div>
        { this.state.appState === this.actionState.listInput &&
          <ListInput onFinish={this.submitListInput}/>
        }
        { this.state.appState === this.actionState.sort &&
          <div>{JSON.stringify(this.state.userList)}
          <button onClick={this.activateListInput}> back </button></div>
        }
      </div>  
    );
  }
}

export default App;
