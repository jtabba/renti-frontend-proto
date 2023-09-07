import { RouterProvider } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { router } from "./router";
import "./App.css";

const App = () => {
	return (
		<Center h={"100vh"} w={"100vw"} bg={"primary.dark"}>
			<RouterProvider router={router} />
		</Center>
	);
};

export default App;
