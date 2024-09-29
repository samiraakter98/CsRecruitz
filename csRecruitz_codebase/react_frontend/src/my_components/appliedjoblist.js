import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
import pic from './images/pp.JPG'
import TypeAnimation from 'react-type-animation';
import { shadows } from '@mui/system';

import Sidebar from "./Sidebar";
import Navb from "./Navb";
import Foot from "./Foot";
import Loader from "./loader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";
import { fontSize } from "@mui/system";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Navigate} from "react-router-dom";



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

class AppliedJoblist extends Component {

constructor(props) {
        super(props);
        this.state = {
            apps: [],
            DetailsLoaded:false,
            redirect:false
        };
        this.handleClickView=this.handleClickView.bind(this);
      }

     handleClickView(event) {
        // console.log(event.target.id)
        const concatlink = "/jobdetails?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }

    componentDidMount() {
        fetch(
            "http://127.0.0.1:8000/first_module/appliedjobs/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    apps: json,
                    DetailsLoaded:true
                });
            console.log(json)
            })
    }

   render() {
    if (!this.state.DetailsLoaded) return <Loader/>
    return (
        <React.Fragment>
        <body>
       <Navb/>

        <Sidebar/>
        <div className="content">
            <div className="row" style={{marginLeft:"-13.5%"}}>
                <h1>Applied Jobs:</h1>
            </div>
            <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                <div className="tablediv">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job Title</StyledTableCell>
            <StyledTableCell align="right">Employer Name</StyledTableCell>
            <StyledTableCell align="right">Application Date</StyledTableCell>
              <StyledTableCell align="right">Application Time</StyledTableCell>
              <StyledTableCell align="right">Deadline</StyledTableCell>
              <StyledTableCell align="right">View Details</StyledTableCell>
              {/*<StyledTableCell align="right">Delete</StyledTableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.apps.map((row) => (
            <StyledTableRow key={row.application_id} name={row.application_id}>
              <StyledTableCell component="th" scope="row">
                  {row.job_name}
              </StyledTableCell>
                <StyledTableCell align="right">{row.emp_name}</StyledTableCell>
              <StyledTableCell align="right">{row.apply_date}</StyledTableCell>
              <StyledTableCell align="right">{row.apply_time}</StyledTableCell>
                <StyledTableCell align="right">{row.deadline}</StyledTableCell>
                <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.newjobpost_id} onClick={this.handleClickView}>View</button></StyledTableCell>
                {/*<StyledTableCell align="right"><button className="btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </div>
            </Animated>
        </div>

    <Foot margin_value={172}/>
    {this.state.redirect && <Navigate to={this.state.navlink}/>}
    </body>
        </React.Fragment>
    )
}
}

export default AppliedJoblist;

//gender,mobile number,street database a dhukate hbe
// image thikmoto ante hbe