import React, { Component } from 'react';

class ListSorter extends Component{
	constructor(props){
		super(props);
		this.state = {
			optionA:"",
			optionB:""
		};

		this.asyncMergesort_resetInnerForloop = this.asyncMergesort_resetInnerForloop.bind(this);
		this.asyncMergesort_itterate = this.asyncMergesort_itterate.bind(this);
		this.asyncMergesort_returnCompare = this.asyncMergesort_returnCompare.bind(this);
		this.clickOptionA = this.clickOptionA.bind(this);
		this.clickOptionB = this.clickOptionB.bind(this);
		this.setOptions = this.setOptions.bind(this);

		this.msv = {
			num: props.initialList.length,
			a: this.shuffle(props.initialList),
			b: [],
			k: 1,
			left: 0,
			compareFunction: this.setOptions,
			finishCallback: props.onFinish
		};
	}

	componentDidMount(){
		this.asyncMergesort_resetInnerForloop();
		this.asyncMergesort_itterate();
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
		this.setState({
			optionA: a,
			optionB: b
		});
	}

	render(){
		return(
			<div>
				<button onClick={this.clickOptionA}>{this.state.optionA}</button>
				<button onClick={this.clickOptionB}>{this.state.optionB}</button>
			</div>
		);
	}

}


export default ListSorter;
