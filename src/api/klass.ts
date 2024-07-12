import { getReadClassEndpoints, urls, type Class } from "codeforlife/api"
import {
  buildUrl,
  tagData,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/utils/api"

import api from "."

const classApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadClassEndpoints(build),
    createClass: build.mutation<
      CreateResult<Class>,
      CreateArg<
        Class,
        "name" | "read_classmates_data",
        "teacher" | "receive_requests_until"
      >
    >({
      query: body => ({
        url: urls.class.list,
        method: "POST",
        body,
      }),
    }),
    destroyClass: build.mutation<DestroyResult, DestroyArg<Class>>({
      query: id => ({
        url: buildUrl(urls.class.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData("Class"),
    }),
    updateClass: build.mutation<
      UpdateResult<Class>,
      UpdateArg<
        Class,
        never,
        "name" | "read_classmates_data" | "receive_requests_until" | "teacher"
      >
    >({
      query: ([id, body]) => ({
        url: buildUrl(urls.class.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData("Class"),
    }),
  }),
})

export default classApi
export const {
  useCreateClassMutation,
  useDestroyClassMutation,
  useUpdateClassMutation,
  useRetrieveClassQuery,
  useLazyRetrieveClassQuery,
  useListClassesQuery,
  useLazyListClassesQuery,
} = classApi
