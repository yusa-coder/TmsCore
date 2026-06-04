import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent, parseStudent } from "./models/student.model.js";
import { Course } from "./models/course.model.js";
import { EnrollmentRecord } from "./models/enrollment.model.js";

const student: Student = {
  id: "STU-001",
  name: "Hana Tadesse",
  enrollmentDate: Temporal.Now.instant(),
};

console.log("GPA:", student.gpa?.toFixed(2) ?? "Not yet graded");

const course: Course = {
  id: "CSE-101",
  title: "Introduction to Computer Science",
  capacity: 30,
  startDate: Temporal.PlainDate.from("2025-09-01"),
};

const enrollment: EnrollmentRecord = {
  studentId: student.id,
  courseCode: course.id,
  enrolledAt: Temporal.Now.instant(),
};

console.log(`Enrolled ${student.name} in ${course.title}`);
console.log(`Enrolled at: ${enrollment.enrolledAt.toString()}`);

function processStudent(raw: unknown): void {
  if (isStudent(raw)) {
    const gpaDisplay = raw.gpa?.toFixed(2) ?? "Not yet graded";
    console.log(`Student ${raw.name} — GPA: ${gpaDisplay}`);
  } else {
    console.error("Invalid student data received");
  }
}

processStudent({ id: "STU-001", name: "Hana", gpa: 3.7 });
processStudent(42);

console.log("\n--- parseStudent ---");

const parsed = parseStudent({ id: "STU-002", name: "Yared Alemu" });
console.log("Parsed:", parsed);

try {
  parseStudent({ id: 42, name: "Test" });
} catch (err) {
  console.error("Caught:", (err as Error).message);
}