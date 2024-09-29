import React, {Component} from "react";
import {Animated} from "react-animated-css";
import Sidebar from "./Sidebar";
import './Personal.css';
import {FiEdit2} from 'react-icons/fi';
import {FaArrowRight} from 'react-icons/fa';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import {MdFileDownloadDone} from 'react-icons/md';
import {HiExternalLink} from 'react-icons/hi';
import {BiLockAlt} from 'react-icons/bi';
import {TiTick} from "react-icons/ti";
import {BsCheck2} from "react-icons/bs";
import Navb from "./Navb";
import Foot from "./Foot";
import Loader from "./loader";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { StylesConfig }  from 'react-select';
import {Button, Collapse} from 'react-bootstrap'


// window.myGlobalSkill = ""; 
const dropDownStyle ={
    control: (base, state) => ({
    ...base,
        borderColor:'#000000',
        borderWidth:1,
        
        // position:'absolute',
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
        borderColor: state.isFocused ? '#000000' : '#000000'}
    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p:4,
    backdrop:false,
    paddingTop:'10px',
    paddingBottom:'10px',
    show:true,
      borderRadius:5,
      border:0,
      overflow: 'visible'
  };
  const styleField = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:100,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p:4,
    backdrop:false,
    paddingTop:'10px',
    paddingBottom:'10px',
    show:true,
      borderRadius:5,
      border:0,
      overflow: 'visible'
  };
const stylepref = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p:4,
    backdrop:false,
    paddingTop:'10px',
    paddingBottom:'10px',
    show:true,
      borderRadius:5,
      border:0,
      overflow: 'visible'
  };
  const CatOptions = [
    { value: 'Teaching', label: 'Teaching' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Security', label: 'Security' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Programming', label: 'Programming' },
  ]
  const SkillOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Django', label: 'Django' },
    { value: 'Java', label: 'Java' }
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

var jsonData = {
    "field":"",
}

var jsonDataSkill = {
    "user_id":"",
    "jobseeker_skill_id":"",
    "skill_id":"",
    "skill_name":"",
}
var jsonDataPref={
      "pref_job_ntr":"",
    "pref_org_type":"",
    "pref_sal":""
}
var jsonDataSkillEdit = {
    "skills":"",
    "currentSkills":"",
}

