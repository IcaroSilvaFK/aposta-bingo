import nodemailer from "nodemailer";
interface ISendEmailProps {
  name: string;
  email: string;
  body: string;
}

export async function sendMail({ name, email, body }: ISendEmailProps) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {},
  });

  await transport.sendMail({
    subject: "Nome",
    from: "email",
    to: `${name} </${email}>`,
    html: body,
  });
}
