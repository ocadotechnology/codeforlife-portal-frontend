import { type User } from "codeforlife/lib/esm/api"
import {
  buildUrl,
  tagData,
  type Arg,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  type Model,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

export type SchoolTeacherInvitation = Model<
  number,
  {
    expires_at: Date
    invited_teacher_first_name: string
    invited_teacher_last_name: string
    invited_teacher_email: string
    invited_teacher_is_admin: boolean
  }
>

const listUrl = "schools/teacher-invitations/"
const detailUrl = listUrl + "<id>/"

const schoolTeacherInvitationApi = api.injectEndpoints({
  endpoints: build => ({
    acceptSchoolTeacherInvitation: build.mutation<
      null,
      [
        SchoolTeacherInvitation["id"],
        {
          user?: Arg<
            User,
            "first_name" | "last_name" | "password" | "email"
          > & { add_to_newsletter: boolean }
        },
      ]
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
        body,
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation"),
    }),
    rejectSchoolTeacherInvitation: build.mutation<
      null,
      SchoolTeacherInvitation["id"]
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation"),
    }),
    refreshSchoolTeacherInvitation: build.mutation<
      UpdateResult<SchoolTeacherInvitation, "expires_at">,
      UpdateArg<SchoolTeacherInvitation>
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "PUT",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation"),
    }),
    createSchoolTeacherInvitation: build.mutation<
      CreateResult<SchoolTeacherInvitation, "expires_at">,
      CreateArg<
        SchoolTeacherInvitation,
        | "invited_teacher_email"
        | "invited_teacher_first_name"
        | "invited_teacher_last_name"
        | "invited_teacher_is_admin"
      >
    >({
      query: body => ({
        url: listUrl,
        method: "POST",
        body,
      }),
    }),
    destroySchoolTeacherInvitation: build.mutation<
      DestroyResult,
      DestroyArg<SchoolTeacherInvitation>
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("SchoolTeacherInvitation"),
    }),
    retrieveSchoolTeacherInvitation: build.query<
      RetrieveResult<
        SchoolTeacherInvitation,
        | "expires_at"
        | "invited_teacher_email"
        | "invited_teacher_first_name"
        | "invited_teacher_last_name"
        | "invited_teacher_is_admin"
      >,
      RetrieveArg<SchoolTeacherInvitation>
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("SchoolTeacherInvitation"),
    }),
    listSchoolTeacherInvitations: build.query<
      ListResult<
        SchoolTeacherInvitation,
        | "expires_at"
        | "invited_teacher_email"
        | "invited_teacher_first_name"
        | "invited_teacher_last_name"
        | "invited_teacher_is_admin"
      >,
      ListArg
    >({
      query: search => ({
        url: buildUrl(listUrl, { search }),
        method: "GET",
      }),
      providesTags: tagData("SchoolTeacherInvitation"),
    }),
  }),
})

export default schoolTeacherInvitationApi
export const {
  useAcceptSchoolTeacherInvitationMutation,
  useRejectSchoolTeacherInvitationMutation,
  useRefreshSchoolTeacherInvitationMutation,
  useCreateSchoolTeacherInvitationMutation,
  useDestroySchoolTeacherInvitationMutation,
  useRetrieveSchoolTeacherInvitationQuery,
  useLazyRetrieveSchoolTeacherInvitationQuery,
  useListSchoolTeacherInvitationsQuery,
  useLazyListSchoolTeacherInvitationsQuery,
} = schoolTeacherInvitationApi
