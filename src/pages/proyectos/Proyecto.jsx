import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PROYECTO } from "graphql/proyectos/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutaciones";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import ButtonLoading from "components/ButtonLoading";
import PrivateComponent from "components/PrivateComponent";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import { EDITAR_OBJETIVO } from "graphql/proyectos/mutations";
import { Enum_TipoObjetivo } from "utils/enums";
import DropDown from "components/Dropdown";
import Input from "components/Input";
import useFormData from "hooks/useFormData";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";

const Proyecto = () => {
  const { idProyecto } = useParams();
  const {
    data: queryData,
    loading,
    error,
  } = useQuery(PROYECTO, {
    variables: { _id: idProyecto },
  });
  const [mostrarInputs, setMostrarInputs] = useState(false);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyecto)
    return (
      <div className="h-full p-5 md:p-10 relative ">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left text-pink-400 cursor-pointer font-bold text-xl" />
        </Link>
        <div className="justify-center text-white items-center">
          {mostrarInputs ? (
            <>
              <div className="absolute right-14 md:right-20 md:top-20">
                <PrivateComponent roleList={["ADMINISTRADOR"]}>
                  <i
                    className="mx-4 fas fa-check text-green-600 hover:text-green-700"
                    onClick={() => setMostrarInputs(!mostrarInputs)}
                  />
                </PrivateComponent>
              </div>
              <form className="text-black">
                <Input
                  label="Nombre del Proyecto"
                  type="text"
                  name="nombre"
                  defaultValue={queryData.Proyecto.nombre}
                  required={true}
                />
                <DropDown
                  label="Estado del Proyecto"
                  name="estado"
                  options={Enum_EstadoProyecto}
                  defaultValue={queryData.Proyecto.estado}
                />
                <DropDown
                  label="Fase del Proyecto"
                  name="fase"
                  options={Enum_FaseProyecto}
                  defaultValue={queryData.Proyecto.fase}
                />
                <Input
                  label="Presupuesto del Proyecto"
                  type="number"
                  name="presupuesto"
                  defaultValue={queryData.Proyecto.presupuesto}
                  required={true}
                />
                <Input
                  label="fecha de inicio del Proyecto"
                  type="date"
                  name="fechaInicio"
                  defaultValue={queryData.Proyecto.fechaInicio}
                  required={true}
                />
                <Input
                  label="fecha de finalizacion del Proyecto"
                  type="date"
                  name="fechaFin"
                  defaultValue={queryData.Proyecto.fechaFin}
                  required={true}
                />

                <div className="flex justify-center">
                  <ButtonLoading
                    disabled={false}
                    loading={loading}
                    text="Confirmar"
                  />
                </div>
              </form>
            </>
          ) : (
            <div className="">
              <div className="absolute md:right-20 md:top-20">
                <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                  <i
                    className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400"
                    onClick={() => setMostrarInputs(!mostrarInputs)}
                  />
                </PrivateComponent>
              </div>
              <div className="flex items-center justify-between ">
                <h2 className="font-24 text-white font-bold">
                  {queryData.Proyecto.nombre}
                </h2>
                <PrivateComponent roleList={["ESTUDIANTE", "ADMINISTRADOR"]}>
                  <InscripcionProyecto
                    idProyecto={queryData.Proyecto._id}
                    estado={queryData.Proyecto.estado}
                    inscripciones={queryData.Proyecto.inscripciones}
                  />
                </PrivateComponent>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold">
                  estado del proyecto: {queryData.Proyecto.estado}
                </span>
                <span className="text-white font-bold">
                  fase del proyecto: {queryData.Proyecto.fase}
                </span>
              </div>
              <div className="flex flex-col">
                <span>fecha inicio: {queryData.Proyecto.fechaInicio}</span>
                <span>fecha fin: {queryData.Proyecto.fechaFin}</span>
              </div>
              <div className="flex flex-col mb-4 mt-4">
                <h2>datos del lider: </h2>
                <span>
                  nombre: {queryData.Proyecto.lider.nombre}{" "}
                  {queryData.Proyecto.lider.apellido}
                </span>
                <span>correo: {queryData.Proyecto.lider.correo}</span>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full">
            <h2>Objetivos</h2>
            {queryData.Proyecto.objetivos.map((objetivo) => {
              return (
                <Objetivo
                  key={objetivo._id}
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                  idProyecto={queryData.Proyecto._id}
                  indexObjetivo={queryData.Proyecto.objetivos.indexOf(objetivo)}
                />
              );
            })}
          </div>
          <div className="">
            <h2>Avances</h2>
            {queryData.Proyecto.avances.map((avance) => {
              return (
                <Avance
                  key={avance._id}
                  fecha={avance.fecha}
                  observaciones={avance.observaciones}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
};
const Objetivo = ({ tipo, descripcion, idProyecto, indexObjetivo }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editar, setEditar] = useState(false);
  const [editarObjetivo, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_OBJETIVO);
  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto: idProyecto,
        indexObjetivo: indexObjetivo,
        campos: formData,
      },
    });
    setEditar(false);
  };
  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className="mx-5 relative text-black my-4 bg-gray-50 p-8 rounded-lg flex flex-col shadow-xl">
      {editar ? (
        <>
          <div className="absolute right-14 md:right-5 md:top-5">
            <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
              <i
                className="mx-4 fas fa-times text-red-600 hover:text-red-700"
                onClick={() => setEditar(!editar)}
              />
            </PrivateComponent>
          </div>
          <form
            ref={form}
            onChange={updateFormData}
            onSubmit={submitForm}
            className="flex flex-col items-center"
          >
            <Input
              label="Descripcion Objetivo"
              type="text"
              name="descripcion"
              defaultValue={descripcion}
              required={true}
            />

            <DropDown
              label="Tipo Objetivo"
              name="tipo"
              options={Enum_TipoObjetivo}
              defaultValue={tipo}
            />
            <ButtonLoading
              disabled={false}
              loading={loading}
              text="Confirmar"
            />
          </form>
        </>
      ) : (
        <>
          <div className="text-lg font-bold">{tipo}</div>
          <div>{descripcion}</div>

          <div className="absolute md:right-5 md:top-5">
            <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
              <i
                className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400"
                onClick={() => setEditar(!editar)}
              />
            </PrivateComponent>
          </div>
        </>
      )}
    </div>
  );
};
const Avance = ({ fecha, observaciones }) => {
  const [editar, setEditar] = useState(false);
  return (
    <div className="mx-5 relative text-black my-4 bg-gray-50 p-8 rounded-lg flex flex-col shadow-xl">
      <div className="text-lg font-bold">{fecha}</div>
      <div>{observaciones}</div>
      <div className="absolute md:right-5 md:top-5">
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <i
            className="mx-4 fas fa-pen text-yellow-600 hover:text-yellow-400"
            onClick={() => setEditar(!editar)}
          />
        </PrivateComponent>
      </div>
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
