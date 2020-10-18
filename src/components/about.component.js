import React, {Component} from 'react';

export default class About extends Component {
    render(){
        console.log("API PATH: " + process.env.API_PATH)
        return (
            <div>
                <h1> About </h1>
                <p>
                    We are a sample pack label for producers. Submit a pack of unique sounds, we will review it for publishing.
                </p>
            </div>
        )
    }
}