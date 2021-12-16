import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation actualizarProyecto($_id: String!, $campos: camposProyecto!) {
    actualizarProyecto(_id: $_id, campos: $campos) {
      _id
      nombre
      estado
      fase
      presupuesto
      fechaInicio
      fechaFin
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto($campos: camposCreacionProyecto) {
    crearProyecto(campos: $campos) {
      _id
      nombre
      estado
      lider {
        _id
      }
    }
  }
`;

const EDITAR_OBJETIVO = gql`
  mutation editarObjetivo(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivos!
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      _id
      objetivos {
        descripcion
        tipo
      }
    }
  }
`;

// const CREAR_OBJETIVO = gql``;

// const ELIMINAR_OBJETIVO = gql``;

// const CREAR_AVANCE = gql``;

// const EDITAR_AVANCE = gql``;

// const ELIMINAR_AVANCE = gql``;

export {
  EDITAR_PROYECTO,
  CREAR_PROYECTO,
  EDITAR_OBJETIVO,
  // CREAR_OBJETIVO,
  // ELIMINAR_OBJETIVO,
  // CREAR_AVANCE,
  // EDITAR_AVANCE,
  // ELIMINAR_AVANCE,
};
