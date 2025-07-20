import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import Option from '../../ui/Option';

export const Route = createFileRoute('/library')({
  component: LibraryRoute,
})

function LibraryRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    const pathname_parts = pathname.split("/");
    const filtered_parts = pathname_parts.filter((part) => {
      return part !== "";
    });
    if (filtered_parts.length == 1) {
      navigate({
        to: "/library/started",
        replace: true,
      });
    }

    return () => {
      return;
    }
  }, []);

  return (
    <div className={`flex flex-col h-full`}>
      <header className={`shrink-0`}>
      </header>

      <main className={`flex-[1_1_auto] overflow-y-auto`}>
        <Outlet />
      </main>

      <footer className={`shrink-0`}>
        <div className={`w-full p-4`}>
          <div className={`flex flex-row flex-nowrap gap-1 overflow-auto`}>
            <div className={`text-nowrap flex-1 text-center`}>
              <Option text="Started" to="/library/started" />
            </div>
            <div className={`text-nowrap flex-1 text-center`}>
              <Option text="Not Started" to="/library/notstarted" />
            </div>
            <div className={`text-nowrap flex-1 text-center`}>
              <Option text="Completed" to="/library/completed" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
