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
    indy: _("/independent"),
  }),
  resetPassword: _("/reset-password", {
    userType: _("/:userType", {
      teacher: _({ userType: "teacher" }),
      indy: _({ userType: "independent" }),
    }),
  }),
  teacher: _("/teacher", {
    onboarding: _("/onboarding"),
    dashboard: _("/dashboard", {
      tab: _("/:tab", {
        school: _(
          { tab: "school" },
          {
            leave: _("/leave"),
          },
        ),
        classes: _(
          { tab: "classes" },
          {
            editClass: _("/:accessCode", {
              additional: _("/additional"),
              studentCredentials: _("/student-credentials"),
              editStudent: _("/edit/?studentIds={studentIds}"),
              resetStudents: _("/reset/?studentIds={studentIds}"),
              moveStudents: _("/move/?studentIds={studentIds}"),
              releaseStudents: _("/release/?studentIds={studentIds}"),
            }),
          },
        ),
        account: _(
          { tab: "account" },
          {
            setup2FA: _("/setup-2fa"),
            backupTokens: _("/backup-tokens"),
          },
        ),
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
    tab: _("/:tab", {
      privacyNotice: _({ tab: "privacy-notice" }),
      childFriendly: _({ tab: "child-friendly" }),
    }),
  }),
  termsOfUse: _("/terms-of-use", {
    tab: _("/:tab", {
      termsOfUse: _({ tab: "terms-of-use" }),
      childFriendly: _({ tab: "child-friendly" }),
    }),
  }),
  error: _("/error", {
    type: _("/:type", {
      forbidden: _({ type: "forbidden" }),
      pageNotFound: _({ type: "page-not-found" }),
      internalServerError: _({ type: "internal-server-error" }),
      userType: _("/:userType?", {
        tooManyRequests: _(
          { type: "too-many-requests" },
          {
            teacher: _({ userType: "teacher" }),
            indy: _({ userType: "independent" }),
            student: _({ userType: "student" }),
          },
        ),
      }),
    }),
  }),
  rapidRouter: _("/rapid-router", {
    scoreboard: _("/scoreboard"),
  }),
})

export default paths
