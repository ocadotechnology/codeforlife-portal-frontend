import { ChevronRight as ChevronRightIcon } from "@mui/icons-material"
import { Stack, type SxProps, Typography, useTheme } from "@mui/material"
import { type FC } from "react"

import { Image, type ImageProps, OrderedGrid } from "codeforlife/components"
import { LinkButton, type LinkButtonProps } from "codeforlife/components/router"

import EducateImage from "../../images/dashboard_educate.png"
import PlayImage from "../../images/dashboard_play.png"
import { paths } from "../../router"

export interface TargetAudienceProps {}

const TargetAudience: FC<TargetAudienceProps> = () => {
  const theme = useTheme()

  const padding = {
    xs: theme.spacing(2),
    md: theme.spacing(4),
    lg: theme.spacing(6),
  }

  const commonItemSxProps: SxProps[] = [
    {
      backgroundColor: theme.palette.primary.main,
      paddingX: padding,
    },
    {
      backgroundColor: theme.palette.tertiary.main,
      paddingX: padding,
    },
  ]
  const imagesProps: ImageProps[] = [
    { alt: "teacher with student", src: EducateImage },
    { alt: "kids playing", src: PlayImage },
  ]
  const headers: string[] = ["Educate", "Play"]
  const bodies: string[] = [
    "Helping teachers and families to inspire the next generation of computer scientists.",
    "Anyone can learn how to code. We will help you learn how. It's fun, free and easy.",
  ]
  const linkButtons: LinkButtonProps[] = [
    {
      children: "Learn more",
      to: paths.teacher._,
    },
    {
      children: "Get started",
      to: paths.student._,
    },
  ]

  return (
    <OrderedGrid
      rows={[
        imagesProps.map((imageProps, index) => ({
          element: <Image {...imageProps} maxWidth="550px" />,
          itemProps: {
            className: "flex-center",
            sx: commonItemSxProps[index],
          },
        })),
        headers.map((header, index) => ({
          element: (
            <Typography variant="h1" style={{ color: "white" }}>
              {header}
            </Typography>
          ),
          itemProps: {
            sx: commonItemSxProps[index],
          },
        })),
        bodies.map((body, index) => ({
          element: (
            <Stack direction={{ xs: "column", lg: "row" }}>
              <Typography
                fontSize="1.4rem !important"
                fontWeight={500}
                sx={{
                  color: "white !important",
                  mb: { lg: 0 },
                  mr: { lg: theme.spacing(3) },
                }}
              >
                {body}
              </Typography>
              <LinkButton
                style={{ backgroundColor: "white" }}
                endIcon={<ChevronRightIcon />}
                sx={{ ml: "auto", mt: "auto" }}
                {...linkButtons[index]}
              />
            </Stack>
          ),
          itemProps: {
            sx: {
              ...commonItemSxProps[index],
              paddingBottom: padding,
            },
          },
        })),
      ]}
      globalItemProps={{
        xs: 12,
        sm: 6,
        md: 6,
        lg: 6,
        xl: 6,
      }}
    />
  )
}

export default TargetAudience
