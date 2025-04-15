import { Unstable_Grid2 as Grid, Typography, useTheme } from "@mui/material"
import { Image, type ImageProps } from "codeforlife/components"
import Carousel from "react-material-ui-carousel"
import { type FC } from "react"

import IconStepByStepImage from "../../images/icon_step_by_step.png"
import IconTrackingImage from "../../images/icon_tracking.png"
import IconUkFlagImage from "../../images/icon_uk_flag.png"

const SlideHeight = "500px"
const ImageGridHeight = "400px"

const CarouselItem: FC<{
  imageProps: ImageProps
  description: string
}> = ({ imageProps, description }) => {
  const theme = useTheme()

  return (
    <Grid
      container
      margin={0}
      spacing={3}
      bgcolor={theme.palette.info.main}
      className="flex-center"
      height={SlideHeight}
    >
      <Grid xs={6} padding={0}>
        <Grid
          bgcolor="White"
          margin={3}
          className="flex-center"
          height={ImageGridHeight}
        >
          <Image {...imageProps} />
        </Grid>
      </Grid>
      <Grid xs={6} padding={0} className="flex-center">
        <Typography variant="h5" margin={3}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export interface TeacherSlidesProps {}

const TeacherSlides: FC<TeacherSlidesProps> = () => {
  return (
    <Carousel
      height={SlideHeight}
      indicatorIconButtonProps={{
        style: {
          padding: "2px",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#F6BE00",
        },
      }}
      interval={8000}
    >
      <CarouselItem
        imageProps={{
          alt: "Person climbing stairs holding a flag",
          title: "Person climbing stairs holding a flag",
          src: IconStepByStepImage,
          maxWidth: "250px",
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
          maxWidth: "250px",
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
          maxWidth: "250px",
        }}
        description={
          "Easy to use teacher dashboard includes scores to track student progress as well as comprehensive teaching resources."
        }
      />
    </Carousel>
  )
}

export default TeacherSlides
