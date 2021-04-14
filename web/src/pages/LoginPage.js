import React from "react";
import ReactDom from 'react-dom';

const LoginPage = () => {
  return (
    <div>
      <form action="/login" method="POST">
        <div>
          <label>Correo: </label>
          <input type="text" name="email"></input>
        </div>
        <div>
          <label>Contraseña: </label>
          <input type="password" name="password"></input>
        </div>
        <div>
          <input type="submit" value="Iniciar Sesión"></input>
        </div>
      </form>
    </div>
  )
};

ReactDom.render(<LoginPage />, document.getElementById('root'));
