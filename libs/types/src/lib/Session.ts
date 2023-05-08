export type Session = {
  id?: string;
  status: 'new' | 'waiting' | 'confirmed' | 'expired';
  createdAt: object;
  startedAt?: string;
  userId?: string;
  phone?: string;
  name?: string;
};
