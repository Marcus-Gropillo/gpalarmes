export interface Budget {
  id: number;
  description: string;
  value: number; 
}

export interface CompanyData {
  id: number;
  companyName: string;
  responsibleName: string;
  address: string;
  phone: string;
  email: string;
  cnpj: string;
}