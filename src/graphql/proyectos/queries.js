import { gql } from "@apollo/client";

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      lider {
        _id
        correo
        nombre
        apellido
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombre
      fechaInicio
      fechaFin
      presupuesto
      estado
      fase
      lider {
        _id
        nombre
        apellido
        correo
      }
      objetivos {
        _id
        descripcion
        tipo
      }
      avances {
        _id
        fecha
        observaciones
        creadoPor {
          _id
          nombre
          apellido
          correo
        }
      }
    }
  }
`;
export { PROYECTOS, PROYECTO };
