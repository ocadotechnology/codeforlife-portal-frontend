import {
  type BulkUpdateArg,
  type BulkUpdateResult,
  type CreateArg,
  type CreateResult,
  type DestroyArg,
  type DestroyResult,
  type UpdateArg,
  type UpdateResult,
  buildUrl,
  tagData,
} from "codeforlife/utils/api"
import { type Class, urls } from "codeforlife/api"
import getReadClassEndpoints, {
  CLASS_TAG,
  type ListClassesArg,
  type ListClassesResult,
  type RetrieveClassArg,
  type RetrieveClassResult,
} from "codeforlife/api/endpoints/klass"

import api from "."

export type {
  ListClassesArg,
  ListClassesResult,
  RetrieveClassArg,
  RetrieveClassResult,
}

export type CreateClassResult = CreateResult<Class, "name">
export type CreateClassArg = CreateArg<
  Class,
  "name" | "read_classmates_data",
  "teacher" | "receive_requests_until"
>

export type DestroyClassResult = DestroyResult
export type DestroyClassArg = DestroyArg<Class>

export type UpdateClassResult = UpdateResult<Class>
export type UpdateClassArg = UpdateArg<
  Class,
  never,
  "name" | "read_classmates_data" | "receive_requests_until" | "teacher"
>

export type UpdateClassesResult = BulkUpdateResult<Class>
export type UpdateClassesArg = BulkUpdateArg<
  Class,
  never,
  "name" | "read_classmates_data" | "receive_requests_until" | "teacher"
>

const classApi = api.injectEndpoints({
  endpoints: build => ({
    ...getReadClassEndpoints(build),
    createClass: build.mutation<CreateClassResult, CreateClassArg>({
      query: body => ({
        url: urls.class.list,
        method: "POST",
        body,
      }),
      invalidatesTags: tagData(CLASS_TAG, { includeListTag: true }),
    }),
    destroyClass: build.mutation<DestroyClassResult, DestroyClassArg>({
      query: id => ({
        url: buildUrl(urls.class.detail, { url: { id } }),
        method: "DELETE",
      }),
      invalidatesTags: tagData(CLASS_TAG, { includeListTag: true }),
    }),
    updateClass: build.mutation<UpdateClassResult, UpdateClassArg>({
      query: ({ id, ...body }) => ({
        url: buildUrl(urls.class.detail, { url: { id } }),
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData(CLASS_TAG, { includeListTag: true }),
    }),
    updateClasses: build.mutation<UpdateClassesResult, UpdateClassesArg>({
      query: body => ({
        url: urls.class.list + "bulk/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: tagData(CLASS_TAG, {
        argKeysAreIds: true,
        includeListTag: true,
      }),
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
  useUpdateClassesMutation,
} = classApi
