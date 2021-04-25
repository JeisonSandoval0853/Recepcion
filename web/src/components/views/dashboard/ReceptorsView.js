import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReceptorItem from '../../custom/ReceptorItem';

function ReceptorsView() {


  const [receptors, setReceptors] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setReceptorsID] = useState('');// busca por ID receptor - value=""

  const getReceptors = async () => {
    try {
      const response = await axios.post('/api/receptors',{ID});  // Get o post, de acuerdo a la consulta por axios /{}
      setReceptors(response.data);
    } catch (error) {
      setReceptors([]);
      console.log(err)
    }
  }
  useEffect(() => {
    getReceptors();
  }, []);

  const renderReceptors = () => {
    if (receptors.lenght === 0) {
      return (
        <div>Sin Receptores para mostrar</div>
      );
    }
    return receptors.map(receptors => {
      return (

        <ReceptorItem key={receptors._id}{...receptors} />
      )
    })
  };

  const searchByFilter = () => {
    getReceptors();
  };

  const updateState = (event) => {
    const value = event.currentTarget.value;
    if (even.currentTarget.name === 'ID'){
     return setReceptorsID(value);
    }
    setReceptors(value);
  };

  return (
    <div>
      <h1>Consulta receptores</h1>
      <div>
        <input type="text" placeholder="ID" value={ID} name="ID" onChange={updateState} />
        <button onClick={searchByFilter}>Buscar Receptor</button>
      </div>
      {renderReceptors()}
    </div>
  )

}

export default ReceptorsView;
