import { type Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DETAILS_SEARCH_PARAM } from './constants';

export function useDetailsSearchParams(): [boolean, () => void] {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const areDetailsOpen =
    searchParams.get(DETAILS_SEARCH_PARAM.key) === DETAILS_SEARCH_PARAM.value;

  const handleToggleDetails = () => {
    const newDetailsOpen = !areDetailsOpen;
    const newSearchParams = new URLSearchParams(searchParams);

    if (newDetailsOpen) {
      newSearchParams.set(DETAILS_SEARCH_PARAM.key, DETAILS_SEARCH_PARAM.value);
    } else {
      newSearchParams.delete(DETAILS_SEARCH_PARAM.key);
    }

    replace(`${pathname}?${newSearchParams}` as Route);
  };

  return [areDetailsOpen, handleToggleDetails];
}
