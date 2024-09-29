
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
import {RiUserFollowFill} from 'react-icons/ri';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {GrFormAdd} from 'react-icons/gr';
import Navb from "./Navb";
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
import {TypeAnimation} from "react-type-animation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3C1173",
    color: theme.palette.common.white,
      fontSize: 15,
      fontWeight: "bold",
      border:1,
      paddingTop:15,
      paddingBottom:15
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
      paddingTop:8,
      paddingBottom:8

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
    "emp_id":"",
    "mount":"",
     "mountfrom":"prof",
    "type":"",
    "iffollow":"",
}


export class EmpProfile extends Component {

    state={
        redirect:false,
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        DetailsLoaded3:false,
        navlink:"/jobdetails",
        iffollowed:"",
        empid:""
    };

    constructor(props) {
    super(props);
    this.handleClickJob=this.handleClickJob.bind(this);
    this.handleClickFollow=this.handleClickFollow.bind(this);

  }

  handleClickJob(event)
  {
        // console.log(event.target.id)
        const concatlink = "/jobdetails?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }

componentDidMount() {
        const url=window.location.href
        const splitid = url.split("?")
        const id=splitid[1]
        jsonData.emp_id=id
        jsonData.mount="true"
        this.setState({empid:id})
        fetch('http://127.0.0.1:8000/empprofjobs/', {  // Enter your IP address here
        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })

        fetch(
            "http://127.0.0.1:8000/empprofjobs")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    jobs: json.data,
                    empname: json.empname,
                    empyear:json.empyear,
                    empdiv:json.empdiv,
                    DetailsLoaded1:true
                });
            // console.log(json)

            //console.log(this.state)
            })

        fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

            fetch(
        "http://127.0.0.1:8000/first_module/apply/getapplication/",{
            method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    DetailsLoaded2: true
                });
            //    follow code
                if (json.follow==="followed") {
                    this.state.iffollowed=true
                }
                else {
                   this.state.iffollowed=false
                }
            })
    }


    handleClickFollow() {
    jsonData.mount="false"
    jsonData.type="profilefollow"
    // this.state.iffollowed=!this.state.iffollowed
      console.log(this.state.iffollowed)
      if(this.state.iffollowed==false)
      {
          jsonData.iffollow="true"
      }
      else
      {
          jsonData.iffollow="false"
      }
      this.setState({iffollowed:!this.state.iffollowed})
      console.log(this.state.iffollowed)
      console.log(jsonData.iffollow)
    fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
  }

  render() {
      if ( !this.state.DetailsLoaded1) return <Loader/>
    return (
       <React.Fragment>
       <body>
       <Navb/>

       <div className='homebg'>
            <div className='container-fluid mb-5 wow fadeIn'></div>
           {/*<img className="briefcaselogo" src={briefcaselogo} alt="Logo" />*/}
           <img className="emplogo" src={vacancy} alt="Logo" />
           <div className='floatingdivemp'>
                <div className='row g-2'>
                    <h1>{this.state.empname}</h1>
                    <h6>{this.state.empdiv} | Established in {this.state.empyear}</h6>
                </div>
               {this.state.iffollowed && <button className="btn btn-primary" onClick={this.handleClickFollow} style={{float:"right",left:"86.2%",marginTop:'-35.5px',position:"absolute",paddingTop:"4px",paddingBottom:"4px",width:"125px"}}><RiUserFollowFill style={{fontSize:"20",fontWeight:"bold",color:"white",marginLeft:"-1px",paddingRight:"5px",marginTop:"-4px"}}/>Unfollow</button>}
               {!this.state.iffollowed && <button className="btn btn-success" onClick={this.handleClickFollow} style={{float:"right",left:"86.2%",marginTop:'-35.5px',position:"absolute",paddingTop:"4px",paddingBottom:"4px",width:"125px"}}><RiUserFollowFill style={{fontSize:"20",fontWeight:"bold",color:"white",marginLeft:"-1px",paddingRight:"5px",marginTop:"-4px"}}/>Follow</button>}

            </div>

            <div className='nicherdiv2 mb-3'>
                <div className='listheading'>
                <h4>List of all job posts:</h4>
                </div>


             <div className="jobtabledivemp">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job Title</StyledTableCell>
            <StyledTableCell align="right">Post Date</StyledTableCell>
            <StyledTableCell align="right">Deadline Date</StyledTableCell>
              {/*<StyledTableCell align="right">Total Applicants</StyledTableCell>*/}
              <StyledTableCell align="center">View Details</StyledTableCell>
              {/*<StyledTableCell align="center">View Applicants</StyledTableCell>*/}

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
              {/*<StyledTableCell align="right">{this.state.appno[i]}</StyledTableCell>*/}
                <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.jobpost_id} onClick={this.handleClickJob}>View</button></StyledTableCell>
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

export default EmpProfile;
