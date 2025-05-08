import { Unstable_Grid2 as Grid, Typography, useTheme } from "@mui/material"
import { Image, type ImageProps } from "codeforlife/components"
import Carousel from "react-material-ui-carousel"
import { type FC } from "react"

import IconStepByStepImage from "../../images/icon_step_by_step.png"
import IconTrackingImage from "../../images/icon_tracking.png"
import IconUkFlagImage from "../../images/icon_uk_flag.png"

const CarouselItem: FC<{
  imageProps: ImageProps
  description: string
}> = ({ imageProps, description }) => {
  const theme = useTheme()

  return (
    <Grid
      container
      margin={0}
      padding={5}
      spacing={0}
      bgcolor={theme.palette.info.main}
      className="flex-center"
      height="100%"
    >
      <Grid
        xs={12}
        sm={6}
        padding={{ sm: "10%", xs: "20%" }}
        margin={0}
        className="flex-center"
        height={{ sm: "95%", xs: "65%" }}
        bgcolor={theme.palette.background.paper}
      >
        <Image {...imageProps} />
      </Grid>
      <Grid xs={12} sm={6} padding={0}>
        <Typography variant="h5" margin={3}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

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
        }}
        description={
          "Easy to use teacher dashboard includes scores to track student progress as well as comprehensive teaching resources."
        }
      />
    </Carousel>
  )
}

export default TeacherSlides
