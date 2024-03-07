import { format } from 'date-fns';

interface dateObj {
  date: number;
  includeYear?: boolean;
}
export const extractMonthDay = (date: number) => {
  return format(date, 'MM-dd');
};

export const formatDate = ({ date, includeYear = false }: dateObj) => {
  return includeYear ? format(date, 'MMMM do, yyy') : format(date, 'MMMM do');
};

export const extractYear = (created_ts: string) => {
  return created_ts.slice(0, 4);
};
