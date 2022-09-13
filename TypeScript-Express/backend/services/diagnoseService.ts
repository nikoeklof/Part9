import diagnoseData from '../diagnoses.json';
import { Diagnose } from "../types/types";

const diagnoses: Diagnose[] = diagnoseData;

export const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};



