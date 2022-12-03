import {Marker, useMapEvents, useMap} from 'react-leaflet';
import React, { useMemo } from 'react';
import L from 'leaflet';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function AddMarkerToClick(props) {
    const {markers,setMarkers,liveLoc,setLiveLoc,setPosition}=props;
    const map = useMap();
    map.locate().on("locationfound", function (e) {
      let live = e.latlng
      setPosition([live.lat,live.lng]);
    });

    useMapEvents({
      click(e) {
        const newMarker = e.latlng;
        setMarkers([...markers, newMarker]);
      }
    })
    useMemo(()=>{
      if(liveLoc){
        L.Routing.control({
            waypoints: markers,
            routeWhileDragging: true
        }).addTo(map);
        setLiveLoc(false);
      }
    },[liveLoc])
  
    return (
      <>
        {markers.length===0?'':markers.map((marker,i)=> <Marker position={marker} key={i}></Marker>)}
      </>
    )
  }