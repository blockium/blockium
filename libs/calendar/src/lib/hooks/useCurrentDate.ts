import { createGlobalState } from 'react-use';

const useCurrentDateInt = createGlobalState<Date>(() => {
  // Get the current date from local storage
  const currentDateStr = localStorage.getItem('currentDate');

  // Instantiate based on storage date or the current time
  return currentDateStr ? new Date(currentDateStr) : new Date();
});

export const useCurrentDate = () => {
  const [currentDate, setCurrentDateInt] = useCurrentDateInt();

  // Before setting the current date, saves it in the local storage.
  const setCurrentDate = (date: Date) => {
    localStorage.setItem('currentDate', date.toISOString());
    setCurrentDateInt(date);
  };

  return [currentDate, setCurrentDate];
};
