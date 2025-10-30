import { type EntryAppProps } from "codeforlife/server/entry"
import { type FC } from "react"
import _App from "codeforlife/server/App"

// import Footer from "./features/footer/Footer"
import store from "./app/store"
import theme from "./app/theme"

export interface AppProps extends EntryAppProps {}

const App: FC<AppProps> = props => (
  // footer={<Footer />}
  <_App store={store} theme={theme} {...props} />
)

export default App
