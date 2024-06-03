import { type School } from "codeforlife/lib/esm/api/models"
import {
  buildUrl,
  tagData,
  type CreateArg,
  type CreateResult,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/lib/esm/helpers/rtkQuery"

import api from "."

const listUrl = "schools/"
const detailUrl = listUrl + "<id>/"

const schoolApi = api.injectEndpoints({
  endpoints: build => ({
    retrieveSchool: build.query<
      RetrieveResult<School, "name" | "country" | "uk_county">,
      RetrieveArg<School>
    >({
      query: id => ({
        url: buildUrl(detailUrl, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("School"),
    }),
    createSchool: build.mutation<
      CreateResult<School>,
      CreateArg<School, "name", "country" | "uk_county">
    >({
      query: body => ({
        url: listUrl,
        method: "POST",
        body,
      }),
    }),
    updateSchool: build.mutation<
      UpdateResult<School>,
      UpdateArg<School, never, "name" | "country" | "uk_county">
    >({
      query: ([id, body]) => ({
        url: buildUrl(detailUrl, { url: { id } }),
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
