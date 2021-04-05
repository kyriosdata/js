/**
 * Evita uso de serviço de email. Verifica que API e
 * email para o qual enviar são fornecidos.
 */
module.exports = {
  setApiKey(key) {
    expect(key).toBe(process.env.SENDGRID_API_KEY);
  },
  send(objeto) {
    expect(objeto).not.toBeNull();
  },
};
