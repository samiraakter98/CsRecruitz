import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import {storage} from "./Firebase";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Loader from "./loader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TypeAnimation from "react-type-animation";
var jsonData = {
    "j_edu": "",
    "j_step": "3",
    "j_add": "",
    "j_apply": "",

}

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
class Job_3 extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            numDivs: 0,
            numDivs_2:0,
            tot_certis:"",
            DetailsLoaded4:false,
        };
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeFile=this.handleChangeFile.bind(this);
    }


      handleSubmit(event) {
          event.preventDefault();
          var str1=this.state.input["edu"];
          var str2="";
          if(this.state.input["add"]) {
              str2=this.state.input["add"];
          }
          var str3="";
          if(this.state.input["apply"]) {
              str3=this.state.input["apply"];
          }

          jsonData.j_edu=str1;
          jsonData.j_add=str2;
          jsonData.j_apply=str3;



          fetch('http://127.0.0.1:8000/jobpost/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          this.setState({signinopen: true});
      }
      handleChange(event) {

    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
  handleChangeFile(event) {
        let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.files[0];
    this.setState({
      input
    });
        //console.log(event.target.files)
  }
  handleClickYes() {
        window.location.href="/emp"
      }
  handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }
    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li >Step 1</li>
                    <li>Step 2</li>
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Step 3</b></li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Create A New Job Post</b></p>
                <hr/>

                 <form onSubmit={this.handleSubmit}>
                             <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Educational Requirements:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                        <textarea
                            name="edu"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Educational Requirements"
                            id="job_res" required/>

                  </div>
                </div>
                     <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Additional Requirements:</InputLabel>
                        <textarea
                            name="add"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Additional Requirements"
                            id="job_res"/>

                  </div>
                </div>
                     <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Application Process:</InputLabel>
                        <textarea
                            name="apply"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Application Process"
                            id="job_res"/>

                  </div>
                </div>

                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >

                       <input type="submit" value="Finish" className="btn btn-success sub_btn_job1" />
                </div>

        </form>
            </div>
            </Animated>
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
                sequence={['Your Post Has Been Uploaded', 2000,'']}
                wrapper="h6"
                repeat={Infinity}

            />
                </div>

            <div style={{height:'auto',marginTop:"50px",background:"green",marginLeft:"-33px",marginRight:'-33px',marginBottom:'-43px',paddingLeft:'20px',paddingTop:'3px',paddingBottom:'12px',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>

                <button style={{marginTop:"30px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'30px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.handleClickYes}>Back To Home</button>

            </div>

        </Box>
      </Modal>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Job_3;