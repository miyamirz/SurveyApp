import React from 'react';
import { connect } from 'react-redux';
const SurveyFormReview = ({ onCancel }) => {
	return (
		<div>
			<h5>Survey Form Review</h5>
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				back
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps)(SurveyFormReview);