class Professional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            skills:[],
            logged_in_id:0,
            DetailsLoaded1:false,
            DetailsLoaded2:false,
            DetailsLoaded3:false,
            DetailsLoaded4:false,
            DetailsLoaded5:false,
            DetailsLoaded6:false,
            field_of_work:false,
            experience:false,
            skill:false,
            project:false,
            prefopen:false,
            pref_nat:{ value: '',label:'' },
            pref_org:{ value: '',label:'' },
            cat: { value: '',label:'' },
            selectedOption: { value: '',label:'' },
            selectedOptions:[],
            selectedOptions2:[],
            verify:[],

        };
        this.handleField=this.handleField.bind(this);
        this.handleFieldSubmit=this.handleFieldSubmit.bind(this);
        this.handlePrefSubmit=this.handlePrefSubmit.bind(this);
        this.handleExperience=this.handleExperience.bind(this);
        this.handleSkill=this.handleSkill.bind(this);

        this.handlePref=this.handlePref.bind(this);

        this.handleSubmitSkill=this.handleSubmitSkill.bind(this);
        this.handleChangeSkill=this.handleChangeSkill.bind(this);
        this.handleProject=this.handleProject.bind(this);
        this.handleLicense=this.handleLicense.bind(this);
        this.handlePublication=this.handlePublication.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleChangeOpenTo=this.handleChangeOpenTo.bind(this);

    }
    handler = (event) => {
        const value = event.value
        console.log(value)
        this.state.cat.value=value
        this.state.cat.label=value
        jsonData.field=value
    }

    handlerprefnat = (event) => {
    const value = event.value
    // console.log(value)
    this.state.pref_nat.value=value
    this.state.pref_nat.label=value
    jsonDataPref.pref_job_ntr=value
    }

    handlerpreforg = (event) => {
    const value = event.value
    // console.log(value)
    this.state.pref_org.value=value
    this.state.pref_org.label=value
    jsonDataPref.pref_org_type=value
    }

    handlerprefsal = (event) => {
    const value = event.target.value
    jsonDataPref.pref_sal=value
    }

    handleLicense(){
        window.location.href="/editlicense"
    }
    handlePublication(){
        window.location.href="/editpublication"
    }
    handleField(){
        this.setState({field_of_work: true})
        console.log(this.state.field_of_work);
    }
    handlePref(){
        this.setState({prefopen: true})
    }
    handleFieldSubmit(){
        console.log(this.state.items.user_id)
        fetch(`http://127.0.0.1:8000/first_module/jobseeker/${this.state.items.user_id}/`, {  // Enter your IP address here
        method: 'PUT',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
        window.location.href="/professional"
    }
    handlePrefSubmit(){
        fetch(`http://127.0.0.1:8000/first_module/jobseeker/${this.state.items.user_id}/`, {  // Enter your IP address here
        method: 'PUT',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonDataPref) // body data type must match "Content-Type" header
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
        window.location.href="/professional"
    }
    handleExperience(){
        window.location.href="/experienceEdit"

    }
    handleSkill(){
        this.setState({skill: true})
        // window.location.href="/editskill"
        console.log("size"+this.state.skills.length)
        let proj_dummy=[]
       
        for (let i=0;i<this.state.skills.length;i++) {
            let obj={
                "value":this.state.skills[i].skill_name,
                 "label":this.state.skills[i].skill_name
                }
                proj_dummy.push(obj);
                console.log(obj)
        }
        this.setState({
            selectedOptions:proj_dummy    
        })
        console.log(this.state.selectedOptions)
    }
    handleChangeSkill = (selectedOptions) => {
        console.log(selectedOptions)
        this.setState({ selectedOptions :selectedOptions })
     }
     handleChangeOpenTo = (selectedOptions) => {
        console.log(selectedOptions)
        this.setState({ selectedOptions_2:selectedOptions })
     }
    handleProject()
    {
        this.setState({project: true})
        window.location.href = "/editproject"


    }
    handleClose() {
        this.setState({field_of_work:false})
        this.setState({project: false})
        this.setState({skill: false})
        this.setState({prefopen: false})
    }
    handleSubmitSkill(event) {
        event.preventDefault();
        var str1="";
        var str2="";
        for (let i=0;i<this.state.selectedOptions.length;i++) {
            str1=str1+"#"+this.state.selectedOptions[i].value
        }
        for (let i=0;i<this.state.selectedOptions_2.length;i++) {
            str2=str2+"#"+this.state.selectedOptions_2[i].value
        }
        console.log(str1)
        jsonDataSkillEdit.skills=str1
        jsonDataSkillEdit.currentSkills=str2
        fetch('http://127.0.0.1:8000/first_module/uskill/editskill/', {  // Enter your IP address here

            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonDataSkillEdit) // body data type must match "Content-Type" header
        })
        window.location.href="/professional"

    }
    componentDidMount() {
        const id=1
        fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/get_id/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data,
                    DetailsLoaded1:true,

                });
                this.state.pref_nat.value=json.data.pref_job_ntr
                this.state.pref_nat.label=json.data.pref_job_ntr
                this.state.pref_org.value=json.data.pref_org_type
                this.state.pref_org.label=json.data.pref_org_type
                jsonDataPref.pref_job_ntr=json.data.pref_job_ntr
                jsonDataPref.pref_sal=json.data.pref_sal
                jsonDataPref.pref_org_type=json.data.pref_org_type
               console.log(this.state.pref_nat)
               console.log(json.data.pref_job_ntr)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/jobexp/addexp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exps: json.data,
                    DetailsLoaded2:true
                });
            // console.log(json)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/uskill/addskill")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    skills: json.data,
                    verifylist:json.verifylist.split("#"),
                    skill_ids:json.skill_ids,
                    DetailsLoaded3:true
                });
             console.log(json.verifylist.split("#"))
            //  console.log(json.skill_ids)
             this.state.verify=this.state.verifylist
            // console.log(this.state)
            })

        fetch(
            "http://127.0.0.1:8000/first_module/proj/get_proj")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    projects: json.data,
                    DetailsLoaded4:true
                });
            // console.log(json)
            // console.log(this.state)
            })
         fetch(
            "http://127.0.0.1:8000/first_module/pub/get_pub")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    pubs: json.data,
                    DetailsLoaded5:true
                });
            // console.log(json)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/lic/get_lic")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    lics: json.data,
                    DetailsLoaded6:true
                });
            // console.log(this.state)
            // console.log(this.state.items.user_id)

            })
        // fetch(
        //     "http://127.0.0.1:8000/first_module/assesment/checkpassorfail")

        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             assesment: json.data,
        //             DetailsLoaded7:true
        //         });
        //     console.log(json.data)
        //     console.log(this.state)
        //     })
        // fetch(
        //     "http://127.0.0.1:8000/first_module/cutoff/cutoffpercent")

        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             cutoff: json.data,
        //             DetailsLoaded7:true
        //         });
        //     console.log(json.data)
        //     console.log(this.state)
        //     })
           
    }


    To_Quiz(value) {
        localStorage.setItem("skill",JSON.stringify(value));
        jsonDataSkill.jobseeker_skill_id = value.jobseeker_skill_id
        jsonDataSkill.skill_id = value.skill_id
        jsonDataSkill.skill_name = value.skill_name
        jsonDataSkill.user_id = value.user_id
        console.log(value)
        fetch('http://127.0.0.1:8000/first_module/question/skillid/', {  // Enter your IP address here
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonDataSkill) // body data type must match "Content-Type" header
            })
        window.location.href="/quiz"
    }
    render() {
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded2 || !this.state.DetailsLoaded3 || !this.state.DetailsLoaded4 || !this.state.DetailsLoaded5 || !this.state.DetailsLoaded6) return <Loader/>
        return (
            <React.Fragment>
                <body>
                <Navb/>

                <Sidebar/>
                <div className="content">

                <div className="row" style={{
                    marginLeft:"-13.5%"
                }}> <h1>Professional Information:</h1></div>
                    <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                    <div>
               <div className="row_custom">

                    <div className="align">

                        <p><b className="seems-h1">Field of Work: </b>{this.state.items.field}</p>

                        <button className="icon_btn" onClick={this.handleField}><FiEdit2 size={'1.5em'} className="icon_edit"/></button>
                    </div>
                   </div>

                <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Job Experience:</h4>
                            <button className="icon_btn" onClick={this.handleExperience}><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                        <div className="container ">

                            <div className="row px-3" style={{
                                marginTop:-20
                            }}>

                                    <div className="border-left pt-2 pl-4 ml-2">
                                        {
                                            this.state.exps.map((exp) => {
                                            return(
                                                <div className="position-relative mb-4">
                                            <FaArrowRight size={'1.5em'} style={{color:'#29A335', marginLeft:-16, display:"inline"}}/>
                                            <b className="seems-h1" style={{marginLeft:20, display:"inline"}}>{exp.experience_name}</b>
                                            <p className="mb-2" style={{marginLeft:30,}}>{exp.organization_name} | <small>{exp.from_year} - {exp.to_year}</small></p>
                                            <p style={{marginLeft:30,}}>{exp.description}</p>

                                        </div>
                                            )})
                                         }

                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Skills:</h4>
                            <button className="icon_btn" onClick={this.handleSkill}><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                        <ol className="gradient-list" >
                            {
                                            this.state.skills.map((skill,i) => {
                                            if(this.state.verifylist[i] === "0")
                                            {
                                            return(
                                                <li>
                                                    <b style={{
                                                            fontSize:"large",
                                                            color:"darkorange"
                                                        }}>{skill.skill_name}
                                                    </b>
                                                    <button className="custom_btn2" onClick={()=>{this.To_Quiz(skill)}}>Take Skill Quiz</button>
                                                </li>
                                            )}
                                            if(this.state.verifylist[i] === "1"){
                                            return(
                                                <li>
                                                    <b style={{
                                                            fontSize:"large",
                                                            color:"darkorange"
                                                        }}>{skill.skill_name}
                                                    </b>
                                                    <button style={{backgroundColor:"#F7FFFF", float: "right",marginTop:"-12px",border: "none"}} disabled>< BsCheck2 size={'3em'} color="green" fontWeight="bold"/> </button>
                                                     
                                                </li>
                                            )}

                                        })
                                           
                                            
                                            
                                            
                             }



                        </ol>
                    </div>
                    </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Projects:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit" onClick={this.handleProject}/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="projectlist">
                        {
                            this.state.projects.map((proj) => {
                                return(
                                <li><b className="seems-h1"> {proj.project_name}</b>
                                    <br/><small>{proj.language}</small>
                                    <br/><br/>
                                    <p>{proj.project_short_desc}</p>

                                    <HiExternalLink size={'1.5em'}/><a href={proj.project_link}
                                                                       style={{
                                                                           marginLeft: 2
                                                                       }}>Visit Project Repository</a>
                                </li>
                                )})
                            }

                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Publications:</h4>
                            <button className="icon_btn" onClick={this.handlePublication}><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="publist">
                        {
                             this.state.pubs.map((pub) => {
                                return(
                            <li>
                                <HiExternalLink size={'1.5em'}/><a href={pub.publication_link}
                                                                   style={{
                                                                       marginLeft: 2
                                                                   }}>{pub.publication_name}</a> , {pub.venue}, {pub.publication_year}
                            </li>
                                    )})
                        }


                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Licenses and Certificates:</h4>
                            <button className="icon_btn" onClick={this.handleLicense}><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="publist">
                        {
                            this.state.lics.map((lic) => {
                                return(
                            <li><b className="seems-h1">{lic.lic_name}</b>
                                <a href={lic.lic_link} className="cred_tag" target="_blank">View Credential</a>
                                <p><small>{lic.lic_org}</small></p></li>
                                    )})
                        }

                    </ul>
                     </AnimationOnScroll>
                        <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Personal Preferences:</h4>
                            <button className="icon_btn" onClick={this.handlePref}><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                            <p>Private to you <BiLockAlt size={'1.2em'} style={{
                                marginTop:-3
                            }}/></p>
                    </div>
                    </div>
                        <div className="row_custom">

                        <div className="prof_div_bg ">
                            <div className="row">
                                <div className="col-sm-12">
                            <b className= "seems-h1">Currently Open To</b><p>
                                    {
                                        this.state.skills.map((skill) => {
                                            if (skill.isOpenToWork)
                                            return(
                                                <div className="round1"><b>{skill.skill_name}</b></div>

                                            )})
                                    }

                                </p>
                        </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Salary</b><p>
                                    {this.state.items.pref_sal}
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Job Nature</b><p>
                                    {this.state.items.pref_job_ntr}
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Organization Type</b><p>
                                    {this.state.items.pref_org_type}
                                    </p>
                                </div>
                            </div>
                        </div>
                            </div>
        </div>
        </Animated>
        </div>

        <Modal
        open={this.state.field_of_work}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}} 
      >
        <Box sx={styleField}>
            <div className='row' >
                 <div className='col-md-9' style={{width: "80%", paddingRight:"12px"}}>
                    <InputLabel id="demo-simple-select-label">Field of work</InputLabel>
                    <Select styles={dropDownStyle} options={CatOptions}   onChange={this.handler} isClearable  />
                </div>
                <div>
                    <button className='btn btn-success' onClick={this.handleFieldSubmit} style={{marginTop:"-38px",width:"20%",marginRight:"-2px"}} >Submit</button>         

                </div>

            </div> 
        </Box>
        </Modal> 

        <Modal
        open={this.state.skill}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}} 
      >
        <Box sx={style}>
            <div className='row' >
                 <div className='col-md-12' style={{width: "100%", paddingRight:"12px"}}>
                    <InputLabel id="demo-simple-select-label">Skills</InputLabel>
                    <Select name="skills" id="skills" styles={dropDownStyle} value={this.state.selectedOptions} options={SkillOptions} onChange={this.handleChangeSkill} isMulti placeholder="Add Your Skills" openMenuOnFocus isClearable />
                </div>
                <div className='col-md-12' style={{width: "100%", paddingRight:"12px"}}>
                    <InputLabel id="demo-simple-select-label">Current Skills</InputLabel>
                    <Select name="open_skills" id="open_skills" styles={dropDownStyle}  options={this.state.selectedOptions} onChange={this.handleChangeOpenTo} isMulti placeholder="Add Your Skills" openMenuOnFocus isClearable />
                </div>
            </div> 
            <div>
                <button className='btn btn-success' onClick={this.handleSubmitSkill}  style={{marginTop:"5px",width:"20%",marginRight:"-2px"}} >Submit</button>         
            </div>
        </Box>
        </Modal>




        <div>
          <Modal
            open={this.state.prefopen}
            //   open={true}
            onClose={this.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{background:"rgba(0,0,0,0)"}}
          >
            <Box sx={stylepref}>
                    <div className="row" style={{marginBottom:"10px" }}>
                        <p className="seems-h1_reg" style={{marginBottom:"10px" }}><b> Personal Preferences </b></p>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}  for="name">Preferred Salary:</InputLabel>
                                <input type="text"  name="name" className="form-control" id="name" defaultValue={this.state.items.pref_sal} onChange={this.handlerprefsal} style={{borderColor:"black"}}/>
                            </div>
                        </div>
                    </div>

                <div className='row' style={{marginBottom:"10px" }}>
                 <div className='col-sm-6' style={{}}>
                    <InputLabel id="demo-simple-select-label" style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}>Preferred Job Nature:</InputLabel>
                    <Select styles={dropDownStyle} options={NatureOptions} value={this.state.pref_nat}  onChange={this.handlerprefnat} isClearable  />
                </div>
                    <div className='col-sm-6' style={{}}>
                    <InputLabel id="demo-simple-select-label" style={{color:"black" ,fontWeight:"Bold", fontSize:"15px" }}>Preferred Organization Type:</InputLabel>
                    <Select styles={dropDownStyle} options={OrgOptions} value={this.state.pref_org}  onChange={this.handlerpreforg} isClearable  />
                </div>
            </div>
                    <button className='btn btn-success' style={{marginTop:"5px",width:"20%",marginRight:"-2px",marginBottom:"10px"}} onClick={this.handlePrefSubmit}>Submit</button>

            </Box>

          </Modal>
        </div>
        
        <Foot margin_value={172}/>

        </body>
        </React.Fragment>
        )
    }
}
export default Professional;
// <li><b style={{
//                                 fontSize:"large",
//                                 color:"orangered"
//                             }}>C++</b><button className="custom_btn2">Take Skill Quiz</button></li>
//                             <li><b style={{fontSize:"large", color:"blueviolet"}}>ReactJS</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"purple"}}>Django</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"darkorange"}}>Java</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
