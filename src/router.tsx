import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home.tsx";
import { SearchResults } from "./pages/search-results.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/search-results",
		element: <SearchResults />
	}
]);
