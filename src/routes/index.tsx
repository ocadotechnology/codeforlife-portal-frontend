import authentication from "./authentication"
import error from "./error"
import general from "./general"
import student from "./student"
import teacher from "./teacher"

export interface RouterProps {}

const routes = (
  <>
    {general}
    {authentication}
    {teacher}
    {student}
    {error} {/* this must be last */}
  </>
)

export default routes
export { default as paths } from "./paths"
