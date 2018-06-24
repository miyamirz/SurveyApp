import {FETCH_SURVEYS} from '../actions/types';
export default function(state=[],action){
    switch(action.type){
        case FETCH_SURVEYS:
        console.log("in fetch reducer for surveyslist")
           return action.payload;
        default:
           return state;            
    }
}