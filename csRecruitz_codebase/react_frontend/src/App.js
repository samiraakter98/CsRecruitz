import logo from './logo.svg';
import './App.css';
import Compo from './my_components/Compo'
import Myclass from "./my_components/Myclass";
import Example from "./my_components/Example";
import Home from './my_components/Home';

function App() {
  return (
    <div className="App">

        <h1>csRecruitZ</h1>
        <Compo name="Dristi"/>
        <Myclass/>
        <Example/>
    </div>
  );
}

export default App;
