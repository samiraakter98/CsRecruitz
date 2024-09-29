import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
var jsonData = {
    "skills": "",
    "open_to": "",
    "proj_name": "",
    "proj_link": "",
    "proj_desc": "",
}
const SkillOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Django', label: 'Django' },
    { value: 'Java', label: 'Java' }
    ]
 const dropDownStyle ={
    control: (base, state) => ({
    ...base,

        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        //marginBottom:-20

    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};
class EditSkill extends Component {
    constructor() {
        super();
        this.state = {
            selectedOptions: [],
            selectedOptions_2:[],
            input: {},
            numDivs: 0
        };
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeOpenTo =this.handleChangeOpenTo.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleClickSkip() {
       window.location.href="/register4"
      }
      handleSubmit(event) {
          event.preventDefault();
          var str1=""
          var str2=""
          var str3=this.state.input["proj_name_start"]
          var str4=""
          if(this.state.input["proj_link_start"])  {
              str4=this.state.input["proj_link_start"]
          }
          else str4="?"

          var str5=""
          if(this.state.input["proj_desc_start"]){
              str5=this.state.input["proj_desc_start"]
          }
          else str5="?"
          for (let i=0;i<this.state.selectedOptions.length;i++) {
              str1=str1+"#"+this.state.selectedOptions[i].value
          }
          console.log(str1)
          for (let i=0;i<this.state.selectedOptions_2.length;i++) {
              str2=str2+"#"+this.state.selectedOptions_2[i].value
          }
          jsonData.skills=str1
          jsonData.open_to=str2
          console.log(str2)
          for(let i=0;i<this.state.numDivs;i++) {
              var ind3="proj_name_"+i;
              var ind4="proj_link_"+i;
              var ind5="proj_desc_"+i;


              str3=str3+"#"+this.state.input[ind3]
              //str4=str4+" "+this.state.input[ind4]
              if(this.state.input[ind4]) {
                  str4 = str4 + "#" + this.state.input[ind4]
              }
              else str4=str4+'#'+'?'

              if(this.state.input[ind5]) {
                  str5 = str5 + "#" + this.state.input[ind5]
              }
              else str5=str5+'#'+'?'
          }
          console.log(str3)
          console.log(str4)
          console.log(str5)
          jsonData.proj_name=str3
          jsonData.proj_link=str4
          jsonData.proj_desc=str5
          fetch('http://127.0.0.1:8000/first_module/uskill/addskill/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/register4"
      }
       handleChangeSkill = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions :selectedOptions })
        }
        handleChangeOpenTo = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions_2:selectedOptions })
        }
        handleChange(event) {
    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
    render() {

        return(<React.Fragment>
            <Navb/>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2" style={{height:'auto',overflow: 'visible'}}>
                <p className="seems-h1_reg"><b> Edit Skills</b></p>
                <p style={{
              fontSize:18,

              fontWeight:"bold",
                    marginRight:-20

                }}>Skills</p>
                <hr/>
                 <form onSubmit={this.handleSubmit}>
                <div className="row" style={{ marginBottom:5 }}>
                 <div className="form-group">
                 <InputLabel for="skills">Skills:</InputLabel>
                 <Select name="skills" id="skills" styles={dropDownStyle} options={SkillOptions} onChange={this.handleChangeSkill} isMulti placeholder="Add Your Skills" openMenuOnFocus isClearable />
             </div>
            </div>
            <div className="row" style={{ marginBottom:5}}>
                <div className="form-group">
                <InputLabel for="open_skills">Currently Open To:</InputLabel>
                <Select name="open_skills" id="open_skills" styles={dropDownStyle} options={this.state.selectedOptions} onChange={this.handleChangeOpenTo} isMulti placeholder="Add Skills that You are Currently Open to Work with " openMenuOnFocus isClearable />
             </div>
            </div>
            <button className="btn btn-success" onClick={this.handleFieldSubmit}>Submit</button>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default EditSkill;