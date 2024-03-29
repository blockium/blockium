import { useTranslation } from 'react-i18next';

let status = 'pending';

export const AsyncPage = () => {
  const { t } = useTranslation();

  if (status === 'pending') {
    throw (
      new Promise((resolve, reject) => {
        // Simulates 5 seconds data fetching
        setTimeout(() => resolve(true), 5000);
      })
        // Fetch request has gone well
        .then(() => {
          status = 'fulfilled';
        })
    );
  }

  return (
    <div className="content">
      <span style={{ fontWeight: 700 }}>{t('data-loaded')}</span>
    </div>
  );
};
