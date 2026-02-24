// models.ts

// export enum TableStatus {
//   AVAILABLE = 'Libre',
//   OCCUPIED = 'Occupée',
//   RESERVED = 'Réservée',
//   DIRTY = 'À nettoyer'
// }

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  DIRTY = 'DIRTY'
}

export enum OrderStatus {
  PENDING = 'En attente',
  COOKING = 'En cuisine',
  READY = 'Prêt',
  SERVED = 'Servi',
  CANCELLLED = "Annulé"
}

export interface Category {
  id: number;
  name?: string;
  description?: string;
  coverUrl?: string; // ex: 'pi pi-shopping-cart'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MenuItem {
  id: number;
  category?: Category;
  name?: string;
  coverUrl?: string;
  description?: string;
  variations?: Variation[];
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Variation{
  id: number;
  name?: string;
  price?: number;
}

export interface OrderItem {
  id: number;
  menuItem?: MenuItem;
  name?: string; // Copie du nom au moment de la commande (snapshot)
  quantity?: number;
  price?: number; // Prix unitaire au moment de la commande
  order?: Order;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id: number;
  table?: Table;
  status?: OrderStatus;
  paid?: boolean;
  note?: string;
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Table {
  id: number;
  code?: string; // ex: "Table 12"
  capacity?: number;
  status?: TableStatus;
  enable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  
}