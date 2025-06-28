export interface IFund {
  fundName: string;
  fundCode: string;
  transactionType: string;
  nav?: number; // Net Asset Value
  purchasePrice?: number; // Price at which the fund was purchased
  units?: number; // Number of units purchased
  purchaseDate?: Date; // Date of purchase
  status?: string; // e.g., 'Active', 'Completed', 'Cancelled'
}

export interface IFunds {
  funds: IFund[];
}
