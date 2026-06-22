import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return '';
  return format(new Date(dateString), formatStr);
};

export const getRelativeTimeText = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isPast(date) && !isToday(date)) return 'Overdue';
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  const days = differenceInDays(date, new Date());
  return `${days} days left`;
};

export const getRelativeTimeColor = (dateString) => {
  if (!dateString) return 'text-gray-500';
  const date = new Date(dateString);
  if (isPast(date) && !isToday(date)) return 'text-red-500';
  if (isToday(date) || isTomorrow(date)) return 'text-orange-500';
  return 'text-gray-500 dark:text-gray-400';
};
