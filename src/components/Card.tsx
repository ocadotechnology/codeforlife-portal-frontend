import { type AnchorHTMLAttributes, type FC } from "react"
import {
  Button,
  type ButtonProps,
  CardActions,
  CardContent,
  CardMedia,
  type CardMediaProps,
  Card as MuiCard,
  type CardProps as Props,
  Typography,
} from "@mui/material"

export interface CardProps extends Props {
  text: {
    title: string
    content: string
  }
  mediaProps: {
    image: NonNullable<CardMediaProps["image"]>
    title: NonNullable<CardMediaProps["title"]>
  }
  buttonProps: ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>
}

const Card: FC<CardProps> = ({
  text,
  mediaProps,
  buttonProps,
  style,
  ...otherCardProps
}) => {
  return (
    <MuiCard
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        maxWidth: "400px",
        ...style,
      }}
      {...otherCardProps}
    >
      <CardMedia component="img" height={242} {...mediaProps} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5">{text.title}</Typography>
        <Typography mb={0}>{text.content}</Typography>
      </CardContent>
      <CardActions>
        <Button {...buttonProps} />
      </CardActions>
    </MuiCard>
  )
}

export default Card
