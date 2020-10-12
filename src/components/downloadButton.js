import React, {Component} from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download'
const BACK_PORT = 4000

export default class DownloadButton extends Component{
    constructor(props){
        super(props);

        this.download=this.download.bind(this);
    }

    download(){
        axios.get(`http://localhost:${BACK_PORT}/molten/files/downloadPack/${this.props.fileUrl}`, {responseType: 'blob'})
        //axios.get(`http://localhost:${BACK_PORT}/downloadPack/spacescreen.mp3`, {responseType: 'blob'})
        .then((res)=>
            fileDownload(res.data,this.props.fileName)
        )
    }


    render(){
        return(
            <div>
                <button onClick={this.download}>Download</button>
            </div>
        )
    }
} 