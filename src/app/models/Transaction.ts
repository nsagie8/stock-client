export interface Transaction {
    stockName: string;
    isTheTranWasBuy: boolean;
    quantity: number;
    priceAtTran: number;
    date: number;
}
