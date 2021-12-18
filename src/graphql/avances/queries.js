import { gql } from '@apollo/client';

const GET_AVANCES = gql`
    query Avances {
        Avances {
        _id
        fecha
        descripcion
        observaciones
        proyecto {
            _id
            nombre
            estado
            lider {
            _id
            }
        }
        }
    }
`;

export { GET_AVANCES };