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
import Navb from "./Navb";
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

var globalloc=""
const sortOptions = [
  { value: "Most Recent Post", label: "Most Recent Post" },
  { value: "Deadline", label: "Deadline" },
  { value: "Salary", label: "Salary" }
];

const dropDownStyle ={
    control: (base, state) => ({
    ...base,
    }),
    option: (provided, state) => ({
      ...provided,
        background: state.isSelected ? "#29A335" : "white",
        color: state.isSelected ? "white" : "black",
    "&:hover": {
        background: state.isSelected ? "#29A335" : "#C6F7C7",
        color: state.isSelected ? "white" : "black",
    }
    }),
    container: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      width:220,
    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};

const boxSX = {
  "&:hover": {
    border: "1px solid #00FF00",
    color: 'gray',
    backgroundColor: 'lightblue'
  },
};
var jsonData = {
    "category":"",
    "nature":"",
    "location":"",
    "req_exp":"",
    "filtername":"",
    "redir_from_home":"false",
    "asc":"",
    "sortoption":"none"
  }
class Joblist extends Component {
    pathaname;
    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;
        this.state = {
            asc: true,
            items: [],
            DataisLoaded: false,
            datas:[],
            totjobs:0,
            redirect:false,
            navlink:"/jobdetails",
            filter_title_job_cat:"Job Category",
            default_job_cat:"DevOps",
            job_categories:[
                {value:"DevOps"},
                {value: "Teaching"},
                {value: "Security"},
                {value: "Research and Development"},
                {value: "Programming"}
            ],
            filter_title_loc:"Location",
            default_loc:"Rajshahi",
            locations:[
                {value:"Rajshahi"},
                {value: "Dhaka"},
                {value: "Sylhet"},
                {value: "Chittagong"},
                {value: "Khulna"},
                {value: "Barishal"},
                {value: "Rangpur"},
                {value: "Mymensingh"}
            ],
            filter_title_job_ntr:"Job Nature",
            default_job_ntr:"Full-time",
            job_natures:[
                {value:"Part-time"},
                {value: "Full-time"},
                {value: "Remote"},
                {value: "Freelancing"},
            ],
            filter_title_req:"Required Experience",
            default_req:"",
            req_exps:[
                {value:"Upto 1 year"},
                {value: "2-5 years"},
                {value: ">5 years"}
            ],
            filter_cat_val:"",
            filter_nat_val:"",
            filter_exp_val:"",
            filter_loc_val:"",
        };
        this.handleClick=this.handleClick.bind(this);
        // this.handleClickCat=this.handleClickCat.bind(this);
        this.handleChangeCat=this.handleChangeCat.bind(this);
        this.handleChangeNat=this.handleChangeNat.bind(this);
        this.handleChangeExp=this.handleChangeExp.bind(this);
        this.handleChangeLoc=this.handleChangeLoc.bind(this);
        this.handleChangeSortOptions=this.handleChangeSortOptions.bind(this);
        this.handleClickSortBtn=this.handleClickSortBtn.bind(this);
      }

    toggleSort = () => {
        this.setState({
          asc: !this.state.asc
        });
    };

    componentDidMount() {
        fetch(
"http://127.0.0.1:8000/searchinput/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({datas: json.data, DataisLoaded: true, filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                console.log(json.data)
                console.log(this.state.filter_cat_loc)
                this.state.filter_cat_loc=json.loc
                console.log(this.state.filter_cat_loc)
                globalloc=json.loc
                // console.log(json.data.length)
                this.state.totjobs=json.data.length
            })

    }
    handleClick(event) {
        console.log(event.target.id)
        const concatlink = "/jobdetails?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }

    handleChangeCat(event) {
        console.log("change")
          console.log(event.target.value)
          jsonData.category=event.target.value
          jsonData.filtername="cat"
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
          fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                    console.log(json.data)
                    this.state.totjobs=json.data.length
            })
      this.state.filter_cat_val=event.target.value;
  }

    handleChangeNat(event) {
        console.log("change")
          console.log(event.target.value)
          jsonData.nature=event.target.value
          jsonData.filtername="nat"
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
          fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                    console.log(json.data)
                    this.state.totjobs=json.data.length
            })
      this.state.filter_nat_val=event.target.value;
  }
    handleChangeExp(event) {
        console.log("change")
          console.log(event.target.value)
          jsonData.req_exp=event.target.value
          jsonData.filtername="exp"
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
          fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                    console.log(json.data)
                    this.state.totjobs=json.data.length
            })
      this.state.filter_exp_val=event.target.value;
  }
    handleChangeLoc(event) {
        console.log("loc change")
        console.log(event.target.value)
        jsonData.location=event.target.value
        jsonData.filtername="loc"
        fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
         method: 'POST',
         headers:{
         'Content-Type': 'application/json',
         },
         mode: 'cors',
         body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        fetch(
  "http://127.0.0.1:8000/searchinput/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                console.log(json.data)
                this.state.totjobs=json.data.length
        })
        this.state.filter_loc_val=event.target.value;
  }
    handleClickSortBtn(event){
        this.toggleSort()
        console.log(this.state.asc)
        if(this.state.asc==true)
        {
            jsonData.asc="true";
        }
        else
        {
            jsonData.asc="false";
        }
        console.log("sort btn change")
        jsonData.filtername="sortbtn"
        fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                    console.log(json.data)
                    this.state.totjobs=json.data.length
        })
    }
    handleChangeSortOptions(event)
    {
        if(event)
        {
           //console.log(event.value)
            jsonData.sortoption=event.value
        }
        else
        {
           //console.log("none")
            jsonData.sortoption=event.value
        }
        console.log("sort option change")
        jsonData.filtername="sortoption"
        fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true , filter_cat_val:json.cat, filter_nat_val:json.nat, filter_cat_exp:json.exp, filter_cat_loc:json.loc})
                    console.log(json.data)
                    this.state.totjobs=json.data.length
        })

    }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <Loader/>
        return (
            <React.Fragment>
            <body>
            <Navb/>



            <div className="filterbar">
                <h5 style={{marginLeft:12,marginTop:8,marginBottom:-12}}><BsFilter style={{
                            color:"blue",
                            paddingRight:5,
                            marginTop:-2,
                            fontSize:30
                        }}/>Filter Jobs</h5>
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
                            <h6>{this.state.filter_title_loc}</h6>
                        </div>

                        <Box sx={{ width:263,marginTop:2}}>
                          <FormControl fullWidth size="small" >
                            <InputLabel id="demo-simple-select-label">Division</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              defaultValue={globalloc}
                              label="Division"
                              onChange={this.handleChangeLoc}
                              style={{ height: 38,fontSize:15,paddingTop:4}}
                            >
                                {this.state.locations.map(location => (
                                    <MenuItem value={location.value} sx={{fontSize:12,width:'100%'}}>{location.value}</MenuItem>
                                  ))}
                            </Select>
                          </FormControl>
                        </Box>

                    </div>
                </div>
                <div className="category_div">
                    <div>
                        <div className="filter_title_bg_div">
                            <h6>{this.state.filter_title_job_ntr}</h6>
                        </div>

                        <FormControl >
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                defaultValue={this.state.filter_nat_val}
                                onChange={this.handleChangeNat}>
                                  {this.state.job_natures.map(category => (
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
                <div className="click_instruction_div">
                    <h5 >Click at the job title to view details ({this.state.totjobs} jobs found)</h5>
                    <div style={{float:"right",marginTop:-60}}>
                        <p className="sort_by_txt">Sort by</p>
                        <div className="select_sort_div">
                            <Select2 options={sortOptions} defaultValue="Salary" openMenuOnFocus styles={dropDownStyle} placeholder='None...' onChange={this.handleChangeSortOptions} />
                        </div>
                        <div className="asc_desc_btn_div">
                           <button className="asc_desc_btn" onClick={this.handleClickSortBtn}>
                              {this.state.asc ? <HiSortAscending style={{color:"white"}}/> : <HiSortDescending style={{color:"white"}}/>}
                            </button>
                        </div>
                    </div>

                </div>




                <Animated animationIn="slideInLeft"  animationInDuration={1800}  isVisible={true}>

                {
                this.state.datas.map((item) => (

                    <div className="jobdiv">
                        <h4 style={{color:"#29A335"}}>{item.title}</h4>
                        <h6 style={{color:"black"}}>{item.emp_name}</h6>

                        <p style={{display:"inline"}}><HiLocationMarker style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.emp_district}, {item.emp_division}</p>

                        <p className="fulltime_p"><FaRegClock style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.job_nature}</p>

                        <p className="salary_p"><FaRegMoneyBillAlt style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.salary} BDT</p>
                        <p className="float_right_p2"><FaRegCalendarAlt style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>Posted On: {item.post_date}</p>
                        <p className="float_right_p"><FaRegCalendarAlt style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>Deadline: {item.deadline_date}</p>


                        <button id={item.jobpost_id} className="float_right_btn" onClick={this.handleClick}>View Details</button>
                    </div>
                ))
                }




                </Animated>
            </div>
            <Foot margin_value={40}/>
            {this.state.redirect && <Navigate to={this.state.navlink}/>}
            </body>
                </React.Fragment>
        )
    }
}

export default Joblist;