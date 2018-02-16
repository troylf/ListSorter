import React, { Component } from 'react';
import './ListSorter.css'

class ListSorter extends Component{
	constructor(props){
		super(props);
		this.state = {
			optionA:"",
			optionB:"",
			percentDone: 0
		};

		this.asyncMergesort_resetInnerForloop = this.asyncMergesort_resetInnerForloop.bind(this);
		this.asyncMergesort_itterate = this.asyncMergesort_itterate.bind(this);
		this.asyncMergesort_returnCompare = this.asyncMergesort_returnCompare.bind(this);
		this.clickOptionA = this.clickOptionA.bind(this);
		this.clickOptionB = this.clickOptionB.bind(this);
		this.setOptions = this.setOptions.bind(this);
		this.percentageDone = this.percentageDone.bind(this);

		const listLength = props.initialList.length;
		this.msv = {
			num: listLength,
			a: this.shuffle(props.initialList),
			b: [],
			k: 1,
			left: 0,
			compareFunction: this.setOptions,
			finishCallback: props.onFinish
		};
		this.clicksAtKLevel = 0;
		this.previousK = 0;
	}

	componentDidMount(){
		this.asyncMergesort_resetInnerForloop();
		this.asyncMergesort_itterate();
	}

//Percentage Functions
	powerOf2UnderTotal(total){
		let i = 0;
		while(Math.pow(2,i) < total){
			i++;
		}
		return i;
	}

	percentageDone(k, length, clicksAtKLevel){
		const groupSize = (k*2 >= length)
											? length :
											k*2;
		const numberOfGroups = Math.floor( length/(k*2) );
		const estimatedClicksAtKLevel = (numberOfGroups === 0) 
																		? length-1:
																		(groupSize-1)*numberOfGroups;
		const maxKPower = this.powerOf2UnderTotal(length);

		return (Math.log(k)/Math.log(2)+clicksAtKLevel/estimatedClicksAtKLevel)/maxKPower;
	}


	// Fisher–Yates shuffle
	shuffle(array) {
	  var i = array.length, j, t;
	  while (--i > 0) {
	    j = ~~(Math.random() * (i + 1));
	    t = array[j];
	    array[j] = array[i];
	    array[i] = t;
	  }
	  return array;
	}

	//sorting functions
	asyncMergesort_resetInnerForloop() {
	  this.msv.right = this.msv.left + this.msv.k;
	  this.msv.rend = this.msv.right + this.msv.k;
	  if (this.msv.rend > this.msv.num) {
	    this.msv.rend = this.msv.num;
	  }
	  this.msv.m = this.msv.left;
	  this.msv.i = this.msv.left;
	  this.msv.j = this.msv.right;
	}

	asyncMergesort_itterate() {
	  for (; this.msv.k < this.msv.num;) {
	    for (; this.msv.left + this.msv.k < this.msv.num;) {
	      while (this.msv.i < this.msv.right && this.msv.j < this.msv.rend) {
	        this.msv.compareFunction(this.msv.a[this.msv.i], this.msv.a[this.msv.j]);
	        return;
	      }
	      while (this.msv.i < this.msv.right) {
	        this.msv.b[this.msv.m] = this.msv.a[this.msv.i];
	        this.msv.i++;
	        this.msv.m++;
	      }
	      while (this.msv.j < this.msv.rend) {
	        this.msv.b[this.msv.m] = this.msv.a[this.msv.j];
	        this.msv.j++;
	        this.msv.m++;
	      }
	      for (this.msv.m = this.msv.left; this.msv.m < this.msv.rend; this.msv.m++) {
	        this.msv.a[this.msv.m] = this.msv.b[this.msv.m];
	      }
	      this.msv.left += this.msv.k * 2;
	      this.asyncMergesort_resetInnerForloop();
	    }
	    this.msv.k *= 2;
	    this.msv.left = 0;
	    this.asyncMergesort_resetInnerForloop();
	  }
	  this.msv.finishCallback(this.msv.a);
	}

	asyncMergesort_returnCompare(A_greaterThan_B) {
	  if (A_greaterThan_B) {
	    this.msv.b[this.msv.m] = this.msv.a[this.msv.i];
	    this.msv.i++;
	  } else {
	    this.msv.b[this.msv.m] = this.msv.a[this.msv.j];
	    this.msv.j++;
	  }
	  this.msv.m++;
	  this.asyncMergesort_itterate();
	}

	//React functions
	clickOptionA(event){
		this.asyncMergesort_returnCompare(1);
	}

	clickOptionB(event){
		this.asyncMergesort_returnCompare(0);
	}

	setOptions(a, b){
		if ( this.previousK !== this.msv.k ){
			this.previousK = this.msv.k;
			this.clicksAtKLevel = 0;
		} else {
			this.clicksAtKLevel = this.clicksAtKLevel+1;			
		}
		const newPercent = this.percentageDone(this.msv.k, this.msv.num, this.clicksAtKLevel);

		this.setState({
			optionA: a,
			optionB: b,
			percentDone: Math.floor(newPercent*100)
		});
	}

	render(){
		return(
			<div className="ListSorter">
				<div className="progress">
				  <div className="progress-bar bg-success" role="progressbar" style={{width: this.state.percentDone+"%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
				<h4> If you could only have one of these, which would it be?</h4>
				<div className="ListSorter-buttonContainer">
					<button onClick={this.clickOptionA}>{this.state.optionA}</button>
					<div className="ListSorter-or"> or </div>
					<button onClick={this.clickOptionB}>{this.state.optionB}</button>
				</div>
					
			</div>
		);
	}

}


export default ListSorter;
