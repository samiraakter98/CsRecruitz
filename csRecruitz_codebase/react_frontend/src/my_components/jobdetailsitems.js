import * as React from 'react';
import  {Component} from "react";

import "./nakshi.css";



export default class Jobdetailsitems extends Component {

    render() {
        return (
            <div>
                <h6 className="grad_h">{this.props.title}</h6>
                <p>{this.props.text_val}</p>

            </div>

    )
    }

}
