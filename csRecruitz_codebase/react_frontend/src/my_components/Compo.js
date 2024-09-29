import react from 'react'
import { useNavigate } from 'react-router-dom';

function Compo(props) {
    const history = useNavigate();
    return (
        <div>
            <h2>my component {props.name}</h2>
            <button className="btn btn-success" onClick={()=> history("/dashboard")}>Dashboard</button>
            <button className="btn btn-success" onClick={()=> history("/joblist")}>joblist</button>
            <button className="btn btn-success" onClick={()=> history("/jobdetails")}>jobdetails</button>
            <button className="btn btn-success" onClick={()=> history("/home")}>Home</button>
        </div>
    )
}
export default Compo;
