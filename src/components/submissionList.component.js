import React, {Component} from 'react';
import Submission from './submission.component.js'
import axios from 'axios';
const BACK_PORT = 4000;

export default class SubmissionList extends Component {
    constructor(props){
        super(props);

        this.state = {submissions: [],
                      images: []   
        };

        this.submissionDeleted = this.submissionDeleted.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:${BACK_PORT}/molten/submissions`)
            .then(res => {
                this.setState({submissions: res.data,
                               images: res.data //makes images array have same length as submissions
                });
                //this.getImageUrls();
            })
            .catch(function (error){
                console.log(error);
            })
    }

    submissionDeleted(subId){
        //update state: delete item from posts with id postId
        var oldSubs = this.state.submissions;
        var newSubs = oldSubs.filter(sub=>{
            if(sub._id == subId){
                return false;
            } else {
                return true;
            }
        });
        this.setState({submissions: newSubs});
    }


    submissionList(){
        var submissionDeleted = this.submissionDeleted;
        var history = this.props.history;
        return this.state.submissions.map(function(currentSub, i){
            return <Submission sub={currentSub} key={i} history = {history} submissionDeleted={submissionDeleted}/>
        })
    }



    render(){
        //this.fetchImages();
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