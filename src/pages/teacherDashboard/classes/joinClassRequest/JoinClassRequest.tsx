import { type FC, useEffect, useState } from "react"
import {
  type IndependentUser,
  type StudentUser,
  schemas,
} from "codeforlife/api"
import { useNavigate, useParams } from "codeforlife/hooks"
import { CircularProgress } from "@mui/material"

import {
  type RetrieveUserResult,
  useLazyRetrieveUserQuery,
} from "../../../../api/user"
import AddedStudent from "./AddedStudent"
import HandleRequest from "./HandleRequest"
import { paths } from "../../../../routes"
import { useLazyRetrieveClassQuery } from "../../../../api/klass"

export interface JoinClassRequestProps {}

const JoinClassRequest: FC<JoinClassRequestProps> = () => {
  const navigate = useNavigate()
  const [wasAccepted, setWasAccepted] = useState(false)
  const params = useParams({
    classId: schemas.klass.id,
    userId: schemas.user.id,
  })

  const [
    retrieveUser,
    { data: user, isLoading: userIsLoading, isError: userIsError },
  ] = useLazyRetrieveUserQuery()
  const [
    retrieveClass,
    { data: klass, isLoading: classIsLoading, isError: classIsError },
  ] = useLazyRetrieveClassQuery()

  useEffect(() => {
    if (params) {
      void retrieveUser(params.userId)
      void retrieveClass(params.classId)
    } else navigate(paths.error.type.pageNotFound._)
  }, [params, navigate, retrieveUser, retrieveClass])

  if (!params) return <></>

  if (!user || userIsLoading || !klass || classIsLoading)
    return <CircularProgress />

  if (userIsError || classIsError) alert("TODO: handle error")

  return wasAccepted ? (
    <AddedStudent
      klass={klass}
      user={user as StudentUser<RetrieveUserResult>}
    />
  ) : (
    <HandleRequest
      klass={klass}
      user={user as IndependentUser<RetrieveUserResult>}
      onAcceptRequest={() => {
        setWasAccepted(true)
      }}
    />
  )
}

export default JoinClassRequest
