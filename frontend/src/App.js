import './App.css';
import {
  MapContainer,
  TileLayer
} from 'react-leaflet';
import AddMarkerToClick from './addlocation';
import { useEffect,useState} from 'react';

function App() {
  const [data , setData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [liveLoc, setLiveLoc] = useState(false);
  const [position , setPosition] = useState([28.7041,77.1025]);

  useEffect(()=>{
    const fetchData = async () => {

      fetch('http://localhost:5000/select')
      .then((data)=>data.json())
      .then((data)=>{
        console.log(data);
        setData(data.data);
      })
    }
    fetchData();
  },[]);
  const onClickHandler=async ()=>{
    setMarkers([{ lat : position[0], lng : position[1]}, ...markers]);
      fetch("http://localhost:5000/addLocation", {
        method: "POST",
        body: JSON.stringify({
            "date" : new Date(),
            "loc" : markers
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      }).then((res)=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err));
    setLiveLoc(true);
  }
  
  return (
    <div className="App">
      <button className='add-to-db' onClick={onClickHandler}>Add location</button>
      <select id='dropdown'>
        <option>History</option>
        {data.map((opt,i)=>{
          return <option key={i} value={opt._id}>{opt.date}</option>
        })}
      </select>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick markers={markers} setMarkers={setMarkers} liveLoc={liveLoc} setLiveLoc={setLiveLoc} setPosition={setPosition}/>
      </MapContainer>
    </div>
  );
}

export default App;
