export type PartnerPermission = 'editor' | 'viewer';

export type Partner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: Date;
  permission: PartnerPermission;
};
