'use client';

import { cn } from '@/utils/cn';
import { type Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DetailsButton } from './DetailsButton';
import { MenuButton } from './MenuButton';
import { NAV_SEARCH_PARAM } from './constants';
import { routes } from './routes';

export function Nav() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNavOpen =
    searchParams.get(NAV_SEARCH_PARAM.key) === NAV_SEARCH_PARAM.value;

  const handleChangeIsNavOpen = (newIsNavOpen: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newIsNavOpen) {
      newSearchParams.set(NAV_SEARCH_PARAM.key, NAV_SEARCH_PARAM.value);
    } else {
      newSearchParams.delete(NAV_SEARCH_PARAM.key);
    }

    replace(`${pathname}?${newSearchParams}` as Route);
  };

  return (
    <>
      <DetailsButton />

      <div
        className={cn(
          'absolute top-0 left-0 z-10 h-screen w-screen',
          isNavOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <header
          className={cn(
            'flex h-16 items-center justify-between gap-4 border-b border-slate-800 bg-slate-900 pr-20 pl-8',
            isNavOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          <h1>{routes.find((route) => route.path === pathname)?.title}</h1>

          <Link href="/" onClick={() => handleChangeIsNavOpen(false)}>
            About
          </Link>
        </header>

        <MenuButton className="absolute top-4 right-4" />

        <nav
          className={cn(
            'flex [height:calc(100%-4rem)] w-screen flex-grow flex-col bg-slate-900 transition-all',
            isNavOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          <ul className="grid [max-width:100vw] grid-cols-1 overflow-y-auto xl:grid-cols-2">
            {routes.map((route) => (
              <li
                key={route.path}
                className="group relative [height:200px] bg-slate-400 xl:[height:350px]"
              >
                <Link
                  href={route.path}
                  onClick={() => handleChangeIsNavOpen(false)}
                  className="relative flex h-full w-full items-center justify-center p-4"
                >
                  <Image
                    src={route.img}
                    alt={route.title}
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    fill
                  />
                  <h2 className="absolute top-0 left-0 flex h-full w-full items-center justify-center rounded border border-slate-100 p-4 text-2xl text-white opacity-0 transition-all group-hover:bg-slate-950/75 group-hover:opacity-100">
                    {route.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
