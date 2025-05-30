export type Client = {
  id: string;
  name: string;
  buyer_name: string;
  fantasy_name: string;
  corporate_reason: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  createdAt?: string; // caso você decida manter a ordenação por data
};