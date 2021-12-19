import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "context/userContext";
import { PROYECTOS_LIDER } from "graphql/proyectos/queries";
import PrivateComponent from "components/PrivateComponent";

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

  if (loading) return <div>Cargando...</div>;
  if (queryData.ProyectosLider)
    return (
      <div>
        <div className="w-full border-b border-gray-200 flex items-center justify-end p-2">
          {/* crear nuevo proyecto */}
          <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
            <div className="my-2 self-end">
              <button className="bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400">
                <Link to="/proyectos/nuevo">Crear nuevo proyecto</Link>
              </button>
            </div>
          </PrivateComponent>
          {/* fin crear nuevo proyecto */}
        </div>
        <div className="">
          <Link to="/proyectos">
            <i className="fas fa-arrow-left text-pink-400 cursor-pointer font-bold text-xl" />
          </Link>
        </div>
        <div className="p-10 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-4">
            {queryData.ProyectosLider.map((proyecto) => {
              return (
                <AccordionProyecto key={proyecto._id} proyecto={proyecto} />
              );
            })}
          </div>
        </div>
      </div>
    );
};
const AccordionProyecto = ({ proyecto }) => {
  return (
    <Link to={`/proyectos/${proyecto._id}`}>
      <div className="shadow rounded-xl relative justify-center px-6 py-6 bg-gray-200 text-gray-900">
        <div className="flex w-full justify-between">
          <h2 className="uppercase font-bold font-20 ">{proyecto.nombre}</h2>
          <div className="">
            {proyecto.estado}
            {proyecto.estado === "INACTIVO" ? (
              <i className="fas fa-circle px-3 text-red-600" />
            ) : (
              <i className="fas fa-circle px-3 text-green-500" />
            )}
          </div>
        </div>
        <div>
          <div className="">
            <p>
              Liderado Por: {proyecto.lider.nombre} {proyecto.lider.apellido}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ProyectosLider;
