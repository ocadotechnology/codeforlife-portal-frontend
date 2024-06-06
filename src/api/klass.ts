import { urls, type Class } from "codeforlife/api"
import {
  buildUrl,
  tagData,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type ListArg,
  type ListResult,
  type RetrieveArg,
  type RetrieveResult,
  type UpdateArg,
  type UpdateResult,
} from "codeforlife/utils/rtkQuery"

import api from "."

const classApi = api.injectEndpoints({
  endpoints: build => ({
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
    retrieveClass: build.query<
      RetrieveResult<
        Class,
        | "name"
        | "read_classmates_data"
        | "receive_requests_until"
        | "school"
        | "teacher"
      >,
      RetrieveArg<Class>
    >({
      query: id => ({
        url: buildUrl(urls.class.detail, { url: { id } }),
        method: "GET",
      }),
      providesTags: tagData("Class"),
    }),
    listClasses: build.query<
      ListResult<
        Class,
        | "name"
        | "read_classmates_data"
        | "receive_requests_until"
        | "school"
        | "teacher"
      >,
      ListArg
    >({
      query: search => ({
        url: buildUrl(urls.class.list, { search }),
        method: "GET",
      }),
      providesTags: tagData("Class"),
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
