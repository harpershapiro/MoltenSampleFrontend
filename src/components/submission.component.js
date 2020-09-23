import React, {Component} from 'react';

export default class Submission extends Component {
    constructor(props){
        super(props);

        //functions
    }

    render(){
        return(
            <tr>              
                    <td>{this.props.sub.submission_title}</td>
                    <td>{this.props.sub.submission_desc}</td>
            </tr>
        );
    }
}