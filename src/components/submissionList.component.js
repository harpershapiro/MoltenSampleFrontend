import React, {Component} from 'react';
import Submission from './submission.component.js'
import axios from 'axios';
const BACK_PORT = 4000;

export default class SubmissionList extends Component {
    constructor(props){
        super(props);

        this.state = {submissions: []};
    }

    componentDidMount(){
        axios.get(`http://localhost:${BACK_PORT}/molten/submissions`)
            .then(res => {
                this.setState({submissions: res.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    submissionList(){
        return this.state.submissions.map(function(currentSub, i){
            return <Submission sub={currentSub} key={i}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Active Submissions</h3>
                <table className="table table-striped" style={{marginTop: 20}} >
                    <tbody>
                        {this.submissionList()}
                    </tbody>
                </table>
            </div>
        );
    }
}