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

import Nab_emp from "./Nab_emp.js";
import Foot from "./Foot";
import Loader from "./loader";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { StylesConfig }  from 'react-select';
import {Button, Collapse} from 'react-bootstrap'
import TypeAnimation from "react-type-animation";
import {BsCheck2} from "react-icons/bs";

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
var jsonData = {
    "id":""
}

class UserProfessional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            skills:[],
            logged_in_id:0,
            ret_id:"",
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
            cat: { value: '',label:'' },
            selectedOption: { value: '',label:'' },
            selectedOptions:[],

        };
       

    }
    handler = (event) => {
        const value = event.value
        console.log(value)
        this.state.cat.value=value
        this.state.cat.label=value
        jsonData.field=value
    }
    componentDidMount() {
        //const id=1
        console.log(window.location.href)
        const url = window.location.href
        const splitid = url.split("?")
        const id = splitid[1]
        const ret_id=splitid[2]
        this.setState({ret_id:ret_id})
        // fetch(
        //     "http://127.0.0.1:8000/first_module/jobseeker/get_id/")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             items: json.data,
        //             DetailsLoaded1:true
        //         });
        //     console.log(json)
        //     // console.log(this.state)
        //     })
        // fetch(
        //     "http://127.0.0.1:8000/first_module/jobexp/get_info_user_emp/")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             exps: json.data,
        //             DetailsLoaded2:true
        //         });
        //     // console.log(json)
        //     // console.log(this.state)
        //     })
        jsonData.id=id
        fetch('http://127.0.0.1:8000/first_module/jobexp/get_info_user_emp/', {  // Enter your IP address here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        fetch(
            "http://127.0.0.1:8000/first_module/jobexp/get_info_user_emp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exps: json.data,
                    projects:json.projects,
                    pubs:json.pubs,
                    lics:json.lics,
                    items:json.items,
                    skills: json.skills,
                    verifylist:json.verifylist.split("#"),
                    DetailsLoaded2:true
                });
             console.log(json)
            // console.log(this.state)
            })
        // fetch(
        //     "http://127.0.0.1:8000/first_module/uskill/addskill")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             skills: json.data,
        //             DetailsLoaded3:true
        //         });
        //      console.log(json)
        //     // console.log(this.state)
        //     })
        //
        // fetch(
        //     "http://127.0.0.1:8000/first_module/proj/get_proj")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             projects: json.data,
        //             DetailsLoaded4:true
        //         });
        //     // console.log(json)
        //     // console.log(this.state)
        //     })
        //  fetch(
        //     "http://127.0.0.1:8000/first_module/pub/get_pub")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             pubs: json.data,
        //             DetailsLoaded5:true
        //         });
        //     // console.log(json)
        //     // console.log(this.state)
        //     })
        // fetch(
        //     "http://127.0.0.1:8000/first_module/lic/get_lic")
        //
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             lics: json.data,
        //             DetailsLoaded6:true
        //         });
        //     // console.log(json)
        //     console.log(this.state)
        //     //  this.setState({logged_in_id:this.items.user_id})
        //     console.log(this.state.items.user_id)
        //
        //     })
           
    }

    render() {
        if (!this.state.DetailsLoaded2) return <Loader/>
        return (
            <React.Fragment>
                <body>
                <Nab_emp/>

                <div className="sidebar">
                    <a className={this.pathaname==='/userprofile'?"active":""} href={"/userprofile?"+this.state.ret_id} >Personal Information</a>
                    <a className={this.pathaname==='/userprofessional'?"active":""}  >Professional Information</a>
            </div>
                <div className="content">


                    <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                        <div className="row_custom">
                <div className="personal_div_bg2">
            <div className="row" style={{
                display:"flex",
                flexFlow:"row"
            }}>

                    <img  src={this.state.items[0].propic} alt="Profile Pic" style={{
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
                    }}><b>{this.state.items[0].name}</b></p>

            <TypeAnimation
            cursor={true}
            sequence={['Research and Development Engineer', 3000, 'Skilled in Cpp, Java and more ',3000,'10 years of work experience',3000,'']}
            wrapper="h6"
            repeat={Infinity}/>
            </div>
            </div>
                </div>
                </div>
                        <div className="row" style={{
                    marginLeft:"-13.5%"
                }}> <h3 style={{
                    marginLeft:155,
                    marginTop:10
                        }}>Professional Information:</h3></div>
                    <div>
               <div className="row_custom">
                    <div className="align">
                        <p><b className="seems-h1">Field of Work: </b>{this.state.items[0].field}</p>
                    </div>
                   </div>

                <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Job Experience:</h4>
                        </div>
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
                            </div>
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
                            </div>
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
                            </div>
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
                            </div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="publist" style={{marginBottom:80}}>
                        {
                            this.state.lics.map((lic) => {
                                return(
                            <li><b className="seems-h1">{lic.lic_name}</b>
                                <button className="custom_btn2">View Credential</button>
                                <p><small>{lic.lic_org}</small></p></li>
                                    )})
                        }

                    </ul>
                     </AnimationOnScroll>
                        
                    
        </div>
        </Animated>
        </div>

        
        <Foot margin_value={172}/>

        </body>
        </React.Fragment>
        )
    }
}
export default UserProfessional;
// <li><b style={{
//                                 fontSize:"large",
//                                 color:"orangered"
//                             }}>C++</b><button className="custom_btn2">Take Skill Quiz</button></li>
//                             <li><b style={{fontSize:"large", color:"blueviolet"}}>ReactJS</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"purple"}}>Django</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"darkorange"}}>Java</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
