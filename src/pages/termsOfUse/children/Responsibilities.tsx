import { ListItemText, Typography } from "@mui/material"
import { type FC } from "react"
import { ItemizedList } from "codeforlife/components"

export interface ResponsibilitiesProps {}

const Responsibilities: FC<ResponsibilitiesProps> = () => (
  <>
    <Typography>We will not be responsible for:</Typography>
    <ItemizedList styleType="disc">
      <ListItemText>
        viruses, trojans and similar threats that could affect your access to,
        or use of, the website (including your account),
      </ListItemText>
      <ListItemText>
        any problems you have logging on because your computer, mobile device,
        broadband or software won’t work with our site,
      </ListItemText>
      <ListItemText>
        any delays or failures that happen when you are using the site,
      </ListItemText>
      <ListItemText>
        any errors loss of access to the site caused by a technical problem at
        Ocado,
      </ListItemText>
      <ListItemText>
        the site not being suitable for your learning needs,
      </ListItemText>
      <ListItemText>
        any inaccuracies in the description of our games or levels.
      </ListItemText>
    </ItemizedList>
  </>
)

export default Responsibilities
