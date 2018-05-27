import axios from 'axios';
import { FETCH_USER } from './types';

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
