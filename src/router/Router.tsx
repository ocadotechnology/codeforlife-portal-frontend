import type { FC } from "react"
import { BrowserRouter, Routes } from "react-router-dom"

// import Header from '../../features/header/Header';
// import Footer from '../../features/footer/Footer';
// import general from './routes/general';
import authentication from "./routes/authentication"
// import teacher from './routes/teacher';
// import student from './routes/student';
// import error from './routes/error';

export interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      {/* {general} */}
      {authentication}
      {/* {teacher} */}
      {/* {student} */}
      {/* {error} */} {/* this must be last */}
    </Routes>
    {/* <Footer /> */}
  </BrowserRouter>
)

export default Router
