export interface Supplier {
    id?: number;
    name: string;
    contact_person: string;
    email: string;
    phone: string;
    address: string;
    tax_id: string;
    notes?: string;
    created_by?: number | null;
    created_at?: string;
    updated_at?: string;
  }
  