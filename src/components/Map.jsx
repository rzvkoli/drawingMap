import React , { useContext, useEffect, useState } from 'react';
import { MapContainer , TileLayer , FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import CoordinatesShapesContext from '../context/CoordinatesShapesContext';

export default function Map() {

    const [coordinatesShapes , setCoordinatesShapes] = useContext(CoordinatesShapesContext);

    const [leafletId , setLeafletId] = useState('');
    const [newCoordinates , setNewCoordinates] = useState('');

    useEffect(() => {
      if(leafletId !== ''){
        const objectIndex = coordinatesShapes.findIndex(object => object.id === leafletId);
        const updatedObject = {...coordinatesShapes[objectIndex], latlng: newCoordinates};
        const updatedObjects = [...coordinatesShapes.slice(0, objectIndex) , updatedObject , ...coordinatesShapes.slice(objectIndex + 1)];
        setCoordinatesShapes(updatedObjects)
      }
    },[leafletId])

    const _onCreate = e => {

      const obj = {
        "type": "",
        "id": 0,
        "latlng": null
      }

      if(e.layerType === "marker"){
        obj.type = "marker";
        obj.id = e.layer._leaflet_id;
        obj.latlng = e.layer._latlng;
        setCoordinatesShapes(current => [...current , obj]);
      }else if (e.layerType === "polygon"){
        obj.type = "polygon";
        obj.id = e.layer._leaflet_id;
        obj.latlng = e.layer._latlngs;
        setCoordinatesShapes(current => [...current , obj]);
      } else if (e.layerType === "rectangle") {
        obj.type = "rectangle";
        obj.id = e.layer._leaflet_id;
        obj.latlng = e.layer._latlngs;
        setCoordinatesShapes(current => [...current , obj]);
      } else if (e.layerType === "circle") {
        obj.type = "circle";
        obj.id = e.layer._leaflet_id;
        obj.latlng = e.layer._latlng;
        setCoordinatesShapes(current => [...current , obj]);
      }
    }

    const _onEdit = e => {
      e.layers.eachLayer(obj => {
        setLeafletId(obj._leaflet_id);
        setNewCoordinates(obj._latlngs || obj._latlng);
      })
    }

    const _onDeleted = () => {
      setCoordinatesShapes([]);
    }

  return (
    <div className='h-full w-8/12 border rounded'>
        <MapContainer
        center={[35.68903643721261 , 51.389779178336745]}
        zoom={4}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}>
            <FeatureGroup>
                <EditControl
                position='topleft'
                onEdited={_onEdit}
                onCreated={_onCreate}
                onDeleted={_onDeleted}
                draw={{circlemarker:false , polyline:false}}
                />
            </FeatureGroup>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </div>
  );
}