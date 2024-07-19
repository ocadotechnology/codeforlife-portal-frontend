import {
  type CreateArg,
  type CreateResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type School, getReadSchoolEndpoints, urls } from "codeforlife/api"

import api from "."

const schoolApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadSchoolEndpoints(build),
    createSchool: build.mutation<
      CreateResult<School>,
      CreateArg<School, "name", "country" | "uk_county">
    >({
      query: body => ({
        url: urls.school.list,
        method: "POST",
        body,
      }),
    }),
    updateSchool: build.mutation<
      UpdateResult<School>,
      UpdateArg<School, never, "name" | "country" | "uk_county">
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.school.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("School"),
    }),
  }),
})

export default schoolApi
export const {
  useRetrieveSchoolQuery,
  useLazyRetrieveSchoolQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
} = schoolApi
