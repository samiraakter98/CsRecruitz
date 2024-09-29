import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './nakshi.css';
import {HiLocationMarker} from "react-icons/hi";
import {HiSortAscending} from "react-icons/hi";
import {HiSortDescending} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';
import {ImCross} from 'react-icons/im';

import Filter_sidebar from "./Filter_sidebar";
import Navb from "./Navb";
import {storage} from "./Firebase";
import Select from "react-select"
import Jobdetailsitems from "./jobdetailsitems";
import {Navigate, useParams} from "react-router-dom";
import Loader from "./loader";
import Foot from "./Foot";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import {AiFillEdit} from "react-icons/ai";

var jsonData = {
    "job_id":"",
    "mount":"",
    "mountfrom":"job",
    "type":"",
    "ifshortlist":"",
    "iffollow":"",
    "projs":"",
    "pubs":"",
    "lics":"",
    "extras":"",
    "resume":""
  }
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
let dummy_files=[];
class Jobdetails extends Component {
    state={
        items:[],
        proj_options:[],
        pub_options:[],
        lic_options:[],
        projects:[],
        selected_projs:[],
        selected_pubs:[],
        selected_lics:[],
        pubs:[],
        lics:[],
        file_array:[],
        res_array:[],
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        DetailsLoaded4:false,
        DetailsLoaded5:false,
        DetailsLoaded6:false,
        req_exp:"",
        editopen:false,
        ifapplied:"",
        ifshortlisted:"",
        iffollowed:"",
        empid:""
    }

    constructor(props) {
        super(props);
        this.handleClickApply=this.handleClickApply.bind(this);
        this.handleClickShortlist=this.handleClickShortlist.bind(this);
        this.handleClickFollow=this.handleClickFollow.bind(this);
        this.handleClickVisit=this.handleClickVisit.bind(this);
        this.handleClickModal=this.handleClickModal.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleChangeFile=this.handleChangeFile.bind(this);
        this.ClearAll=this.ClearAll.bind(this);
        this.handleChangeResume=this.handleChangeResume.bind(this);
        this.ClearResume=this.ClearResume.bind(this);
        this.handleChangeDropProj=this.handleChangeDropProj.bind(this);
        this.handleChangeDropPub=this.handleChangeDropPub.bind(this);
        this.handleChangeDropLic=this.handleChangeDropLic.bind(this);

      }
      handleChangeDropProj= (selectedOptions) => {
        this.setState({ selected_projs :selectedOptions })

      }
      handleChangeDropPub= (selectedOptions) => {
         this.setState({ selected_pubs :selectedOptions })
      }
      handleChangeDropLic= (selectedOptions) => {
         this.setState({ selected_lics :selectedOptions })
      }
      ClearResume(event) {
            this.setState({
                res_array:[]
            })
      }
      ClearAll(event) {
        dummy_files=[];
        this.setState({
            file_array:[]
        })
      }
      handleChangeResume(event) {
        let dummy_res=[];
        if(event.target.files[0]) {
            console.log("resumeeeeeeee")
              var path='resumes/'+event.target.files[0].name;
              var link_to_pdf="";
              storage.ref(path).put(
                  event.target.files[0]
              ).then(snap => {
                      storage.ref(path).getDownloadURL().then(url => {
                          console.log(url);
                          link_to_pdf=url;
                          let obj={
                          "name":event.target.files[0].name,
                          "link":link_to_pdf
                        }
                        dummy_res.push(obj);
                      this.setState({
                    res_array:dummy_res,
                })
                          event.target.value=null;

                      })

                  }
              )
          }

      }
      handleChangeFile(event) {
          if (event.target.files[0]) {

              var path='extras/'+event.target.files[0].name;
              var link_to_pdf="";
              storage.ref(path).put(
                  event.target.files[0]
              ).then(snap => {
                      storage.ref(path).getDownloadURL().then(url => {
                          console.log(url);
                          link_to_pdf=url;
                          let obj={
                          "name":event.target.files[0].name,
                          "link":link_to_pdf
                        }
                        dummy_files.push(obj);
                      this.setState({
                    file_array:dummy_files,
                })
                      console.log(this.state.file_array);
                      event.target.value=null;
                      })

                  }
              )
          }
      }
      handleClickModal() {
        this.setState({editopen: true});
        let proj_dummy=[]
        let pub_dummy=[]
        let lic_dummy=[]
                //console.log("hereee");
                //console.log(this.state.projects.length);
                for(let i=0;i<this.state.projects.length;i++) {
                    let obj={
                "value":this.state.projects[i].project_name,
                 "label":this.state.projects[i].project_name
                }
                proj_dummy.push(obj);
                }
                this.setState({
                    proj_options:proj_dummy,
                })
          for(let i=0;i<this.state.pubs.length;i++) {
                    let obj={
                "value":this.state.pubs[i].publication_name,
                 "label":this.state.pubs[i].publication_name
                }
                pub_dummy.push(obj);
                }
                this.setState({
                    pub_options:pub_dummy,
                })
          for(let i=0;i<this.state.lics.length;i++) {
                    let obj={
                "value":this.state.lics[i].lic_name,
                 "label":this.state.lics[i].lic_name
                }
                lic_dummy.push(obj);
                }
                this.setState({
                    lic_options:lic_dummy,
                })
            //console.log(this.state.proj_options)
   }
    handleClose() {
      this.setState({editopen:false})

    }

