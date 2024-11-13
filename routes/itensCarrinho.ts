import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const itens = await prisma.itemCarrinho.findMany();
  res.json(itens);
});

router.post("/", async (req, res) => {
  const item = await prisma.itemCarrinho.create({ data: req.body });
  res.json(item);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const item = await prisma.itemCarrinho.findUnique({ where: { id_item: id } });
  res.json(item);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = await prisma.itemCarrinho.update({ where: { id_item: id }, data: req.body });
  res.json(updatedItem);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.itemCarrinho.delete({ where: { id_item: id } });
  res.json({ message: "Item deleted" });
});

export default router;
