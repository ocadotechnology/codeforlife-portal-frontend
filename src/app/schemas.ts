import { type Schema, type StringSchema, string as YupString } from "yup"
import CryptoJS from "crypto-js"

type Options<S extends Schema, Extras = {}> = Partial<{ schema: S } & Extras>

export function classIdSchema(options?: Options<StringSchema>) {
  const { schema = YupString() } = options || {}

  return schema.matches(/^[A-Z0-9]{5}$/, "invalid class code")
}

export function teacherPasswordSchema(options?: Options<StringSchema>) {
  const { schema = YupString() } = options || {}

  return schema
    .min(10, "password must be at least 10 characters long")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter")
    .matches(/[a-z]/, "password must contain at least one lowercase letter")
    .matches(/[0-9]/, "password must contain at least one digit")
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      "password must contain at least one special character",
    )
}

export function studentPasswordSchema(options?: Options<StringSchema>) {
  const { schema = YupString() } = options || {}

  return schema.min(6, "password must be at least 6 characters long")
}

export function indyPasswordSchema(options?: Options<StringSchema>) {
  const { schema = YupString() } = options || {}

  return schema
    .min(8, "password must be at least 8 characters long")
    .matches(/[A-Z]/, "password must contain at least one uppercase letter")
    .matches(/[a-z]/, "password must contain at least one lowercase letter")
    .matches(/[0-9]/, "password must contain at least one digit")
}

export function pwnedPasswordSchema(
  options?: Options<StringSchema, { onError: (error: unknown) => void }>,
) {
  const { schema = YupString().required(), onError } = options || {}

  return schema.test({
    message: "password is too common",
    test: async password => {
      try {
        // Do not raise validation error if no password.
        if (!password) return true

        // Hash the password.
        const hashedPassword = CryptoJS.SHA1(password).toString().toUpperCase()
        const hashPrefix = hashedPassword.substring(0, 5)
        const hashSuffix = hashedPassword.substring(5)

        // Call Pwned Passwords API.
        // https://haveibeenpwned.com/API/v3#SearchingPwnedPasswordsByRange
        const response = await fetch(
          `https://api.pwnedpasswords.com/range/${hashPrefix}`,
        )
        // TODO: Standardize how to log non-okay responses.
        if (!response.ok) throw Error()

        // Parse response.
        const data = await response.text()
        return !data.includes(hashSuffix)
      } catch (error) {
        console.error(error)

        if (onError) onError(error)

        // Do not raise validation error if a different error occurred.
        return true
      }
    },
  })
}
