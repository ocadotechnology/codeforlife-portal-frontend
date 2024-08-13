import { Link, LinkButton } from "codeforlife/components/router"
import { Download as DownloadIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Typography } from "@mui/material"

import AboutUsImage from "../../images/about_us.jpg"
import Introduction from "../../components/Introduction"

export interface PrimaryProps {}

const Primary: FC<PrimaryProps> = () => {
  return (
    <Introduction
      header="Primary coding club"
      img={{
        desc: "Girl looking at Code for Life website",
        src: AboutUsImage,
      }}
    >
      <Typography>
        Download your FREE coding club pack for students aged 7-11. This pack
        introduces students to the first principles of Python at a faster pace
        than the regular lesson plans. It is aimed at students already
        interested in learning coding and can be used in clubs, at home or in
        school, on or offline.
      </Typography>
      <Typography>
        View the resources{" "}
        <Link
          to={import.meta.env.VITE_LINK_PRIMARY_PACK_GITBOOK}
          target="_blank"
        >
          online here
        </Link>
        .
      </Typography>
      {/*TODO: Link to GTM for analytics*/}
      <LinkButton
        sx={{ marginTop: "auto" }}
        to={import.meta.env.VITE_LINK_PRIMARY_PACK_DOWNLOAD}
        target="_blank"
        endIcon={<DownloadIcon />}
      >
        Download the Primary coding club pack
      </LinkButton>
    </Introduction>
  )
}

export default Primary
