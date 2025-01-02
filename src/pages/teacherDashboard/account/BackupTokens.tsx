import { type FC } from "react"
import { type RetrieveUserResult } from "../../../api/user"
import { type SchoolTeacherUser } from "codeforlife/api"

export interface BackupTokensProps {
  user: SchoolTeacherUser<RetrieveUserResult>
}

const BackupTokens: FC<BackupTokensProps> = () => {
  return <>TODO</>
}

export default BackupTokens
