import { type FC, type ReactElement, cloneElement } from "react"
import {
  FacebookRounded as FacebookRoundedIcon,
  Instagram as InstagramIcon,
  X as XIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material"
import { type Icon, type IconProps, Stack } from "@mui/material"
import { LinkIconButton } from "codeforlife/components/router"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

import {
  LINK_FACEBOOK,
  LINK_INSTAGRAM,
  LINK_LINKEDIN,
  LINK_X,
  LINK_YOUTUBE,
} from "../../app/env"

const SocialMediaIcon: FC<{
  to: string
  children: ReactElement<IconProps, typeof Icon>
}> = ({ to, children }) => {
  return (
    <LinkIconButton to={to} target="_blank" sx={{ padding: 0 }}>
      {cloneElement(children, {
        sx: {
          fontSize: "70px",
          color: "white !important",
        },
      })}
    </LinkIconButton>
  )
}

export interface SocialMediaIconsProps {}

const SocialMediaIcons: FC<SocialMediaIconsProps> = () => {
  return (
    <Stack
      direction="row"
      width="100%"
      spacing={{ sm: 2 }}
      justifyContent={{ xs: "space-between", md: "normal" }}
    >
      <SocialMediaIcon to={LINK_FACEBOOK}>
        <FacebookRoundedIcon />
      </SocialMediaIcon>
      <SocialMediaIcon to={LINK_INSTAGRAM}>
        <InstagramIcon />
      </SocialMediaIcon>
      <SocialMediaIcon to={LINK_LINKEDIN}>
        <LinkedInIcon />
      </SocialMediaIcon>
      <SocialMediaIcon to={LINK_X}>
        <XIcon />
      </SocialMediaIcon>
      <SocialMediaIcon to={LINK_YOUTUBE}>
        <YouTubeIcon />
      </SocialMediaIcon>
    </Stack>
  )
}

export default SocialMediaIcons
