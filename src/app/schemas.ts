import * as yup from "yup"

export const userIdSchema = yup.number()

export const classIdSchema = yup
  .string()
  .matches(/^[A-Z0-9]{5}$/, "invalid class code")

export const teacherPasswordSchema = yup
  .string()
  .min(10, "password must be at least 10 characters long")
  .matches(/[A-Z]/, "password must contain at least one uppercase letter")
  .matches(/[a-z]/, "password must contain at least one lowercase letter")
  .matches(/[0-9]/, "password must contain at least one digit")
  .matches(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "password must contain at least one special character",
  )

export const studentPasswordSchema = yup
  .string()
  .min(6, "password must be at least 6 characters long")

export const indyPasswordSchema = yup
  .string()
  .min(8, "password must be at least 8 characters long")
  .matches(/[A-Z]/, "password must contain at least one uppercase letter")
  .matches(/[a-z]/, "password must contain at least one lowercase letter")
  .matches(/[0-9]/, "password must contain at least one digit")
