import React, {Component} from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download'
import {API_PATH} from "../config"

export default class DownloadButton extends Component{
    constructor(props){
        super(props);

        this.download=this.download.bind(this);
    }

    download(){
        axios.get(API_PATH.concat(`/files/downloadPack/${this.props.fileUrl}`), {responseType: 'blob'})
        //axios.get(`http://localhost:${BACK_PORT}/downloadPack/spacescreen.mp3`, {responseType: 'blob'})
        .then((res)=>
            fileDownload(res.data,this.props.fileName)
        )
    }


    render(){
        return(
            <div>
                <button type="button" className="btn-primary" onClick={this.download}>Download</button>
            </div>
        )
    }
} 