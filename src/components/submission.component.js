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
                    <td>{this.props.sub.submission_pack_url}</td>
                    <td>{this.props.sub.submission_img_url}</td>
                    <td>{this.props.sub.submission_user}</td>
                    <td>{this.props.sub.submission_date}</td>
            </tr>
        );
    }
}