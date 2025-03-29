import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Rain from './Assets/Images/Rain-img.png'
import Clouds from './Assets/Images/Clouds-img.png'

function App() {

  const[climateCondition,setClimateCondition] = useState("");
  const[city,setCity] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); 
  

async function getWether(){

try{
  setLoading(true);
  setError(null);
  console.log("In getWeather")
  const APIURL='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=aea5beccc316a48fc65afa90c04dde29';

  console.log(APIURL)
  const response = await fetch(APIURL)
  //console.log(response)
  if (!response.ok) {
    setClimateCondition("Unable to Fetch the data");
    //throw new Error('Network response was not ok');
  }

  const data = await response.json()
  console.log(data)

  setClimateCondition(data.weather[0].main);

  console.log(climateCondition)
  setLoading(false);
} catch (error) {
  setError(error.message);
} 
}

if(loading){
  return <div>Loading...</div>
}
if (error){
  return <div>Error...{error}</div>
}

  return (
    <>
    <div className="weather-box">
    <h1>Weather</h1>
    <input type="text" onChange={(e) => setCity(e.target.value)}/>
    <h2>{climateCondition}</h2>
    {
      climateCondition == 'Rain' ?
      <img className="weather-image" src={Rain} alt=""/> : 
      climateCondition == 'Clouds'  ? <img className="weather-image" src={Clouds} alt=""/> :<h2> No Image </h2>
    }
    </div>
    <button onClick={getWether}>Hit me</button>
    </>

  );
}

export default App;