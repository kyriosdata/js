/**
 * Envio de email via serviço SendGrid.
 * Assume definição da variável de ambiente
 *
 * SENDGRID_API_KEY
 *
 * com o valor fornecido pelo SendGrid.
 */

const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(SENDGRID_API_KEY);

const boasVindasEmail = (email, nome) => {
  sgMail.send({
    to: email,
    from: "kyriosdata@ufg.br",
    subject: "Bem-vindo ao Serviço Premium",
    text: `Olá ${nome}, é uma satisfação contar com você!`,
  });
};

const cancelaEmail = (email, nome) => {
  sgMail.send({
    to: email,
    from: "kyriosdata@ufg.br",
    subject: "Cancelamento (confirmação)",
    text: `Olá ${nome}, queremos saber o que motivou seu cancelamento.`,
  });
};

module.exports = {
  boasVindasEmail,
  cancelaEmail,
};
