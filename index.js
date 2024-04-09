import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

(async function () {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`;

  const apiResponse = await fetch(url);

  if (!apiResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  //put into json array
  const data = await apiResponse.json();

  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement);
  root.render(<App data={data} />);
})();
