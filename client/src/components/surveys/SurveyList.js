import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends Component{
    
    componentWillMount(){
        console.log("surveylist mounted")
        this.props.fetchSurveys();
    }
    renderSurveys(){
        console.log("in render surveys",this.props.surveys)
        return this.props.surveys.reverse().map(survey=>  {
            return (
                <div key={survey._id} className="card blue-grey darken-1" >
                <div className="card-content white-text">
                  <span className="card-title">{survey.title}</span>
                  <p>{survey.body}</p>
                  <p className="right">
                    Sent On:{new Date(survey.dateSent).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                 <a> Yes:{survey.yes}</a>  
                 <a> No:{survey.no}</a>
               </div>
              </div> 
            )
        });
    }
    helper(){
        console.log("helper")
    }
    render(){
        return (
          <div>
              
          {this.renderSurveys()}
         
          </div>    
        );
    }
}
function mapStateToProps(state){
    console.log("in map");
    console.log(state.surveys)
    return {surveys:state.surveys};
}

// function mapStateToProps({surveys}){
//     console.log("in map")
//     return {surveys};
// }
export default connect(mapStateToProps,{fetchSurveys})(SurveyList);