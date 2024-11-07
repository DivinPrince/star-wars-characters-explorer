import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";

import StarWarsExplorer from "./components/star-wars-explorer";
import { CharacterPage } from "./components/character/page";

import { QueryProvider } from "./providers/query-provider";

const router = createBrowserRouter([
  {
    element: (
      <>
        <div 
          className="flex flex-col items-center gap-2 py-4 sticky top-0 backdrop-blur-sm bg-background/30 z-50 cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            id="local-nav-logo-desktop"
            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
            alt="Star Wars Logo"
            className="h-16"
          />
          <h1 className="font-orbitron text-xl font-medium text-muted-foreground">Characters Explorer</h1>
        </div>
        <Outlet />
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
