
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
import {FaPlus} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {GrFormAdd} from 'react-icons/gr';
import Nab_emp from "./Nab_emp";
import Foot from "./Foot";
import {Navigate} from "react-router-dom";
import Button from "./Button";
import Ripple from "./Ripple";
import CountUp from "react-countup";
import AnimatedNumbers from "react-animated-numbers";
import Loader from "./loader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3C1173",
    color: theme.palette.common.white,
      fontSize: 15,
      fontWeight: "bold",
      border:1
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#D5ECD1",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

var jsonData = {
  "search_str":"",
}



export class EmpHome extends Component {

    state={
        redirect:false,
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        DetailsLoaded3:false,
        navlink:"/applicants",

    };

    constructor(props) {
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleClickApplicant=this.handleClickApplicant.bind(this);

  }

  handleClickApplicant(event)
  {
        // console.log(event.target.id)
        const concatlink = "/applicants?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }
To_Job(event) {
        window.location.href="/job1";
}
handleSearch(event)
{
    //console.log(event.target.value)
    if(event.target.value)
    {
        jsonData.search_str=event.target.value
    }
    else
    {
        jsonData.search_str=""
    }

    fetch('http://127.0.0.1:8000/empjobs/', {  // Enter your IP address here
    method: 'POST',
    headers:{
    'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })

    fetch(
            "http://127.0.0.1:8000/empjobs")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    jobs: json.data,
                    DetailsLoaded2:true
                });
            console.log(json)
            var appnostr=json.response.split('#')
                this.setState({appno:appnostr,DetailsLoaded3:true})

            //console.log(this.state)
    })
}

componentDidMount() {
        jsonData.search_str=""
        fetch('http://127.0.0.1:8000/empjobs/', {  // Enter your IP address here
        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })

         fetch(
            "http://127.0.0.1:8000/first_module/employer/emp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    emps: json.data,
                    DetailsLoaded1:true
                });
            //console.log(json)
            //console.log(this.state)
            })

        fetch(
            "http://127.0.0.1:8000/empjobs")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    jobs: json.data,
                    DetailsLoaded2:true
                });
            console.log(json)
            var appnostr=json.response.split('#')
                this.setState({appno:appnostr,DetailsLoaded3:true})

            //console.log(this.state)
            })
          fetch(
    "http://127.0.0.1:8000/first_module/jobseeker/matchuser/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                if(json.response !=="not_submitted") {

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

  render() {
      if ( !this.state.DetailsLoaded1 ||!this.state.DetailsLoaded2 || !this.state.DetailsLoaded3) return <Loader/>
    return (
       <React.Fragment>
       <body>
       <Nab_emp/>

       <div className='homebg'>
            <div className='container-fluid mb-5 wow fadeIn'></div>
           {/*<img className="briefcaselogo" src={briefcaselogo} alt="Logo" />*/}
           <img className="emplogo" src={vacancy} alt="Logo" />
           <div className='floatingdivemp'>
                <div className='row g-2'>
                    <h1>{this.state.emps[0].name}</h1>
                    <h6>{this.state.emps[0].division} | Established in {this.state.emps[0].establishment_year}</h6>
                </div>
            </div>

            <div className='nicherdiv2 mb-3'>
                <div className='listheading'>
                <h4>List of all job posts:</h4>
                </div>
                <div>
                    <button className="btn btn-success" style={{float:"right",left:"64%",marginTop:'-38px',position:"absolute"}} onClick={this.To_Job}><FaPlus style={{fontSize:"16",fontWeight:"bold",color:"white",marginLeft:"-1px",paddingRight:"5px",marginTop:"-3px"}}/>Add new job post</button>
                    <FaSearch style={{fontSize:"24",float:"right",left:"76.5%",marginTop:'-32px',position:"absolute",color:"#29A335"}}/>
                    {/*<Form >*/}
                        {/*<InputLabel id="demo-simple-select-label">Search by keyword</InputLabel>*/}
                        <input style={{padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1,width:"15%",float:"right",marginTop:"-40px",marginRight:"19px"}} type="text"  onChange={this.handleSearch} placeholder='Search by job title...'></input>
                    {/*</Form>*/}
                </div>


             <div className="jobtabledivemp">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job Title</StyledTableCell>
            <StyledTableCell align="right">Post Date</StyledTableCell>
            <StyledTableCell align="right">Deadline Date</StyledTableCell>
              <StyledTableCell align="right">Total Applicants</StyledTableCell>
              {/*<StyledTableCell align="right">View Details</StyledTableCell>*/}
              <StyledTableCell align="center">View Applicants</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.jobs.map((row,i) => (
            <StyledTableRow key={row.jobpost_id} name={row.jobpost_id}>
              <StyledTableCell component="th" scope="row">
                  <b>{row.title}</b>
              </StyledTableCell>
                <StyledTableCell align="right">{row.post_date}</StyledTableCell>
              <StyledTableCell align="right">{row.deadline_date}</StyledTableCell>
              <StyledTableCell align="right">{this.state.appno[i]}</StyledTableCell>
                <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.jobpost_id} onClick={this.handleClickApplicant}>View</button></StyledTableCell>
                {/*<StyledTableCell align="right"><button className="btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </div>

            </div>


       </div>
       <Foot margin_value={0}/>
       {this.state.redirect && <Navigate to={this.state.navlink}/>}
       </body>
       </React.Fragment>
    )

  }
}

export default EmpHome;
