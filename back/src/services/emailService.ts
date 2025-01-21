import nodemailer, { Transporter } from 'nodemailer';
import { MAIL, PASSWORD } from '../config/envs';

const transporter: Transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: MAIL,
        pass: PASSWORD,
    },
});


transporter.verify((error: Error | null, success: any) => {
    if (error) {
        console.error('Error al configurar el transporter de nodemailer:', error);
    } else {
        console.log('Transporter configurado correctamente:', success);
    }
});

export const sendConfirmationEmail = (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: MAIL,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado con éxito:', info.response);
        }
    });
};
