import * as pages from "codeforlife/components/page"
import { type FC, type ReactNode, useState } from "react"
import { MobileStepper, Typography, mobileStepperClasses } from "@mui/material"
import { type Class } from "codeforlife/api"
import { Navigate } from "codeforlife/components/router"
import { type SessionMetadata } from "codeforlife/hooks"
import { handleResultState } from "codeforlife/utils/api"

import CreateClassForm from "./CreateClassForm"
import CreateSchoolForm from "./CreateSchoolForm"
import { CreateStudentsForm } from "../../components/form"
import { type CreateStudentsResult } from "../../api/student"
import StudentCredentialsTable from "./StudentCredentialsTable"
import { paths } from "../../routes"
import { useRetrieveUserQuery } from "../../api/user"

export interface TeacherOnboardingProps {}

const _TeacherOnboarding: FC<TeacherOnboardingProps & SessionMetadata> = ({
  user_id,
}) => {
  const [activeStep, setActiveStep] = useState<{
    index: number
    classId?: Class["id"]
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
          submitOptions={{
            then: klass => {
              onSubmit({ classId: klass.id })
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
          classId={activeStep.classId as string}
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
          classId={activeStep.classId as string}
          students={activeStep.students as CreateStudentsResult}
        />
      ),
    },
  ]

  return handleResultState(useRetrieveUserQuery(user_id), authUser =>
    authUser.teacher!.school ? (
      <Navigate to={paths.teacher.dashboard.tab.school._} />
    ) : (
      <>
        <pages.Banner
          header={`Welcome, ${authUser.first_name} ${authUser.last_name}`}
          subheader="Everything you need to start coding with your class is here. Let's set you up."
        />
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
    ),
  )
}

const TeacherOnboarding: FC<TeacherOnboardingProps> = props => (
  <pages.Page session={{ userType: "teacher" }}>
    {sessionMetadata => <_TeacherOnboarding {...props} {...sessionMetadata} />}
  </pages.Page>
)

export default TeacherOnboarding
