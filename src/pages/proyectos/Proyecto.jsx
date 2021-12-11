import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PROYECTO } from "graphql/proyectos/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import ButtonLoading from "components/ButtonLoading";
import PrivateComponent from "components/PrivateComponent";

const Proyecto = () => {
  const { idProyecto } = useParams();
  const {
    data: queryData,
    loading,
    error,
  } = useQuery(PROYECTO, {
    variables: { _id: idProyecto },
  });

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyecto)
    return (
      <div>
        <Link to="/proyectos">
          <i className="fas fa-angle-left" />
        </Link>
        <h2>{queryData.Proyecto.nombre}</h2>
        <span>{queryData.Proyecto.estado}</span>
        <span>{queryData.Proyecto.fase}</span>
        <InscripcionProyecto
          idProyecto={queryData.Proyecto._id}
          estado={queryData.Proyecto.estado}
          inscripciones={queryData.Proyecto.inscripciones}
        />

        <div className="flex">
          {queryData.Proyecto.objetivos.map((objetivo) => {
            return (
              <Objetivo
                tipo={objetivo.tipo}
                descripcion={objetivo.descripcion}
              />
            );
          })}
        </div>
      </div>
    );
};
const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="text-lg font-bold">{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={["ADMINISTRADOR"]}>
        <div>Editar</div>
      </PrivateComponent>
    </div>
  );
};
const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState("");
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("inscripcion creada con exito");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion !== "" ? (
        <span>{estadoInscripcion}</span>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === "INACTIVO"}
          loading={loading}
          text="Inscribirme"
        />
      )}
    </>
  );
};
export default Proyecto;
