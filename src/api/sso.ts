// TODO: rename this file to session.ts and move to codeforlife-sso-frontend.

import {
  type Class,
  type OtpBypassToken,
  type Student,
  type User,
} from "codeforlife/api"
import { type Arg } from "codeforlife/utils/api"
import { type SessionMetadata } from "codeforlife/hooks"
import { buildLoginEndpoint } from "codeforlife/api/endpoints"

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
    loginWithEmail: buildLoginEndpoint<LoginWithEmailResult, LoginWithEmailArg>(
      build,
      baseUrl + "login-with-email/",
    ),
    loginWithOtp: buildLoginEndpoint<LoginWithOtpResult, LoginWithOtpArg>(
      build,
      baseUrl + "login-with-otp/",
    ),
    loginWithOtpBypassToken: buildLoginEndpoint<
      LoginWithOtpBypassTokenResult,
      LoginWithOtpBypassTokenArg
    >(build, baseUrl + "login-with-otp-bypass-token/"),
    loginAsStudent: buildLoginEndpoint<LoginAsStudentResult, LoginAsStudentArg>(
      build,
      baseUrl + "login-as-student/",
    ),
    autoLoginAsStudent: buildLoginEndpoint<
      AutoLoginAsStudentResult,
      AutoLoginAsStudentArg
    >(build, baseUrl + "auto-login-as-student/"),
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
