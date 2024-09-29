import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {Animated} from "react-animated-css";
import {MdOutlineAdd} from 'react-icons/md'
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
var jsonData = {
    "des": "",
    "emp": "",
    "from": "",
    "to": "",
    "desc": "",
}
class Register_2 extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            numDivs: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }
    handleClickSkip() {
       window.location.href="/register3"
      }
      handleSubmit(event) {
          event.preventDefault();
          var str1=this.state.input["job_des_start"];
          var str2=this.state.input["job_emp_start"];
          var str3=this.state.input["from_year_start"];
          var str4=this.state.input["to_year_start"];
          var str5=""
          if(this.state.input["desc_start"]) {
              str5 = this.state.input["desc_start"];
          }
          else str5="?"
          for(let i=0;i<this.state.numDivs;i++) {
              var ind1="job_des_"+i;
              var ind2="job_emp_"+i;
              var ind3="from_year_"+i;
              var ind4="to_year_"+i;
              var ind5="desc_"+i;

              str1=str1+"#"+this.state.input[ind1]
              str2=str2+"#"+this.state.input[ind2]
              str3=str3+"#"+this.state.input[ind3]
              str4=str4+"#"+this.state.input[ind4]
              if(this.state.input[ind5]) {
                  str5 = str5 + "#" + this.state.input[ind5]
              }
              else str5=str5+'#'+'?'
          }
          console.log(str1)
          console.log(str2)
          console.log(str3)
          console.log(str4)
          console.log(str5)
          jsonData.des=str1
          jsonData.emp=str2
          jsonData.from=str3
          jsonData.to=str4
          jsonData.desc=str5
          fetch('http://127.0.0.1:8000/first_module/jobexp/addexp/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/register3"
      }
      handleChange(event) {
    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


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
                    }}>Experiences</b></li>
                    <li>Skills and Projects</li>
                    <li >Publications and Licenses</li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Add Your Experiences</b></p>
                <p style={{
              fontSize:18,
              marginBottom:-4,
              fontWeight:"bold",
                    marginRight:-20

          }}>Job Experience <p className="btn add_btn" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>

          <hr/>
                <form onSubmit={this.handleSubmit}>
                    <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_des">Designation:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name="job_des_start"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Designation in the Job"
                     id="job_des" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_emp">Employer:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name="job_emp_start"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Employer/Organization Name"
                     id="job_emp" required />

             </div>
                  </div>

             </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="from_year">From Year:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="from_year_start"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Starting Year"
                     id="from_year" required />

             </div>
                  </div>
                 <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="to_year_start">To Year:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="to_year_start"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Finishing Year"
                     id="to_year" required/>

             </div>
                  </div>

             </div>

            <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="desc">Description</InputLabel>
                        <textarea
                            name="desc_start"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Experience"
                            id="desc"/>

                  </div>
                </div>
                    {
    new Array(this.state.numDivs).fill(0).map((item, index) => (
        <div>
            <hr/>
        <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_des">Designation:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name={"job_des_"+index}

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Designation in the Job"
                     id="job_des" required />

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_emp">Employer:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name={"job_emp_"+index}

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Employer/Organization Name"
                     id="job_emp" required />

             </div>
                  </div>

             </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="from_year">From Year:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name={"from_year_"+index}
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Starting Year"
                     id="from_year" required />

             </div>
                  </div>
                 <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="to_year">To Year:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name={"to_year_"+index}
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Finishing Year"
                     id="to_year" required />

             </div>
                  </div>

             </div>

            <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="desc">Description</InputLabel>
                        <textarea
                            name={"desc_"+index}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Experience"
                            id="desc"/>

                  </div>
                </div>
                        </div>

    ))
}
                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >
                        <button className="btn btn-danger skip_btn" onClick={this.handleClickSkip}>Skip</button>
                        <input type="submit" value="Continue" className="btn btn-success sub_btn_2"  />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Register_2;