import { Box } from '@chakra-ui/react';
import StatsCardsSection from '@/components/stats/stats-cards-section';
import { DataProvider } from '@/components/providers/data-provider';

export default function Home() {
    return (
        <Box
            p={2}
            minHeight="100vh"
            display="flex"
            className="flex w-screen p-5 bg-white dark:bg-teal-950 text-black dark:text-white"
        >
            <DataProvider>
                <Box flex={'1'}>
                    <StatsCardsSection />
                </Box>
            </DataProvider>
        </Box>
    );
}
