import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

router.post("/", async (req, res) => {
  const produto = await prisma.produto.create({ data: req.body });
  res.json(produto);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const produto = await prisma.produto.findUnique({ where: { id_produto: id } });
  res.json(produto);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduto = await prisma.produto.update({ where: { id_produto: id }, data: req.body });
  res.json(updatedProduto);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.produto.delete({ where: { id_produto: id } });
  res.json({ message: "Produto deleted" });
});

export default router;
