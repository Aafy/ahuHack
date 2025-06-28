export interface IOrderEntry {
  fundName: string;
  securityName: string;
  transactionType: string;
  quantity: number;
  orderValue?: number;
  date?: Date;
}

export interface IOrderEntryState {
  orderEntries: IOrderEntry[];
}

export interface IAppState {
  orderEntries: IOrderEntryState;
}
