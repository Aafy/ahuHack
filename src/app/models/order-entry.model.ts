export interface IOrderEntry {
  fundName: string;
  fundCode: string;
  transactionType: string; // 'Buy', 'Sell'
  nav: number;
  purchasePrice: number;
  units: number;
  purchaseDate: Date;
  status: string; // e.g., 'Active', 'Completed', 'Cancelled'
}
