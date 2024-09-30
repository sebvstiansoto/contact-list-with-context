// Importar React en el bundle
import React from "react";
import { createRoot } from "react-dom/client";

// Incluir tu archivo index.scss en el bundle
import "../styles/index.css";

// Importar tus propios componentes
import Layout from "./layout.js";
import injectContext from "./store/appContext";

// Crear el root para renderizar la aplicación
const root = createRoot(document.querySelector("#app"));

// Renderizar tu aplicación React envuelta en el contexto
const InjectedLayout = injectContext(Layout); // Envuelve Layout con el contexto
root.render(<InjectedLayout />);
