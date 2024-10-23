import { type FC } from "react"

import { LINK_HOME_LEARNING_INTERMEDIATE } from "../../app/settings"
import Levels from "./Levels"
import RRIntermediateImage from "../../images/rr_intermediate.png"

export interface IntermediateProps {}

const Intermediate: FC<IntermediateProps> = () => (
  <Levels
    direction="row-reverse"
    banner={{
      difficulty: "Intermediate",
      color: "Black",
      bgcolor: "indy.main",
    }}
    cardProps={{
      mediaProps: {
        title: "RR intermediate image",
        image: RRIntermediateImage,
      },
      title: "Intermediate",
      description:
        "Children confident with coding can move up to the next challenge — more complex maps and new programming constructs. Designed for children aged 8-11, but anyone can progress here if ready.",
      linkButtonProps: { to: LINK_HOME_LEARNING_INTERMEDIATE },
    }}
    text={{
      levels: "17-28",
      sessions: [
        {
          ids: [1],
          body: "Start delivering shopping to lots of different places. It can be easier to plan routes on the paper worksheets before trying on a computer.",
        },
        {
          ids: [2],
          body: "Print out the three lesson worksheets. Then, watch the video together to learn about repeat loops. Encourage your child to look for patterns in their code. If they spot a repeated pattern, they can use a repeat loop to make it shorter. Talk about repeated patterns away from the world of computers with poems and exercises.",
        },
        {
          ids: [3],
          body: "Get stuck in with more complex loops - even loops inside loops! The printable worksheets help your child plan their code before trying it in Rapid Router. Printable left-right vans can help overcome any confusions between left and right.",
        },
        {
          ids: [4, 5],
          body: "Guide your child through creating their own routes in Rapid Router. Perhaps you can join in and try each other's routes?",
        },
      ],
    }}
  />
)

export default Intermediate
