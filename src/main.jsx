
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import TuChambitaProvider from "./context/context.jsx";
import theme from "../src/theme/theme.jsx";
createRoot(document.getElementById('root')).render(
  <TuChambitaProvider>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  </TuChambitaProvider>,
)


