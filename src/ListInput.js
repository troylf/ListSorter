import React, { Component } from 'react';
import BoundTextArea from './BoundTextArea.js';
import './ListInput.css';

class ListInput extends Component {
	constructor(props){
    super(props);
    this.state = {value: props.initialList.join("\n")};

    this.listChange = this.listChange.bind(this);
    this.onFinishButtonClick = this.onFinishButtonClick.bind(this);
  }

  cleanArray(arr){
    return arr.split('\n')
    					.map((item)=>item.trim())
    					.filter((item)=>item!=='');
  }

  listChange(event){
    this.setState({value: event.target.value});
  }

  onFinishButtonClick(event){
  	this.props.onFinish(this.cleanArray(this.state.value));
  }

	render(){
		return (
      <div className='mainTextArea'>
      	<h3>Input Your List</h3>
        <BoundTextArea value={this.state.value} onChange={this.listChange}/>
        <div><button onClick={this.onFinishButtonClick}>
        	Sort this List!
        </button></div>
      </div>
    );
	}
}


export default ListInput;