import { Session, SessionStatus, User } from '@postgpt/types';

import {
  USER_ERROR_DIFFERENT_USER_NAME,
  USER_ERROR_NON_UNIQUE_USER,
} from './user';
import { SESSION_ERROR_NOT_FOUND } from './session';
import { UserRecord } from 'firebase-admin/auth';

export const validatePrompt = (request, response) => {
  const { prompt } = request.body;

  // Validate prompt
  if (prompt === undefined) {
    response.status(400).send('Por favor, diga o que você deseja.');
    return false;
  }

  return true;
};

export const validatePhone = (request, response) => {
  const { phone } = request.body;

  // Validate phone number format (Brazilian international format)
  if (!phone) {
    response.status(400).send('Por favor, informe seu telefone.');
    return false;
  }

  // Check any phone number
  if (!phone.match(/^\d+$/)) {
    response.status(400).send('O telefone deve conter apenas números.');
    return false;
  }

  return true;
};

export const validateAuthPhone = (authPhone, response) => {
  if (!authPhone) {
    response.status(412).send('Usuário autenticado sem número de telefone.');
    return false;
  }
  return true;
};

export const validateName = (request, response) => {
  const { name } = request.body;

  // Validate person name
  if (!name || name.trim() === '') {
    response.status(400).send('Por favor, informe seu nome.');
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
    response.status(400).send('O id da sessão é obrigatório.');
    return false;
  }
  return true;
};

export const validateSession = (
  session: string | Session,
  response,
  validStatus?: SessionStatus[]
) => {
  if (typeof session === 'string') {
    if (session === SESSION_ERROR_NOT_FOUND) {
      response.status(412).send('Sessão não encontrada.');
    } else {
      response
        .status(412)
        .send('Sessão inválida. Favor entrar em contato com o suporte.');
    }
    return false;
  }

  // Validate session status
  if (validStatus && !validStatus.includes(session.status)) {
    response.status(412).send('Status inválido da sessão para essa operação.');
    return false;
  }

  return true;
};

export const validateAuthId = (request, response) => {
  const { authId } = request.body;
  if (authId === undefined) {
    response.status(400).send('O id de autenticação é obrigatório.');
    return false;
  }
  return true;
};

export const validateAuthUser = async (authUser: UserRecord, response) => {
  if (!authUser) {
    response.status(412).send('Conta de autenticação inexistente.');
    return false;
  }
  return true;
};
