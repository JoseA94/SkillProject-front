import { useUser } from 'context/userContext';
import React from 'react';
const PrivateSidebar = ({ stateList, children }) => {
    const { userData } = useUser();
  
    if (stateList.includes(userData.estado)) {
      console.log("el usuario está autorizado")
      return children;
    }
  
    return <></>;
  };
  
  export default PrivateSidebar;