    componentDidMount() {
        // const { id } = useParams()
        // console.log(id)
        console.log(window.location.href)
        const url=window.location.href
        const splitid = url.split("?")
        const id=splitid[1]
        console.log(id)
        jsonData.job_id=id
        jsonData.mount="true"
        fetch(
            "http://127.0.0.1:8000/"+id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DetailsLoaded1: true
                });
                console.log(json)
                const exp_text="At least "+json.required_experience.toString()+" year(s)"
                this.setState({'req_exp':exp_text})
                const jid = json.jobpost_id
                this.setState({'job_id': jid})
                console.log(json.employer_id)
                this.setState({'empid': json.employer_id})
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
                console.log(json.response)
                if (json.response==="applied") {
                         this.state.ifapplied=true
                    }
                    else {
                       this.state.ifapplied=false
                    }
                if (json.short==="shortlisted") {
                    this.state.ifshortlisted=true
                }
                else {
                   this.state.ifshortlisted=false
                }
            //    follow code
                if (json.follow==="followed") {
                    this.state.iffollowed=true
                }
                else {
                   this.state.iffollowed=false
                }
            })
        fetch(
            "http://127.0.0.1:8000/first_module/proj/get_proj")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    projects: json.data,
                    DetailsLoaded4:true
                });

            console.log(json.data)

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
            console.log(this.state)
            //  this.setState({logged_in_id:this.items.user_id})
            // console.log(this.state.items.user_id)

            })

    }

    handleClickApply() {
    jsonData.job_id=this.state.job_id
    jsonData.mount="false"
    jsonData.type="apply"
        var str1=""
        for (let i=0;i<this.state.selected_projs.length;i++) {
              str1=str1+"#"+this.state.selected_projs[i].value
          }
        jsonData.projs=str1;
        var str2=""
        for (let i=0;i<this.state.selected_pubs.length;i++) {
              str2=str2+"#"+this.state.selected_pubs[i].value
          }
        jsonData.pubs=str2;
        var str3=""
        for (let i=0;i<this.state.selected_lics.length;i++) {
              str3=str3+"#"+this.state.selected_lics[i].value
          }
        jsonData.lics=str3;
        var str4=""
        for (let i=0;i<this.state.file_array.length;i++) {
              str4=str4+" "+this.state.file_array[i].link;
          }
        jsonData.extras=str4;
        var str5=""
        if(this.state.res_array[0]) {
             str5= this.state.res_array[0].link;
        }


        jsonData.resume=str5;

    //this.state.ifapplied=!this.state.ifapplied
    fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
        window.location.href="/userprev"
    // this.setState({'redirect':true})
  }

  handleClickShortlist() {
    jsonData.job_id=this.state.job_id
    jsonData.mount="false"
    jsonData.type="shortlist"
    // this.state.ifshortlisted=!this.state.ifshortlisted
    console.log(this.state.ifshortlisted)
      if(this.state.ifshortlisted==false)
      {
          jsonData.ifshortlist="true"
      }
      else
      {
          jsonData.ifshortlist="false"
      }
      this.setState({ifshortlisted:!this.state.ifshortlisted})
    console.log(this.state.ifshortlisted)
    console.log(jsonData.ifshortlist)
    fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
  }

  handleClickFollow() {
    jsonData.job_id=this.state.job_id
    jsonData.mount="false"
    jsonData.type="follow"
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

  handleClickVisit() {
    const concatlink = "/empprofile?" + this.state.empid;
    this.setState({'navlink':concatlink})
    this.setState({'redirect':true})
    }
    render() {
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded2 || !this.state.DetailsLoaded4 || !this.state.DetailsLoaded5 ||!this.state.DetailsLoaded6 ) return <Loader/>
        return (
            <React.Fragment>
            <body>
            <Navb/>
            <div className="jobdetailsbgdiv">
                <div className="job_title_div">
                    <h3 className="job_title_h">{this.state.items.title}</h3>
                    <h6 className="job_emp_h">{this.state.items.emp_name}</h6>
                </div>

            <div className="jobdetailsdiv">
                <Jobdetailsitems title="Vacancies" text_val={this.state.items.vacancies}/>
                <Jobdetailsitems title="Job Context" text_val={this.state.items.job_context}/>

                <Jobdetailsitems title="Job Responsibilities" text_val={this.state.items.job_responsibilities}/>


                <Jobdetailsitems title="Job Nature" text_val={this.state.items.job_nature}/>
                <Jobdetailsitems title="Educational Requirements" text_val={this.state.items.edu_requirement}/>
                <Jobdetailsitems title="Experience Requirements" text_val={this.state.req_exp}/>

                <Jobdetailsitems title="Additional Requirements" text_val={this.state.items.additional_requirements}/>
                <Jobdetailsitems title="Apply Procedures" text_val={this.state.items.application_process}/>

            </div>
            <div className="jobsummarydiv">
                <div className="overviewheader"><h5 style={{color:"white"}}>Job Overview</h5></div>
                <div className="jobsummaryinsidediv">
                <p><b>Published on:</b> {this.state.items.post_date}</p>
                <p><b>Application deadline:</b> {this.state.items.deadline_date}</p>
                <p><b>Job nature:</b> {this.state.items.job_nature}</p>
                <p><b>Location:</b> {this.state.items.emp_division}</p>
                <p><b>Salary:</b> {this.state.items.salary} BDT</p>
                <p><b>Required Experience:</b> {this.state.req_exp}</p>
                <p><b>Vacancy:</b> {this.state.items.vacancies}</p>

                <span style={{textAlign:"center"}}>
                    {this.state.ifapplied && <button className="job_details_btn_disabled" disabled={true}>Applied</button>}
                    {!this.state.ifapplied && <button className="job_details_btn" onClick={this.handleClickModal}>Apply Now</button>}
                    {this.state.ifshortlisted && <button className="job_details_btn_short" onClick={this.handleClickShortlist}>Shortlisted</button>}
                    {!this.state.ifshortlisted && <button className="job_details_btn" onClick={this.handleClickShortlist}>Shortlist Job</button>}
                    {this.state.iffollowed && <button className="job_details_btn_short" onClick={this.handleClickFollow}>Unfollow Employer</button>}
                    {!this.state.iffollowed && <button className="job_details_btn" onClick={this.handleClickFollow}>Follow Employer</button>}
                    <button className="job_details_btn" onClick={this.handleClickVisit}>Visit Employer</button>
                    {/*<button className="job_details_btn">Follow Employer</button>*/}
                </span>




                </div>

            </div>
            </div>
            <Modal
        open={this.state.editopen}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            {/* <p className="seems-h1_reg"><b> Change Your Information</b></p> */}
                <div className="row" style={{
                    marginBottom:15
                }}>
                    <p className="seems-h1_reg" style={{marginBottom:"5px" }}><b> Submit Application Requirements </b></p>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Projects that you want to highlight:</InputLabel>
                            <Select name="proj" id="proj" styles={dropDownStyle} options={this.state.proj_options} onChange={this.handleChangeDropProj} placeholder="Enter Projects" isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
               <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Publications that you want to highlight:</InputLabel>
                            <Select name="pub" id="pub" styles={dropDownStyle} options={this.state.pub_options} onChange={this.handleChangeDropPub} placeholder="Enter Publications"  isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
            <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Credentials that you want to highlight:</InputLabel>
                            <Select name="lic" id="lic" styles={dropDownStyle} options={this.state.lic_options} onChange={this.handleChangeDropLic} placeholder="Enter Credentials" isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
            <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}>Add necessary credentials for application (pdf only)</InputLabel>
                        <input
                            type="file"
                            name="extra_file"
                            onChange={this.handleChangeFile}
                            className="form-control"
                            placeholder="Upload Credentials"
                            id="extra_file"/>
                        </div>
                        {this.state.file_array.map((files,index) => {

                                { if(index===0) return(
                                <div style={{marginTop:10}}><div><a href={files.link} target="_blank">{files.name}</a></div><button className="clear_btn" onClick={this.ClearAll}><ImCross className="cross"/>Clear All</button></div>
                                    )
                                }
                            { if(index!==0) return(
                                <div style={{marginTop:10}}><a href={files.link} target="_blank">{files.name}</a></div>
                                    )
                            }

                        })

                        }
                    </div>

                </div>
             <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}>Add Resume (pdf only)</InputLabel>
                        <input
                            type="file"
                            name="cv"
                            onChange={this.handleChangeResume}
                            className="form-control"
                            placeholder="Upload Resume"

                            id="cv"/>
                        </div>
                        {this.state.res_array.map((files,index) => {

                                { if(index===0) return(
                                    <div style={{marginTop:10}}><div><a href={files.link} target="_blank">{files.name}</a></div><button className="clear_btn" onClick={this.ClearResume}><ImCross className="cross"/>Clear</button></div>
                                    )
                                }
                            { if(index!==0) return(
                                <div style={{marginTop:10}}><a href={files.link} target="_blank">{files.name}</a></div>
                                    )
                            }

                        })

                        }
                    </div>

                </div>

                <button className='btn btn-success' style={{marginTop:"5px",width:"20%",marginRight:"-2px", marginBottom:"10px"}} onClick={this.handleClickApply}>Submit</button>

        </Box>

      </Modal>
            <Foot margin_value={40}/>
            {this.state.redirect && <Navigate to={this.state.navlink}/>}
            </body>
                </React.Fragment>
        )
    }
}

export default Jobdetails;