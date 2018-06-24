import axios from 'axios';
import { FETCH_USER , FETCH_SURVEYS} from './types';

//Version 1 of our code
// export const fetchUser = () => {
// 	return function(dispatch) {
// 		axios
// 			.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
// };

//version 2 with async and await syntax
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitSurvey=(values,history)=>async dispatch =>{
	const res = await axios.post('/api/surveys',values);
	 history.push('./surveys');
	dispatch({type:FETCH_USER,payload:res.data})
}
export const fetchSurveys=()=>async dispatch =>{
	console.log("fetching surveys");
	const res=await axios.get('/api/surveys');
	dispatch({type:FETCH_SURVEYS,payload:res.data});
}