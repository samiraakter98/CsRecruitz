import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './nakshi.css';
import {HiLocationMarker} from "react-icons/hi";
import {HiSortAscending} from "react-icons/hi";
import {HiSortDescending} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';
import Filter_sidebar from "./Filter_sidebar";
import Nab_emp from "./Nab_emp.js"
import Select2 from "react-select";
import {Navigate} from "react-router-dom";
import {element} from "prop-types";
import {BallTriangle, Circles, ThreeDots} from 'react-loader-spinner'
import Loader from "./loader";
import Foot from "./Foot";
import {BsFilter} from "react-icons/bs";
import Radiobutton from "./radiobutton";
import Dropdown_my from "./dropdown";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import { TagsInput } from "react-tag-input-component";
import ReactDOM from "react-dom";
import {FaSearch} from 'react-icons/fa';

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

var globalloc=""

var jsonData = {
    "job_id":"",
    "filtername":"",
    "category":"",
    "req_exp":"",
    "keywords":[]
  }
class Applicantlist extends Component {
    pathaname;
    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;

        this.state = {
            asc: true,
            items: [],
            DetailsLoaded: false,
            redirect1:false,
            redirect2:false,
            navlink1:"/empprev",
            navlink2:"/jobdetails",
            filter_title_job_cat:"Field of Work",
            default_job_cat:"DevOps",
            job_categories:[
                {value:"DevOps"},
                {value: "Teaching"},
                {value: "Security"},
                {value: "Research and Development"},
                {value: "Programming"}
            ],
            filter_title_req:"Minimum Experience",
            default_req:"",
            req_exps:[
                {value:"Minimum 1 year"},
                {value: "Minimum 3 years"},
                {value: "Minimum 5 years"}
            ],
            filter_title_search:"Keyword Search",
            filter_cat_val:"",
            filter_exp_val:"",
            filter_src_val:[]
        };
        this.handleChangeCat=this.handleChangeCat.bind(this);
        this.handleChangeExp=this.handleChangeExp.bind(this);
        this.handleChangeSrc=this.handleChangeSrc.bind(this);
        this.handleClickPrev=this.handleClickPrev.bind(this);
        this.handleClickProfile=this.handleClickProfile.bind(this);
      }

    componentDidMount() {
        console.log(window.location.href)
        const url=window.location.href
        const splitid = url.split("?")
        const id=splitid[1]
        // console.log(id)
        jsonData.job_id=id
        this.setState({filter_cat_val:""})
        this.setState({filter_exp_val:""})
        jsonData.filtername="mount"

        fetch('http://127.0.0.1:8000/first_module/employerpanel/applist/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

                fetch(
"http://127.0.0.1:8000/first_module/employerpanel/applist/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({apps: json.data, DetailsLoaded: true})
                console.log(json.data)
            })

    }

    handleChangeCat(event) {

        this.setState({filter_cat_val:event.target.value})

          jsonData.category=event.target.value
          jsonData.filtername="cat"

        fetch('http://127.0.0.1:8000/first_module/employerpanel/applist/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

                fetch(
"http://127.0.0.1:8000/first_module/employerpanel/applist/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({apps: json.data, DetailsLoaded: true})
                console.log(json.data)
            })
  }
    handleChangeExp(event) {

        this.setState({filter_exp_val:event.target.value})

          jsonData.req_exp=event.target.value
          jsonData.filtername="exp"

        fetch('http://127.0.0.1:8000/first_module/employerpanel/applist/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

                fetch(
"http://127.0.0.1:8000/first_module/employerpanel/applist/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({apps: json.data, DetailsLoaded: true})
                console.log(json.data)
            })
  }
  handleChangeSrc(event) {
      this.setState({filter_src_val:event})
      console.log(event)

          jsonData.keywords=event
          jsonData.filtername="keyword"

        fetch('http://127.0.0.1:8000/first_module/employerpanel/applist/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

                fetch(
"http://127.0.0.1:8000/first_module/employerpanel/applist/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({apps: json.data, DetailsLoaded: true})
                console.log(json.data)
            })
  }

    handleClickPrev(event) {
    console.log(event.target.id)
    const concatlink = "/empprev?" + event.target.id;
    this.setState({'navlink1':concatlink})
    this.setState({'redirect1':true})
    }

    handleClickProfile(event) {
    // console.log(event.target.id)
     const concatlink = "/userprofile?" + event.target.id;
     this.setState({'navlink2':concatlink})
     this.setState({'redirect2':true})
    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!this.state.DetailsLoaded) return <Loader/>
        return (
            <React.Fragment>
            <body>
            <Nab_emp/>



            <div className="filterbar">
                <h5 style={{marginLeft:12,marginTop:8,marginBottom:-12}}><BsFilter style={{
                            color:"blue",
                            paddingRight:5,
                            marginTop:-2,
                            fontSize:30
                        }}/>Filter Applicants</h5>
                <hr className="hr_style"/>
                <Animated animationIn="fadeIn"  animationInDuration={1800}  isVisible={true}>

                <div className="category_div">
                    <div>
                        <div className="filter_title_bg_div">
                            <h6>{this.state.filter_title_job_cat}</h6>
                        </div>

                        <FormControl >
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                defaultValue={this.state.filter_cat_val}
                                value={this.state.filter_cat_val}
                                onChange={this.handleChangeCat}>
                                  {this.state.job_categories.map(category => (
                                      <FormControlLabel value={category.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{category.value}</span>}/>
                                  ))}
                              </RadioGroup>
                            </FormControl>
                    </div>
                </div>
                <div className="category_div">
                    <div>
                        <div className="filter_title_bg_div">
                            <h6>{this.state.filter_title_req}</h6>
                        </div>

                        <FormControl >
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                defaultValue={this.state.filter_exp_val}
                                onChange={this.handleChangeExp}>
                                  {this.state.req_exps.map(category => (
                                      <FormControlLabel value={category.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{category.value}</span>}/>
                                  ))}
                              </RadioGroup>
                            </FormControl>
                    </div>
                    </div>

                 </Animated>
            </div>







            <div className="joblistbgdiv">
                <div>
                      {/*<h1>Add Fruits</h1>*/}
                    <h6 style={{color:"#000000"}}><FaSearch style={{fontSize:"22",marginTop:"-2px",paddingRight:"5px",color:"#29A335"}}/>Keyword Search</h6>

                      {/*<pre>{JSON.stringify(this.state.filter_src_val)}</pre>*/}

                      <TagsInput
                        value={this.state.filter_src_val}
                        onChange={this.handleChangeSrc}
                        name="fruits"
                        placeHolder="Press enter to add new keyword"
                        style={{backgroundColor: "#FFFFFF",color:"#DEE7F4",placeholderColor:"#DEE7F4",width:"30%",height:"30%"}}
                      />
                      {/*<em>press enter to add new tag</em>*/}
                    </div>

                <div style={{marginTop:"17px",marginBottom:"-5px"}}>
                    <h5>Applicants list (sorted according to best match)</h5>
                </div>


                {/*<div className="app_instruction_div">*/}
                {/*    <h5 >Applicants list (sorted according to best match)</h5>*/}

                {/*</div>*/}




                <Animated animationIn="slideInLeft"  animationInDuration={1800}  isVisible={true}>
                    <div className="emptablediv">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Applicant Name</StyledTableCell>
            {/*<StyledTableCell align="right">Post Date</StyledTableCell>*/}
            {/*<StyledTableCell align="right">Deadline Date</StyledTableCell>*/}
            {/*  <StyledTableCell align="right">Total Applicants</StyledTableCell>*/}
              {/*<StyledTableCell align="right">View Details</StyledTableCell>*/}
              <StyledTableCell align="center">Applied On</StyledTableCell>
              <StyledTableCell align="right">View Application Summary</StyledTableCell>
              <StyledTableCell align="right" style={{whiteSpace:"pre"}}>View Applicant Profile </StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>

          {this.state.apps.map((row,i) => (
            <StyledTableRow key={row.application_id} name={row.application_id}>
              <StyledTableCell component="th" scope="row">
                  <b>{row.app_name}</b>
              </StyledTableCell>
              <StyledTableCell align="center">{row.apply_date}</StyledTableCell>
              <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.application_id} onClick={this.handleClickPrev}>Summary</button></StyledTableCell>
              <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.application_id} onClick={this.handleClickProfile}>Profile</button></StyledTableCell>



            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </div>


                </Animated>
            </div>
            <Foot margin_value={40}/>
            {this.state.redirect1 && <Navigate to={this.state.navlink1}/>}
            {this.state.redirect2 && <Navigate to={this.state.navlink2}/>}
            </body>
                </React.Fragment>
        )
    }
}

export default Applicantlist;