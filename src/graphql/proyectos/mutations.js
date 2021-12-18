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
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $fechaInicio: Date!
    $fechaFin: Date!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      fechaInicio: $fechaInicio
      fechaFin: $fechaFin
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
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

const CREAR_OBJETIVO = gql`
  mutation CrearObjetivos($idProyecto: String!, $campos: camposObjetivos!) {
    crearObjetivos(idProyecto: $idProyecto, campos: $campos) {
      _id
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`;

const ELIMINAR_OBJETIVO = gql`
  mutation EliminarObjetivo($idProyecto: String!, $idObjetivo: String!) {
    eliminarObjetivo(idProyecto: $idProyecto, idObjetivo: $idObjetivo) {
      _id
      objetivos {
        _id
        descripcion
        tipo
      }
    }
  }
`;

const CREAR_AVANCE = gql`
  mutation CrearAvance(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
      fecha
      descripcion
      creadoPor {
        _id
      }
      proyecto {
        _id
      }
    }
  }
`;

const EDITAR_DESCRIPCION = gql`
  mutation EditarDescripcion($_id: String!, $descripcion: String!) {
    editarDescripcion(_id: $_id, descripcion: $descripcion) {
      _id
      descripcion
    }
  }
`;

const EDITAR_OBSERVACIONES = gql`
  mutation EditarObservaciones($_id: String!, $observaciones: String!) {
    editarObservaciones(_id: $_id, observaciones: $observaciones) {
      _id
      observaciones
    }
  }
`;
//

export {
  EDITAR_PROYECTO,
  CREAR_PROYECTO,
  EDITAR_OBJETIVO,
  CREAR_OBJETIVO,
  ELIMINAR_OBJETIVO,
  CREAR_AVANCE,
  EDITAR_DESCRIPCION,
  EDITAR_OBSERVACIONES,
};
