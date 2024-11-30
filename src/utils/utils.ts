import { isWithinInterval, parseISO } from 'date-fns';

export const filterDataByDateRange = (
    data: any[],
    startDate: Date,
    endDate: Date,
) => {
    console.log('the end date', endDate);
    return data.filter((item) => {
        const itemDate = parseISO(item.date); // Convert string to Date object
        return isWithinInterval(itemDate, { start: startDate, end: endDate });
    });
};
