import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Input from "components/Input";
import { GET_USUARIOS } from "graphql/usuarios/queries";
import { Link } from "react-router-dom";
import DropDown from "components/Dropdown";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { Enum_TipoObjetivos } from "utils/enums";
import { nanoid } from "nanoid";
import { ObjContext, useObj } from "context/objContext";
import { CREAR_PROYECTO } from "graphql/proyectos/mutations";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import PrivateComponent from "components/PrivateComponent";

const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { userData } = useUser();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthF = date.getMonth() + 1;
  const year = date.getFullYear();
  let fInicio = "";
  if (month < 10) {
    let fInicio = `${year}-0${month}-${day}`;
    console.log(fInicio);
  } else {
    let fInicio = `${year}-${month}-${day}`;
    console.log(fInicio);
  }

  // falta captura del error del query
  const { data, loading } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: "LIDER", estado: "AUTORIZADO" },
    },
  });

  // falta mensaje de success
  // falta captura del error de la mutacion y revisar si se debe agregar el loading
  const [crearProyecto, { load }] = useMutation(CREAR_PROYECTO);

  useEffect(() => {
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.objetivos) {
      formData.objetivos = Object.values(formData.objetivos);

      formData.presupuesto = parseFloat(formData.presupuesto);
    } else {
      formData.presupuesto = parseFloat(formData.presupuesto);
    }

    crearProyecto({
      variables: formData,
    });
    crearProyecto
      ? toast.success("Proyecto creado con exito")
      : toast.error("Ups algo salio mal, no se pudo crear el proyecto");
  };

  if (loading) return <div>...Loading</div>;
  if (data)
    return (
      <div className="p-10 flex flex-col items-center">
        <div className="self-start">
          <Link to="/proyectos">
            <i className="fas fa-arrow-left text-pink-400 cursor-pointer font-bold text-xl" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-200">
          Crear Nuevo Proyecto
        </h1>
        <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
          <Input
            name="nombre"
            label="Nombre del Proyecto"
            required
            type="text"
          />
          <Input
            name="presupuesto"
            label="Presupuesto del Proyecto"
            required
            type="number"
          />
          <Input
            name="fechaInicio"
            label="Fecha de Inicio"
            defaultValue={fInicio}
            required
            type="date"
          />
          <Input name="fechaFin" label="Fecha de Fin" required type="date" />
          <PrivateComponent roleList={["ADMINISTRADOR"]}>
            <DropDown
              label="Líder"
              options={listaUsuarios}
              name="lider"
              required
            />
          </PrivateComponent>
          <PrivateComponent roleList={["LIDER"]}>
            <div className="hidden">
              <DropDown
                label="Líder"
                options={listaUsuarios}
                name="lider"
                required
                defaultValue={userData._id}
              />
            </div>
          </PrivateComponent>
          <Objetivos />
          <ButtonLoading
            text="Crear Proyecto"
            loading={load}
            disabled={false}
          />
        </form>
      </div>
    );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {!maxObjetivos && (
          <button
            type="button"
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
          >
            <i className="fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer" />
          </button>
        )}
        {listaObjetivos.map((objetivo) => objetivo)}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className="flex items-center">
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label="Descripción"
        type="text"
        required
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivos}
        label="Tipo de Objetivo"
        required
      />
      <button type="button" onClick={() => eliminarObjetivo(id)}>
        <i className="fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6" />
      </button>
    </div>
  );
};

export default NuevoProyecto;
