import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/userContext";
import { PROYECTOS_LIDER } from "graphql/proyectos/queries";

const ProyectosLider = () => {
  const { idLider } = useParams();
  const { userData } = useUser();
  const {
    data: queryData,
    loading,
    error,
  } = useQuery(PROYECTOS_LIDER, {
    variables: {
      lider: idLider,
    },
  });
  useEffect(() => {
    console.log("datos proyectos lider", queryData);
  }, [queryData]);
  return (
    <div>
      <div className="">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left text-pink-400 cursor-pointer font-bold text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default ProyectosLider;
