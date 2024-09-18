// This file serves as a central hub for re-exporting pre-typed Redux hooks.
// These imports are restricted elsewhere to ensure consistent
// usage of typed hooks throughout the application.
// We disable the ESLint rule here because this is the designated place
// for importing and re-exporting the typed versions of hooks.
/* eslint-disable @typescript-eslint/no-restricted-imports */
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import CryptoJS from "crypto-js"
import { useState } from "react"

import type { AppDispatch, RootState } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export function usePwnedPasswordsApi(): [yup.StringSchema, boolean] {
  const [online, setOnline] = useState(true)

  const schema = yup.string().test({
    message: "password is too common",
    test: async password => {
      try {
        // Do not raise validation error if not online or no password.
        if (!online || !password) return true

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

        setOnline(false)

        // Do not raise validation error if a different error occurred.
        return true
      }
    },
  })

  return [schema, online]
}
