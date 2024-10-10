import { Button, Stack, Typography } from "@mui/material"
import {
  DeleteOutlined as DeleteOutlinedIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import { type FC, useState } from "react"
import { type Class } from "codeforlife/api"
import { LinkButton } from "codeforlife/components/router"
import { generatePath } from "react-router-dom"

import DeleteClassDialog from "./DeleteClassDialog"
import { paths } from "../../../../routes"

export interface AdditionalClassDetailsProps {
  classId: Class["id"]
}

const AdditionalClassDetails: FC<AdditionalClassDetailsProps> = ({
  classId,
}) => {
  const [dialog, setDialog] = useState<"delete-class">()

  return (
    <>
      <Typography variant="h4">Additional class details</Typography>
      <Typography>
        Here you can change settings and permissions for the class and the
        students accessing it. You can also delete classes and change level
        access.
      </Typography>
      <Stack direction="row" columnGap={3}>
        <LinkButton
          endIcon={<EditIcon />}
          to={generatePath(paths.teacher.dashboard.tab.classes.class.edit._, {
            classId,
          })}
        >
          Edit details
        </LinkButton>
        <Button
          className="alert"
          endIcon={<DeleteOutlinedIcon />}
          onClick={() => {
            setDialog("delete-class")
          }}
        >
          Delete class
        </Button>
      </Stack>
      <DeleteClassDialog
        classId={classId}
        open={dialog === "delete-class"}
        onClose={() => {
          setDialog(undefined)
        }}
      />
    </>
  )
}

export default AdditionalClassDetails
