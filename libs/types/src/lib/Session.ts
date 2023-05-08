export type Session = {
  id?: string;
  status: 'new' | 'waiting' | 'started' | 'expired';
  newAt: object;
  waitingAt?: string;
  startedAt?: string;
  expiredAt?: string;
  userId?: string;
  phone?: string;
  name?: string;
};
