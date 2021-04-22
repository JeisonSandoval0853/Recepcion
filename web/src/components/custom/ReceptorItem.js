import React from 'react';

const ReceptorItem = (props) => {
  return (
    <div>
      <div>
        <p>N° Identificación: {props.ID}</p>
        <p>Correo electrónico: {props.email}</p>
      </div>
    </div> 
)
};

export default ReceptorItem;
