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
import DropDown from "components/Dropdown";
import Input from "components/Input";
import useFormData from "hooks/useFormData";
import { Enum_EstadoProyecto } from "utils/enums";
import { Enum_FaseProyecto } from "utils/enums";
import { AccordionStyled } from "components/Accordion";
import { AccordionSummaryStyled } from "components/Accordion";
import { AccordionDetailsStyled } from "components/Accordion";
import { Enum_TipoObjetivos } from "utils/enums";
import { EDITAR_OBSERVACIONES } from 'graphql/avances/mutations';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import { Dialog } from '@mui/material';
import { PROYECTOS } from "graphql/proyectos/queries";


const Proyecto = () => {
  const { idProyecto } = useParams();
  const { userData } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [
    actualizarProyecto,
    { dataMutation: dataMutationP, lo: loadingp, err: errorp },
  ] = useMutation(EDITAR_PROYECTO);

  const {
    data: queryData,
    loading,
    error,
  } = useQuery(PROYECTO, {
    variables: { _id: idProyecto },
  });

  const submitForm = (e) => {
    e.preventDefault();
    formData.presupuesto = parseFloat(formData.presupuesto);

    actualizarProyecto({
      variables: {
        _id: idProyecto,
        campos: formData,
      },
    });
    actualizarProyecto
      ? toast.success("Edicion exitosa")
      : toast.error("Ups algo salio mal, no se pudo editar el proyecto");

    setMostrarInputs(false);
  };
  useEffect(() => {
    console.log("data mutation", dataMutationP);
  }, [dataMutationP]);

  useEffect(() => {
    console.log("datos proyecto", queryData);
    console.log("datos usuario", userData);
  }, [queryData, userData]);

  if (loading) return <div>Cargando...</div>;

  if (
    queryData.Proyecto &&
    userData.estado !== "PENDIENTE" &&
    userData.estado !== "NO_AUTORIZADO"
  )
    return (
      <div className="h-full p-5 md:p-14 relative ">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left text-pink-400 cursor-pointer font-bold text-xl" />
        </Link>
        <div className="justify-center text-white items-center">
          {mostrarInputs ? (
            <>
              <div className="absolute right-14 md:right-20 md:top-20">
                <PrivateComponent roleList={["ADMINISTRADOR"]}>
                  <i
                    className="mx-4 fas fa-times text-red-600 hover:text-red-700"
                    onClick={() => setMostrarInputs(!mostrarInputs)}
                  />
                </PrivateComponent>
              </div>
              <form
                ref={form}
                onChange={updateFormData}
                onSubmit={submitForm}
                className="text-black"
              >
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
                  defaultValue={queryData.Proyecto.fechaInicio.slice(0, -14)}
                  required={true}
                />
                <Input
                  label="fecha de finalizacion del Proyecto"
                  type="date"
                  name="fechaFin"
                  defaultValue={queryData.Proyecto.fechaFin.slice(0, -14)}
                  required={true}
                />

                <div className="flex justify-center">
                  <ButtonLoading
                    disabled={false}
                    loading={loadingp}
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
                <PrivateComponent roleList={["ESTUDIANTE"]}>
                  <InscripcionProyecto
                    idProyecto={queryData.Proyecto._id}
                    estado={queryData.Proyecto.estado}
                    inscripciones={queryData.Proyecto.inscripciones}
                  />
                </PrivateComponent>
              </div>
              <div className="flex flex-col text-white font-bold">
                <span className="">estado: {queryData.Proyecto.estado}</span>
                <span className="">fase: {queryData.Proyecto.fase}</span>
                <span>presupuesto: {queryData.Proyecto.presupuesto} COP</span>
              </div>
              <div className="flex flex-col">
                <span>
                  fecha inicio: {queryData.Proyecto.fechaInicio.slice(0, -14)}
                </span>
                <span>
                  fecha fin: {queryData.Proyecto.fechaFin.slice(0, -14)}
                </span>
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
          <div className="pb-4  w-full">
            <AccordionStyled>
              <AccordionSummaryStyled>
                <h2>Objetivos</h2>
              </AccordionSummaryStyled>
              <AccordionDetailsStyled>
                {queryData.Proyecto.objetivos.length > 0 ? (
                  queryData.Proyecto.objetivos.map((objetivo) => {
                    return (
                      <Objetivo
                        key={objetivo._id}
                        tipo={objetivo.tipo}
                        descripcion={objetivo.descripcion}
                        idProyecto={queryData.Proyecto._id}
                        indexObjetivo={queryData.Proyecto.objetivos.indexOf(
                          objetivo
                        )}
                      />
                    );
                  })
                ) : (
                  <h2>Aun no se han registrado avances</h2>
                )}
              </AccordionDetailsStyled>
            </AccordionStyled>
          </div>
          <div className="">
            <AccordionStyled>
              <AccordionSummaryStyled>
                <h2>Avances</h2>
                <PrivateComponent roleList={["ESTUDIANTE"]}>
                  <div className="flex mx-2">
                    <button
                      onClick={() => setOpenDialog(true)}
                      className='fas fa-book text-green-300 hover:text-blue-800 cursor-pointer'
                      type='button'
                              >                                
                    </button>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                      <CrearAvance proyecto={idProyecto} setOpenDialog={setOpenDialog} />
                                 
                    </Dialog>
                  </div>
                </PrivateComponent>
              </AccordionSummaryStyled>
              <AccordionDetailsStyled>
                {queryData.Proyecto.avances.length > 0 ? (
                  queryData.Proyecto.avances.map((avance) => {
                    return (
                      <Avance
                        key={avance._id}
                        fecha={avance.fecha.slice(0, -14)}
                        descripcion={avance.descripcion}
                        observaciones={avance.observaciones}
                        creadoPor={avance.creadoPor.nombre}
                      />
                    );
                  })
                ) : (
                  <h2>Aun no se han registrado avances</h2>
                )}
              </AccordionDetailsStyled>
            </AccordionStyled>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <h1 className="text-center text-3xl text-white">
        hubo un error O.o por favor comunicate con la linea de atencion al
        cliente: 4444123
      </h1>
    </>
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
            <div className="font-bold text-lg">Descripcion Objetivo:</div>
            <Input
              type="text"
              name="descripcion"
              defaultValue={descripcion}
              required={true}
            />
            <div className="font-bold text-lg">Tipo Objetivo:</div>
            <DropDown
              name="tipo"
              options={Enum_TipoObjetivos}
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

const CrearAvance = ({ proyecto, setOpenDialog }) => {
  const { userData } = useUser();
  const { form, formData, updateFormData } = useFormData();

  const [crearAvance, { loading }] = useMutation(CREAR_AVANCE, {
    refetchQueries: [PROYECTOS],
  });

  const submitForm = (e) => {
    e.preventDefault();

    crearAvance({
      variables: { ...formData, proyecto, creadoPor: userData._id },
    })
      .then(() => {
        toast.success('avance creado con exito');
        setOpenDialog(false);
      })
      .catch(() => {
        toast.error('error creando el avance');
      });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Crear Nuevo Avance </h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='descripcion' label='Descripción' type='text' />
        <Input name='fecha' label='Fecha' type='date' />
        <ButtonLoading
          text='Crear Avance'
          loading={loading}
          disabled={Object.keys(formData).length === 0}
        />
      </form>
    </div>
  );
};

const Avance = ({ _id, fecha, descripcion, observaciones, creadoPor }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editar, setEditar] = useState(false);
  const [editarObservaciones, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_OBSERVACIONES);
    const submitForm = (e) => {
      e.preventDefault();
      editarObservaciones({
        variables: {
          _id,
          descripcion: descripcion,
          observaciones: observaciones,
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
            <PrivateComponent roleList={["LIDER"]}>
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
            <div className="font-bold text-lg">Editar Observaciones:</div>
            <Input
              type="text"
              name="observaciones"
              defaultValue={observaciones}
              required={true}
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
          <div className="text-lg font-bold">Fecha: {fecha}</div>
          <div><span className="font-bold">Descripción: </span> {descripcion} </div>
          <div><span className="font-bold">Observaciones:  </span>{observaciones}</div>
          <div><span className="font-bold" >Creado por: </span> {creadoPor} </div>
          
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
