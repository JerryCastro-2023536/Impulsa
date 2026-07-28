import { Feedback } from "../models/Feedback";
import { isEmptyString, isInvalidDate, isInvalidNumber } from "./validatorHelpers";

export function FeedbackValidate(feedback: Feedback) {
    const errores: string[] = [];

    if (isEmptyString(feedback.mensaje)) {
        errores.push("mensaje vacio");
    }
    if (isInvalidNumber(feedback.calificacion)) {
        errores.push("calificacion vacia o invalida");
    }
    if (isInvalidDate(feedback.fecha)) {
        errores.push("fecha vacia o invalida");
    }
    if (isInvalidNumber(feedback.id_usuario)) {
        errores.push("id_usuario vacio o invalido");
    }

    return errores;
}
