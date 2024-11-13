import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const carrinhos = await prisma.carrinho.findMany({ include: { Itens: true } });
  res.json(carrinhos);
});

router.post("/", async (req, res) => {
  const carrinho = await prisma.carrinho.create({ data: req.body });
  res.json(carrinho);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const carrinho = await prisma.carrinho.findUnique({ where: { id_carrinho: id } });
  res.json(carrinho);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCarrinho = await prisma.carrinho.update({ where: { id_carrinho: id }, data: req.body });
  res.json(updatedCarrinho);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.carrinho.delete({ where: { id_carrinho: id } });
  res.json({ message: "Carrinho deleted" });
});

export default router;
