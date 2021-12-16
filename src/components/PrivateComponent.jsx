import { useUser } from 'context/userContext';
import React from 'react';

const PrivateComponent = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    console.log("rol de ususario", userData.rol)
    console.log("estado del ususario", userData.estado)
    console.log("esto es todo el usuario", userData)
    return children;
  }

  return <></>;
};

export default PrivateComponent;
