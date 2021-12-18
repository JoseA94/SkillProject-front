import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateComponent from "components/PrivateComponent";
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';
import { Dialog } from '@mui/material';
import useFormData from 'hooks/useFormData';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';


const IndexAvances = () => {
  
  const { userData } = useUser();
  const { projectid } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { data, loading, error } = useQuery(GET_AVANCES, {
    variables: {
      project: projectid,
    },
  });


  useEffect(() => {
    if (error) {
      toast.error('Error consultando los avances');
    }
  }, [error]);
  if (loading) return <div>Cargando....</div>;

  return(
    <>
    
    <div className="p-10 flex flex-col">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Lista de Avances</h1>
        </div>
        
    </div>

    
      <PrivateComponent roleList={["LIDER"]}>
      <div>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Nombre del proyecto:</th>
                <th>Fecha del avance:</th>
                <th>Descripción:</th>
                <th>Observaciones:</th>
              </tr>
            </thead>
           
          <tbody>
              
              {data && data.Avances ? (
                <>
                
                  {data.Avances.map((avances) => {

                    return (
                        
                      <tr key={avances._id}>
                        <td>
                          
                          <div className="shadow rounded-xl relative justify-center px-5 py-5 bg-gray-200 text-gray-900 h-24 ">
                              <div className="flex w-full ">
                                <h2 className="uppercase font-bold font-15 ">
                                  {avances.proyecto.nombre}
                                </h2>

                              </div>
                              <div className="flex flex-col md:absolute md:right-12 md:top-12 font-12">
                                <div className="">
                                  {avances.proyecto.estado}
                                  {avances.proyecto.estado === "INACTIVO" ? (
                                    <i className="fas fa-circle px-3 text-red-600" />
                                  ) : (
                                    <i className="fas fa-circle px-3 text-green-500" />
                                  )}
                                </div>
                              </div>
                          </div>
                          
                          </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-5 py-5 bg-gray-200 text-gray-900 h-24" >
                                <div className="flex w-full " >
                                  <h1 className="font-normal font-10" >
                                    {avances.fecha.slice(0, -14)}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-5 py-5 bg-gray-200 text-gray-900 h-24">
                                <div className="flex w-full ">
                                  <h1 className="font-bold font-12 ">
                                    {avances.descripcion}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-5 py-5 bg-gray-200 text-gray-900 h-24">
                                <div className="flex w-full ">
                                  <h1 className="font-bold font-12 ">
                                    {avances.observaciones}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <Link to ={`/avances/observaciones/${avances._id}`}>
                            <i className='fas fa-pen text-blue-300 hover:text-blue-800 cursor-pointer' /></Link>
                          </td>                  
                      </tr>
                    );
                  })}
                </>
              ) : (
                <div>No autorizado</div>
              )}
            </tbody>
          </table>
        </div>        
      </PrivateComponent>
      
      <PrivateComponent roleList={['ESTUDIANTE']}>
        
        
          <table className='tabla'>
            <thead>
              <tr>
                <th>Nombre del proyecto:</th>
                <th>Estado:</th>
                <th>Observaciones:</th>
                <th>Descripción:</th>
              </tr>
            </thead>
            <tbody>
              {data && data.Avances ? (
                <>
                  {data.Avances.map((avances) => {
                    
                    return (
                      <tr key={avances._id}>
                        <td>
                          
                          <div className="shadow rounded-xl relative justify-center px-6 py-6 bg-gray-200 text-gray-900 h-24">
                              <div className="flex w-full ">
                                <h2 className="uppercase font-bold font-15 ">
                                  {avances.proyecto.nombre}
                                </h2>
                              </div>
                              <div className="flex flex-col md:absolute md:right-12 md:top-12 font-12">
                                <div className="">
                                  {avances.proyecto.estado}
                                  {avances.proyecto.estado === "INACTIVO" ? (
                                    <i className="fas fa-circle px-3 text-red-600" />
                                  ) : (
                                    <i className="fas fa-circle px-3 text-green-500" />
                                  )}
                                </div>
                              </div>
                          </div>
                          
                          </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-6 py-6 bg-gray-200 text-gray-900 h-24" >
                                <div className="flex w-full " >
                                  <h1 className="font-normal font-10" >
                                    {avances.fecha.slice(0, -14)}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-6 py-6 bg-gray-200 text-gray-900 h-24">
                                <div className="flex w-full ">
                                  <h1 className="font-bold font-12 ">
                                    {avances.observaciones}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <div className="shadow rounded-xl relative justify-center px-6 py-6 bg-gray-200 text-gray-900 h-24">
                                <div className="flex w-full ">
                                  <h1 className="font-bold font-12 ">
                                    {avances.descripcion}
                                  </h1>
                                </div>
                          </div>
                        </td>
                        <td>
                          <Link to ={`/avances/descripcion/${avances._id}`}>
                            <i className='fas fa-pen text-blue-300 hover:text-blue-800 cursor-pointer' /></Link>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <div>No autorizado</div>
              )}
            </tbody>
          </table>
      
      </PrivateComponent>
    </>
  );
};




export default IndexAvances;
