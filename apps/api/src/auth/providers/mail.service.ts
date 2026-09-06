import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private readonly client: Resend;

    constructor() {
        this.client = new Resend(process.env.RESEND_API_KEY);
    }

    async sendCode(email: string, code: string) {
        await this.client.emails.send({
            from: 'trackmyfitness@resend.dev',
            to: email,
            subject: 'Your personal one time login code',
            html: `<p>Your code: <strong>${code}</strong><br/>Don't share it with anybody!`,
        });
    }
}
