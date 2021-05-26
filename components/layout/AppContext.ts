import { createContext, useContext } from 'react';

type Context = {
  isNavOpen: boolean;
  toggleNavOpen: () => void;
};

export const AppContext = createContext<Context>({
  isNavOpen: false,
  toggleNavOpen: () => {}
});

export function useAppContext(): Context {
  return useContext(AppContext);
}
