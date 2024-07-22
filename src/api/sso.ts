// TODO: rename this file to session.ts and move to codeforlife-sso-frontend.

import {
  type Class,
  type OtpBypassToken,
  type Student,
  type User,
} from "codeforlife/api"
import { type Arg } from "codeforlife/utils/api"
import { type SessionMetadata } from "codeforlife/hooks"

import api from "."

const baseUrl = "sso/session/"

export type LoginWithEmailResult = SessionMetadata
export type LoginWithEmailArg = Arg<User, "email" | "password">

export type LoginWithOtpResult = null
export type LoginWithOtpArg = { otp: string }

export type LoginWithOtpBypassTokenResult = SessionMetadata
export type LoginWithOtpBypassTokenArg = Arg<OtpBypassToken, "token">

export type LoginAsStudentResult = SessionMetadata
export type LoginAsStudentArg = Arg<User, "first_name" | "password"> & {
  class_id: Class["id"]
}

export type AutoLoginAsStudentResult = SessionMetadata
export type AutoLoginAsStudentArg = {
  student_id: Student["id"]
  auto_gen_password: string
}

const ssoApi = api.injectEndpoints({
  endpoints: build => ({
    loginWithEmail: build.mutation<LoginWithEmailResult, LoginWithEmailArg>({
      query: body => ({
        url: baseUrl + "login-with-email/",
        method: "POST",
        body,
      }),
    }),
    loginWithOtp: build.mutation<LoginWithOtpResult, LoginWithOtpArg>({
      query: body => ({
        url: baseUrl + "login-with-otp/",
        method: "POST",
        body,
      }),
    }),
    loginWithOtpBypassToken: build.mutation<
      LoginWithOtpBypassTokenResult,
      LoginWithOtpBypassTokenArg
    >({
      query: body => ({
        url: baseUrl + "login-with-otp-bypass-token/",
        method: "POST",
        body,
      }),
    }),
    loginAsStudent: build.mutation<LoginAsStudentResult, LoginAsStudentArg>({
      query: body => ({
        url: baseUrl + "login-as-student/",
        method: "POST",
        body,
      }),
    }),
    autoLoginAsStudent: build.mutation<
      AutoLoginAsStudentResult,
      AutoLoginAsStudentArg
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
