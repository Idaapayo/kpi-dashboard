import { Box, Button, createListCollection, Flex } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import { LooseValue, Value } from 'react-calendar/src/shared/types';
import { Dispatch, SetStateAction } from 'react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from '@/components/ui/select';
import 'react-calendar/dist/Calendar.css';

interface DateRangeChoice {
    label: string;
    value: string;
}

interface DateRangePickerProps {
    setActiveRangeDate: Dispatch<SetStateAction<string[]>>;
    activeRangeDate: string[];
    dateRangeChoices: DateRangeChoice[];
    showDateRangePicker: boolean;
    setShowDateRangePicker: (showDateRangePicker: boolean) => void;
    customRange?: LooseValue;
    setCustomRange: (customRange: LooseValue) => void;
}

export default function DateRangePicker({
    setActiveRangeDate,
    activeRangeDate = ['last7'],
    dateRangeChoices,
    showDateRangePicker,
    setShowDateRangePicker,
    customRange,
    setCustomRange,
}: DateRangePickerProps) {
    const ranges = createListCollection({ items: dateRangeChoices });

    const handleDateRangeChange = (dateRange: Value) => {
        setCustomRange(dateRange);
    };

    return (
        <Box>
            <Flex marginBottom={2} align="center" gap={2}>
                <SelectRoot
                    collection={ranges}
                    width="320px"
                    value={activeRangeDate}
                    onValueChange={(e) => setActiveRangeDate(e.value)}
                >
                    <SelectLabel>Select date range</SelectLabel>
                    <SelectTrigger>
                        <SelectValueText placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                        {ranges.items.map((range) => (
                            <SelectItem item={range} key={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
                {activeRangeDate.includes('custom') && (
                    <Button
                        onClick={() =>
                            setShowDateRangePicker(!showDateRangePicker)
                        }
                        colorScheme="teal"
                    >
                        {showDateRangePicker
                            ? 'Hide Date Picker'
                            : 'Select Date Range'}
                    </Button>
                )}
            </Flex>
            {showDateRangePicker && activeRangeDate.includes('custom') && (
                <Box
                    marginBottom={4}
                    p={4}
                    border="1px solid"
                    borderColor="gray.200"
                    rounded="md"
                    bg="gray.50"
                    minWidth="350px"
                    minHeight="350px"
                >
                    <Calendar
                        onChange={handleDateRangeChange}
                        value={customRange}
                        selectRange={true}
                    />
                </Box>
            )}
        </Box>
    );
}