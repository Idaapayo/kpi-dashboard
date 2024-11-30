'use client';

import { useDataContext } from '@/components/providers/data-provider';
import { Card, Text, Box } from '@chakra-ui/react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    ZAxis,
} from 'recharts';

export default function BubbleChart() {
    const { sales, customers, regions } = useDataContext();

    // Aggregate customer activity by region
    const customerActivityByRegion = regions.map((region, index) => {
        const regionCustomers = customers.filter(
            (customer) => customer.location === region,
        );

        const activityCount = regionCustomers.reduce((total, customer) => {
            const customerSales = sales.filter(
                (sale) => sale.customerId === customer.id,
            );
            return total + customerSales.length; // Total sales count for the region
        }, 0);

        const totalSalesAmount = regionCustomers.reduce((sum, customer) => {
            const customerSales = sales.filter(
                (sale) => sale.customerId === customer.id,
            );
            return (
                sum +
                customerSales.reduce((subSum, sale) => subSum + sale.amount, 0)
            ); // Total sales amount for the region
        }, 0);

        return {
            region,
            regionIndex: index, // Use index as x-axis value
            salesCount: activityCount, // Use activity count as y-axis value
            totalSalesAmount, // Tooltip data
            size: activityCount,
        };
    });

    return (
        <Box
            p="6"
            bg="white"
            rounded="md"
            borderWidth="1px"
            borderColor="border.disabled"
        >
            {/* Customer Activity by Region Chart */}
            <Card.Root className="shadow-md">
                <Card.Body>
                    <Text fontSize="lg" fontWeight="bold" mb={4}>
                        Customer Activity by Region
                    </Text>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis
                                type="number"
                                dataKey="regionIndex"
                                name="Region"
                                tickFormatter={(index) => regions[index]} // Show region names on the x-axis
                                label={{
                                    value: 'Region',
                                    position: 'insideBottom',
                                    offset: -5,
                                }}
                            />
                            <YAxis
                                type="number"
                                dataKey="salesCount"
                                name="salesCount"
                                label={{
                                    value: 'Activity Count',
                                    angle: -90,
                                    position: 'insideLeft',
                                }}
                            />
                            <ZAxis
                                type="number"
                                dataKey="size" // Maps to bubble size
                                range={[50, 400]} // Adjust size range (pixel radius)
                            />
                            <Tooltip
                                formatter={(value, name, entry) => {
                                    if (name === 'salesCount') {
                                        return `${value}`;
                                    }
                                    if (name === 'totalSalesAmount') {
                                        return `Total Sales: $${entry.payload.totalSalesAmount.toFixed(
                                            2,
                                        )}`;
                                    }
                                    if (name === 'Region') {
                                        // @ts-ignore
                                        return `${regions[value]}`;
                                    }
                                    return value;
                                }}
                                cursor={{ fill: 'rgba(200,200,200,0.2)' }}
                            />
                            <Scatter
                                data={customerActivityByRegion}
                                name="Region Activity"
                                fill="#8884d8"
                                dataKey="salesCount"
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}
