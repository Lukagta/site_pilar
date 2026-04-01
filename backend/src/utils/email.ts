import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('Variáveis de SMTP não configuradas. Fallback: Log no console.');
            console.log(`[EMAIL MOCK] Para: ${to} | Assunto: ${subject}`);
            console.log(`Conteúdo:\n${html}`);
            return true;
        }

        const info = await transporter.sendMail({
            from: `"Pilar Medicina Integrada" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });

        console.log(`E-mail enviado para ${to}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return false;
    }
};
