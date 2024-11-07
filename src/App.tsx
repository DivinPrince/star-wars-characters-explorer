import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";

import StarWarsExplorer from "./components/star-wars-explorer";
import { CharacterPage } from "./components/character/page";

import { QueryProvider } from "./providers/query-provider";

const router = createBrowserRouter([
  {
    element: (
      <>
        <div 
          className="flex flex-col items-center gap-2 py-4 sticky top-0 select-none backdrop-blur-sm bg-background/30 z-50 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <h1 className="font-star-wars text-4xl text-center font-medium text-primary">
            Star<br/>Wars
          </h1>
          <h2 className="font-orbitron text-xl font-medium text-muted-foreground">Characters Explorer</h2>
        </div>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        path: "/",
        element: <StarWarsExplorer />,
      },
      {
        path: "/characters/:id", 
        element: <CharacterPage />,
      }
    ]
  }
]);

function App() {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </NuqsAdapter>
  );
}

export default App;
