import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware' /* Devtools para redux y persist para localstorage */
import { v4 as uuidv4 } from 'uuid'
import type { DraftPatient, Patient } from './types'

type PatientState = {
    activeId: Patient['id']
    patients: Patient[],
    addPatient: (data:DraftPatient) => void, /* Funcion que toma borrador de paciente y no retorna nada */
    deletePatient: (id:Patient['id']) => void,
    getPatientById: (id:Patient['id']) => void,
    updatePatient: (data:DraftPatient) => void
}

const createPatient = (patient:DraftPatient) : Patient => { /* Tomaremos el borrador del paciente y devolveremos el paciente con el id */
    return { ...patient, id: uuidv4() }
}

/* En el mimso Store incorporamos devtools para usarlo en Redux Devtools */
export const usePatientStore = create<PatientState>()(
  devtools(
    persist((set) => ({ /* Se devuelve el objeto dentro de un ()parentesis, para evitarnos la palabra return */
    patients: [],
    activeId: '',

    addPatient: (data) => {
      const newPatient = createPatient(data)
      set((state) => ({ /* Utilizamos set para modificar el state, y le pasamos el state para que lo tenga presente */
        patients: [...state.patients, newPatient]
      }))
    },
    deletePatient: (id) => {
      set(state => ({
        patients: state.patients.filter(patient => patient.id !== id)
      }))
    },
    getPatientById: (id) => {
        set(() => ({
          activeId: id
        }))
    },
    updatePatient: (data) => {
      set((state) => ({
        patients: state.patients.map(patient => patient.id === state.activeId ?
          {id: state.activeId, ...data} : patient),
        activeId: '' /* Reiniciamos el id a editar */
      }))
    }

    }), {
      name: 'patient-storage'
    })
  )
)