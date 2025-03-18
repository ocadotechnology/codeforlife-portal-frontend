import * as pages from "codeforlife/components/page"
import { type FC } from "react"

import GithubHexagon from "../../images/github_hexagon.png"
import HowToGetInvolved from "./HowToGetInvolved"
// import HowYouCanContributeProps from "./HowYouCanContribute"
// import OurProducts from "./OurProducts"

export interface ContributeProps {}

const Contribute: FC<ContributeProps> = () => (
  <pages.Page>
    <pages.Banner
      imageProps={{ alt: "GitHub", title: "GitHub", src: GithubHexagon }}
      header="Contribute to Code for Life"
      subheader="How you can get involved with Code for Life products and resources and help us help others"
    />
    <pages.Section>
      <HowToGetInvolved />
    </pages.Section>
    {/* <pages.Section boxProps={{ bgcolor: "info.main" }}>
      <OurProducts />
    </pages.Section>
    <pages.Section>
      <HowYouCanContributeProps />
    </pages.Section> */}
  </pages.Page>
)

export default Contribute
