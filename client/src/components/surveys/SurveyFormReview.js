import React from 'react';
import _ from 'lodash';
import formFields from './formFields';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {withRouter} from 'react-router-dom';
import { submit } from 'redux-form';
const SurveyFormReview = ({ onCancel ,formValues,submitSurvey,history}) => {
    const reviewFields = _.map(formFields,({name,label})=>{
		return (
			<div key={name}>
			   <label>{label}</label>
			   <div>
				   {formValues[name]}
			  </div> 
			 </div> 
		);
	});

	return (
		<div>
			<h5>Survey Form Review</h5>
			  {reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				back
			</button>
			<button onClick={()=>submitSurvey(formValues,history)} className="green btn-flat right white-text">
			  Send Survey
			  </button>
		</div>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return { formValues: state.form.surveyForm.values };
}
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));
