
import React, {Component, useState} from 'react'
import Tag from "./Tag.js"

import {Animated} from "react-animated-css";
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import vacancy from './images/vacancy.png'
import company from './images/company.png'
import newjob from './images/newjob.png'
import briefcaselogo from './images/briefcase.svg'
import InputLabel from '@mui/material/InputLabel';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Select, { StylesConfig }  from 'react-select'

import {HiLocationMarker} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';

import Navb from "./Navb";
import Foot from "./Foot";
import {Navigate} from "react-router-dom";
import Button from "./Button";
import Ripple from "./Ripple";
import CountUp from "react-countup";
import AnimatedNumbers from "react-animated-numbers";
import Loader from "./loader";


const dropDownStyle ={
    control: (base, state) => ({
    ...base,
        borderColor:'#000000',
        borderWidth:1,
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

const options = [
    { value: 'devops', label: 'devops' },
    { value: 'react', label: 'react' },
    { value: 'software engineer', label: 'software engineer' }
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

var jsonData = {
    "category":"",
    "organization":"",
    "location":"",
    "keyword":"",
    "nature":"",
    "redir_from_home":"true",
    "filtername":"",
    "sortoption":"",
    "asc":"",
  }





export class Home extends Component {

    state={
        cat: { value: 'Category', label: 'Select Category' },
        keyword:"keyword",
        org :{ value:'Organization',label:'Select Org Type'},
        loc :{ value:'Location',label:'Select Location'},
        nature:{ value:'Job Nature',label:'Select Job Nature'},
        redirect:false,
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        recos:[],
        datas:[],
        redirectReco:false,
        navlink:"/jobdetails",
    };

    constructor(props) {
    super(props);

    this.handleClick=this.handleClick.bind(this);
    this.handleClickNew=this.handleClickNew.bind(this);
    this.handleClickReco=this.handleClickReco.bind(this);
  }



    
  handler = (event) => {
      const value = event.value
      console.log(value)
      this.state.cat.value=value
      this.state.cat.label=value
      jsonData.category=value
    }

     handlerorg = (event) => {
      const value = event.value
      console.log(value)
      this.state.org.value=value
      this.state.org.label=value
      jsonData.organization=value
    }

     handlerloc = (event) => {
      const value = event.value
      console.log(value)
      this.state.loc.value=value
      this.state.loc.label=value
      jsonData.location=value
    }

    handlernature = (event) => {
      const value = event.value
      console.log(value)
      this.state.nature.value=value
      this.state.nature.label=value
      jsonData.nature=value
    }

    handlerkeyword= (event) => {
      const value = event.target.value
      console.log(value)
      this.state.keyword=value

      jsonData.keyword=value
    }
componentDidMount() {
        console.log("mount hoise")
         fetch(
"http://127.0.0.1:8000/first_module/jobseeker/get_info/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({DetailsLoaded3: true})
                if(json.response ==="No") {
                    this.state.logged_in=false
                    this.setState({logged_in:false})
                }
                else {
                    this.state.logged_in=true
                    this.setState({logged_in:true})
                }
                console.log(json.response)
                console.log(this.state.logged_in)
            })
        fetch(
"http://127.0.0.1:8000/first_module/recommendation/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({recos: json, DetailsLoaded2: true})
                console.log(json)
                console.log("reco fetched")
            })

        fetch(
    "http://127.0.0.1:8000/first_module/jobseeker/matchuser/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                if(json.response !=="not_submitted") {
                    this.setState({datas: json.data, DetailsLoaded1: true})
                    console.log(json.data)
                    console.log(json.response)
                    if (json.response==="success") {
                         alert("Login Successful")
                    }
                    else {
                       alert("Login Failed.Try Again")
                    }
                }
                console.log(json.response)

            })



    }
handleClick() {
    //const history = useNavigate();
    // Send data to the backend via POST

    fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true})

  }
  handleClickNew() {
        jsonData.filtername="sortoption"
      jsonData.sortoption="Most Recent Post"
      jsonData.asc="false"

        fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true})

  }

