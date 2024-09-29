// import React, {Component} from "react";
// class Example extends Component {
//     constructor() {
//         super();
//         this.state={
//             job_lists:[],
//         };
//     }
//     componentDidMount() {
//         fetch("https://jsonplaceholder.typicode.com/users")
//             .then(response => response.json())
//             .then(response=>console.log(response))
//             .then(json => this.setState({ job_lists:json }));
//
//     }
//
//     render() {
//         const { hits } = this.state;
//         return (
//             <div>
//             <h1>class component</h1>
//             {hits.map(hit =>(
//                 <ol>
//               {hit.username}
//           </ol>
//                 ))}
//             </div>
//         );
//     }
// }
//
// export default Example;

import React from "react";
class Example extends React.Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch(
            "http://127.0.0.1:8000/admin/first_module/jobseeker/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;

        return (
        <div className = "App">
            <h1> Fetch data from an api in react </h1>
            {
                items.map((item) => (
                <ol key = { item.id } >
                    Job title: { item.title },
                    </ol>
                ))
            }
        </div>
    );
}
}

export default Example;