'use client';

import { Customer, Expense, Sale } from '@/types/types';
import { createContext, ReactNode, useContext } from 'react';
import {
    generateCustomersData,
    generateExpensesData,
    generateSalesData,
    regions,
} from '@/utils/mock-data';

interface DataContextProps {
    sales: Sale[];
    expenses: Expense[];
    customers: Customer[];
    regions: string[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const customers = generateCustomersData();
    const sales = generateSalesData(customers);
    const expenses = generateExpensesData();

    return (
        <DataContext.Provider value={{ sales, expenses, regions, customers }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
