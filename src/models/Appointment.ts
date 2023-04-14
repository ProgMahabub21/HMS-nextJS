import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Appointments {
    id:          string;
    appDateTime: Date;
    status:      string;
    doctor:      Doctor;
    patient:     Patient;
}