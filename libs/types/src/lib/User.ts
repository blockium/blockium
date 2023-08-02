type Business = {
  name: string;
  description: string;
  services: string;
};

export type User = {
  id?: string;
  name: string;
  displayName: string;
  phone: string;
  authId?: string;
  business?: Business;
};
