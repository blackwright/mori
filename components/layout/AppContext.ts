import { createContext, useContext } from 'react';

type Context = {
  isNavOpen: boolean;
  toggleNavOpen: (isOpen?: boolean) => void;
};

export const AppContext = createContext<Context>({
  isNavOpen: false,
  toggleNavOpen: () => {}
});

export function useAppContext(): Context {
  return useContext(AppContext);
}
