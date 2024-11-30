'use client';

import { SetStateAction, useState } from 'react';
import { useDataContext } from '@/components/providers/data-provider';
import {
    Table,
    Input,
    Box,
    Text,
    createListCollection,
} from '@chakra-ui/react';
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from '@/components/ui/select';
import { InputGroup } from '@/components/ui/input-group';
import { LuSearch } from 'react-icons/lu';

export default function TransactionTable() {
    const { transactions } = useDataContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string[]>();

    // Handle search input change
    const handleSearchChange = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        console.log('the value', e.target.value);
        setSearchQuery(e.target.value);
    };

    // Handle filter change
    const handleFilterChange = (e: {
        value: SetStateAction<string[] | undefined>;
    }) => {
        setFilterType(e.value);
    };

    // Filter and search the transactions
    const filteredTransactions = transactions
        .filter((transaction) => {
            if (!filterType && !searchQuery) {
                return true;
            }
            const matchesSearchQuery = searchQuery
                ? transaction.id.toString().includes(searchQuery) ||
                  transaction.date.includes(searchQuery)
                : true;

            const matchesFilterType = filterType
                ? transaction.type === filterType[0]
                : true;
            return matchesSearchQuery && matchesFilterType;
        })
        .sort((a, b) => {
            // Sort by date, from most recent to least recent
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // @ts-ignore
            return dateB - dateA;
        });

    const filterByTypeOptions = createListCollection({
        items: [
            { label: 'expenses', value: 'expense' },
            { label: 'sale', value: 'sale' },
        ],
    });

    return (
        <Box
            p="4"
            bg="white"
            rounded="md"
            borderWidth="1px"
            borderColor="border.disabled"
            m={[2, 4, 4]}
        >
            <Text fontSize="lg" fontWeight="bold">
                Transaction Table
            </Text>

            {/* Search and Filter Section */}
            <Box display="flex" gap={4} mb={4} mt={5}>
                <div className="flex justify-start flex-col md:flex-row items-center gap-5 ">
                    <SelectRoot
                        collection={filterByTypeOptions}
                        value={filterType}
                        width="250px"
                        onValueChange={handleFilterChange}
                    >
                        <SelectTrigger
                            className={
                                'border border-gray-300 rounded-lg py-1 px-2'
                            }
                        >
                            <SelectValueText placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                            {filterByTypeOptions.items.map((type) => (
                                <SelectItem item={type} key={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                    <InputGroup
                        flex="1"
                        startElement={<LuSearch />}
                        borderWidth={1}
                        borderColor={'gray.300'}
                        rounded={'md'}
                        p={1}
                    >
                        <Input
                            placeholder="Search transactions"
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </div>
            </Box>

            {/* Transaction Table */}
            <Table.ScrollArea borderWidth="1px" rounded="md" height="200px">
                <Table.Root size="sm" striped={true} _dark={{ color: 'white' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>
                                Transaction ID
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Amount</Table.ColumnHeader>
                            <Table.ColumnHeader>Type</Table.ColumnHeader>
                            <Table.ColumnHeader>Status</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <Table.Row key={transaction.id}>
                                    <Table.Cell>{transaction.id}</Table.Cell>
                                    <Table.Cell>{transaction.date}</Table.Cell>
                                    <Table.Cell>
                                        ${transaction.amount.toFixed(2)}
                                    </Table.Cell>
                                    <Table.Cell>{transaction.type}</Table.Cell>
                                    <Table.Cell>
                                        {transaction.status}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={5} textAlign="center">
                                    No transactions found
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </Box>
    );
}
