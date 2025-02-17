import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { toggleOneTrustInfoDisplay } from "codeforlife/utils/window"

const CustomTableRow: FC<{
  withoutUnderline?: boolean
  typesOfCookies: string
  purpose: React.ReactNode
  months: string
}> = ({ withoutUnderline = false, typesOfCookies, purpose, months }) => (
  <TableRow>
    <TableCell>
      <Typography
        style={{
          textDecoration: withoutUnderline ? "none" : "underline",
        }}
      >
        {typesOfCookies}
      </Typography>
    </TableCell>
    <TableCell>
      {typeof purpose === "string" ? (
        <Typography>{purpose}</Typography>
      ) : (
        purpose
      )}
    </TableCell>
    <TableCell>
      <Typography>{months}</Typography>
    </TableCell>
  </TableRow>
)

export interface CookiesProps {}

const Cookies: FC<CookiesProps> = () => (
  <>
    <Typography variant="h6">6.1 What are Cookies?</Typography>
    <Typography>
      Cookies are tiny files that have information (data) in them. When you
      visit our portal, a cookie is placed on the device you use. Cookies allow
      us to remember when you visit our portal, or when you open an email. They
      help us understand how you are using the Code for Life portal, as well as
      which parts of our portal are popular and which ones we need to make
      better.
    </Typography>
    <Typography>
      We also use other forms of technology (such as web beacons or pixels)
      which are similar to cookies and which allow us to monitor and improve our
      website. When we talk about cookies in this notice, we also refer to these
      technologies.
    </Typography>
    <Typography variant="h6">6.2 Types of cookies used</Typography>
    <Typography>
      We use the following types of cookies on our portal for the following
      purposes:
    </Typography>
    <Table className="text body">
      <TableHead>
        <CustomTableRow
          withoutUnderline
          typesOfCookies="Type of cookies"
          purpose="Purpose"
          months="For how many months does the cookie stay on your browser?"
        />
      </TableHead>
      <TableBody className="text">
        <CustomTableRow
          typesOfCookies="Strictly necessary cookies"
          purpose="These cookies do what you have asked for: for example, they allow the website to load on your browser, they keep you logged in when you use our portal, and keep our portal safe. If you turn off these cookies via your browser settings certain parts of the website will not function for you."
          months="12"
        />
        <CustomTableRow
          typesOfCookies="Functional cookies"
          purpose="These cookies enable the website to provide enhanced functionality and personalisation. If you do not allow these cookies then some services may not function very smoothly. These kinds of cookies remember things like your sound settings."
          months="Session"
        />
        <CustomTableRow
          typesOfCookies="Analytics/Performance cookies"
          purpose={
            <>
              <Typography>
                These cookies help us understand how you use our portal and
                improve or optimise the experience we provide. This can be
                anything like which pages you go to most often, and if you get
                error messages from web pages. They allow us to measure how
                visitors interact with the portal (for example which parts of
                the website are clicked on and the length of time between
                clicks).
              </Typography>
              <Typography>
                We use third-party web analytics software on our portal (
                <Link
                  to="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                  target="_blank"
                >
                  Google Analytics
                </Link>
                &nbsp;and&nbsp;
                <Link to="https://mouseflow.com/legal/gdpr/" target="_blank">
                  Mouseflow
                </Link>
                ). We provide further information about these partners below.
              </Typography>
            </>
          }
          months="24"
        />
      </TableBody>
    </Table>
    <Typography variant="h6">6.3 Third party cookies</Typography>
    <Typography>
      We do not allow third party advertising, or affiliation on our portal.
    </Typography>
    <Typography>
      As we explain above, we work with other companies to use analytics cookies
      on our portal: these are Google, who provide Google Analytics cookies, and
      Mouseflow. We explain in more detail below what information they collect
      and how it is used.
    </Typography>
    <Typography>
      <strong>Google Analytics.</strong> Our portal uses Google Analytics, which
      is provided by Google, Inc. (&quot;Google&quot;). Google Analytics uses
      cookies to help us analyse how users use our portal. The information
      generated by the cookie about your use of the website will be transmitted
      to and stored by Google on servers in the United States. Google will use
      this information for the purpose of evaluating your use of the website,
      compiling reports on website activity for website operators and providing
      other services relating to website activity and internet usage. Google may
      also transfer this information to third parties where required to do so by
      law, or where such third parties process the information on Google&apos;s
      behalf. <strong>Please note: since the release of Google Analytics 4,
      Google Analytics does not log or store IP addresses.</strong> You can read
      more about user data collection by Google Analytics 4
      <a href="https://support.google.com/analytics/answer/12017362?hl=en"
         target="_blank">here</a>. By accepting analytics / performance cookies
      on our portal, you consent to the processing of data about you by Google
      in the manner and for the purposes set out above.
    </Typography>
    <Typography>
      <strong>Mouseflow.</strong> We also use Mouseflow on our portal; this
      provider offers a website analytics tool that helps us understand how our
      portal is used, and which areas are mostly used (e.g. by using heatmaps or
      by replaying your journey on our portal). Mouseflow uses cookies to record
      information such as when you click on or move your mouse, when you scroll,
      or press a key, what pages you visit on our website, how much time you
      spend on each page, and also information about the device you use
      (operating system, device type (desktop/tablet/phone), screen resolution,
      location (city/country), language, and similar metadata). Mouseflow does
      not collect any information on pages where it is not installed, nor does
      it track or collect information outside your web browser.
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
    <Typography variant="h6">6.4 Managing and disabling cookies</Typography>
    <Typography>
      We make available a cookie management platform on our portal (provided
      by&nbsp;
      <Link to="https://www.onetrust.com/" target="_blank">
        OneTrust
      </Link>
      ), through which you can turn off non-essential cookies at any time.
      Please note, strictly necessary cookies will always be set as they are
      essential for our website to operate.
    </Typography>
    <Typography>
      You can change your cookie preferences or withdraw consent by clicking on
      the following button:
    </Typography>
    <Button onClick={toggleOneTrustInfoDisplay}>Cookie Settings</Button>
  </>
)

export default Cookies
