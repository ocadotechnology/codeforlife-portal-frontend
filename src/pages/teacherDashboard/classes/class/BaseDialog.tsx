import { Button, Dialog, Stack, Typography } from "@mui/material"
import { type FC } from "react"

export interface BaseDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  header: string
  body: string
}

const BaseDialog: FC<BaseDialogProps> = ({
  open,
  onClose,
  onConfirm,
  header,
  body,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <Typography variant="h5" textAlign="center">
        {header}
      </Typography>
      <Typography>{body}</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mt={5}>
        <Button variant="outlined" className="body" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </Stack>
    </Dialog>
  )
}

export default BaseDialog
