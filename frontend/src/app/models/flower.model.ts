export interface Flower {
  id?: number;
  name: string;
  color: string;
  price: number;
  stock: number;
  description: string;
  has_scent: boolean;
  bloom_season: string;
  stem_length: number;
  lifespan: number;
  created_at?: string;
  updated_at?: string;
  created_by?: number | null;
}