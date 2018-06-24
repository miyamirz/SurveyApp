import React,{Component} from 'react';

class Test extends Component{
  helper(){
      console.log("dsfl;kasdkjas;ljasdfklj")
      return "this is heljjn;mlo"
  }
    render(){
        return (
            <div>Hello
            {this.helper()}
            </div>
        )
    }
}

export default Test;