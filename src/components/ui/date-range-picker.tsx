import { Box, createListCollection, Flex } from '@chakra-ui/react';
import Calendar from 'react-calendar';
// @ts-ignore
import { LooseValue, Value } from 'react-calendar/src/shared/types';
import { Dispatch, SetStateAction } from 'react';
import {
    SelectContent,
    SelectItem,
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
            <Flex marginBottom={2} align="center" gap={[1, 2, 2]}>
                <SelectRoot
                    collection={ranges}
                    width="320px"
                    value={activeRangeDate}
                    onValueChange={(e) => setActiveRangeDate(e.value)}
                    bg={'white'}
                    _dark={{ bg: 'gray.800', color: 'white' }}
                >
                    <SelectTrigger
                        borderWidth="1px"
                        borderColor="border.disabled"
                        p={2}
                        rounded={'md'}
                    >
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
                    <div className="flex flex-row gap-5 items-center ">
                        <button
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
                            onClick={() =>
                                setShowDateRangePicker(!showDateRangePicker)
                            }
                        >
                            {showDateRangePicker
                                ? 'Hide Date Picker'
                                : 'Open Date Picker'}
                        </button>
                    </div>
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
