import { CssBaseline, ThemeProvider } from "@mui/material"
import type { FC } from "react"

import theme from "./app/theme"
import Router from "./router"

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
