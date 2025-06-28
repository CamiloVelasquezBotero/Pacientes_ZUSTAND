import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Error from './Error'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'

export default function PatientForm() {

    const { addPatient, activeId, patients, updatePatient } = usePatientStore()
    const { register, handleSubmit, setValue, formState:{errors}, reset } = useForm<DraftPatient>() /* Extraemos los errores del estado del form */

    const registerPatient = (data:DraftPatient) => {
        if(activeId) {
            updatePatient(data)
            toast.success('¡Paciente Actualizado Correctamente!', {
                type: 'success'
            })
        } else {
            addPatient(data)
            toast.success('¡Paciente Registrado Correctamente!')
        }
        reset() /* Reiniciamos el formulario con la funcion que nos da useForm */
    }

    useEffect(() => {
        if(activeId) {
            const activePatient = patients.filter(patient => patient.id === activeId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('date', activePatient.date)
            setValue('symptoms', activePatient.symptoms)
        }
    }, [activeId])
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
            onSubmit={ handleSubmit(registerPatient)}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente 
                  </label>
                  <input  
                      id="name"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Paciente" 
                      {...register('name', { /* Primero le pasamos un nombre y despues las opciones */
                        required: 'El nombre del paciente es obligatorio', /* Este mensaje se mostrara si no se llena el campo requerido */
                        maxLength: { /* Condicion Maximo Caracteres */
                            value: 12,
                            message: 'Maximo 12 Caracteres'    
                        }
                      })}
                  />
                    {errors.name && (
                      <Error> {errors.name?.message} </Error> /* Obtenemos el mensaje de error dependiendo al nombre que le pusimos. y le colocamos toString para quitar el error */
                    )}
              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    {...register('caretaker', {
                        required: 'El nombre del propietario es obligatorio'
                    })}
                />
                {errors.caretaker && (
                    <Error>{errors.caretaker?.message}</Error>
                )}
              </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email No Válido'
                    }
                    })} 
                />
                {errors.email && (
                    <Error>{errors.email?.message}</Error>
                )}
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3  border border-gray-100"  
                    type="date" 
                    {...register('date', {
                        required: 'La fecha de alta es obligatoria'
                    })}
                />
                {errors.date && (
                    <Error>{errors.date?.message}</Error>
                )}
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    {...register('symptoms', {
                        required: 'Los sintomas son obligatorios'
                    })}
                ></textarea>
                {errors.symptoms && (
                    <Error>{errors.symptoms?.message}</Error>
                )}
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value='Guardar Paciente'
            />
        </form> 
    </div>
  )
}
