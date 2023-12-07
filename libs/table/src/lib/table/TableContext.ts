import { createContext } from 'react';

interface TableContextProps {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

const TableContext = createContext<TableContextProps>({
  isFullScreen: false,
  setIsFullScreen: () => void 0,
});

export default TableContext;
