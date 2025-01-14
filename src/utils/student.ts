import { type Student } from "codeforlife/api"

export function makeAutoLoginLink(
  classLoginLink: string,
  student: Pick<Student, "id" | "auto_gen_password">,
) {
  return (
    `${classLoginLink}?` +
    new URLSearchParams({
      id: String(student.id),
      agp: student.auto_gen_password,
    }).toString()
  )
}
