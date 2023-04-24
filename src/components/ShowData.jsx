import React , { useContext } from 'react';
import Highlight from 'react-highlight'
import 'highlight.js/styles/monokai.css';
import CoordinatesShapesContext from '../context/CoordinatesShapesContext';

export default function ShowData() {

    const coordinatesShapes = useContext(CoordinatesShapesContext)[0];

    const showCoordinatesShapes = () => {
        return (
            coordinatesShapes.map((index) => {
                return(
                    <Highlight key={index.id}>
                        <Highlight className=' !text-purple-400'>
                            {index.type}
                        </Highlight>
                        <Highlight language="javascript" >
                            {JSON.stringify(index.latlng , null , 2)}
                        </Highlight> 
                    </Highlight>
                );
            })
        );
    }

  return (
    <div className='h-full w-4/12 !text-sm bg-neutral-800 rounded overflow-auto'>
        <Highlight>
            coordinatesShapes
        </Highlight>
        {
            showCoordinatesShapes()
        }
    </div>
  );
}
