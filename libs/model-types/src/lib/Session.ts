export type SessionStatus = 'new' | 'waiting' | 'started' | 'expired';

export type Session = {
  id?: string;
  status: SessionStatus;
  newAt: object;
  waitingAt?: string;
  startedAt?: string;
  expiredAt?: string;
  userId?: string;
  phone?: string;
  name?: string;
  authId?: string | null;
};
