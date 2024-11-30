import { Box } from '@chakra-ui/react';
import StatsCardsSection from '@/components/stats/stats-cards-section';
import Charts from '@/components/charts/charts';
import TransactionTable from '@/components/tables/transction-table';

export default function Home() {
    return (
        <Box
            p={2}
            minHeight="100vh"
            display="flex"
            bg={'gray.100'}
            w="100%"
            _dark={{ bg: 'gray.800' }}
            overflowX="hidden"
        >
            <Box flex="1" flexDirection="column" display="flex" minWidth="0">
                <StatsCardsSection />
                <Charts />
                <TransactionTable />
            </Box>
        </Box>
    );
}
