'use client';

import { Box, SimpleGrid } from '@chakra-ui/react';
import DateRangePicker from '@/components/ui/date-range-picker';
import { useMemo, useState } from 'react';
// @ts-ignore
import { LooseValue } from 'react-calendar/src/shared/types';
import { subDays } from 'date-fns';
import { filterDataByDateRange } from '@/utils/utils';
import { StatLabel, StatRoot, StatValueText } from '@/components/ui/stat';
import { useDataContext } from '@/components/providers/data-provider';

export default function StatsCardsSection() {
    const { sales, expenses } = useDataContext();

    const [activeDateRange, setActiveDateRange] = useState<string[]>(['last7']);
    const [showDateRangePicker, setShowDateRangePicker] =
        useState<boolean>(false);
    const [customRange, setCustomRange] = useState<LooseValue>([]);

    const selectDateRangeChoices = [
        { label: 'last 7 days', value: 'last7' },
        { label: 'last 30 days', value: 'last30' },
        { label: 'custom range', value: 'custom' },
    ];

    const stats = useMemo(() => {
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
            sales: parseFloat(totalSales.toFixed(2)),
            expenses: parseFloat(totalExpenses.toFixed(2)),
            netProfit: parseFloat((totalSales - totalExpenses).toFixed(2)),
            activeUsers: new Set(filteredSales.map((sale) => sale.customerId))
                .size,
        };
    }, [activeDateRange, customRange, expenses, sales]);

    return (
        <Box p={[2, 4, 4]}>
            <DateRangePicker
                dateRangeChoices={selectDateRangeChoices}
                showDateRangePicker={showDateRangePicker}
                setShowDateRangePicker={setShowDateRangePicker}
                setCustomRange={setCustomRange}
                activeRangeDate={activeDateRange}
                setActiveRangeDate={setActiveDateRange}
            />
            <SimpleGrid
                columns={[2, 2, 4]}
                gap={['20px', '40px', '40px']}
                width={'100%'}
            >
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
    <Box
        p="4"
        bg="white"
        rounded="md"
        shadow="md"
        _dark={{ bg: 'gray.800', color: 'white' }}
    >
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
