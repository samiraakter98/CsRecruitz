import React, {Component} from "react";
import './Personal.css';
import {AiFillInstagram, AiOutlineCopyright} from "react-icons/ai";
import {GrFacebook, GrTwitter} from "react-icons/gr";
class Foot extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className=" text-white-50 footer " style={{
                zIndex:1,
                maxWidth:1600,
                width:"100%",

                position:"absolute",
                marginTop:this.props.margin_value,
                background:"#002A8D"

           }}>
               <div className="container " style={{


                   marginLeft:50,


               }} >
                   <div className="row g-5"  >
                       <div className="col-lg-3 col-md-6" >
                           <h5 className="text-white mb-4" style={{
                               marginTop:10
                           }}>Company</h5>
                           <ul className="footer_list">
                           <li><a className="text-white-50" href="/">About Us</a></li>
                           <li><a className="text-white-50" href="/">Our Services</a></li>
                           <li><a className="text-white-50  " href="/">Terms & Condition</a></li>
                           </ul>
                       </div>

                       <div className="col-lg-3 col-md-6" >
                           <h5 className="text-white mb-4" style={{
                               marginTop:10
                           }}>Contact</h5>
                           <p className="mb-2">BUET, Dhaka, Bangladesh
                           </p>
                           <p className="mb-2">+012 345 67890</p>
                           <p className="mb-2">csRecruitZ@example.com</p>

                       </div>
                       <div className="col-lg-3 col-md-6" >
                           <h5 className="text-white mb-4" style={{
                               marginTop:10
                           }}>Find Us</h5>
                           <div className="d-flex pt-2">
                               <a className="btn-social" href="/"><AiFillInstagram size={'2.5em'} style={{
                                   color:"white",
                                   marginRight:10,
                                   marginTop:-3

                               }}/></a>
                               <a className="btn-social" href="/"><GrFacebook size={'2em'} style={{
                                   background:"white",
                                    marginRight:15
                               }}/></a>
                               <a className=" btn-social" href="/"><GrTwitter size={'2em'} style={{
                                   background:"white"
                               }}/></a>

                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6" >
                           <h5 className="text-white mb-4" style={{
                               marginTop:10
                           }}>Rights and Permissions</h5>
                           <p className="mb-2">All rights reserved by
                           </p>
                           <p>csRecruitZ 2022 <AiOutlineCopyright size={'1.5em'} style={{
                               marginTop:-2
                           }}/></p>
                       </div>

                   </div>
               </div>

           </div>
        )}
}
export default Foot;