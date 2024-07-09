import { useTheme } from "@mui/material"
import { type FC } from "react"

import * as page from "codeforlife/components/page"
import { useLocation } from "codeforlife/hooks"

import AboutUs from "./AboutUs"
import CodingClubs from "./CodingClubs"
import Quotes from "./Quotes"
import TargetAudience from "./TargetAudience"

const Home: FC = () => {
  const theme = useTheme()
  const { state } = useLocation<{ signUpSuccess: boolean }>()

  return (
    <page.Page>
      {state?.signUpSuccess !== undefined && (
        <page.Notification error={!state.signUpSuccess}>
          {state.signUpSuccess
            ? "Thank you for signing up! 🎉"
            : "Invalid email address. Please try again."}
        </page.Notification>
      )}
      {/* Special case: un-contained page section */}
      <TargetAudience />
      <page.Section>
        <AboutUs />
      </page.Section>
      <page.Section boxProps={{ bgcolor: theme.palette.info.main }}>
        <Quotes />
      </page.Section>
      <page.Section>
        <CodingClubs />
      </page.Section>
    </page.Page>
  )
}

export default Home
