import {
  CardActions,
  CardContent,
  CardMedia,
  type CardMediaProps,
  Card as MuiCard,
  type CardProps as MuiCardProps,
  Typography,
} from "@mui/material"
import { LinkButton, type LinkButtonProps } from "codeforlife/components/router"

export type CardProps<
  Override extends "delta" | "to",
  State extends Record<string, unknown> = Record<string, unknown>,
> = MuiCardProps & {
  title: string
  description: string
  mediaProps: {
    image: NonNullable<CardMediaProps["image"]>
    title: NonNullable<CardMediaProps["title"]>
  }
  linkButtonProps: LinkButtonProps<Override, State>
}

const Card: {
  (props: CardProps<"delta">): JSX.Element
  <State extends Record<string, unknown> = Record<string, unknown>>(
    props: CardProps<"to", State>,
  ): JSX.Element
} = ({
  title,
  description,
  mediaProps,
  linkButtonProps,
  style,
  ...otherCardProps
}: CardProps<"delta"> | CardProps<"to">) => {
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
        <Typography variant="h5">{title}</Typography>
        <Typography mb={0}>{description}</Typography>
      </CardContent>
      <CardActions>
        {/* @ts-expect-error props */}
        <LinkButton {...linkButtonProps} />
      </CardActions>
    </MuiCard>
  )
}

export default Card
