'use client';

import { Customer, Expense, Sale } from '@/types/types';
import { createContext, ReactNode, useContext } from 'react';
import { regions } from '@/utils/mock-data';
import { fetchData } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

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
    const {
        data: customers = [],
        isLoading: isLoadingCustomers,
        isError: isErrorCustomers,
    } = useQuery<Customer[]>({
        queryFn: async () => await fetchData('customers'),
        queryKey: ['customers'], //Array according to Documentation
    });

    const {
        data: sales = [],
        isLoading: isLoadingSales,
        isError: isErrorSales,
    } = useQuery<Sale[]>({
        queryFn: async () => await fetchData('sales'),
        queryKey: ['sales'],
    });

    const {
        data: expenses = [],
        isLoading: isLoadingExpenses,
        isError: isErrorExpenses,
    } = useQuery<Expense[]>({
        queryFn: async () => await fetchData('expenses'),
        queryKey: ['expenses'],
    });

    if (isLoadingCustomers || isLoadingSales || isLoadingExpenses) {
        return <Spinner size="xl" />;
    }

    if (isErrorCustomers || isErrorSales || isErrorExpenses) {
        return <div>Error loading data</div>;
    }

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
