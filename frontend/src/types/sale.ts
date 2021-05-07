import { Seller } from './sellers';

export interface Sale{
  id: number;
  visited: number;
  deals: number;
  amount: number;
  date: string;
  seller: Seller;
}

export interface salePage{
  content?: Sale[]
  last: boolean;
  totalPages: number;
  totalElements: number;
  size?: number;
  number: number;
  first: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

export interface SaleSum {
  sellerName: string;
  sum: number;
}

export interface SuccessBySeller{
  sellerName: string;
  visited: number;
  deals: number;
}