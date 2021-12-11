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
      estado
      fase
      objetivos {
        descripcion
        tipo
      }
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
export { PROYECTOS, PROYECTO };
