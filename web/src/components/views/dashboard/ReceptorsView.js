import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReceptorItem from '../../custom/ReceptorItem';

function ReceptorsView() {


  const [receptors, setReceptors] = useState([]);


  const getReceptors = async () => {
    try {
      const response = await axios.get('/api/receptors');
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
        
        <ReceptorItem key={receptors._id}{...receptors}/>
      )
    })
  };

  return (
    <div>
      <h1>Consulta receptores</h1>
      {renderReceptors()}
    </div>
  )

}

export default ReceptorsView;
