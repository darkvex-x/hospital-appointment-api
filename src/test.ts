import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments.js";

async function main(): Promise<void> {
  console.log("\n--- PATIENT CRUD TESTS ---");

  const patient = await createPatient({
    name: "Test Patient",
    email: `test.patient.${Date.now()}@example.com`,
    phone: "9000000001",
  });
  console.log("Created patient:", patient.id, patient.name);

  const foundPatient = await getPatient(patient.id);
  console.log("Get patient:", foundPatient?.name);

  const searchedPatients = await searchPatients("Test Patient");
  console.log("Search patients:", searchedPatients.length);

  const updatedPatient = await updatePatientPhone(patient.id, "9000000002");
  console.log("Updated phone:", updatedPatient.phone);

  console.log("\n--- DOCTOR CRUD TESTS ---");

  const doctor = await createDoctor({
    name: "Test Doctor",
    specialty: "General Medicine",
    email: `test.doctor.${Date.now()}@example.com`,
  });
  console.log("Created doctor:", doctor.id, doctor.name);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("Get doctor:", foundDoctor?.name);

  const specialtyDoctors = await listDoctorsBySpecialty("General Medicine");
  console.log("Doctors by specialty:", specialtyDoctors.length);

  console.log("\n--- APPOINTMENT CRUD TESTS ---");

  const appointment = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
    notes: "Test appointment",
  });
  console.log(
    "Booked appointment:",
    appointment.id,
    appointment.patient.name,
    appointment.doctor.name,
  );

  const fullAppointment = await getAppointmentFull(appointment.id);
  console.log(
    "Get full appointment:",
    fullAppointment?.patient.name,
    fullAppointment?.doctor.name,
  );

  const upcoming = await getDoctorUpcomingAppointments(doctor.id);
  console.log("Upcoming appointments:", upcoming.length);

  const updatedAppointment = await setAppointmentStatus(
    appointment.id,
    "confirmed",
  );
  console.log("Updated appointment status:", updatedAppointment.status);

  const cancelled = await cancelAllPatientAppointments(patient.id);
  console.log("Cancelled scheduled appointments:", cancelled.count);

  await deleteAppointment(appointment.id);
  console.log("Deleted test appointment");

  console.log("\n--- DELETE TESTS ---");

  await deleteDoctor(doctor.id);
  console.log("Deleted test doctor");

  await deletePatient(patient.id);
  console.log("Deleted test patient");

  console.log("\nAll CRUD tests completed successfully!");
}

main()
  .catch((error: unknown) => {
    console.error("CRUD test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
