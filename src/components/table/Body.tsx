import { Children, type FC, type ReactNode } from "react"

import Row from "./Row"

export interface BodyProps {
  children: ReactNode
}

const Body: FC<BodyProps> = ({ children }) => (
  <Row>
    {Children.map(children, child => (
      <>{child}</>
    ))}
  </Row>
)

export default Body
