import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LeanScopeClientApp, LeanScopeClient, LocalDataMode } from "@leanscope/api-client/node";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LeanScopeClientApp
      leanScopeClient={
        new LeanScopeClient({
          supabaseUrl: "http://localhost:3000",
          supabaseKey: "public_anon_key",
          openAIApiKey: "public_anon_key",
          openAIOrgId: "public_anon_key",
          localDataMode: LocalDataMode.MOCK,
        })
      }
    >
      <App />
    </LeanScopeClientApp>
  </React.StrictMode>
);
