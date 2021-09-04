import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const sendForgotPasswordEmailService = container.resolve(
            ResetPasswordService,
        );

        await sendForgotPasswordEmailService.execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
