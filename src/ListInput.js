import React, { Component } from 'react';
import BoundTextArea from './BoundTextArea.js';

class ListInput extends Component {
	constructor(props){
    super(props);
    this.state = {value: props.initialList.join("\n")};

    this.listChange = this.listChange.bind(this);
    this.onFinishButtonClick = this.onFinishButtonClick.bind(this);
  }

  sanatizeArray(arr){
    return arr.split('\n').map((item)=>item.trim()).filter((item)=>item!=='');
  }

  listChange(event){
    this.setState({value: event.target.value});
  }

  onFinishButtonClick(event){
  	this.props.onFinish(this.sanatizeArray(this.state.value));
  }

	render(){
		return (
      <div className='mainTextArea'>
        <BoundTextArea value={this.state.value} onChange={this.listChange}/>
        <div><button onClick={this.onFinishButtonClick}>
        	Sort
        </button></div>
      </div>
    );
	}
}


export default ListInput;