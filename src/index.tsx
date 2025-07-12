import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOSInit from "./components/wrappers/AOSInit";
import { MantineProviders } from "./components/wrappers/MantineProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 3,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <AOSInit />
    <QueryClientProvider client={queryClient}>
      <MantineProviders>
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProviders>
    </QueryClientProvider>
  </StrictMode>
);
