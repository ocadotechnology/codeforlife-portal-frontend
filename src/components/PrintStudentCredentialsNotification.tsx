import { Stack, Typography } from "@mui/material"
import { type FC } from "react"
import { Section } from "codeforlife/components/page"
import { WarningAmber as WarningAmberIcon } from "@mui/icons-material"

import PrintPasswordReminderCardsButton, {
  type PrintPasswordReminderCardsButtonProps,
} from "./PrintPasswordReminderCardsButton"

export interface PrintStudentCredentialsNotificationProps
  extends PrintPasswordReminderCardsButtonProps {}

const PrintStudentCredentialsNotification: FC<
  PrintStudentCredentialsNotificationProps
> = props => (
  <Section boxProps={{ bgcolor: "#ffd23b" }} sx={{ paddingY: "5px" }}>
    <Stack direction="row" alignItems="center" gap={2}>
      <WarningAmberIcon htmlColor="#000" />
      <Typography variant="body2" color="#000" mb={0}>
        This is the only time you will be able to view this page. You can print
        reminder cards or download as a CSV file.
      </Typography>
      <PrintPasswordReminderCardsButton
        {...props}
        style={{ marginLeft: "auto" }}
        variant="outlined"
      />
    </Stack>
  </Section>
)

export default PrintStudentCredentialsNotification
