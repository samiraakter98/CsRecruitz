import React, {Component} from "react";
import Navb from "./Navb";
import Foot from "./Foot";
import {Animated} from "react-animated-css";
import {MdOutlineAdd} from 'react-icons/md'
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Loader from "./loader";
import { GiSpectreM4 } from "react-icons/gi";
var jsonData = {
    "project_name": "",
    "project_link": "",
    "language": "",
    "desc": "",
}
var jsonData2 = [{
    
    "project_name": "",
    "project_link": "",
    "language": "",
    "desc": "",
}]
class EditProject extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            input2:{},
            items: [],
            numDivs: 0,
            DetailsLoaded1:false,
            DetailsLoaded2:false,
            DetailsLoaded3:false,
            DetailsLoaded4:false,
            DetailsLoaded5:false,
            DetailsLoaded6:false,
            index:0,
            exp2:[],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleClickSkip =this.handleClickSkip.bind(this);

    }
    handleClickSkip() {
        window.location.href = "/professional"
    }
    handleSubmit(event) {
          event.preventDefault();
        //   var str1=this.state.input["job_des_start"];
        //   var str2=this.state.input["job_emp_start"];
        //   var str3=this.state.input["from_year_start"];
        //   va str4=this.state.input["to_year_start"];
        //   var str5=""r
          var str1="";
          var str2="";
          var str3="";
          var str4="";
          var str5=""
          var check =0
          for(let i=0;i<this.state.numDivs;i++) {
              var ind1="project_name_"+i;
              var ind2="language_"+i;
              var ind3="project_link_"+i;
              var ind4="desc_"+i;
             if (i === 0)
             {
                str1=this.state.input[ind1]
                str2=this.state.input[ind2]
                str3=this.state.input[ind3]
                if(this.state.input[ind4]) {
                        str4 = this.state.input[ind4];
                }
                else str4="?"
            }
             else
             {
                str1=str1+"#"+this.state.input[ind1]
                str2=str2+"#"+this.state.input[ind2]
                str3=str3+"#"+this.state.input[ind3]
                if(this.state.input[ind4]) {
                    str4 = str4 + "#" + this.state.input[ind4]
                }
                else str4=str4+'#'+'?'
             }
              
             
          }
          console.log(str1)
          console.log(str2)
          console.log(str3)
          console.log(str4)
          jsonData.project_name=str1
          jsonData.language=str2
          jsonData.project_link=str3
          jsonData.desc=str4


          //////////////
          str1="";
          str2="";
          str3="";
          str4="";
        //   console.log(this.state.exps.length)
          for(let i=0;i < this.state.projects.length;i++) {
              var ind1="project_name_"+i;
              var ind2="language_"+i;
              var ind3="project_link_"+i;
              var ind4="desc_"+i;
            
              if(typeof  this.state.input2[ind1] !== "undefined") {str1 = this.state.input2[ind1];}
              else {str1 = this.state.projects[i].project_name;}
              if(typeof  this.state.input2[ind2] !== "undefined") {str2 = this.state.input2[ind2];}
              else {str2 = this.state.projects[i].language;}
              if(typeof  this.state.input2[ind3] !== "undefined") {str3 = this.state.input2[ind3];}
              else {str3 = this.state.projects[i].project_link;}
              if(typeof  this.state.input2[ind4] !== "undefined") {str4 = this.state.input2[ind4];}
              else {str4 = this.state.projects[i].desc;}
              var val = {"project_name": str1, "language": str2, "project_link": str3,"desc": str4}
              console.log(val)
              console.log(str1)
              console.log(str2)
              console.log(str3)
              console.log(str4)
              jsonData2[i] = val;
          }
        console.log(jsonData2[0])

        if(this.state.numDivs >0)
        {
            fetch('http://127.0.0.1:8000/first_module/proj/get_proj/', {  // Enter your IP address here
            method: 'POST',
                headers:{
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
                })
        }

        for(let i=0;i < this.state.projects.length;i++) 
        {
            fetch(`http://127.0.0.1:8000/first_module/proj/${this.state.projects[i].project_id}/`, {  // Enter your IP address here
            method: 'PUT',
            headers:{
            'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonData2[i]) // body data type must match "Content-Type" header
            })
            .then(response=>response.json())
            .then((data)=>console.log(data));
        }
         window.location.href = "/professional"
    }
    handleChange(event) {
        let input = this.state.input;
        // console.log(event.target.name);
        // console.log("index :"+this.state.index)
        input[event.target.name] = event.target.value;
        this.setState({ input });
   }
   handleChange2(event)
   {
        let input = this.state.input2;
        // console.log(event.target.name);
        // console.log(input)
        input[event.target.name] = event.target.value;
        // console.log(input[event.target.name])
        this.setState({ input });
   }
   componentDidMount() {
        const id=1
        fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/get_id/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data,
                    DetailsLoaded1:true
                });
            // console.log(json)
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
            // console.log(json)
            // console.log(this.state)
            })


    }
    render() {
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded4 || !this.state.DetailsLoaded5 || !this.state.DetailsLoaded6) return <Loader/>

        return(
            <React.Fragment>
            <Navb/>

            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Edit Your Projects</b></p>
                <p style={{
                fontSize:18,
                marginBottom:-4,
                fontWeight:"bold",
                marginRight:-20
                }}>Project <p className="btn add_btn" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.projects.map((exp, idx) => {
                           return(
                            <div>
                                <div className="row" style={{marginBottom:5}}>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <InputLabel for="job_des">Project Name:</InputLabel>
                                        <input  type="text"name={"project_name_"+idx} defaultValue={exp.project_name} onChange={this.handleChange2} className="form-control"  id="job_des" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <InputLabel for="from_year">Language:</InputLabel>
                                            <input
                                                type="text"
                                                defaultValue={exp.language}
                                                name={"language_"+idx}
                                                onChange={this.handleChange2}
                                                className="form-control"
                                                id="from_year"  />

                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom:5  }}>
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                        <InputLabel for="job_emp">Project Link:</InputLabel>
                                        <input type="text" name={"project_link_"+idx} defaultValue={exp.project_link} onChange={this.handleChange2} className="form-control"  id="job_emp" required />
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row" style={{marginBottom:5 }}>
                                    <div className="form-group" >
                                        <InputLabel htmlFor="desc">Description</InputLabel>
                                        <textarea
                                            name={"description_"+idx}
                                            defaultValue={exp.desc_start}
                                            onChange={this.handleChange2}
                                            className="form-control"
                                            placeholder="Write Something About Your Project"
                                            id="desc"/>

                                    </div>
                                </div>
                                <hr/>
                            </div>
                                 
                                
                        )})
                    } 
                    
                    
                    {
                        new Array(this.state.numDivs).fill(0).map((item, index) =>
                        (
                            <div>
                            <hr/>
                                <div className="row" style={{marginBottom:5 }}>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <InputLabel for="job_des">Project Name:<sup style={{
                                                color:"red",
                                                fontSize:16,
                                                lineHeight:0,
                                                top:-1.4,
                                                left:1
                                                }}>*</sup></InputLabel>
                                                <input
                                                type="text"
                                                name={"project_name_"+index}

                                                onChange={this.handleChange}
                                                className="form-control"
                                                placeholder="Enter Your Project Name"
                                                id="job_des" required />
                                        </div>
                                     </div>
                                     

                                    <div className="col-sm-6">
                                    <div className="form-group">
                                    <InputLabel for="language">Language:<sup style={{
                                    color:"red",
                                    fontSize:16,
                                    lineHeight:0,
                                    top:-1.4,
                                    left:1
                                    }}>*</sup></InputLabel>
                                    <input
                                        type="text"         
                                        name={"language_"+index}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Enter Language"
                                        id="from_year" required />

                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom:5 }}>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                        <InputLabel for="job_emp">Project Link:<sup style={{
                                        color:"red",
                                        fontSize:16,
                                        lineHeight:0,
                                        top:-1.4,
                                        left:1
                                        }}>*</sup></InputLabel>
                                            <input
                                                type="text"
                                                name={"project_link_"+index}

                                                onChange={this.handleChange}
                                                className="form-control"
                                                placeholder="Enter Project Link"
                                                id="job_emp" required />

                                        </div>
                                    </div>
                            </div>

                            <div className="row" style={{
                            marginBottom:5
                        }}>

                                    <div className="form-group" >
                                        <InputLabel htmlFor="desc">Description</InputLabel>
                                        <textarea
                                            name={"desc_"+index}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            placeholder="Write Something About Your Project"
                                            id="desc"/>

                                </div>
                                </div>
                                        </div>

                    ))
                }
                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >
                        <button className="btn btn-danger skip_btn" onClick={this.handleClickSkip}>Skip</button>
                        <input type="submit" value="Submit" className="btn btn-success sub_btn_2"  />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default EditProject;