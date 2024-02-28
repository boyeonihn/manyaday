import { format } from 'date-fns';

export const extractMonthDay = (date: number) => {
  return format(date, 'MM-dd');
};

export const formatMmDdYyyy = (date: number) => {
  return format(date, 'MMM do, yyy');
};

export const extractYear = (created_ts: string) => {
  return created_ts.slice(0, 4);
};
