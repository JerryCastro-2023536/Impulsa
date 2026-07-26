import { Feedback } from "../models/Feedback";

let feedbacks: Feedback[] = [];

export class FeedbackService {

    mostrarFeedbacks(): Feedback[] {
        return feedbacks;
    }

    agregarFeedback(feedback: Feedback): Feedback {
        feedbacks.push(feedback);
        return feedback;
    }

    buscarFeedbackPorId(id: number): Feedback | undefined {
        return feedbacks.find(fb => fb.id_feedback === id);
    }

    actualizarFeedback(id: number, feedback: Feedback): Feedback | null {
        const dato = feedbacks.find(fb => fb.id_feedback === id);
        if (!dato) {
            return null;
        }
        Object.assign(dato, feedback);
        return dato;
    }

    eliminarFeedback(id: number): boolean {
        const indice = feedbacks.findIndex(fb => fb.id_feedback === id);
        if (indice !== -1) {
            feedbacks.splice(indice, 1);
            return true;
        }
        return false;
    }

}
