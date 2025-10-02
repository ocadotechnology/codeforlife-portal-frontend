import { Divider, Grid, Link, Stack, Typography } from "@mui/material"
import { type FC, type ReactNode, useRef } from "react"

export interface TableOfContentsProps {
  contents: Array<{ header: string; children: ReactNode }>
}

const TableOfContents: FC<TableOfContentsProps> = ({ contents }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const headerRefs = contents.map(() => useRef<HTMLSpanElement>(null))
  const halfLength = Math.ceil(contents.length / 2)

  function generateLinkStack(
    stackId: string,
    sliceStart: number,
    sliceEnd: number,
  ): ReactNode {
    return (
      <Stack id={stackId}>
        {contents.slice(sliceStart, sliceEnd).map((content, index) => {
          index += sliceStart
          return (
            <Typography key={index} mb={index === sliceEnd - 1 ? 0 : undefined}>
              {index + 1}.{" "}
              <Link
                onClick={() => {
                  const header = headerRefs[index].current
                  if (header !== null) {
                    header.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                }}
              >
                {content.header}
              </Link>
            </Typography>
          )
        })}
      </Stack>
    )
  }

  return (
    <Grid container spacing={0}>
      <Grid container size={{ xs: 12 }} spacing={2}>
        <Grid id="left-link-stack" size={{ xs: 12, sm: 6 }}>
          {generateLinkStack("left-link-stack", 0, halfLength)}
        </Grid>
        <Grid id="right-link-stack" size={{ xs: 12, sm: 6 }}>
          {generateLinkStack("right-link-stack", halfLength, contents.length)}
        </Grid>
      </Grid>
      {contents.map((content, index) => (
        <Grid key={index} size={{ xs: 12 }} mt={index === 0 ? 2 : 0}>
          <Divider sx={{ my: 2 }} />
          <Typography ref={headerRefs[index]} variant="h5">
            {index + 1}. {content.header}
          </Typography>
          {content.children}
        </Grid>
      ))}
    </Grid>
  )
}

export default TableOfContents
