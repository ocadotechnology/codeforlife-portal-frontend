import { createApi } from "codeforlife/api"

const api = createApi({
  tagTypes: ["SchoolTeacherInvitation", "OtpBypassToken"],
})

export default api
export const { useLogoutMutation } = api
