import { useTranslation } from 'react-i18next';

// Variables we will use to replay state of fetch() promise to React
let status = 'pending';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let result: any;

// Fetch external data
function fetchTest() {
  const fetching = new Promise((resolve, reject) => {
    // Simulates 5 second data fetching
    setTimeout(() => resolve(true), 5000);
  })
    .then(() => {
      return { data: 'loaded' };
    })
    // Fetch request has gone well
    .then((success) => {
      status = 'fulfilled';
      result = success;
    })
    // Fetch request has failed
    .catch((error) => {
      status = 'rejected';
      result = error;
    });

  return () => {
    if (status === 'pending') {
      throw fetching; // Suspend(A way to tell React data is still fetching)
    } else if (status === 'rejected') {
      throw result; // Result is an error
    } else if (status === 'fulfilled') {
      return result; // Result is a fulfilled promise
    }
  };
}

export const AsyncPage = () => {
  console.log('AsyncPage');
  const { t } = useTranslation();

  status === 'pending' && fetchTest()();
  //
  return (
    <div className="content">
      <span style={{ fontWeight: 700 }}>{t('data-loaded')}</span>
    </div>
  );
};
