export const validatePrompt = (request, response) => {
  const { prompt } = request.body;

  // Validate prompt
  if (prompt === undefined) {
    response.status(400).send('Por favor, diga o que você deseja');
    return false;
  }

  return true;
};

export const validatePhone = (request, response) => {
  const { phone } = request.body;

  // Validate phone number format (Brazilian international format)
  if (!phone) {
    response.status(400).send('Por favor, informe seu telefone');
    return false;
  }

  // Check any phone number
  if (!phone.match(/^\d+$/)) {
    response.status(400).send('O telefone deve conter apenas números');
    return false;
  }

  return true;
};

export const validateName = (request, response) => {
  const { name } = request.body;

  // Validate person name
  if (!name || name.trim() === '') {
    response.status(400).send('Por favor, informe seu nome');
    return false;
  }

  return true;
};

export const validateSession = (request, response) => {
  const { sessionId } = request.body;
  if (sessionId === undefined) {
    response.status(400).send('O id da sessão é obrigatório');
    return false;
  }
  return true;
};
