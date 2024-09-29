import {ThreeDots} from "react-loader-spinner";

import * as React from 'react';
import  {Component} from "react";

import "./nakshi.css";



export default class Loader extends Component {

    render() {
        return (
            <div style={{marginLeft:'50%',marginTop:'20%'}}>
                 <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>

    )
    }

}