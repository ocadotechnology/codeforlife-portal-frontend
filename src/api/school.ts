import {
  type CreateArg,
  type CreateResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type School, urls } from "codeforlife/api"
import getReadSchoolEndpoints, {
  type RetrieveSchoolArg,
  type RetrieveSchoolResult,
  SCHOOL_TAG,
} from "codeforlife/api/endpoints/school"

import api from "."

export type { RetrieveSchoolArg, RetrieveSchoolResult }

export type CreateSchoolResult = CreateResult<School>
export type CreateSchoolArg = CreateArg<School, "name", "country" | "uk_county">

export type UpdateSchoolResult = UpdateResult<School>
export type UpdateSchoolArg = UpdateArg<
  School,
  never,
  "name" | "country" | "uk_county"
>

const schoolApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadSchoolEndpoints(build),
    createSchool: build.mutation<CreateSchoolResult, CreateSchoolArg>({
      query: body => ({
        url: urls.school.list,
        method: "POST",
        body,
      }),
    }),
    updateSchool: build.mutation<UpdateSchoolResult, UpdateSchoolArg>({
      query: ([id, body]) => ({
        url: buildUrl(urls.school.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData(SCHOOL_TAG),
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
