import { useState } from "react";
import TableContext from "./TableContext";

type TableContextProviderProps = {
  children: React.ReactNode;
};

export default function TableContextProvider({
  children,
}: TableContextProviderProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <TableContext.Provider
      value={{
        isFullScreen,
        setIsFullScreen,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
