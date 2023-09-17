import { RouterProvider } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { router } from "./router";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
	return (
		<Center h={"100vh"} w={"100vw"} bg={"primary.dark"}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</Center>
	);
};

export default App;
