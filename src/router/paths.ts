import { path as _ } from "codeforlife/utils/router"

const paths = _("", {
  login: _("/login", {
    teacher: _("/teacher", {
      otp: _("/otp", {
        bypassToken: _("/bypass-token"),
      }),
    }),
    student: _("/student", {
      class: _("/:classId"),
    }),
    independent: _("/independent"),
  }),
  resetPassword: _("/reset-password", {
    teacher: _("/teacher"),
    independent: _("/independent"),
  }),
  teacher: _("/teacher", {
    onboarding: _("/onboarding"),
    dashboard: _("/dashboard", {
      school: _("/school", {
        leave: _("/leave"),
      }),
      classes: _("/classes", {
        editClass: _("/:accessCode", {
          additional: _("/additional"),
          studentCredentials: _("/student-credentials"),
          editStudent: _("/edit/?studentIds={studentIds}"),
          resetStudents: _("/reset/?studentIds={studentIds}"),
          moveStudents: _("/move/?studentIds={studentIds}"),
          releaseStudents: _("/release/?studentIds={studentIds}"),
        }),
      }),
      account: _("/account", {
        setup2FA: _("/setup-2fa"),
        backupTokens: _("/backup-tokens"),
      }),
      student: _("/student", {
        accept: _("/accept/:studentId"),
        added: _("/added"),
      }),
    }),
  }),
  student: _("/student", {
    dashboard: _("/dashboard", {
      account: _("/account"),
    }),
  }),
  indy: _("/independent", {
    dashboard: _("/dashboard", {
      account: _("/account"),
      joinClass: _("/join-class"),
    }),
  }),
  register: _("/register", {
    emailVerification: _("/email-verification", {
      userType: _("/:userType", {
        teacher: _({ userType: "teacher" }),
        indy: _({ userType: "independent" }),
      }),
    }),
  }),
  aboutUs: _("/about-us"),
  codingClubs: _("/coding-clubs"),
  getInvolved: _("/get-involved"),
  contribute: _("/contribute"),
  homeLearning: _("/home-learning"),
  privacyNotice: _("/privacy-notice", {
    privacyNotice: _("/privacy-notice"),
    childFriendly: _("/child-friendly"),
  }),
  termsOfUse: _("/terms-of-use", {
    termsOfUse: _("/terms-of-use"),
    childFriendly: _("/child-friendly"),
  }),
  communicationPreferences: _("/communication-preferences"),
  error: _("/error", {
    forbidden: _("/forbidden"),
    pageNotFound: _("/page-not-found"),
    tooManyRequests: _("/too-many-requests", {
      teacher: _("/teacher"),
      indy: _("/independent"),
      student: _("/student"),
    }),
    internalServerError: _("/internal-server-error"),
  }),
  rapidRouter: _("/rapid-router", {
    scoreboard: _("/scoreboard"),
  }),
})

export default paths
