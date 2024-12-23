export interface Customer {
    id: number;
    location: string;
}

export interface Sale {
    id: number;
    date: string;
    amount: number;
    region: string;
    customerId: number;
}

export interface Expense {
    id: number;
    date: string;
    amount: number;
    category: string;
}

export interface Transaction {
    id: number;
    date: string;
    amount: number;
    type: 'sale' | 'expense';
    status: 'completed' | 'pending';
}
