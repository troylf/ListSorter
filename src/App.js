import React, { Component } from 'react';
import BoundTextArea from './BoundTextArea.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {userList: '', testArea:''};

    this.listChange = this.listChange.bind(this);
  }

  sanatizeArray(arr){
    return arr.split('\n').map((item)=>item.trim()).filter((item)=>item!=='');
  }

  listChange(event){
    const filteredList = this.sanatizeArray(event.target.value);
    this.setState({userList: event.target.value, testArea: filteredList});
  }

  render() {
    return (
      <div class='mainTextArea'>
        <BoundTextArea value={this.state.value} onChange={this.listChange}/>
        <div>
        {JSON.stringify(this.state.testArea)}
        </div>
      </div>
    );
  }
}

export default App;
