import React, {Component} from "react";
import './nakshi.css';
//import './Personal.css';
import Radiobutton from "./radiobutton"
import Dropdown_my from "./dropdown"
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {BsFilter} from "react-icons/bs";
import {Animated} from "react-animated-css";




class Filter_sidebar extends Component {
    pathaname;
    state={
        filter_title_job_cat:"Job Category",
        default_job_cat:"DevOps",
        job_categories:[
            {value:"DevOps"},
            {value: "Teaching"},
            {value: "Security"},
            {value: "Research and Development"},
            {value: "Programming"}
        ],
        filter_title_loc:"Location",
        default_loc:"Rajshahi",
        locations:[
            {value:"Rajshahi"},
            {value: "Dhaka"},
            {value: "Sylhet"},
            {value: "Chittagong"},
            {value: "Khulna"},
            {value: "Barishal"},
            {value: "Rangpur"},
            {value: "Mymensingh"}
        ],
        filter_title_job_ntr:"Job Nature",
        default_job_ntr:"Full-time",
        job_natures:[
            {value:"Part-time"},
            {value: "Full-time"},
            {value: "Remote"},
            {value: "Freelancing"},
        ],
        filter_title_req:"Required Experience",
        default_req:"",
        req_exps:[
            {value:"1 year"},
            {value: "2-5 years"},
            {value: ">5 years"}
        ]
    };

    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;
    }
    callback = (value) => {
        // do something with value in parent component, like save to state
        console.log("callbackkkkk")
    }
    render() {
        console.log(this.pathaname);
        return (

            <div className="filterbar">
                <h5 style={{marginLeft:12,marginTop:8,marginBottom:-12}}><BsFilter style={{
                            color:"blue",
                            paddingRight:5,
                            marginTop:-2,
                            fontSize:30
                        }}/>Filter Jobs</h5>
                <hr className="hr_style"/>
                <Animated animationIn="fadeIn"  animationInDuration={1800}  isVisible={true}>

                <div className="category_div">
                    <Radiobutton values={this.state.job_categories} title={this.state.filter_title_job_cat} default_val={this.state.default_job_cat} filtername="cat" parentCallback={this.callback} />
                </div>

                <div className="category_div">
                    <Dropdown_my values={this.state.locations} title={this.state.filter_title_loc} default_val={this.state.default_loc} />
                </div>
                <div className="category_div">
                    <Radiobutton values={this.state.job_natures} title={this.state.filter_title_job_ntr} default_val={this.state.default_job_ntr} filtername="nat"/>
                </div>
                <div className="category_div">
                    <Radiobutton values={this.state.req_exps} title={this.state.filter_title_req} default_val={this.state.default_req} filtername="exp"/>
                </div>
                 </Animated>
            </div>
        )
    }
}
export default Filter_sidebar;