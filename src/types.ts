export interface Lead {
  id: string;
  name: string;
  phone: string;
  budget: string;
  propertyType: string;
  created_at: string;
  isNew?: boolean;
}

export interface Property {
  id: string;
  title: string;
  price: string;
  type: string;
  location: string;
  imageUrl: string;
  created_at: string;
}

export type PropertyType = '1RK' | '2RK' | '1BHK' | '2BHK' | '3BHK' | 'PG' | 'Room';
