export type Session = {
  status: 'new' | 'waiting' | 'confirmed' | 'expired';
  createdAt: object;
  startedAt?: string;
  userId?: string;
  phone?: string;
  name?: string;
};
