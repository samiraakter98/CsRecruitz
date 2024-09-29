import React, {Component} from "react";
import {Animated} from "react-animated-css";
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
import {FaRegClock} from "react-icons/fa";
import {FiEdit2} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri"


var jsonData = {
    "id":"",
  }

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

export class companylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DetailsLoaded:false,
            redirect:false,
            tot_posts:[],
        };
        this.handleClickView=this.handleClickView.bind(this);
      }

     handleClickView(event) {
        console.log("button id")
        console.log(event.target.id)
        const concatlink = "/empprofile?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }

    componentDidMount() {
        fetch(
            "http://127.0.0.1:8000/first_module/employer/get_companies/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {

                    this.setState({items: json.data,
                                    DetailsLoaded: true
                                })
                    console.log(this.state)
                    console.log(json.data);
                    console.log(json.response);
                    this.state.tot_posts = json.response.split('#')
                    console.log(this.state.tot_posts);
                    
                })
    }


  render() {
        if (!this.state.DetailsLoaded) return <Loader/>
    return (
        <React.Fragment>
        <body>
       <Navb/>

        {/* <Sidebar/> */}
        <div className="content" style={{marginLeft:"10%",marginRight:"10%"}}>
            <div className="row" style={{marginLeft:"-13.5%"}}>
                <h1>Companies:</h1>
            </div>
            <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                <div className="tablediv">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            
            <StyledTableCell align="left">Employer Name</StyledTableCell>
              <StyledTableCell align="left">Location</StyledTableCell>
              <StyledTableCell align="left">Organization type</StyledTableCell>
              <StyledTableCell align="left">Total Job Post</StyledTableCell>
              <StyledTableCell align="right">View Details</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.items.map((row, i) => (
            <StyledTableRow key={row.application_id} name={row.jobshortlist_id}>
              <StyledTableCell component="th" scope="row">{row.name} </StyledTableCell>
                <StyledTableCell align="left"> {row.division}</StyledTableCell>
                <StyledTableCell align="left">{row.org_type}</StyledTableCell>
                <StyledTableCell align="left"> {this.state.tot_posts[i]}</StyledTableCell>

                <StyledTableCell align="left"><button className="btn btn-sm btn-success" id={row.user_id} onClick={this.handleClickView}>View</button></StyledTableCell>
                {/* <StyledTableCell align="center"><RiDeleteBin6Line id={row.newjobpost_id} name={row.newjobpost_id} size={'1.5em'}  className="icon_delete"/></StyledTableCell> */}
          {/* <button className="icon_delete_btn" name={row.user_prt_id} id={row.user_prt_id} ></button> */}
          {/*<StyledTableCell align="right"><button className="btn btn-sm btn-success">Delete</button></StyledTableCell>*/}

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

export default companylist;