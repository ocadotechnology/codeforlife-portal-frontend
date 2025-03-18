import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Image } from "codeforlife/components"
import { Link } from "codeforlife/components/router"

import {
  LINK_CFL_DOCS_BECOME_A_CONTRIBUTOR,
  LINK_CFL_GH_WORKSPACE,
} from "../../app/settings"
import BarefootImage from "../../images/barefoot_logo.png"
import BcsImage from "../../images/bcs_logo.png"
import GLAImage from "../../images/gla_logo.png"
import HOPEImage from "../../images/hope_logo.png"
import IclImage from "../../images/icl_logo.png"
import Logo10xImage from "../../images/10x_logo.png"
import MCSaatchiImage from "../../images/mc_saatchi_logo.png"
import PressureCookerImage from "../../images/pressure_cooker_logo.png"

const Supporter: FC<{
  desc: string
  src: string
}> = ({ desc, src }) => (
  <Image alt={desc} title={desc} src={src} style={{ width: "auto" }} />
)

export interface SupportersProps {}

const Supporters: FC<SupportersProps> = () => {
  return (
    <>
      <Typography variant="h4" textAlign="center">
        We couldn&apos;t do it without you!
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Typography variant="h5">Our team and volunteers</Typography>
          <Typography>
            Code for Life would not have been possible without the time and
            skills volunteered by our talented developers and creatives at Ocado
            Technology. Thank you to everyone who has helped us get to where we
            are now.
          </Typography>
          <Typography variant="h5">Want to get involved?</Typography>
          <Typography>
            We are open source, so anyone can ask to contribute. You can play
            with game-running JavaScript, Python/Django, animation using SVG and
            Raphael, and a lot more. We&apos;d like input from all sorts of
            backgrounds, whether you&apos;re: a programmer looking for a
            creative outlet; a teacher hoping to shape the resources; or even a
            pupil putting your skills to the test.
          </Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h5">Developers</Typography>
          <Typography>
            To contribute, head over to{" "}
            <Link to={LINK_CFL_GH_WORKSPACE} target="_blank">
              GitHub
            </Link>
            , check out the issue tracker, and get started. There you can
            suggest new features or assign yourself an issue to develop. You can
            find more info about how to do all these on our{" "}
            <Link to={LINK_CFL_DOCS_BECOME_A_CONTRIBUTOR} target="_blank">
              docs on GitBook
            </Link>
            .
          </Typography>
          <Typography variant="h5">Teachers, parents, and creatives</Typography>
          <Typography>
            Please get in touch through our {/*<Link*/}
            {/*TODO: Implement Freshdesk widget hook*/}
            {/*onClick={() => {*/}
            {/*  useFreshworksWidget("open")*/}
            {/*}}*/}
            {/*>*/}
            {/*  contact*/}
            {/*</Link>{" "}*/}
            form and let us know how you would like to get involved.
          </Typography>
          <Typography>
            We would like to thank our friends who have contributed to this
            initiative.
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" textAlign="center" mt={5}>
        We would like to thank our friends who have contributed to this
        initiative
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        mb={2}
      >
        <Supporter desc={"10x logo"} src={Logo10xImage} />
        <Supporter desc={"BCS logo"} src={BcsImage} />
        <Supporter desc={"ICL logo"} src={IclImage} />
        <Supporter desc={"Barefoot logo"} src={BarefootImage} />
        <Supporter desc={"mcSaatchi logo"} src={MCSaatchiImage} />
        <Supporter desc={"Hope Education logo"} src={HOPEImage} />
        <Supporter desc={"GLA logo"} src={GLAImage} />
        <Supporter desc={"Pressure Cooker logo"} src={PressureCookerImage} />
      </Stack>
      <Typography textAlign="center" variant="body2" mb={0}>
        10X, BCS Academy of Computing, Barefoot Computing, Computing at School,
        The National Museum of Computing, Imperial College London, M&C Saatchi,
        Alvaro Ramirez, Jason Fingland, Ramneet Loyall, Sharon Harrison, Keith
        Avery, Dale Coan, Rob Whitehouse, Mandy Nash, Tanya Nothard, Matt
        Trevor, Moy El-Bushra, Richard Siwiak, Peter Tondrow, Liz Pratt,
        Pressure Cooker Studios, GAL Education, Hope Education.
      </Typography>
    </>
  )
}

export default Supporters
