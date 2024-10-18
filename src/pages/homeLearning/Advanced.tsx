import { type FC } from "react"

import { LINK_HOME_LEARNING_ADVANCED } from "../../app/env"
import Levels from "./Levels"
import { Link } from "codeforlife/components/router"
import RRAdvancedImage from "../../images/RRAdvancedImage.png"
import { paths } from "../../routes"

export interface AdvancedProps {}

const Advanced: FC<AdvancedProps> = () => (
  <Levels
    banner={{
      difficulty: "Advanced",
      color: "White",
      bgcolor: "teacher.main",
    }}
    cardProps={{
      mediaProps: { title: "RR advanced image", image: RRAdvancedImage },
      title: "Advanced",
      description:
        "Let's get advanced! Learn about repeat loops and selection, variables, and how to create efficient code. Designed for children aged 12-14, but open to all.",
      linkButtonProps: { to: LINK_HOME_LEARNING_ADVANCED },
    }}
    text={{
      levels: "29-67",
      sessions: [
        {
          ids: [1],
          body: "Recap earlier levels before looking at repeat loops. Encourage your child to plan ahead on the printable worksheet before writing more complex programs. If they're unsure about using loops, ask them to write the code without loops and then look for repeating patterns.",
        },
        {
          ids: [2],
          body: "A video and printable resources support this lesson, which builds your child's understanding of loops with a new loop, repeat-until.",
        },
        {
          ids: [3, 4],
          body: "Extra tasks for children who want a challenge! Watch the if...do video to learn about selection statements. Ask your child to explain how their finished program works!",
        },
        {
          ids: [5],
          body: "Learn more about if...else through traffic lights. In the Traffic Lights levels in Rapid Router, traffic light is a variable that either contains red or green.",
        },
        {
          ids: "Extended",
          body: (
            <>
              Build on everything learned so far with traffic lights, limited
              blocks, procedures and brain teasers. Older children might even
              like to start learning to program using the Python language using{" "}
              <Link to={paths.pythonDen._}>Python Den</Link>.
            </>
          ),
        },
      ],
    }}
  />
)

export default Advanced
