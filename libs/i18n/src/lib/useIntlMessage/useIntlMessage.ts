import { useIntl } from 'react-intl';

export function useIntlMessage() {
  const { formatMessage } = useIntl();
  return (id: string) => formatMessage({ id });
}
