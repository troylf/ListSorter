import React from 'react';

function BoundTextArea(props){
	return(
		<textarea value={props.value} onChange={props.onChange}/>
		);
}

export default BoundTextArea;