import React, {Component} from 'react';
const BACK_PORT = 4000;

export default class Submit extends Component {

    constructor(props){
        super(props);

        this.state = {
            didUpload: false,
            fileURL: '',
        };

        this.handleUploadFile = this.handleUploadFile.bind(this);
    }

    handleUploadFile(ev) { 
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        console.log("fetching upload path");
        fetch(`http://localhost:${BACK_PORT}/upload`, { 
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                console.log("setting state fileURL to" + `http://localhost:${BACK_PORT}/${body.file}`);
                this.setState({ didUpload: true,
                                fileURL: `http://localhost:${BACK_PORT}/${body.file}` })
            });
        });
    }


    render(){
        return (
            <div>
                <h1> Submit </h1>
                <form onSubmit={this.handleUploadFile}>
                    <div>
                        <input ref={(ref) => {this.uploadInput = ref;}} type="file" />
                    </div>
                    <div>
                        <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                    </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
                <div>
                    {this.state.didUpload ? this.state.fileURL : ''}
                </div>
                </form>
            </div>
        );
    }
}

