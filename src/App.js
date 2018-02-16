import React, { Component } from 'react';
import ListInput from './ListInput.js';
import ListSorter from './ListSorter.js';
import './App.css';

class App extends Component {
  actionState = {
    listInput: 1,
    sort: 2
  };

  appLocalStorageKey = 'ListSorter';

  constructor(props){
    super(props);

    let initList = [];
    if(typeof(Storage) !== "undefined"){
      initList = JSON.parse(localStorage.getItem(this.appLocalStorageKey)) || [];
    }
    this.state = {userList: initList, appState: this.actionState.listInput};

    this.submitListInput = this.submitListInput.bind(this);
    this.submitSortedList = this.submitSortedList.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  saveToLocalStorage(list){
    localStorage.setItem(this.appLocalStorageKey, JSON.stringify(list));
  }

  submitListInput(list){
    this.saveToLocalStorage(list);
    this.setState({userList: list, appState: this.actionState.sort});
  }

  submitSortedList(list){
    this.saveToLocalStorage(list);
    this.setState({userList: list, appState: this.actionState.listInput});
  }

  render() {
    return (
      <div className='approot'>
        { this.state.appState === this.actionState.listInput &&
          <ListInput onFinish={this.submitListInput} initialList={this.state.userList}/>
        }
        { this.state.appState === this.actionState.sort &&
          <ListSorter onFinish={this.submitSortedList} initialList={this.state.userList}/>
        }
      </div>  
    );
  }
}

export default App;
