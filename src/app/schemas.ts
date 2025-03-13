import * as yup from "yup"

export const teacherPasswordSchema = yup
  .string()
  .min(10, "must be at least 10 characters long")
  .matches(/[A-Z]/, "must contain at least one uppercase letter")
  .matches(/[a-z]/, "must contain at least one lowercase letter")
  .matches(/[0-9]/, "must contain at least one digit")
  .matches(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    "must contain at least one special character",
  )

export const studentPasswordSchema = yup
  .string()
  .min(6, "must be at least 6 characters long")

export const indyPasswordSchema = yup
  .string()
  .min(8, "must be at least 8 characters long")
  .matches(/[A-Z]/, "must contain at least one uppercase letter")
  .matches(/[a-z]/, "must contain at least one lowercase letter")
  .matches(/[0-9]/, "must contain at least one digit")
