import { Link, LinkButton } from "codeforlife/components/router"
import { Download as DownloadIcon } from "@mui/icons-material"
import { type FC } from "react"
import { Typography } from "@mui/material"

import Introduction from "../../components/Introduction"
import PythonClubImage from "../../images/coding_club_python_pack.png"

export interface PythonProps {}

const Python: FC<PythonProps> = () => {
  return (
    <Introduction
      header="Python coding club"
      img={{
        desc: "Adults following Python club on laptops",
        src: PythonClubImage,
      }}
      direction="row-reverse"
    >
      <Typography>
        Download your FREE coding club pack for students aged 12 and above. This
        pack is a fast paced introduction to Python. It is aimed at students
        already interested in learning coding, individuals looking to learn and
        run their own club, or adults wanting to try coding out. It is designed
        to be used in face-to-face or online clubs.
      </Typography>
      <Typography>
        View the resources{" "}
        <Link
          to={import.meta.env.VITE_LINK_PYTHON_PACK_GITBOOK}
          target="_blank"
        >
          online here
        </Link>
        .
      </Typography>
      {/*TODO: Link to GTM for analytics*/}
      <LinkButton
        sx={{ marginTop: "auto" }}
        to={import.meta.env.VITE_LINK_PYTHON_PACK_DOWNLOAD}
        target="_blank"
        endIcon={<DownloadIcon />}
      >
        Download the Python coding club pack
      </LinkButton>
    </Introduction>
  )
}

export default Python
