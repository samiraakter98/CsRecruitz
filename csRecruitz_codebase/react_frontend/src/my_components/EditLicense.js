import React, {Component} from "react";
import Navb from "./Navb";
import Foot from "./Foot";
import {Animated} from "react-animated-css";
import {MdOutlineAdd} from 'react-icons/md'
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Loader from "./loader";
import { GiSpectreM4 } from "react-icons/gi";
var jsonData = {
    "certificate_name": "",
    "certificate_link": "",
    "issuing": "",
}
var jsonData2 = [{
    "certificate_name": "",
    "certificate_link": "",
    "issuing": "",

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
          
          var check =0
          for(let i=0;i<this.state.numDivs;i++) {
              var ind1="certificate_name_"+i;
              var ind2="issuing_org_"+i;
              var ind3="certificate_link_"+i;
             if (i === 0)
             {
                str1=this.state.input[ind1]
                str2=this.state.input[ind2]
                if(this.state.input[ind3]) {
                        str3 = this.state.input[ind3];
                }
                else str3="?"
            }
             else
             {
                str1=str1+"#"+this.state.input[ind1]
                str2=str2+"#"+this.state.input[ind2]
                if(this.state.input[ind3]) {
                    str3 = str3 + "#" + this.state.input[ind3]
                }
                else str3=str3+'#'+'?'
             }
              
             
          }
          console.log(str1)
          console.log(str2)
          console.log(str3)
          jsonData.certificate_name=str1
          jsonData.issuing_org=str2
          jsonData.certificate_link=str3
          


          //////////////
          str1="";
          str2="";
          str3="";
          
        //   console.log(this.state.exps.length)
          for(let i=0;i < this.state.lics.length;i++) {
              var ind1="certificate_name_"+i;
              var ind2="issuing_org_"+i;
              var ind3="certificate_link_"+i;
            
              if(typeof  this.state.input2[ind1] !== "undefined") {str1 = this.state.input2[ind1];}
              else {str1 = this.state.lics[i].lic_name;}
              if(typeof  this.state.input2[ind2] !== "undefined") {str2 = this.state.input2[ind2];}
              else {str2 = this.state.lics[i].lic_org;}
              if(typeof  this.state.input2[ind3] !== "undefined") {str3 = this.state.input2[ind3];}
              else {str3 = this.state.lics[i].lic_link;}
              var val = {"certificate_name": str1, "issuing_org": str2, "certificate_link": str3}
              console.log(val)
              console.log(str1)
              console.log(str2)
              console.log(str3)
              jsonData2[i] = val;
          }
        console.log(jsonData2[0])

        if(this.state.numDivs >0)
        {
            fetch('http://127.0.0.1:8000/first_module/lic/get_lic/', {  // Enter your IP address here
            method: 'POST',
                headers:{
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
                })
        }

        for(let i=0;i < this.state.lics.length;i++) 
        {
            fetch(`http://127.0.0.1:8000/first_module/licenseandcerti/${this.state.lics[i].certificate_id}/`, {  // Enter your IP address here
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
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded6) return <Loader/>

        return(
            <React.Fragment>
            <Navb/>

            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Edit Your License and certificates</b></p>
                <p style={{
                fontSize:18,
                marginBottom:-4,
                fontWeight:"bold",
                marginRight:-20
                }}>License and Certificate <p className="btn add_btn" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.lics.map((exp, idx) => {
                           return(
                            <div>
                                <div className="row" style={{marginBottom:5}}>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                        <InputLabel for="job_des">Certificate Name:</InputLabel>
                                        <input  type="text"name={"certificate_name_"+idx} defaultValue={exp.lic_name} onChange={this.handleChange2} className="form-control"  id="job_des" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <InputLabel for="from_year">Issuing Organization:</InputLabel>
                                            <input
                                                type="text"
                                                defaultValue={exp.lic_org}
                                                name={"issuing_org_"+idx}
                                                onChange={this.handleChange2}
                                                className="form-control"
                                                id="from_year"  />

                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom:5  }}>
                                    
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                        <InputLabel for="job_emp">Certificate Link:</InputLabel>
                                        <input type="text" name={"certificate_link_"+idx} defaultValue={exp.lic_link} onChange={this.handleChange2} className="form-control"  id="job_emp" required />
                                        </div>
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
                                            <InputLabel for="job_des">Certificate Name:<sup style={{
                                                color:"red",
                                                fontSize:16,
                                                lineHeight:0,
                                                top:-1.4,
                                                left:1
                                                }}>*</sup></InputLabel>
                                                <input
                                                type="text"
                                                name={"certificate_name_"+index}

                                                onChange={this.handleChange}
                                                className="form-control"
                                                placeholder="Enter Your Certificate Name"
                                                id="job_des" required />
                                        </div>
                                     </div>
                                     

                                    <div className="col-sm-6">
                                    <div className="form-group">
                                    <InputLabel for="language">Issuing Organization:<sup style={{
                                    color:"red",
                                    fontSize:16,
                                    lineHeight:0,
                                    top:-1.4,
                                    left:1
                                    }}>*</sup></InputLabel>
                                    <input
                                        type="text"         
                                        name={"issuing_org_"+index}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        placeholder="Enter Organization Name"
                                        id="from_year" required />

                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom:5 }}>
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                        <InputLabel for="job_emp">Certificate Link:</InputLabel>
                                            <input
                                                type="text"
                                                name={"certificate_link_"+index}

                                                onChange={this.handleChange}
                                                className="form-control"
                                                placeholder="Enter certificate Link"
                                                id="job_emp"/>

                                        </div>
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