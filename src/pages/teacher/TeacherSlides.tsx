import { Grid, Typography, useTheme } from "@mui/material"
import { Image, type ImageProps } from "codeforlife/components"
import Carousel from "react-material-ui-carousel"
import { type FC } from "react"

import IconStepByStepImage from "../../images/icon_step_by_step.png"
import IconTrackingImage from "../../images/icon_tracking.png"
import IconUkFlagImage from "../../images/icon_uk_flag.png"

// TODO: Fix image sizes, white box height and space between children
const CarouselItem: FC<{
  imageProps: ImageProps
  description: string
}> = ({ imageProps, description }) => (
  <Grid
    container
    padding={5}
    bgcolor="info.main"
    className="flex-center"
    height="100%"
  >
    <Grid size={{ xs: 12, sm: 6 }} className="flex-center" bgcolor="white.main">
      <Image {...imageProps} />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <Typography variant="h5">{description}</Typography>
    </Grid>
  </Grid>
)

export interface TeacherSlidesProps {}

const TeacherSlides: FC<TeacherSlidesProps> = () => {
  const theme = useTheme()

  return (
    <Carousel
      height="500px"
      indicatorIconButtonProps={{
        style: {
          padding: theme.spacing(0.25),
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: theme.palette.secondary.main,
        },
      }}
      interval={8000}
    >
      <CarouselItem
        imageProps={{
          alt: "Person climbing stairs holding a flag",
          title: "Person climbing stairs holding a flag",
          src: IconStepByStepImage,
          style: { width: "80%" },
        }}
        description={
          "The step-by-step nature of Rapid Router makes it simple for you and your students to gain experience quickly."
        }
      />
      <CarouselItem
        imageProps={{
          alt: "UK flag",
          title: "UK flag",
          src: IconUkFlagImage,
          style: { width: "80%" },
        }}
        description={
          "Our resources are aligned to the UK National computing curriculum, so you can gain the knowledge and confidence you need."
        }
      />
      <CarouselItem
        imageProps={{
          alt: "Statistics bars",
          title: "Statistics bars",
          src: IconTrackingImage,
          style: { width: "80%" },
        }}
        description={
          "Easy to use teacher dashboard includes scores to track student progress as well as comprehensive teaching resources."
        }
      />
    </Carousel>
  )
}

export default TeacherSlides
