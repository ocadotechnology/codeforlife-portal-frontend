import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { type FC } from "react"

const CustomTableRow: FC<{
  name: string
  host: string
  description: string
  expiry: string
}> = ({ name, host, description, expiry }) => (
  <TableRow>
    <TableCell>
      <Typography>{name}</Typography>
    </TableCell>
    <TableCell>
      <Typography>{host}</Typography>
    </TableCell>
    <TableCell>
      <Typography>{description}</Typography>
    </TableCell>
    <TableCell>
      <Typography>{expiry}</Typography>
    </TableCell>
  </TableRow>
)

export interface CookieListProps {}

const CookieList: FC<CookieListProps> = () => {
  return (
    <>
      {/*TODO: When new system is ready to go and OneTrust scan has run, double-check this list and update where needed*/}
      <Typography>Strictly Necessary Cookies</Typography>
      <Table className="text body">
        <TableHead>
          <CustomTableRow
            name="Cookie name"
            host="Host"
            description="Description"
            expiry="Expiry"
          />
        </TableHead>
        <TableBody className="text">
          <CustomTableRow
            name="OptanonAlertBoxClosed"
            host="codeforlife.education"
            description="This cookie is set by the cookie compliance solution from OneTrust. It is set after visitors have seen a cookie information notice and in some cases only when they actively close the notice down. It enables the website not to show the message more than once to a user. It contains no personal information."
            expiry="1 year"
          />
          <CustomTableRow
            name="OptanonConsent"
            host="codeforlife.education"
            description="This cookie is set by the cookie compliance solution from OneTrust. It stores information about the categories of cookies the site uses and whether visitors have given or withdrawn consent for the use of each category. This enables site owners to prevent cookies in each category from being set in the users browser, when consent is not given. It contains no information that can identify the site visitor."
            expiry="1 year"
          />
          <CustomTableRow
            name="csrftoken"
            host="codeforlife.education"
            description="This cookie is associated with the Django web development platform for Python. It is designed to help protect a site against a particular type of software attack on web forms."
            expiry="1 year"
          />
          <CustomTableRow
            name="sessionid"
            host="codeforlife.education"
            description="This cookie is associated with the Django web development platform for Python. It contains a special session id to identify each browser and its associated session with the site."
            expiry="Session"
          />
          <CustomTableRow
            name="_GRECAPTCHA"
            host="www.google.com"
            description="Cookie used by Google Recaptcha. It is used for risk analysis in spam protection and may store browsing device information."
            expiry="5 months"
          />
        </TableBody>
      </Table>
      <Typography>Analytics / Performance Cookies</Typography>
      <Table className="text body">
        <TableHead>
          <CustomTableRow
            name="Cookie name"
            host="Host"
            description="Description"
            expiry="Expiry"
          />
        </TableHead>
        <TableBody className="text">
          <CustomTableRow
            name="_ga"
            host="codeforlife.education"
            description="This cookie is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports."
            expiry="1 year"
          />
          <CustomTableRow
            name="_gid"
            host="codeforlife.education"
            description="This cookie is associated with Google Universal Analytics. It is used to store and count page views."
            expiry="A few seconds"
          />
          <CustomTableRow
            name="_ga_xxxxxxxxxx"
            host="codeforlife.education"
            description="This cookie is associated with Google Universal Analytics. Used to distinguish unique users by assigning a randomly generated number as a client identifier. Its primary purpose is to help website owners measure visitor interactions, track site usage, and provide personalised experiences to enhance user engagement."
            expiry="1 year"
          />
          <CustomTableRow
            name="_gat_UA-xxxxxxxx-x"
            host="codeforlife.education"
            description="This cookie is associated with Google Tag Manager. It is used to store to provide technical monitoring and limit the amount of data recorded by Google on high-traffic sites."
            expiry="1 minute"
          />
          <CustomTableRow
            name="_gat_gtag_UA_xxxxxxxx_x"
            host="codeforlife.education"
            description="This cookie is associated with Google Tag Manager. It is used to store a unique user ID."
            expiry="1 minute"
          />
        </TableBody>
      </Table>
      <Typography>Functional Cookies</Typography>
      <Table className="text body">
        <TableHead>
          <CustomTableRow
            name="Cookie name"
            host="Host"
            description="Description"
            expiry="Expiry"
          />
        </TableHead>
        <TableBody className="text">
          <CustomTableRow
            name="preferredLanguage"
            host="codeforlife.education"
            description="This cookie is used to remember your selected language preference in Rapid Router and Python Den, so you don't have to keep selecting it every time you load a new level."
            expiry="Session"
          />
          <CustomTableRow
            name="muted"
            host="codeforlife.education"
            description="This cookie is used to remember your muted setting in Rapid Router and Python Den, so you don't have to keep setting it every time you load a new level."
            expiry="Session"
          />
        </TableBody>
      </Table>
    </>
  )
}

export default CookieList
