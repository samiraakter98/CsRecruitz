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


import {storage} from "./Firebase";

import { ref, uploadBytes } from "firebase/storage";
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
    "dob":"",
    "gender":"",
    "mob":"",
    "nid":"",
    "nat":"",
    "father":"",
    "mother":"",
    "desc":"",
    "street":"",
    "thana":"",
    "dis":"",
    "div":"",
    "pic":"",
    "field":"",
    "pref_org":"",
    "pref_nat":"",
    "pref_sal":""
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
const GenderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
    ]
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
        image:"",
      errors: {},
        redirect:false,
        signinopen:false,
        pdfpath:"",
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChangeDropGen=this.handleChangeDropGen.bind(this);
    this.handleChangeDropDiv=this.handleChangeDropDiv.bind(this);
    this.handleChangeDropNat=this.handleChangeDropNat.bind(this);
    this.handleChangeDropOrg=this.handleChangeDropOrg.bind(this);
    this.handleChangeDropField=this.handleChangeDropField.bind(this);
    this.handleChangeImage=this.handleChangeImage.bind(this);
  }
componentDidMount() {
        console.log("mount hoise")
        //var  referenc=ref(storage,"pdfs/temp.pdf/")
        //referenc.getDownloadURL().then(url=>{
        //console.log(url);
    // storage.ref('pdfs').child('temp.pdf').getDownloadURL().then(
    //     url=>{
    //         console.log(url);
    //     }
    // )

    }
    handleChangeImage(event) {

        if(event.target.files[0]) {
            console.log("resumeeeeeeee")
              var path='images/'+event.target.files[0].name;
              var link_to_image="";
              storage.ref(path).put(
                  event.target.files[0]
              ).then(snap => {
                      storage.ref(path).getDownloadURL().then(url => {
                          console.log(url);
                          link_to_image=url;

                      this.setState({
                       image:link_to_image,
                })

                      })

                  }
              )
          }


    }
handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
  handleChangeDropGen = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["gen"]=event.value;
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
  handleChangeDropNat = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["pref_nat"]=event.value;
        this.setState({
      input
    });

  }
  handleChangeDropOrg = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["pref_org"]=event.value;
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

  onFocusHandle(event) {
        event.target.type='date';
  }
  onBlurHandle(event) {
        event.target.type='text';
  }
  handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }
      handleClickNotnow() {
       window.location.href="/"
      }
      handleClickYes() {
        window.location.href="/register2"
      }
  handleSubmit(event) {
    event.preventDefault();
    console.log("geree");

    if(this.validate()){

        console.log(this.state);
        if(this.state.input["name"]) {
            jsonData.name=this.state.input["name"];
        }
        if(this.state.input["email"]) {
            jsonData.email = this.state.input["email"];
        }
        jsonData.password=this.state.input["password"];
        jsonData.dob=this.state.input["dob"];
        if(this.state.input["gen"]) {
            jsonData.gender = this.state.input["gen"];
        }
        jsonData.mob=this.state.input["mob"];
        jsonData.nid=this.state.input["nid"];
        jsonData.nat=this.state.input["nat"];
        if(this.state.input["father"]) {
            jsonData.father = this.state.input["father"];
        }
        if(this.state.input["mother"]) {
            jsonData.mother = this.state.input["mother"];
        }
        if(this.state.input["about"]) {
            jsonData.desc = this.state.input["about"];
        }
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
        jsonData.field=this.state.input["field"];
        if(this.state.input["pref_org"]) {
            jsonData.pref_org = this.state.input["pref_org"];
        }
        if(this.state.input["pref_nat"]) {
            jsonData.pref_nat = this.state.input["pref_nat"];
        }
        if(this.state.input["pref_sal"]) {
            jsonData.pref_sal=this.state.input["pref_sal"];
        }
        if(this.state.image!=="") {
            jsonData.pic=this.state.image;
        }


        let input = {};

        this.setState({input:input});
        fetch('http://127.0.0.1:8000/first_module/jobseeker/adduser/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true});
    this.setState({signinopen: true});


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
          }}>Personal Information</p>
          <hr/>
        <form onSubmit={this.handleSubmit}>
         <div className="row" style={{
             marginBottom:5
         }}>
             <div className="col-sm-6">
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
             <div className="col-sm-6">
                 <div className="form-group">
                     <InputLabel for="dob">Date of Birth:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                     <input
                         type="text"
                         name="dob"

                         className="form-control"
                         placeholder="Enter Date of Birth"
                         onFocus={this.onFocusHandle}
                         onBlur={this.onBlurHandle}
                         onChange={this.handleChange}
                         id="dob" required/>


                 </div>
             </div>
         </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="gender">Gender:</InputLabel>
                <Select name="gender" id="gender" styles={dropDownStyle} options={GenderOptions} onChange={this.handleChangeDropGen} placeholder="Enter Gender" openMenuOnFocus isClearable />


                <div className="text-danger">{this.state.errors.email}</div>
            </div>
            </div>
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
                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
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
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="nid">NID number:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <input
                    type="number"
                    name="nid"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter NID Number"
                    id="nid" required />

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
                        <InputLabel htmlFor="nat">Nationality:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                        <input
                            type="text"
                            name="nat"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Your Nationality"
                            id="nat" required />

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="pic">Profile Picture:</InputLabel>
                        <input
                            type="file"
                            name="pic"
                            onChange={this.handleChangeImage}
                            accept=".png, .jpg, .jpeg"
                            className="form-control"
                            placeholder="Add a profile picture"
                            id="pic"/>
                    </div>
                </div>

            </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="father">Father's Name:</InputLabel>
                        <input
                            type="text"
                            name="father"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Father's Name:"
                            id="father"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="mother">Mother's Name:</InputLabel>
                        <input
                            type="text"
                            name="mother"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Mother's Name"
                            id="mother"/>
                    </div>
                </div>

            </div>


            <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="about">Self Description</InputLabel>
                        <textarea
                            name="about"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Yourself"
                            id="about"/>

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
            <p></p>
                <p style={{
              fontSize:18,
              fontWeight:"bold"
          }}>Professional Information</p>
          <hr/>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="field">Field of Work:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                <Select name="field" id="field" styles={dropDownStyle} options={CatOptions} onChange={this.handleChangeDropField} placeholder="Enter Your Current Field of Work" openMenuOnFocus isClearable />

            </div>
            </div>
            <div className="col-sm-6">

                <div className="form-group">
                <InputLabel for="pref_org">Preferred Organization:</InputLabel>
                <Select name="pref_org" id="pref_org" styles={dropDownStyle} options={OrgOptions} onChange={this.handleChangeDropOrg} placeholder="Enter Your Preferred Organization Type" openMenuOnFocus isClearable />

            </div>
                <div>


                    </div>
            </div>
                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="pref_nat">Preferred Job Nature:</InputLabel>
                <Select name="pref_nat" id="pref_nat" styles={dropDownStyle} options={NatureOptions} onChange={this.handleChangeDropNat} placeholder="Enter Your Preferred Job Nature" openMenuOnFocus isClearable />

            </div>
            </div>
            <div className="col-sm-6">
                   <div className="form-group">
                <InputLabel for="pref_sal">Preferred Salary:</InputLabel>
                <input
                    type="number"
                    name="pref_sal"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Your Expected Salary in BDT"
                    id="pref_sal"/>

            </div>

            </div>
                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <input type="submit" value="Proceed To Register" className="btn btn-success sub_btn" />
                </div>

        </form>
      </div>
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
                <Typography id="modal-modal-description" sx={{ mt: 2,color:"#ffffff",marginLeft:'30%' }}>
                    Add More Information?
                  </Typography>
                <button style={{marginTop:"10px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'10px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.handleClickYes}>Proceed</button>
                <button style={{marginTop:"10px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'30px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.handleClickNotnow}>Not Now</button>
            </div>

        </Box>
      </Modal>
    </div>
            <Foot margin_value={172}/>
            </React.Fragment>
    );
  }

}
export default Register;

// <input
//               tabIndex={-1}
//               autoComplete="off"
//               style={{ opacity: 0, height: 0 }}
//
//               required
//             />