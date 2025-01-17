import * as pages from "codeforlife/components/page"
import { type FC, type ReactNode, useState } from "react"
import { MobileStepper, Typography, mobileStepperClasses } from "@mui/material"
import { Navigate } from "codeforlife/components/router"
import { type SchoolTeacherUser } from "codeforlife/api"
import { type SessionMetadata } from "codeforlife/hooks"
import { handleResultState } from "codeforlife/utils/api"

import { type RetrieveUserResult, useRetrieveUserQuery } from "../../api/user"
import { CreateClassForm } from "../../components/form"
import { type CreateClassResult } from "../../api/klass"
import CreateSchoolForm from "./CreateSchoolForm"
import { CreateStudentsForm } from "../../components/form"
import { type CreateStudentsResult } from "../../api/student"
import { PrintStudentCredentialsNotification } from "../../components"
import StudentCredentialsTable from "./StudentCredentialsTable"
import { paths } from "../../routes"

export interface TeacherOnboardingProps {}

const _TeacherOnboarding: FC<TeacherOnboardingProps & SessionMetadata> = ({
  user_id,
}) => {
  const [activeStep, setActiveStep] = useState<{
    index: number
    klass?: CreateClassResult
    students?: CreateStudentsResult
  }>({ index: 0 })

  function onSubmit(state: Omit<typeof activeStep, "index">): void {
    setActiveStep(({ index, ...previous }) => ({
      index: index + 1,
      ...previous,
      ...state,
    }))
  }

  function generateKey(step: number): string {
    return `teacher-onboarding-step-${step}`
  }

  return handleResultState(useRetrieveUserQuery(user_id), authUser => {
    const schoolTeacherUser = authUser as SchoolTeacherUser<RetrieveUserResult>

    const steps: Array<{ header: string; element: ReactNode }> = [
      {
        header: "Create a school or club",
        element: (
          <CreateSchoolForm
            key={generateKey(0)}
            submitOptions={{
              then: () => {
                onSubmit({})
              },
            }}
          />
        ),
      },
      {
        header: "Create a class",
        element: (
          <CreateClassForm
            key={generateKey(1)}
            authUser={schoolTeacherUser}
            submitOptions={{
              then: klass => {
                onSubmit({ klass })
              },
            }}
          />
        ),
      },
      {
        header: "Add students to class",
        element: (
          <CreateStudentsForm
            key={generateKey(2)}
            classId={((activeStep.klass || {}) as CreateClassResult).id}
            submitOptions={{
              then: students => {
                onSubmit({ students })
              },
            }}
          />
        ),
      },
      {
        header: "Student login details",
        element: (
          <StudentCredentialsTable
            key={generateKey(3)}
            flow="create"
            klass={activeStep.klass as CreateClassResult}
            students={activeStep.students as CreateStudentsResult}
          />
        ),
      },
    ]

    return schoolTeacherUser.teacher.school ? (
      <Navigate to={paths.teacher.dashboard.tab.school._} />
    ) : (
      <>
        <pages.Banner
          header={`Welcome, ${schoolTeacherUser.first_name} ${schoolTeacherUser.last_name}`}
          subheader="Everything you need to start coding with your class is here. Let's set you up."
        />
        {activeStep.klass && activeStep.students && (
          <PrintStudentCredentialsNotification
            classId={activeStep.klass.id}
            students={activeStep.students}
          />
        )}
        <pages.Section>
          <Typography variant="h4">{steps[activeStep.index].header}</Typography>
          <Typography>
            Progress &lt; {activeStep.index + 1} of {steps.length} &gt;
          </Typography>
          <MobileStepper
            variant="progress"
            position="static"
            steps={steps.length + 1}
            activeStep={activeStep.index + 1}
            nextButton={undefined}
            backButton={undefined}
            sx={{
              padding: 0,
              marginBottom: 3,
              [`.${mobileStepperClasses.progress}`]: {
                width: "100%",
                height: "7px",
              },
            }}
          />
          {steps[activeStep.index].element}
        </pages.Section>
      </>
    )
  })
}

const TeacherOnboarding: FC<TeacherOnboardingProps> = props => (
  <pages.Page session={{ userType: "teacher" }}>
    {sessionMetadata => <_TeacherOnboarding {...props} {...sessionMetadata} />}
  </pages.Page>
)

export default TeacherOnboarding
