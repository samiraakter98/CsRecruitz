import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Select from "react-select";
import Foot from "./Foot";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TypeAnimation from 'react-type-animation';
import Form from "react-bootstrap/Form";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:4,
  backdrop:false,
  show:true,
    borderRadius:5,
    border:0,
    overflow:'hidden'
};
var jsonData = {
    "name":"",
    "password":"",
    "email":"",
    "mob":"",
    "street":"",
    "thana":"",
    "dis":"",
    "div":"",
    "org":"",
    "est_year":"",
  }
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

const OrgOptions = [
    { value: 'Government', label: 'Government' },
    { value: 'Semi Government', label: 'Semi Government' },
    { value: 'NGO', label: 'NGO' },
    { value: 'Private Firm', label: 'Private Firm' },
    { value: 'International Agencies', label: 'International Agencies' }
  ]

const LocationOptions = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Rajshahi', label: 'Rajshahi' },
    { value: 'Rangpur', label: 'Rangpur' },
    { value: 'Sylhet', label: 'Sylhet' },
    { value: 'Khulna', label: 'Khulna' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Mymensingh ', label: 'Mymensingh ' },
    { value: 'Barishal', label: 'Barishal' }
  ]
class Register extends  Component {
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
        redirect:false,
        signinopen:false,
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChangeDropDiv=this.handleChangeDropDiv.bind(this);
    this.handleChangeDropOrg=this.handleChangeDropOrg.bind(this);
  }

handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }

  handleChangeDropDiv = (event) => {
        let input = this.state.input;
        //console.log("heree");

        console.log(event.value);
        input["div"]=event.value;
        this.setState({
      input
    });

  }
  handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }
      handleClickYes() {
        window.location.href="/"
      }

  handleChangeDropOrg = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["org"]=event.value;
        this.setState({
      input
    });

  }


  handleSubmit(event) {
    event.preventDefault();
    console.log("geree");
     this.setState({signinopen: true});
    if(this.validate()){
        console.log(this.state);
        if(this.state.input["name"]) {
            jsonData.name=this.state.input["name"];
        }
        if(this.state.input["email"]) {
            jsonData.email = this.state.input["email"];
        }
        jsonData.password=this.state.input["password"];


        jsonData.mob=this.state.input["mob"];

        if(this.state.input["street"]) {
            jsonData.street = this.state.input["street"];
        }
        if(this.state.input["thana"]) {
            jsonData.thana=this.state.input["thana"];
        }
        if(this.state.input["dis"]) {
            jsonData.dis = this.state.input["dis"];
        }
        jsonData.div=this.state.input["div"];

        if(this.state.input["org"]) {
            jsonData.org = this.state.input["org"];
        }
        if(this.state.input["est_year"]) {
            jsonData.est_year = this.state.input["est_year"];
        }




        let input = {};

        this.setState({input:input});
        fetch('http://127.0.0.1:8000/first_module/jobseeker/addemp/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true});



    }
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;


      if (typeof input["email"] !== "undefined") {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }

      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }

      this.setState({
        errors: errors
      });

      return isValid;
  }

  render() {
    return (
        <React.Fragment>
        <Navb/>
      <div className="content_reg">
          <p className="seems-h1_reg"><b> Create a csRecruitZ Account</b></p>
          <p style={{
              fontSize:18,
              marginBottom:-10,
              fontWeight:"bold"
          }}>Employer Information</p>
          <hr/>
        <form onSubmit={this.handleSubmit}>
         <div className="row" style={{
             marginBottom:5
         }}>

          <div className="form-group">
            <InputLabel for="name">Name:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
            <input
              type="text"
              name="name"

              className="form-control"
              placeholder="Enter name"
              onChange={this.handleChange}
              id="name" required/>

          </div>



         </div>
            <div className="row" style={{
             marginBottom:5
         }}>

            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="mob">Contact Number:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <input
                    type="number"
                    name="mob"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Contact Number"
                    id="mob" required />

            </div>
            </div>
                   <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="email">Email Address:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <input
                    type="text"
                    name="email"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter email"
                    id="email" required />

                <div className="text-danger">{this.state.errors.email}</div>
            </div>
            </div>
                </div>

            <div className="row" style={{
             marginBottom:5
         }}>
             <div className="col-sm-6">
          <div className="form-group">
            <InputLabel for="password">Password:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
            <input
              type="password"
              name="password"

              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter password"
              id="password" required/>

              <div className="text-danger">{this.state.errors.password}</div>
          </div>
             </div>
                <div className="col-sm-6">
                <div className="form-group">
                    <InputLabel htmlFor="password">Confirm Password:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                    <input
                        type="password"
                        name="confirm_password"

                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Retype password"
                        id="confirm_password" required/>
                </div>
                </div>

            </div>
            <div className="row" style={{
             marginBottom:5
         }}>

           <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="est_year">Establishment Year:</InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="est_year"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Starting Year"
                     id="est_year" />


                  </div>
            </div>
            <div className="col-sm-6">

                <div className="form-group">
                <InputLabel for="pref_org">Organization Type:</InputLabel>
                <Select name="org" id="org" styles={dropDownStyle} options={OrgOptions} onChange={this.handleChangeDropOrg} placeholder="Enter Your Organization Type" openMenuOnFocus isClearable />

            </div>
            </div>
                </div>



            <p></p>
            <p style={{
            fontSize:16,
             fontWeight:"bold"
            }}>Address Information</p>
            <hr/>
            <div className="row" style={{
             marginBottom:5
         }}>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="street">Street/Road:</InputLabel>
                        <input
                            type="text"
                            name="street"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Street Name:"
                            id="street"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="thana">Thana:</InputLabel>
                        <input
                            type="text"
                            name="thana"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Thana"
                            id="thana"/>
                    </div>
                </div>

            </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="dis">District:</InputLabel>
                        <input
                            type="text"
                            name="dis"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter District:"
                            id="dis"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel for="loc">Division:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <Select name="loc" id="loc" styles={dropDownStyle} options={LocationOptions} onChange={this.handleChangeDropDiv} placeholder="Enter Division" openMenuOnFocus isClearable />
                    </div>
                </div>

            </div>

            <div className="row" style={{
             marginBottom:5
         }}>
            <input type="submit" value="Proceed To Register" className="btn btn-success sub_btn" />
                </div>

        </form>
          <div>
      <Modal
        open={this.state.signinopen}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2" style={{color:"#410390",fontWeight:"bold",paddingTop:'3px'}}>

              </Typography>
            </div>


            <svg className="svg_class" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                   stroke-linejoin="round">
                    <path className="circle"
                          d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                    <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                </g>
            </svg>
            <div style={{marginLeft:60}}>
            <TypeAnimation
                cursor={true}
                sequence={['You have successfully registered', 2000,'']}
                wrapper="h6"
                repeat={Infinity}

            />
                </div>

            <div style={{height:'auto',marginTop:"50px",background:"green",marginLeft:"-33px",marginRight:'-33px',marginBottom:'-43px',paddingLeft:'20px',paddingTop:'3px',paddingBottom:'12px',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>

                <button style={{marginTop:"20px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'20px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.handleClickYes}>Proceed to Home</button>

            </div>

        </Box>
      </Modal>
    </div>
      </div>

            <Foot margin_value={172}/>
            </React.Fragment>
    );
  }

}
export default Register;

