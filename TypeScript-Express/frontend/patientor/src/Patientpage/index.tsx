import React from "react"
import { useParams } from "react-router"
import axios from "axios"
import { Container, Icon, Button } from "semantic-ui-react"
import { Patient } from "../types"
import { apiBaseUrl } from "../constants"
import { setPatientFullDataAction, useStateValue } from "../state"
import Entries from "./Entries"
import AddEntryForm from "./AddEntryForm"
import { EntryFormValues } from "./AddEntryForm"
import { addEntryAction } from "../state"

const PatientByIdPage = () => {
  const [{ patients }, dispatch] = useStateValue()
  const [error, setError] = React.useState<string | undefined>()
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const [{ diagnoses }] = useStateValue()
  const { id } = useParams<{ id: string }>()
  const foundPatient: Patient = patients[String(id)]

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patient/${id}`
        )

        dispatch(setPatientFullDataAction(patientFromApi))
      } catch (error) {
        console.error(error)
      }
    }

    if (!patients || !patients.ssn || !patients.entries) {
      void fetchPatient()
    }
  }, [dispatch, id])

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patient/${id}/entries`,
        values
      )
      console.log("responseData", updatedPatient)
      dispatch(addEntryAction(updatedPatient.entries, String(id)))
      setShowForm(false)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message || "Unknown Error")
        setError(e.message || "Unknown error")
      }
    }
  }

  const getGenderIcon = (gender: string) => {
    if (gender === "male") {
      return "mars"
    } else if (gender === "female") {
      return "venus"
    } else {
      return "genderless"
    }
  }

  if (error) {
    return (
      <div className="App">
        <Container>{error}</Container>
      </div>
    )
  }

  if (!foundPatient) {
    return (
      <div className="App">
        <Container>Searching patient data</Container>
      </div>
    )
  }
  return (
    <div className="patient-details">
      <Container>
        <h2>
          {foundPatient.name}
          <Icon name={getGenderIcon(foundPatient.gender)} size="large" />
        </h2>
        <div>
          <b>SSN:</b> {foundPatient.ssn}
        </div>
        <div>
          <b>Occupation:</b> {foundPatient.occupation}
        </div>
        <Entries patient={foundPatient} />
        {!showForm && (
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => setShowForm(true)}
          >
            Add New Entry
          </Button>
        )}
        {showForm && (
          <div className="new-entry-form" style={{ marginTop: "20px" }}>
            <h3>Add new entry</h3>
            <AddEntryForm
              onSubmit={submitNewEntry}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
      </Container>
    </div>
  )
}

export default PatientByIdPage
