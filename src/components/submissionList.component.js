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

    // getImageUrls(){
    //     this.state.submissions.map(function(currentSub,i){
    //         console.log(`Filling img url: ${currentSub.submission_img_url}`);
    //         this.state.images[i]=currentSub.submission_img_url;
    //     })
    // }

    submissionList(){
        var history = this.props.history;
        return this.state.submissions.map(function(currentSub, i){
            return <Submission sub={currentSub} key={i} history={history}/>
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