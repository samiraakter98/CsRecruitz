import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
import pic from './images/pp.JPG'
import TypeAnimation from 'react-type-animation';


import Sidebar from "./Sidebar";
import Nab_emp from "./Nab_emp.js";
import Foot from "./Foot";
import Loader from "./loader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";
import { fontSize } from "@mui/system";


var jsonData = {
    "app_id":"",
  }

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:4,
  backdrop:false,
  paddingTop:'10px',
  paddingBottom:'10px',
  show:true,
    borderRadius:5,
    border:0,
    overflow:'hidden'
};

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded:false,
            editopen:false,
            input:{},
            id:"",
            app_id:"",
            path_to_prof:"",
            DataisLoaded2:false,
            datas:[],
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    componentDidMount() {

        console.log(window.location.href)
        const url = window.location.href
        const splitid = url.split("?")
        const id = splitid[1]
        this.setState({app_id:id})
        // console.log(id)
        jsonData.app_id = id

        fetch('http://127.0.0.1:8000/first_module/apply/get_app_info_emp/', {  // Enter your IP address here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        fetch(
            "http://127.0.0.1:8000/first_module/apply/get_app_info_emp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({

                    items: json.user,
                    id:json.user.user_id,
                    DataisLoaded2: true,

                });

            })
        // this.setState({"id":this.state.items.user_id});
        console.log(this.state.id)



    }
    handleClick() {
        this.setState({editopen: true})
   }
    handleClose() {
      this.setState({editopen:false})
    }
    handleChange(event) {
        let input = this.state.input;
        console.log(event.target.value);
        input[event.target.name] = event.target.value;
        this.setState({input});
      }
  
   render() {
    const { DataisLoaded, items } = this.state;
    if (!this.state.DataisLoaded2) return <Loader/>
    return (
        <React.Fragment>
        <body>
       <Nab_emp/>

       <div className="sidebar">
            <a className={this.pathaname==='/userprofile'?"active":""}  >Personal Information</a>
            <a className={this.pathaname==='/userprofessional'?"active":""} href={"/userprofessional?"+this.state.id+"?"+this.state.app_id} >Professional Information</a>


        </div>

        <div className="content">
            <div className="row_custom">
                <div className="personal_div_bg2">
            <div className="row" style={{
                display:"flex",
                flexFlow:"row"
            }}>
            
                    <img  src={items.propic} alt="Profile Pic" style={{
                        height:120,
                        width:140,
                        borderRadius:"50%"
                    }}/>
               

                <div style ={{
                display:"inline-block",
                    marginTop:30
                }}>
                
                    <p style={{
                        fontSize:24
                    }}><b>{items.name}</b></p>
                    
            <TypeAnimation
            cursor={true}
            sequence={['Research and Development Engineer', 3000, 'Skilled in Cpp, Java and more ',3000,'10 years of work experience',3000,'']}
            wrapper="h6"
            repeat={Infinity}/>
            </div>
            </div>
                </div>
                </div>
            <div className="row_custom"> <h3>About Me:</h3></div>

            <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
            <div>
            <div className="row_custom ">

            <div className="personal_div_bg ">
                
                <p>{items.self_desc}</p>
                    
            </div>


                <div className="row" style={{
                    marginTop:20
                }}>
                    <h3>Personal Information:</h3></div>

                </div>
             <div className="row_custom ">
                 <div className="personal_div_bg ">
              <div className="row">
                    <div className="col-sm-6">
                        <b className= "seems-h1">Name</b>
                        
                                <p>{items.name}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Age</b>
                        
                                <p>{items.age} years</p>
                            
                    </div>
                    
                <div className="col-sm-6">
                        <b className= "seems-h1">Mobile number</b>
                        
                                <p>01878046439</p>
                            

                    </div>
                <div className="col-sm-6">
                        <b className= "seems-h1">Email Address</b>
                        
                                <p>{items.email}</p>
                           
                    </div>
                </div>
            </div>
                 </div>
            <div className="row_custom ">
            <div className="row">
                <h4>Address Information:</h4>
            </div>
            </div>
            <div className="row_custom ">
                <div className="personal_div_bg ">
            <div className="row">
                    <div className="col-sm-6">
                        <b className= "seems-h1">Street/Road</b>
                        
                                <p>Kadirganj Rd</p>
                           
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Thana</b>
                        
                                <p>{items.thana}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">District</b>
                        
                                <p>{items.district}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Division</b>
                        
                                <p>{items.division}</p>
                            
                    </div>
            </div>
            </div>
            </div>

            <div className="row" style={{marginBottom:50}}>
                {/* <div className="row_custom">
            <button className="custom_btn" onClick={this.handleClick}><AiFillEdit/> Edit Information</button>
                </div> */}

        </div>

        </div>
            </Animated>
        </div>
    <Foot margin_value={172}/>

    </body>
        </React.Fragment>
    )
}
}

export default UserProfile;

//gender,mobile number,street database a dhukate hbe
// image thikmoto ante hbe