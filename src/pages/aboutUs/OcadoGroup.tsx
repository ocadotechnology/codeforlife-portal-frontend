import { type FC } from "react"
import { Link } from "codeforlife/components/router"
import { Typography } from "@mui/material"

import AboutUsOcadoImage from "../../images/AboutUsOcadoImage.jpg"
import Introduction from "../../components/Introduction"
import { LINK_SKILLS_FOR_THE_FUTURE } from "../../app/env"

export interface OcadoGroupProps {}

const OcadoGroup: FC<OcadoGroupProps> = () => {
  return (
    <Introduction
      header="Who is Ocado Group?"
      img={{
        desc: "Man teaching two children on a laptop",
        src: AboutUsOcadoImage,
      }}
      direction="row-reverse"
    >
      <Typography>
        Ocado Group, the online grocery solutions provider, is powering the
        future of online retail. Ocado&apos;s tech and solutions are supplied to
        grocery businesses all around the world. It enables these
        forward-thinking retailers to do grocery online profitably, sustainably,
        and in a scalable manner.
      </Typography>
      <Typography>
        Ocado Smart Platform (OSP) is the world&apos;s most advanced end-to-end
        e-Commerce, fulfilment and logistic platform.
      </Typography>
      <Typography mb={0}>
        <Link to={LINK_SKILLS_FOR_THE_FUTURE} target="_blank">
          Our People and Skills for the Future
        </Link>{" "}
        is one of Ocado Group&apos;s core Sustainability pillars (alongside
        Environment and Natural Resources and Platform Resilience and
        Innovation). For Ocado Group, Our People and Skills for the Future means
        accelerating the development of our people and championing digital
        literacy. We want to inspire the next generation of STEM leaders, so
        that everyone can fully participate in society.
      </Typography>
    </Introduction>
  )
}

export default OcadoGroup
