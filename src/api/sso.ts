// TODO: rename this file to session.ts and move to codeforlife-sso-frontend.

import {
  type Class,
  type OtpBypassToken,
  type Student,
  type User,
} from "codeforlife/api"
import { type SessionMetadata } from "codeforlife/hooks"
import { type Arg } from "codeforlife/utils/api"

import api from "."

const baseUrl = "sso/session/"

const ssoApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithEmail: build.mutation<
      SessionMetadata,
      Arg<User, "email" | "password">
    >({
      query: body => ({
        url: baseUrl + "login-with-email/",
        method: "POST",
        body,
      }),
    }),
    loginWithOtp: build.mutation<null, { otp: string }>({
      query: body => ({
        url: baseUrl + "login-with-otp/",
        method: "POST",
        body,
      }),
    }),
    loginWithOtpBypassToken: build.mutation<
      SessionMetadata,
      Arg<OtpBypassToken, "token">
    >({
      query: body => ({
        url: baseUrl + "login-with-otp-bypass-token/",
        method: "POST",
        body,
      }),
    }),
    loginAsStudent: build.mutation<
      SessionMetadata,
      Arg<User, "first_name" | "password"> & { class_id: Class["id"] }
    >({
      query: body => ({
        url: baseUrl + "login-as-student/",
        method: "POST",
        body,
      }),
    }),
    autoLoginAsStudent: build.mutation<
      SessionMetadata,
      {
        student_id: Student["id"]
        auto_gen_password: string
      }
    >({
      query: body => ({
        url: baseUrl + "auto-login-as-student/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export default ssoApi
export const {
  useLoginWithEmailMutation,
  useLoginWithOtpMutation,
  useLoginWithOtpBypassTokenMutation,
  useLoginAsStudentMutation,
  useAutoLoginAsStudentMutation,
} = ssoApi
