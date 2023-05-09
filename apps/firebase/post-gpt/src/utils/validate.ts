import { Session, User } from '@postgpt/types';

import {
  USER_ERROR_DIFFERENT_USER_NAME,
  USER_ERROR_NON_UNIQUE_USER,
} from './user';
import { SESSION_ERROR_NOT_FOUND } from './session';

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

export const validateUser = (user: string | User, response) => {
  if (typeof user === 'string') {
    if (user === USER_ERROR_DIFFERENT_USER_NAME) {
      response
        .status(412)
        .send(
          'O número de telefone informado está cadastrado para outra pessoa. Favor entrar em contato com o suporte.'
        );
    } else if (user === USER_ERROR_NON_UNIQUE_USER) {
      response
        .status(412)
        .send(
          'Foi encontrado mais de um usuário com esse número. Favor entrar em contato com o suporte.'
        );
    } else {
      response
        .status(412)
        .send('Usuário inválido. Favor entrar em contato com o suporte.');
    }
    return false;
  } else {
    return true;
  }
};

export const validateSessionId = (request, response) => {
  const { sessionId } = request.body;
  if (sessionId === undefined) {
    response.status(400).send('O id da sessão é obrigatório');
    return false;
  }
  return true;
};

export const validateSession = (session: string | Session, response) => {
  if (typeof session === 'string') {
    if (session === SESSION_ERROR_NOT_FOUND) {
      response.status(412).send('Sessão não encontrada');
    } else {
      response
        .status(412)
        .send('Sessão inválida. Favor entrar em contato com o suporte.');
    }
    return false;
  }
  return true;
};
