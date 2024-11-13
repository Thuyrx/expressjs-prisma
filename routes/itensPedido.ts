import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const itensPedido = await prisma.itemPedido.findMany();
  res.json(itensPedido);
});

router.post("/", async (req, res) => {
  const itemPedido = await prisma.itemPedido.create({ data: req.body });
  res.json(itemPedido);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const itemPedido = await prisma.itemPedido.findUnique({ where: { id_item_pedido: id } });
  res.json(itemPedido);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItemPedido = await prisma.itemPedido.update({ where: { id_item_pedido: id }, data: req.body });
  res.json(updatedItemPedido);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.itemPedido.delete({ where: { id_item_pedido: id } });
  res.json({ message: "ItemPedido deleted" });
});

export default router;
