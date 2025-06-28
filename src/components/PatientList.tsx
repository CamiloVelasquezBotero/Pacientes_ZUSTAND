import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

export default function PatientList() {

  const patients = usePatientStore(state => state.patients) /* Extraemos los pacientes del state */

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients.length  ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado De Pacientes</h2>
          <p className="text-xl mt-5 mb-10 texdt-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {patients.map( patient => (
            <PatientDetails 
              key={patient.id}
              patient={patient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza Agregando Pacientes {''}
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}
    </div>
  )
}
