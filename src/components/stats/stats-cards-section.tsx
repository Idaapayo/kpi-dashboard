'use client';

import { Box, SimpleGrid } from '@chakra-ui/react';
import DateRangePicker from '@/components/ui/date-range-picker';
import { useQuery } from '@tanstack/react-query';
import { fetchExpensesData, fetchSalesData } from '@/util/mock-api';
import { Expense, Sale } from '@/types/types';
import { useMemo, useState } from 'react';
import { LooseValue } from 'react-calendar/src/shared/types';
import { subDays } from 'date-fns';
import { filterDataByDateRange } from '@/utils/utils';
import {
    generateCustomersData,
    generateExpensesData,
    generateSalesData,
} from '@/utils/mock-data';
// import { StatCard } from '@/components/stats/stats-card';
import { StatLabel, StatRoot, StatValueText } from '@/components/ui/stat';

export default function StatsCardsSection() {
    // const { data: sales, isLoading: isLoadingSales } = useQuery<Sale[]>({
    //     queryKey: ['sales-util'],
    //     queryFn: fetchSalesData,
    // }) ;
    //
    // const { data: expenses, isLoading: isLoadingExpenses } = useQuery({
    //     queryKey: ['expense-util'],
    //     queryFn: fetchExpensesData,
    // });

    const customers = generateCustomersData();
    const sales = generateSalesData(customers);
    const expenses = generateExpensesData();

    console.log({ expenses });

    const [activeDateRange, setActiveDateRange] = useState<string[]>(['last7']);
    const [showDateRangePicker, setShowDateRangePicker] =
        useState<boolean>(false);
    const [customRange, setCustomRange] = useState<LooseValue>([]);

    const selectDateRangeChoices = [
        { label: 'last 7 days', value: 'last7' },
        { label: 'last 30 days', value: 'last30' },
        { label: 'custom range', value: 'custom' },
    ];

    // console.log({ activeDateRange });

    const stats = useMemo(() => {
        // if (isLoadingSales || isLoadingExpenses || !sales || !expenses)
        //     return { sales: 0, expenses: 0, netProfit: 0, activeUsers: 0 };
        let startDate: Date = customRange[0] ? customRange[0] : new Date();
        const endDate: Date = customRange[1] ? customRange[1] : new Date();

        if (activeDateRange.includes('last7')) {
            startDate = subDays(new Date(), 7);
        } else if (activeDateRange.includes('last30')) {
            startDate = subDays(new Date(), 30);
        }
        const filteredSales = filterDataByDateRange(sales, startDate, endDate);
        const filteredExpenses = filterDataByDateRange(
            expenses,
            startDate,
            endDate,
        );
        const totalSales = filteredSales.reduce(
            (sum, sale) => sum + sale.amount,
            0,
        );
        const totalExpenses = filteredExpenses.reduce(
            (sum, expense) => sum + expense.amount,
            0,
        );
        return {
            sales: totalSales,
            expenses: totalExpenses,
            netProfit: totalSales - totalExpenses,
            activeUsers: new Set(filteredSales.map((sale) => sale.customerId))
                .size,
        };
    }, [activeDateRange, customRange, expenses, sales]);

    console.log({ stats });

    return (
        <Box>
            <DateRangePicker
                dateRangeChoices={selectDateRangeChoices}
                showDateRangePicker={showDateRangePicker}
                setShowDateRangePicker={setShowDateRangePicker}
                setCustomRange={setCustomRange}
                activeRangeDate={activeDateRange}
                setActiveRangeDate={setActiveDateRange}
            />
            <SimpleGrid columns={[2, null, 4]} gap="40px" width={'100%'}>
                <StatCard title={'Total sales'} value={stats.sales} />
                <StatCard title={'Total expenses'} value={stats.expenses} />
                <StatCard title={'Net profit'} value={stats.netProfit} />
                <StatCard title={'Active users'} value={stats.activeUsers} />
            </SimpleGrid>
        </Box>
    );
}

export const StatCard: React.FC<{ title: string; value: number }> = ({
    title,
    value,
}) => (
    <Box p="6" bg="white" rounded="md" shadow="md">
        <StatRoot>
            <StatLabel>{title}</StatLabel>
            <StatValueText
                formatOptions={{ style: 'currency', currency: 'USD' }}
            >
                {value !== 0 ? value : '0'}
            </StatValueText>
        </StatRoot>
    </Box>
);
