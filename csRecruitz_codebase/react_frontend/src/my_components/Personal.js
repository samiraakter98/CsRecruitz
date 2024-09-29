import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
import pic from './images/pp.JPG'
import TypeAnimation from 'react-type-animation';

import {storage} from './Firebase.js';
import Sidebar from "./Sidebar";
import Navb from "./Navb";
import Foot from "./Foot";
import Loader from "./loader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";
import { fontSize } from "@mui/system";

var typestring="abcd"
var typestring1=""
var typestring2=""
var typestring3=""

var jsonData = {
    "name":"",
    "age":"",
    "father_name":"",
    "mother_name":"",
    "date_of_birth":"",
    "gender":"",
    "nationality":"",
    "nid_number":"",
    "mobile":"",
    "email":"",
    "street":"",
    "thana":"",
    "district":"",
    "division":"",
    "self_desc":"",
    "iamge":"",

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

class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded:false,
            editopen:false,
            input:{},
            id:-1,
            DataisLoaded2:false,
            DataisLoaded3:false,
            image_loaded:false,
            datas:[],
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
    }
    componentDidMount() {

        fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/get_id/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {

                    this.setState({items: json.data,
                                    DataisLoaded: true
                                })
                    // console.log(this.state)
                    console.log(json.data.self_desc);
                    const desc = json.data.self_desc
                    var splitid
                    if(desc!==null) {
                        splitid = desc.split(".")

                        typestring1 = splitid[0]
                        typestring2 = splitid[1]
                        typestring3 = splitid[2]
                    }
                    this.setState({DataisLoaded3: true})
                    // console.log(json.response);
                    
                })
           ;
        // storage.ref("images/nakshi.jpg").getDownloadURL().then(url=>{
        //   console.log(url);
        //   this.setState({iamge:url});
        //   this.setState({image_loaded:true});
        // })
            // console.log(this.state.id)
        // fetch(
        //     "http://127.0.0.1:8000/first_module/jobseeker/1/")

        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             items: json,
        //             DataisLoaded2: true
        //         });
        //         console.log(this.state)
        //     })
    
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
    handleSubmitEdit(event) {
        event.preventDefault();
        console.log("geree");
        console.log(this.state);
        if (typeof this.state.input["name"] !== "undefined")  {
            jsonData.name=this.state.input["name"];
        }
        else{jsonData.name= this.state.items.name;}
        if (typeof this.state.input["age"] !== "undefined")  {
            jsonData.age=this.state.input["age"];
        }
        else{jsonData.age= this.state.items.age;}
        if (typeof this.state.input["father_name"] !== "undefined")  {
            jsonData.father_name=this.state.input["father_name"];
        }
        else{jsonData.father_name= this.state.items.father_name;}

        if (typeof this.state.input["mother_name"] !== "undefined")  {
            jsonData.mother_name=this.state.input["mother_name"];
        }
        else{jsonData.mother_name= this.state.items.mother_name;}

        if (typeof this.state.input["date_of_birth"] !== "undefined")  {
            jsonData.date_of_birth=this.state.input["date_of_birth"];
        }
        else{jsonData.date_of_birth= this.state.items.date_of_birth;}

        if (typeof this.state.input["gender"] !== "undefined")  {
            jsonData.gender=this.state.input["gender"];
        }
        else{jsonData.gender= this.state.items.gender;}

        if (typeof this.state.input["nationality"] !== "undefined")  {
            jsonData.nationality=this.state.input["nationality"];
        }
        else{jsonData.nationality= this.state.items.nationality;}

        if (typeof this.state.input["nid_number"] !== "undefined")  {
            jsonData.nid=this.state.input["nid_number"];
        }
        else{jsonData.nid_number= this.state.items.nid_number;}

        if (typeof this.state.input["mobile"] !== "undefined")  {
            jsonData.mobile=this.state.input["mobile"];
        }
        else{jsonData.mobile= this.state.items.mobile;}

        if (typeof this.state.input["email"] !== "undefined")  {
            jsonData.email=this.state.input["email"];
        }
        else{jsonData.email= this.state.items.email;}

        if (typeof this.state.input["street"] !== "undefined")  {
            jsonData.street=this.state.input["street"];
        }
        else{jsonData.street= this.state.items.street;}

        if (typeof this.state.input["thana"] !== "undefined")  {
            jsonData.thana=this.state.input["thana"];
        }
        else{jsonData.thana= this.state.items.thana;}

        if (typeof this.state.input["district"] !== "undefined")  {
            jsonData.district=this.state.input["district"];
        }
        else{jsonData.district= this.state.items.district;}

        if (typeof this.state.input["division"] !== "undefined")  {
            jsonData.division=this.state.input["division"];
        }
        else{jsonData.division= this.state.items.division;}

        if (typeof this.state.input["self_desc"] !== "undefined")  {
            jsonData.aboutme=this.state.input["self_desc"];
        }
        else{jsonData.self_desc= this.state.items.self_desc;}

        console.log(jsonData);
        let input = {};

        this.setState({input:input});
        fetch('http://127.0.0.1:8000/first_module/jobseeker/1/', {  // Enter your IP address here
        method: 'PUT',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
        // this.setState({'redirect':true})
        // alert('Demo Form is submited');
        window.location.href="/dashboard"
   }
      
   render() {
    const { DataisLoaded, items } = this.state;
    if (!this.state.DataisLoaded || !this.state.DataisLoaded3) return <Loader/>
    return (
        <React.Fragment>
        <body>
       <Navb/>

        <Sidebar/>
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
            // sequence={[`${typestring}`,3000,'Research and Development Engineer', 3000, 'Skilled in Cpp, Java and more ',3000,'10 years of work experience',3000,'']}
            sequence={[`${typestring1}`,3000,`${typestring2}`, 3000,`${typestring3}`,3000,'']}
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
                        <b className= "seems-h1">Father's Name</b>
                        
                                <p>{items.father_name}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Mother's Name: </b>
                        
                                <p>{items.mother_name}</p>
                            
                    </div>
                    <div className="col-sm-6">
                       <b className= "seems-h1">Date of Birth: </b>
                       
                                <p>{items.date_of_birth}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Gender</b>
                        
                                <p>Female</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">Nationality</b>
                        
                                <p>{items.nationality}</p>
                            
                    </div>
                    <div className="col-sm-6">
                        <b className= "seems-h1">NID number</b>
                        
                                <p>{items.nid_number}</p>
                            
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

            <div className="row">
                <div className="row_custom">
            <button className="custom_btn" onClick={this.handleClick}><AiFillEdit/> Edit Information</button>
                </div>

        </div>

        </div>
            </Animated>
        </div>
        <div>
      <Modal
        open={this.state.editopen}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            {/* <p className="seems-h1_reg"><b> Change Your Information</b></p> */}
                <div className="row">
                    <p className="seems-h1_reg" style={{marginBottom:"5px" }}><b> Personal Information </b></p>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="name">Name:</InputLabel>
                            <input type="text"  name="name" className="form-control"  defaultValue={items.name} onChange={this.handleChange} id="name"/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="age">Age:</InputLabel>
                            <input type="text"  name="age" className="form-control" defaultValue={items.age} onChange={this.handleChange} id="age" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="father_name">Father's name:</InputLabel>
                            <input type="text"  name="father_name" className="form-control"  defaultValue={items.father_name} onChange={this.handleChange} id="fathername" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="mother_name">Mother's name:</InputLabel>
                            <input type="text"  name="mother_name" className="form-control"  defaultValue={items.mother_name} onChange={this.handleChange} id="mothername" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="date_of_birth">Date of Birth:</InputLabel>
                            <input type="text"  name="date_of_birth" className="form-control"  defaultValue={items.date_of_birth} onChange={this.handleChange} id="dob" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="gender">Gender:</InputLabel>
                            <input type="text"  name="gender" className="form-control"  defaultValue={items.gender} onChange={this.handleChange} id="gender" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="nationality">Nationality:</InputLabel>
                            <input type="text"  name="nationality" className="form-control"  defaultValue={items.nationality} onChange={this.handleChange} id="nationality" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="nid">NID number:</InputLabel>
                            <input type="text"  name="nid_number" className="form-control"  defaultValue={items.nid_number} onChange={this.handleChange} id="nid" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="mobile">Mobile number:</InputLabel>
                            <input type="text"  name="mobile" className="form-control"  defaultValue={items.mobile} onChange={this.handleChange} id="mobile" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px"}}  for="email">Email:</InputLabel>
                            <input type="text"  name="email" className="form-control"  defaultValue={items.email} onChange={this.handleChange} id="email" />
                        </div>
                    </div>
                </div>
                <p className="seems-h1_reg" style={{marginBottom:"5px" }}><b> Address Information </b></p>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="street">Street:</InputLabel>
                            <input type="text"  name="street" className="form-control"  defaultValue={items.street} onChange={this.handleChange} id="street" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="thana">Thana:</InputLabel>
                            <input type="text"  name="thana" className="form-control"  defaultValue={items.thana} onChange={this.handleChange} id="thana" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="district">District:</InputLabel>
                            <input type="text"  name="district" className="form-control"  defaultValue={items.district} onChange={this.handleChange} id="district" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="division">Division:</InputLabel>
                            <input type="text"  name="division" className="form-control"  defaultValue={items.division} onChange={this.handleChange} id="division"/>
                        </div>
                    </div>
                </div>
                <p className="seems-h1_reg" style={{marginBottom:"5px" }} ><b> About me </b></p>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">

                            <textarea style={{width:"100%", height:"80px",boxSizing:"border-box",borderRadius:"4px", borderColor:"#ccc"}}  rows = "5" cols = "60" name = "self_desc"  onChange={this.handleChange} >
                                {items.self_desc}
                            </textarea>
                        </div>
                    </div>
                </div>
                <button className='btn btn-success' style={{marginTop:"5px",width:"20%",marginRight:"-2px"}} onClick={this.handleSubmitEdit}>Submit</button>

        </Box>

      </Modal>
    </div>


    <Foot margin_value={172}/>

    </body>
        </React.Fragment>
    )
}
}

export default Personal;

//gender,mobile number,street database a dhukate hbe
// image thikmoto ante hbe