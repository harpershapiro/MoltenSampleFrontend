import React, {Component} from 'react';
import Submission from './submission.component.js'
import axios from 'axios';
import {API_PATH} from "../config"

export default class SubmissionList extends Component {
    constructor(props){
        super(props);

        this.state = {submissions: [] };

        this.submissionDeleted = this.submissionDeleted.bind(this);
    }

    componentDidMount(){
        axios.get(API_PATH.concat('/submissions'))
            .then(res => {
                this.setState({submissions: res.data //forces image array to have same length as submissions
                });
                //this.getImageUrls();
            })
            .catch(function (error){
                console.log(error);
            })
    }

    submissionDeleted(sub){
        //update state: delete item from subs with id subId
        // var oldSubs = this.state.submissions;
        // var newSubs = oldSubs.filter((sub)=>{
        //     if(sub._id == subId){
        //         return false;
        //     } else {
        //         return true;
        //     }
        // });
        //this.setState({submissions: newSubs});
        
        //TODO: Delete image and pack from filesystem
        let imageString = '/files/deleteImage/'+sub.submission_url+'.'+sub.img_ext
        let packString = '/files/deletePack/'+sub.submission_url+'.'+sub.pack_ext

        console.log("sending delete to " + API_PATH.concat(imageString));
        axios.delete(API_PATH.concat(imageString))
            .then(axios.delete(API_PATH.concat(packString))
            .then((res) => window.location.reload(false)))
        
            .catch(e=> console.log(e))

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