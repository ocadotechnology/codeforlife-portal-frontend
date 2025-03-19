import { Button, Typography } from "@mui/material"
import { type FC } from "react"
import { toggleOneTrustInfoDisplay } from "codeforlife/utils/window"

import CookieList from "../../../components/CookieList.tsx"

export interface CookiesProps {}

const Cookies: FC<CookiesProps> = () => (
  <>
    <Typography>
      We will only use your personal information for the reasons we collected it
      or for other similar reasons. If we need to use your personal information
      for a different reason, we will tell you. We do not always need your
      consent to use your personal information, and we will not ask for your
      consent unless the law says we need it.
    </Typography>
    <Typography>
      Please see the “What are cookies” (not the edible kind!) section below for
      more information on what information we collect and how we use cookies.
    </Typography>
    <Typography variant="h6">What are cookies?</Typography>
    <Typography>
      Cookies are tiny files that have information (data) in them. When you
      visit our site, we may put some cookies on the device you use. Cookies
      allow us to remember things like when you visit our site. They help us
      understand how you are using the Code for Life portal, as well as which
      parts of our portal are popular and which ones we need to make better.
    </Typography>
    <Typography>
      We also make use of things called “web beacons” or “pixels.” These are
      similar to cookies and allow us to keep an eye on how well our website is
      working and look for ways to improve it. To keep things simple, when we
      talk about cookies in this Privacy Notice, we also mean web beacons and
      pixels.
    </Typography>
    <Typography variant="h6">Cookie list</Typography>
    <Typography>
      You can see all the different cookies we use and what we use them for
      below.
    </Typography>
    <CookieList></CookieList>
    <Typography variant="h6">Third party cookies</Typography>
    <Typography>
      We work with other companies to run the analytics cookies on our portal,
      including Google, who provides our Google Analytics cookie. They might
      also collect information from websites that are not ours. We explain in
      more detail below what information they collect and how it is used. We do
      not let other companies show ads on our portal.
    </Typography>
    <Typography>
      <strong>Google Analytics.</strong> We use Google Analytics (which is run
      by Google) to help us understand how you use our site. The information it
      collects about your use of the website will be stored by Google in the
      United States. Google Analytics does not collect IP addresses. Google may
      pass this information to other organisations who help them to interpret
      this information. They may also pass the information to other
      organisations if the law says they have to do so. If you choose to allow
      analytics / performance cookies on our site, you are consenting to Google
      using your data for the reasons above.
    </Typography>
    <Typography>
      <strong>YouTube.</strong> While embedded YouTube videos on our website do
      not use cookies, your browser&apos;s Local Storage may be used by the
      video platform provider to enhance your viewing experience and collect
      analytics data. This data enables the platform to track your interaction
      with the video content and may gather information about your device and
      browsing behavior. The use of Local Storage by embedded video providers is
      subject to their respective policies.
    </Typography>
    <Typography variant="h6">Managing and disabling cookies</Typography>
    <Typography>
      You can switch the functional and analytics cookies on and off at any time
      by clicking this button below.
    </Typography>
    <Button className="body" onClick={toggleOneTrustInfoDisplay}>
      Cookie Settings
    </Button>
    <Typography mb={0}>
      You cannot switch strictly necessary cookies off as our website won’t work
      properly without them.
    </Typography>
  </>
)

export default Cookies
