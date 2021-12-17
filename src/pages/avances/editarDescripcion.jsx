import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link, useParams } from 'react-router-dom';
import { EDITAR_DESCRIPCION } from 'graphql/avances/mutations';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import Input from 'components/Input';


const EditarDescripcion = () =>{
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams();
         const {
          data: queryData,
          error: queryError,
          loading: queryLoading,
        } = useQuery(GET_AVANCES, {
          variables: { _id },
        });
        const [editarDescripcion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_DESCRIPCION,  {
      refetchQueries: [GET_AVANCES], });

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarDescripcion({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Descripción modificada correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando la descripción');
    }

    if (queryError) {
      toast.error('Error consultando la descripción');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/avances'>
        <i className='fas fa-arrow-left text-gray-300 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-white font-bold text-center'>Editar Descripción</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Descripción:'
          type='text'
          name='descripcion'
          defaultValue={queryData.Avances.descripcion}
          required={true}

        />
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text='Confirmar'
        />
      </form>
    </div>
  );
};  

export default EditarDescripcion;