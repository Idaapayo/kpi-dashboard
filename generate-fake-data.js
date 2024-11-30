const fs = require('fs');
const path = require('path');

const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];

const expenseCategories = [
    'Marketing',
    'Operations',
    'HR',
    'Technology',
    'Miscellaneous',
];

// Function to generate customer data
function generateCustomersData() {
    const customersData = [];

    for (let i = 0; i < 200; i++) {
        const customer = {
            id: i + 1,
            location: regions[Math.floor(Math.random() * regions.length)], // Randomly assign a region
        };
        customersData.push(customer);
    }
    return customersData;
}

// Function to generate sales data
function generateSalesData(customers) {
    const salesData = [];

    for (let i = 0; i < 200; i++) {
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

// Function to generate expenses data
function generateExpensesData() {
    const expensesData = [];

    for (let i = 0; i < 200; i++) {
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

// Function to generate transaction data
function generateTransactionsData(sales, expenses) {
    const transactionsData = [];

    // Add sales transactions
    sales.forEach((sale) => {
        transactionsData.push({
            id: sale.id,
            date: sale.date,
            amount: sale.amount,
            type: 'sale',
            status: Math.random() > 0.5 ? 'completed' : 'pending',
        });
    });

    // Add expense transactions
    expenses.forEach((expense) => {
        transactionsData.push({
            id: expense.id + sales.length, // Ensure unique ID
            date: expense.date,
            amount: expense.amount,
            type: 'expense',
            status: Math.random() > 0.5 ? 'completed' : 'pending',
        });
    });

    return transactionsData;
}

// Helper function to generate a random date between two dates
function randomDate(start, end) {
    const timestamp =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(timestamp).toISOString().split('T')[0];
}

// Function to write the generated data to a db.json file
function writeDataToJsonFile() {
    const customers = generateCustomersData();
    const sales = generateSalesData(customers);
    const expenses = generateExpensesData();
    const transactions = generateTransactionsData(sales, expenses);

    const data = {
        customers,
        sales,
        expenses,
        transactions,
    };

    const filePath = path.resolve(__dirname, 'db.json');

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    console.log('Data successfully written to db.json');
}

// Run the function to write the data to db.json
writeDataToJsonFile();
