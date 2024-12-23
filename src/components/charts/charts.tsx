'use client';
import React, { useState } from 'react';
import { useDataContext } from '@/components/providers/data-provider';
import { Box, Card, Text } from '@chakra-ui/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import BubbleChart from '@/components/charts/bubble-chart';
import { Switch } from '@/components/ui/switch';

export default function Charts() {
    const { sales, expenses, regions } = useDataContext();

    const [cumulative, setCumulative] = useState(false);

    const getMonthlyData = () => {
        const months = Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString('default', { month: 'short' }),
        );
        const salesData = Array(12).fill(0);
        const expensesData = Array(12).fill(0);

        sales.forEach(({ date, amount }) => {
            const monthIndex = new Date(date).getMonth();
            salesData[monthIndex] += amount;
        });

        expenses.forEach(({ date, amount }) => {
            const monthIndex = new Date(date).getMonth();
            expensesData[monthIndex] += amount;
        });

        return months.map((month, i) => ({
            month,
            sales: cumulative
                ? salesData.slice(0, i + 1).reduce((a, b) => a + b, 0)
                : salesData[i],
            expenses: cumulative
                ? expensesData.slice(0, i + 1).reduce((a, b) => a + b, 0)
                : expensesData[i],
        }));
    };

    const monthlyData = getMonthlyData();

    const regionData = regions.map((region) => ({
        region,
        revenue: sales
            .filter((sale) => sale.region === region)
            .reduce((sum, sale) => sum + sale.amount, 0),
    }));

    const categoryData = expenses.reduce((acc, { category, amount }) => {
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    const pieData = Object.keys(categoryData).map((category) => ({
        category,
        value: categoryData[category],
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4 md:p-4">
            {/* Line Chart */}
            <Box
                p={[1, 4, 6]}
                bg="white"
                rounded="md"
                borderWidth="1px"
                borderColor="border.disabled"
                _dark={{
                    bg: 'gray.800',
                    color: 'white',
                    borderColor: 'gray.500',
                }}
                style={{ width: '100%', minWidth: 0 }}
            >
                <Card.Root>
                    <Card.Header>
                        <Text fontSize="lg" fontWeight="bold">
                            Sales and Expenses Trends
                        </Text>
                        <Switch
                            checked={cumulative}
                            onCheckedChange={(e) => setCumulative(e.checked)}
                        >
                            See cumulative view
                        </Switch>
                    </Card.Header>
                    <Card.Body>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card.Root>
            </Box>
            {/* Bar Chart */}
            <Box
                p={[1, 4, 6]}
                bg="white"
                rounded="md"
                borderWidth="1px"
                borderColor="border.disabled"
                style={{ width: '100%', minWidth: 0 }}
                _dark={{
                    bg: 'gray.800',
                    color: 'white',
                    borderColor: 'gray.500',
                }}
            >
                <Card.Root>
                    <Card.Header>
                        <Text fontSize="lg" fontWeight="bold">
                            Revenue by Region
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={regionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="region" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card.Root>
            </Box>
            {/* Pie Chart */}
            <Box
                p={[1, 4, 6]}
                bg="white"
                rounded="md"
                borderWidth="1px"
                borderColor="border.disabled"
                style={{ width: '100%', minWidth: 0 }}
                _dark={{
                    bg: 'gray.800',
                    color: 'white',
                    borderColor: 'gray.500',
                }}
            >
                <Card.Root>
                    <Card.Header>
                        <Text fontSize="lg" fontWeight="bold">
                            Expenses by Category
                        </Text>
                    </Card.Header>
                    <Card.Body>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    label={(entry) => `${entry.category}`}
                                    innerRadius={40}
                                    outerRadius={80}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card.Root>
            </Box>
            <BubbleChart />
        </Box>
    );
}
