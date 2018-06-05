import React from 'react';
//const input = props.input
export default ({ input, label, meta: { error, touched } }) => {
	//	console.log(meta);

	//..input is similar to onBlur=input.onBlur,onChange=input.onChange
	//These events are defined by reduxform
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
