import { Box } from '@chakra-ui/react';
import StatsCardsSection from '@/components/stats/stats-cards-section';
import Charts from '@/components/charts/charts';

export default function Home() {
    return (
        <Box p={2} minHeight="100vh" display="flex" bg={'gray.100'}>
            <Box flex={'1'}>
                <StatsCardsSection />
                <Charts />
            </Box>
        </Box>
    );
}
