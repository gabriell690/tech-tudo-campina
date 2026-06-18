export interface Profile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
  avatar_url?: string;
  role: "admin" | "customer";
}