//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipients List', name: 'emails' }
];
class SurveyForm extends Component {
	renderFields() {
		// return (
		// 	<div>
		// 		<Field
		// 			label="Survey Title"
		// 			type="text"
		// 			name="title"
		// 			component={SurveyField}
		// 		/>
		// 		<Field
		// 			label="Subject Line"
		// 			type="text"
		// 			name="subject"
		// 			component={SurveyField}
		// 		/>
		// 		<Field
		// 			label="Body"
		// 			type="text"
		// 			name="body"
		// 			component={SurveyField}
		// 		/>
		// 		<Field
		// 			label="Recipients"
		// 			type="text"
		// 			name="recipients"
		// 			component={SurveyField}
		// 		/>
		// 	</div>
		// );
		return _.map(FIELDS, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					name={name}
					label={label}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<form
					onSubmit={this.props.handleSubmit(
						this.props.onSurveySubmit
					)}
				>
					{/* <Field
						type="text"
						name="SurveyTitle"
						component="input"
                    /> */}

					{this.renderFields()}
					<Link
						to="/surveys"
						className="red btn-flat white-text"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="teal btn-flat right white-text"
					>
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const errors = {};
	//You can do the below for every thing
	// if (!values.title) {
	// 	errors.title = 'You must enter a title';
	// }

	//but we utilize lodash to make it clean
	//You should not write values.name
	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});
	errors.emails = validateEmails(values.emails || '');
	return errors;
}
//validate:validate
//form:surveyForm----->surveyForm is used by redux as namespace to specify as key
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
