import React , { useState } from 'react';
import Map from './components/Map';
import ShowData from './components/ShowData';
import CoordinatesShapesContext from './context/CoordinatesShapesContext';

export default function App() {

  const [coordinatesShapes , setCoordinatesShapes] = useState([]);
  
  return (
    <div className='h-screen w-full flex flex-row justify-center items-center gap-2 bg-white p-4'>
      <CoordinatesShapesContext.Provider value={[coordinatesShapes , setCoordinatesShapes]}>
        <Map />
        <ShowData />
      </CoordinatesShapesContext.Provider>
    </div>
  );
}