handleClickReco(event) {
        console.log(event.target.id)
        const concatlink = "/jobdetails?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirectReco':true})
  }

  render() {

        //const { navigation } = this.props;
        //this.setState({navigation})
      //if (!this.state.DataisLoaded) return <Loader/>
      if ( !this.state.DetailsLoaded2 || !this.state.DetailsLoaded3) return <Loader/>
    return (
       <React.Fragment>
       <body>
       <Navb/>

       <div className='homebg'>
            <div className='container-fluid mb-5 wow fadeIn'></div>
           <img className="briefcaselogo" src={briefcaselogo} alt="Logo" />
           <div className='floatingdiv'>
                <div className='row g-2'>
                    <div className='col-md-12'>
                        <Form >
                            <InputLabel id="demo-simple-select-label">Search by keyword</InputLabel>
                            <input style={{width:'1202px', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="text"  onChange={this.handlerkeyword} placeholder='Keyword'></input>
                        </Form>
                    </div>

                    <div className='col-md-3' style={{width: "22.5%",paddingRight:"12px"}}>
                        <InputLabel id="demo-simple-select-label">Job Category</InputLabel>
                        <Select styles={dropDownStyle} options={CatOptions} value={this.state.cat}  onChange={this.handler} isClearable  />
                    </div>

                    <div className='col-md-3' style={{width: "22.5%",paddingRight:"12px"}}>
                        <InputLabel id="demo-simple-select-label">Job Nature</InputLabel>
                        <Select styles={dropDownStyle} options={NatureOptions} value={this.state.nature}  onChange={this.handlernature} openMenuOnFocus isClearable  />
                    </div>
                    <div className='col-md-3' style={{width: "22.5%",paddingRight:"12px"}}>
                        <InputLabel id="demo-simple-select-label">Organization Type</InputLabel>
                        <Select styles={dropDownStyle} options={OrgOptions} value={this.state.org}  onChange={this.handlerorg} openMenuOnFocus isClearable  />
                    </div>
                    <div className='col-md-2' style={{width: "22.5%",paddingRight:"12px"}}>
                        <InputLabel id="demo-simple-select-label">Job Location</InputLabel>
                        <Select styles={dropDownStyle} options={LocationOptions} value={this.state.loc}  onChange={this.handlerloc} openMenuOnFocus isClearable  />
                    </div>


                    <div className='col-md-1' style={{width: "10%",paddingRight:"7px"}}>
                        <button className='btn btn-success' style={{marginTop:22,width:"80%"}} onClick={this.handleClick}>Search</button>

                    </div>



                </div>
            </div>

            <div className='nicherdiv mb-3'>
                <div className="icondiv">
                    <div className="icondiv2_1">
                        <a onClick={this.handleClick}><img className='imageicon_1' src={vacancy}></img></a>
                        <h2 className="imageicontitle_1">Vacancies</h2>
                        <div style={{display:"inline",position:"absolute",left:"69%",marginTop:"16px"}}>
                            <AnimatedNumbers
                                animateToNumber={5312}
                                fontStyle={{ fontSize: 36,fontWeight:"bold",color:"#29A335" }}
                                configs={(number, index) => {
                                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                                }}
                            ></AnimatedNumbers>
                        </div>
                    </div>
                    <div className="icondiv2_2">
                        <a href="/companylist"><img className='imageicon_2' src={company}></img></a>
                        <h2 className="imageicontitle_2">Companies</h2>
                        <div style={{display:"inline",position:"absolute",left:"79%",marginTop:"16px"}}>
                            <AnimatedNumbers
                                animateToNumber={156}
                                fontStyle={{ fontSize: 36,fontWeight:"bold",color:"#29A335" }}
                                configs={(number, index) => {
                                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                                }}
                            ></AnimatedNumbers>
                        </div>
                    </div>
                    <div className="icondiv2_3">
                        <a onClick={this.handleClickNew} ><img className='imageicon_3' src={newjob}></img></a>
                        <h2 className="imageicontitle_3">New Jobs</h2>
                        <div style={{display:"inline",position:"absolute",left:"74%",marginTop:"16px"}}>
                            <AnimatedNumbers
                                animateToNumber={673}
                                fontStyle={{ fontSize: 36,fontWeight:"bold",color:"#29A335" }}
                                configs={(number, index) => {
                                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                                }}
                            ></AnimatedNumbers>
                        </div>
                    </div>
                </div>
         
                
            </div>



           {this.state.logged_in && <div className='recommendationdiv mb-3'>


                <h3 style={{fontWeight:'bold',marginLeft:'2%',padding:'15px',textDecorationLine:'underline'}}>Recommended for you</h3>

                <AnimationOnScroll animateIn="slideInRight" duration={4} delay={100} animateOnce={true}>

                <div id="grad1" className="jobdivhome">
                    <h4 style={{color:"#000000"}}>{this.state.recos[0].title}</h4>
                    <h6 style={{color:"black"}}>{this.state.recos[0].emp_name}</h6>

                    <button id={this.state.recos[0].jobpost_id} className="float_right_btn_home" onClick={this.handleClickReco}>View Details</button>
                </div>
                </AnimationOnScroll>

                <AnimationOnScroll animateIn="slideInLeft" duration={3} delay={120} animateOnce={true}>
                <div id="grad1" className="jobdivhome">
                    <h4 style={{color:"#000000"}}>{this.state.recos[1].title}</h4>
                    <h6 style={{color:"black"}}>{this.state.recos[1].emp_name}</h6>

                    <button id={this.state.recos[1].jobpost_id} className="float_right_btn_home" onClick={this.handleClickReco}>View Details</button>
                </div>
                </AnimationOnScroll>

                <AnimationOnScroll animateIn="slideInRight" duration={3} delay={140} animateOnce={true}>
                <div id="grad1" className="jobdivhome">
                    <h4 style={{color:"#000000"}}>{this.state.recos[2].title}</h4>
                    <h6 style={{color:"black"}}>{this.state.recos[2].emp_name}</h6>

                    <button id={this.state.recos[2].jobpost_id} className="float_right_btn_home" onClick={this.handleClickReco}>View Details</button>
                </div>
                </AnimationOnScroll>

                <AnimationOnScroll animateIn="slideInLeft" duration={3} delay={160} animateOnce={true}>
                <div id="grad1" className="jobdivhome">
                    <h4 style={{color:"#000000"}}>{this.state.recos[3].title}</h4>
                    <h6 style={{color:"black"}}>{this.state.recos[3].emp_name}</h6>

                    <button id={this.state.recos[3].jobpost_id} className="float_right_btn_home" onClick={this.handleClickReco}>View Details</button>
                </div>
                </AnimationOnScroll>


                <AnimationOnScroll animateIn="slideInRight" duration={3} delay={180} animateOnce={true}>
                <div id="grad1" className="jobdivhome">
                    <h4 style={{color:"#000000"}}>{this.state.recos[4].title}</h4>
                    <h6 style={{color:"black"}}>{this.state.recos[4].emp_name}</h6>

                    <button id={this.state.recos[4].jobpost_id} className="float_right_btn_home" onClick={this.handleClickReco}>View Details</button>
                </div>
                </AnimationOnScroll>

            </div>}
       </div>
       <Foot margin_value={0}/>
       {this.state.redirect && <Navigate to='/joblist'/>}
       {this.state.redirectReco && <Navigate to={this.state.navlink}/>}
       </body>
       </React.Fragment>
    )

  }
}

export default Home;
//export default withRouter(Home);

// export default function(props) {
//   const navigation = useNavigate();
//
//   return <Home {...props} navigation={navigation} />;
// }

                // <Button>
                //         Ripple Effect
                //         <Ripple color={"#1fecf9"} duration={2000} />
                //          </Button>