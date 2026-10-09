import "dotenv/config";
import { prisma } from "./lib/prisma.js";

async function main(): Promise<void> {
  const doctor1 = await prisma.doctor.upsert({
    where: { email: "arun.doctor@example.com" },
    update: {},
    create: {
      name: "Dr. Arun Kumar",
      specialty: "Cardiology",
      email: "arun.doctor@example.com",
    },
  });

  const doctor2 = await prisma.doctor.upsert({
    where: { email: "priya.doctor@example.com" },
    update: {},
    create: {
      name: "Dr. Priya Sharma",
      specialty: "Dermatology",
      email: "priya.doctor@example.com",
    },
  });

  const patient1 = await prisma.patient.upsert({
    where: { email: "raja.patient@example.com" },
    update: {},
    create: {
      name: "Raja",
      email: "raja.patient@example.com",
      phone: "9876543210",
      dateOfBirth: new Date("2002-05-15T00:00:00.000Z"),
    },
  });

  const patient2 = await prisma.patient.upsert({
    where: { email: "meena.patient@example.com" },
    update: {},
    create: {
      name: "Meena",
      email: "meena.patient@example.com",
      phone: "9876501234",
      dateOfBirth: new Date("2000-08-20T00:00:00.000Z"),
    },
  });

  const appointmentDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  appointmentDate.setSeconds(0, 0);

  const existing = await prisma.appointment.findFirst({
    where: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentDate,
    },
  });

  if (!existing) {
    await prisma.appointment.create({
      data: {
        appointmentDate,
        status: "scheduled",
        notes: "Routine check-up",
        patient: { connect: { id: patient1.id } },
        doctor: { connect: { id: doctor1.id } },
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log("Doctors:", doctor1.name, "and", doctor2.name);
  console.log("Patients:", patient1.name, "and", patient2.name);
}

main()
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
