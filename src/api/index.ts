import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["SchoolTeacherInvitation"],
})

export default api
export const { useLogoutMutation } = api
