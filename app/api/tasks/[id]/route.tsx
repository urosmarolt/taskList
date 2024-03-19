import { NextRequest, NextResponse } from "next/server";
import { statusSchema } from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json(task);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = statusSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: task.id },
    data: { status: body.status, task: body.task },
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  await prisma.task.delete({
    where: { id: task.id },
  });

  return NextResponse.json({});
}
