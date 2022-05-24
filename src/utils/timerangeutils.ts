import dayjs from 'dayjs';

const isValidTime = (value: string): boolean => value !== 'Invalid Date';

const isToday = (value: Date | null): boolean => (value ? dayjs().isSame(value, 'day') : false);

export { isValidTime, isToday };
