import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {Animated} from "react-animated-css";
import {MdOutlineAdd} from 'react-icons/md'
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Select from "react-select";
var jsonData = {
    "j_title": "",
    "j_cat": "",
    "j_context": "",
    "j_nat": "",
    "j_step":"1",
}
const CatOptions = [
    { value: 'Teaching', label: 'Teaching' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Security', label: 'Security' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Programming', label: 'Programming' },
  ]
const NatureOptions = [
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Freelancing', label: 'Freelancing' }
    ]
const dropDownStyle ={
    control: (base, state) => ({
    ...base,

        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        //marginBottom:-20

    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};
class Job_1 extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            numDivs: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChangeDropField=this.handleChangeDropField.bind(this);
        this.handleChangeDropNat=this.handleChangeDropNat.bind(this);

    }

      handleSubmit(event) {
          event.preventDefault();
          var str1=this.state.input["job_des"]
          var str2=this.state.input["field"]
          var str3=this.state.input["nat"]
          var str4=""
          if(this.state.input["context"]) {
              str4=this.state.input["context"]
          }
          jsonData.j_title=str1
          jsonData.j_cat=str2
          jsonData.j_nat=str3
          jsonData.j_context=str4

          fetch('http://127.0.0.1:8000/jobpost/', {  // Enter your IP address here

          method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/job2"
      }
      handleChange(event) {
    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
   handleChangeDropField = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["field"]=event.value;
        this.setState({
      input
    });

  }
   handleChangeDropNat = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["nat"]=event.value;
        this.setState({
      input
    });

  }


    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Step 1</b></li>
                    <li>Step 2</li>
                    <li >Step 3</li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Create A New Job Post</b></p>
                <hr/>

                <form onSubmit={this.handleSubmit} >
                    <div className="row" style={{
             marginBottom:5
               }}>
                  <div className="col-sm-12">
                 <div className="form-group">
                <InputLabel for="job_des">Job Designation:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name="job_des"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Designation for the post"
                     id="job_des" required/>

             </div>
                  </div>

             </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
         <div className="form-group">
                <InputLabel for="field">Category:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <Select name="field" id="field" styles={dropDownStyle} options={CatOptions} onChange={this.handleChangeDropField} placeholder="Enter Job Category" openMenuOnFocus isClearable />

            </div>
                  </div>
                 <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="field">Job Nature:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <Select name="nat" id="nat" styles={dropDownStyle} options={NatureOptions} onChange={this.handleChangeDropNat} placeholder="Enter Job Nature" openMenuOnFocus isClearable />

            </div>
                  </div>

             </div>

            <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="desc">Job Context:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                        <textarea
                            name="context"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write something about job context"
                            id="desc" required/>

                  </div>
                </div>

                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >

                        {/*<button className="btn btn-success sub_btn_job1" onClick={this.handleSubmit} >Next</button>*/}
                        <input type="submit" value="Next" className="btn btn-success sub_btn_job1" />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Job_1;