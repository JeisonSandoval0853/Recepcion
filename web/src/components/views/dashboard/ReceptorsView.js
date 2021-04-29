import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReceptorItem from '../../custom/ReceptorItem';

function ReceptorsView() {


  const [receptors, setReceptors] = useState([]);//state para acceder a las propiedades de un elemento HTML - 
  const [ID, setReceptorsID] = useState('');// busca por ID receptor - value=""
  const [company, setReceptorsCompany] = useState('');

  const getReceptors = async () => {
    try {
      const response = await axios.post('/api/receptors',{ID, company});  // Get o post, de acuerdo a la consulta por axios /{} 
      console.log('response: ',response)
      setReceptors(response.data);
    } catch (error) {
      setReceptors([]);
      console.log(error)
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
    if (event.currentTarget.name === 'ID'){
     return setReceptorsID(value);
    }
    setReceptorsCompany(value);
  };

  return (
    <div>
     
      <div>
        <input type="text" placeholder="ID" value={ID} name="ID" onChange={updateState} />
        <input type="text" placeholder="Company" value={company} name="company" onChange={updateState} />
        <button onClick={searchByFilter}>Buscar Receptor</button>
      </div>
      {renderReceptors()}
    </div>
  )

}

export default ReceptorsView;
