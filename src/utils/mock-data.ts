import { Customer } from '@/types/types';

export const regions = [
    'North America',
    'Europe',
    'Asia',
    'South America',
    'Africa',
];

export const expenseCategories = [
    'Marketing',
    'Operations',
    'HR',
    'Technology',
    'Miscellaneous',
];

export function generateCustomersData() {
    const customersData = [];

    for (let i = 0; i < 50; i++) {
        const customer = {
            id: i + 1,
            location: regions[Math.floor(Math.random() * regions.length)], // Randomly assign a region
        };
        customersData.push(customer);
    }
    return customersData;
}

export function generateSalesData(customers: Customer[]) {
    const salesData = [];

    for (let i = 0; i < 50; i++) {
        const customer =
            customers[Math.floor(Math.random() * customers.length)];
        const sale = {
            id: i + 1,
            date: randomDate(
                new Date(),
                new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            ),
            amount: parseFloat((Math.random() * 10000).toFixed(2)),
            region: customer.location,
            customerId: customer.id,
        };
        salesData.push(sale);
    }

    return salesData;
}
export function generateExpensesData() {
    const expensesData = [];

    for (let i = 0; i < 50; i++) {
        const expense = {
            id: i + 1,
            date: randomDate(
                new Date(),
                new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            ),
            amount: parseFloat((Math.random() * 5000).toFixed(2)),
            category:
                expenseCategories[
                    Math.floor(Math.random() * expenseCategories.length)
                ],
            region: regions[Math.floor(Math.random() * regions.length)],
        };
        expensesData.push(expense);
    }

    return expensesData;
}

// Helper function to generate a random date between two dates
function randomDate(start: Date, end: Date) {
    const timestamp =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(timestamp).toISOString().split('T')[0];
}
