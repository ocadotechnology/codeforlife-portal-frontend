import { type Model } from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type SchoolTeacherInvitation = Model<number, {}>

const schoolTeacherInvitationApi = api.injectEndpoints({
  endpoints: build => ({}),
})

export default schoolTeacherInvitationApi
export const {} = schoolTeacherInvitationApi
