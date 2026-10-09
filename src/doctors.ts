import { prisma } from "./lib/prisma.js";
import type { Doctor } from "../generated/prisma/client.js";

export type CreateDoctorInput = {
  name: string;
  specialty: string;
  email: string;
};

export async function createDoctor(data: CreateDoctorInput): Promise<Doctor> {
  return prisma.doctor.create({
    data: {
      name: data.name,
      specialty: data.specialty,
      email: data.email,
    },
  });
}

export async function getDoctor(id: number): Promise<Doctor | null> {
  return prisma.doctor.findUnique({
    where: { id },
  });
}

export async function listDoctorsBySpecialty(
  specialty: string,
): Promise<Doctor[]> {
  return prisma.doctor.findMany({
    where: {
      specialty: {
        equals: specialty,
        mode: "insensitive",
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function deleteDoctor(id: number): Promise<Doctor> {
  return prisma.doctor.delete({
    where: { id },
  });
}
