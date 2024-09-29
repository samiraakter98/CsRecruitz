import React, { Component } from 'react'
import './quiz.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import {FaRegClock} from 'react-icons/fa';
import {FiEdit2} from 'react-icons/fi';
import Loader from "./loader";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import Navb from "./Navb";
import Foot from "./Foot";
import FormControl from "@mui/material/FormControl";
import {CgFileDocument} from 'react-icons/cg';
import {MdOutlineAssessment} from 'react-icons/md';




var jsonData = {
  "question_id":"",
  "answer":"",
    "type":""
}


export class Quizresult extends Component {
  constructor() {
    super();
    this.state = {
      marks:"",
      per:"",
      passed:"",
      DetailsLoaded4:false,
    };
    this.handleProf = this.handleProf.bind(this);
  }
  handleProf()
  {
      window.location.href="/professional"
  }

  componentDidMount() {

    fetch(
            "http://127.0.0.1:8000/first_module/question/answer/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({

                    marks:json.tot_mark,
                    per:json.per,
                    passed:json.res,
                    DetailsLoaded4:true
                });
            console.log(json)

            })
      console.log(this.state)
  }

  render() {

    // if (!this.state.DataisLoaded) return <Loader/>
      if (!this.state.DetailsLoaded4) return <Loader/>
    return (
        <React.Fragment>
       <Navb/>
       <div className='homebg' style={{backgroundColor:'#DEE7F4',}}>
            <div className='quiz2' style={{ backgroundColor:'white',marginTop:"10px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>

                <div className="row" style={{marginLeft:"0px",marginRight:"0px",borderRadius:"5px" }}>
                  <h5 className='title2'style={{color:'white'}}>Assessment Result</h5>
                </div>
                <div><CgFileDocument className='markicon' style={{fontSize:"120",color:"#226119",marginLeft:"37%"}}/></div>

                <div className="resulttext">
                    <div>Total Marks: <b>{this.state.marks}</b></div>
                    <div>Marks Percentage: <b>{this.state.per}%</b></div>
                    {/* <div><h6 style={{color:"#226119",marginTop:"20px"}}>You have successfully passed the assessment. Your skill is now verified.</h6></div> */}
                    {/* <div><h6 style={{color:"red",marginTop:"20px"}}>You have failed the assessment. Try again later.</h6></div> */}
                    {this.state.passed==="Passed"&& <div><h6 style={{color:"#226119",marginTop:"20px"}}>You have successfully passed the assessment. Your skill is now verified.</h6></div>}
                    {this.state.passed==="Failed" && <div><h6 style={{color:"red",marginTop:"20px"}}>You have failed the assessment. Try again later.</h6></div>}

                </div>

                <button className='btn btn-primary' onClick={this.handleProf} style={{width:"240px", marginRight: "27px",marginLeft: "490px",left:"900px"}}>Go To Professional Dashboard</button>

                </div>

            </div>

            <Foot margin_value={-80}/>

       </React.Fragment>
    )
  }
}

export default Quizresult