import React from 'react';
import img from '../spinner.svg';

const ErrorMessage = () => {
	return(
		<>
			<img className="spinner" alt="spinner" src={img} />
		</>
	)
}

export default ErrorMessage;