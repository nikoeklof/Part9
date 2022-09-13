import React from "react"
import axios from "axios"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { Button, Divider, Container } from "@material-ui/core"
import {
  setDiagnosesAction,
  setPatientListAction,
  useStateValue,
} from "./state"
import { apiBaseUrl } from "./constants"

import { Patient, Diagnosis } from "./types"

import PatientListPage from "./PatientListPage"
import PatientByIdPage from "./Patientpage"

const App = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        )
        dispatch(setPatientListAction(patientListFromApi))
      } catch (e) {
        console.error(e)
      }
    }

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        dispatch(setDiagnosesAction(diagnosesData))
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message || "Unknown Error")
        }
      }
    }
    void fetchPatientList()
    void fetchDiagnosesList()
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>

          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientByIdPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
