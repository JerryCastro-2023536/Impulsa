import { Feedback } from "../models/Feedback";
import { FeedbackRepository } from "../repository/FeedbackRepository";

export class FeedbackService {
    fr = new FeedbackRepository();

    async mostrarFeedbacks(): Promise<Feedback[]> {
        return await this.fr.selectFeedback();
    }

    async crearFeedback(feedback: Feedback): Promise<Feedback> {
        return await this.fr.insertFeedback(feedback);
    }

    async buscarFeedbackPorId(id: number): Promise<Feedback | undefined> {
        return await this.fr.selectFeedbackPorId(id);
    }

    async actualizarFeedback(id: number, feedback: Feedback): Promise<Feedback> {
        return await this.fr.updateFeedback(id, feedback);
    }

    async eliminarFeedback(id: number): Promise<boolean> {
        const existe = await this.fr.selectFeedbackPorId(id);
        if (!existe) {
            return false;
        }
        await this.fr.deleteFeedback(id);
        return true;
    }

    async agregarFeedback(feedback: Feedback): Promise<Feedback> {
        return await this.crearFeedback(feedback);
    }

}
