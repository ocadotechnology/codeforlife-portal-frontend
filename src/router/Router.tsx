import { BrowserRouter, Routes } from "react-router-dom"
import type { FC } from "react"

// import Header from '../../features/header/Header';
// import Footer from '../../features/footer/Footer';
import authentication from "./routes/authentication"
import error from "./routes/error"
import general from "./routes/general"
import student from "./routes/student"
import teacher from "./routes/teacher"

export interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      {general}
      {authentication}
      {teacher}
      {student}
      {error} {/* this must be last */}
    </Routes>
    {/* <Footer /> */}
  </BrowserRouter>
)

export default Router
