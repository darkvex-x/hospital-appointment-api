import { prisma } from "./lib/prisma.js";
import type { Patient, Prisma } from "../generated/prisma/client.js";

export type CreatePatientInput = {
  name: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: Date | null;
};

export async function createPatient(
  data: CreatePatientInput,
): Promise<Patient> {
  const patientData: Prisma.PatientCreateInput = {
    name: data.name,
    email: data.email,
    ...(data.phone !== undefined && { phone: data.phone }),
    ...(data.dateOfBirth !== undefined && {
      dateOfBirth: data.dateOfBirth,
    }),
  };

  return prisma.patient.create({ data: patientData });
}

export async function getPatient(id: number): Promise<Patient | null> {
  return prisma.patient.findUnique({
    where: { id },
  });
}

export async function searchPatients(searchTerm: string): Promise<Patient[]> {
  return prisma.patient.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        { phone: { contains: searchTerm } },
      ],
    },
    orderBy: { name: "asc" },
  });
}

export async function updatePatientPhone(
  id: number,
  phone: string | null,
): Promise<Patient> {
  return prisma.patient.update({
    where: { id },
    data: { phone },
  });
}

export async function deletePatient(id: number): Promise<Patient> {
  return prisma.patient.delete({
    where: { id },
  });
}
