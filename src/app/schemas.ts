import * as yup from "yup"

export const classIdSchema = yup
  .string()
  .matches(/^[A-Z0-9]{5}$/, "Invalid access code")

const passwordSchema = yup.string().required("required")

export const teacherPasswordSchema = passwordSchema.test({
  message: "too-weak",
  test: password =>
    password.length >= 10 &&
    !(
      password.search(/[A-Z]/) === -1 ||
      password.search(/[a-z]/) === -1 ||
      password.search(/[0-9]/) === -1 ||
      password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1
    ),
})

export const studentPasswordSchema = passwordSchema.test({
  message: "too-weak",
  test: password => password.length >= 6,
})

// TODO: make indy password schema the same as teacher's.
export const indyPasswordSchema = passwordSchema.test({
  message: "too-weak",
  test: password =>
    password.length >= 8 &&
    !(
      password.search(/[A-Z]/) === -1 ||
      password.search(/[a-z]/) === -1 ||
      password.search(/[0-9]/) === -1
    ),
})
