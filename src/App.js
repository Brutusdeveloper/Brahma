import logo from './logo.svg';
import React,{useState,useEffect,Fragment } from "react";
import axios from "axios";
import './App.css';

function App() {
  const[nutrition,setnutrition]=useState({})
  const [datavalues, setdatavalues] = useState({});

  useEffect(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let Api2 = await axios.get("https://gist.githubusercontent.com/itoshkov/0fa17a2f1ae3484d23b5/raw/b6c97156f2cb09bb383dc19bcfc8416ab6e7a646/1-large-apple-rs.json", config);
      let Api1 = await axios.get("https://gist.githubusercontent.com/itoshkov/7483180/raw/b5667d96a500ac604f6bab1cc38efe354e9e78c7/recipe.json", config);
      if (Api2 && Api1) {
        setdatavalues(Api2.data.totalNutrients)
        setnutrition(Api1.data)

      }
    } catch (error) {
      console.log(error);
    }
  
  },[]);

  return (
   <Fragment>
    <div className="Top">
     <h2 className="aligncenter">API 1:Ingredients</h2>
     <p className="aligncenter"><strong>{nutrition.title}</strong></p>
     <p>{nutrition.ingr}</p>
    </div>
    <br/>
    <h2 className="aligncenter">API 2:TotalNutrients</h2>
    <section className="Top2">
    <table class="table table-striped w-auto">
      <thead>
        <tr>
          <th>S.No</th>
          {Object.keys(datavalues).map((val)=><th scope="col">{val}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr class="table-info">
          <th scope="row">1</th>
          {Object.values(datavalues).map((val)=><td scope="col">{val.label}</td>)}
        </tr>
        <tr>
          <th scope="row">2</th>
          {Object.values(datavalues).map((val)=><td scope="col">{val.quantity}</td>)}
        </tr>
        <tr class="table-info">
          <th scope="row">3</th>
          {Object.values(datavalues).map((val)=><td scope="col">{val.unit}</td>)}
        </tr>
      </tbody>
    </table>

  </section>
  </Fragment>

  );
}
export default App;
