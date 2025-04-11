import { ListItemText, Typography } from "@mui/material"
import { type FC } from "react"
import { ItemizedList } from "codeforlife/components"

export interface MisuseProps {}

const Misuse: FC<MisuseProps> = () => (
  <>
    <Typography>
      Please remember that you are responsible for everything you do when logged
      onto the Code for Life site. If you create content on Code for Life which
      we think breaks the rules of the Terms of Use then we may:
    </Typography>
    <ItemizedList styleType="disc">
      <ListItemText>
        suspend or close your access Code for Life account, OR
      </ListItemText>
      <ListItemText>block your access to parts of the site OR</ListItemText>
      <ListItemText>
        remove (or ask you to remove) the post which we think broke the rules.
      </ListItemText>
    </ItemizedList>
    <Typography>
      If we have to suspend or close your account then you won’t be allowed to
      re-register or access the portal again unless we have given you our
      permission in writing to do so.
    </Typography>
    <Typography>
      We’ll do our best to make sure the Code for Life website and access to
      your account and our games, platforms and other products or services is
      available to you 24 hours a day. However, we sometimes have to limit
      users’ access to their account or the site so that we can make repairs or
      add new content.
    </Typography>
    <Typography>
      We also aim to provide you with the best service we can, but we can’t
      promise that the Code for Life site, or our games, platforms and services
      will always be fault, virus or mistake-free. If you notice a problem or
      fault, please let us know using the contact us form and we will do all we
      can to correct it as quickly as we can.
    </Typography>
    <Typography>
      Whether or not a user follows the Terms of Use we still have the right to:
    </Typography>
    <ItemizedList styleType="disc">
      <ListItemText>
        choose whether to accept or reject their registration
      </ListItemText>
      <ListItemText>
        suspend and cancel their account at any time (without telling them
        first)
      </ListItemText>
      <ListItemText>
        stop them from accessing all or part of the games, platforms and any
        other of our services (including any old or live games or avatar(s)
        they’ve created).
      </ListItemText>
    </ItemizedList>
    <Typography fontWeight="bold">
      The Code for Life portal was created to help you learn how to code, and
      this is the only purpose you should use it for. This means that you may
      not:
    </Typography>
    <ItemizedList styleType="disc">
      <ListItemText>
        post content on Code for life for business purposes or use the Code for
        Life site for a business purpose OR
      </ListItemText>
      <ListItemText>
        use the Code for Life site or information you’ve taken from it, to send
        out spam emails.
      </ListItemText>
    </ItemizedList>
  </>
)

export default Misuse
