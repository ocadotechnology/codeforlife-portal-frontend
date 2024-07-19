import { CssBaseline, ThemeProvider } from "@mui/material"
import type { FC } from "react"

import Router from "./router"
import theme from "./app/theme"

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
