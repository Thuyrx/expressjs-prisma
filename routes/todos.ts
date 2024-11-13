import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = await prisma.todo.create({ data: req.body });
  res.json(todo);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });
  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = await prisma.todo.update({ where: { id }, data: req.body });
  res.json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.json({ message: "Todo deleted" });
});

export default router;
