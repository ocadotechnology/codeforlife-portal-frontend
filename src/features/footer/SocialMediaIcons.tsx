import { type FC, type ReactElement, cloneElement } from "react"
import {
  FacebookRounded as FacebookRoundedIcon,
  Instagram as InstagramIcon,
  X as XIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material"
import {
  Unstable_Grid2 as Grid,
  type Icon,
  IconButton,
  type IconProps,
  Stack,
} from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

const SocialMediaIcon: FC<{
  href: string
  children: ReactElement<IconProps, typeof Icon>
}> = ({ href, children }) => {
  return (
    <IconButton href={href} target="_blank" sx={{ padding: 0 }}>
      {cloneElement(children, {
        sx: {
          fontSize: "70px",
          color: "white !important",
        },
      })}
    </IconButton>
  )
}

export interface SocialMediaIconsProps {}

const SocialMediaIcons: FC<SocialMediaIconsProps> = () => {
  return (
    <Grid container xs={12} order={{ xs: 1, md: 2 }}>
      <Stack
        direction="row"
        width="100%"
        spacing={{ sm: 2 }}
        justifyContent={{ xs: "space-between", md: "normal" }}
      >
        <SocialMediaIcon href={import.meta.env.VITE_LINK_FACEBOOK}>
          <FacebookRoundedIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={import.meta.env.VITE_LINK_INSTAGRAM}>
          <InstagramIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={import.meta.env.VITE_LINK_LINKEDIN}>
          <LinkedInIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={import.meta.env.VITE_LINK_X}>
          <XIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={import.meta.env.VITE_LINK_YOUTUBE}>
          <YouTubeIcon />
        </SocialMediaIcon>
      </Stack>
    </Grid>
  )
}

export default SocialMediaIcons
