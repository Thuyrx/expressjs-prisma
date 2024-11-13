import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

router.post("/", async (req, res) => {
  const usuario = await prisma.usuario.create({ data: req.body });
  res.json(usuario);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = await prisma.usuario.findUnique({ where: { id_usuario: id } });
  res.json(usuario);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUsuario = await prisma.usuario.update({ where: { id_usuario: id }, data: req.body });
  res.json(updatedUsuario);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.usuario.delete({ where: { id_usuario: id } });
  res.json({ message: "Usuario deleted" });
});

export default router;
