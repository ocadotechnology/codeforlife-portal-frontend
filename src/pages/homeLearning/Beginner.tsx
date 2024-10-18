import { type FC } from "react"

import { LINK_HOME_LEARNING_BEGINNER } from "../../app/env"
import Levels from "./Levels"
import RRBeginnerImage from "../../images/RRBeginnerImage.png"

export interface BeginnerProps {}

const Beginner: FC<BeginnerProps> = () => (
  <Levels
    banner={{
      difficulty: "Beginner",
      color: "White",
      bgcolor: "student.main",
    }}
    cardProps={{
      mediaProps: { title: "RR beginner image", image: RRBeginnerImage },
      title: "Beginner",
      description:
        "Teach your child about problem-solving and logical reasoning as they play. They'll explore algorithms, and learn how to create and debug simple programs. Designed for children aged 5-7, but start here if you've never played Rapid Router.",
      linkButtonProps: { to: LINK_HOME_LEARNING_BEGINNER },
    }}
    text={{
      levels: "1-16",
      sessions: [
        {
          ids: [1],
          body: "Print off the worksheets, and cut them out to play offline. This helps children see that they need to give the computer clear instructions so it can understand how to move the van.",
        },
        {
          ids: [2],
          body: "Explore Rapid Router online and learn how to play. Print the left-right van on page 6, to help avoid any confusion between left and right. Once a child has understood the basics, they can work on levels 1 to 5.",
        },
        {
          ids: [3],
          body: "Plan longer routes with more turns to learn how to create more complex algorithms. The direct drive buttons make things a little easier for younger children, or those with learning difficulties while they build confidence.",
        },
        {
          ids: [4, 5],
          body: "Print off worksheets focusing on efficient routes and planning using levels 13 and 14. Levels 15-16 include routes where there is more than one delivery to make and some complex and tangled routes.",
        },
      ],
    }}
  />
)

export default Beginner
