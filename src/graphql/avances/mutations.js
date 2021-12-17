import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
    mutation Mutation($fecha: Date!, $descripcion: String!, $proyecto: String!, $creadoPor: String!) {
        crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
        _id
        }
    }
`;

const EDITAR_OBSERVACIONES= gql`
    mutation Mutation($_id: String!, $observaciones: String!) {
        editarObservaciones(_id: $_id, observaciones: $observaciones) {
        _id
        }
    }
`;
const EDITAR_DESCRIPCION= gql `
    mutation Mutation($_id: String!, $descripcion: String!) {
        editarDescripcion(_id: $_id, descripcion: $descripcion) {
        _id
        }
    }
`;

export { CREAR_AVANCE, EDITAR_OBSERVACIONES, EDITAR_DESCRIPCION };