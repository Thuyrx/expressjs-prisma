import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const pedidos = await prisma.pedido.findMany({ include: { Itens: true, Pagamentos: true } });
  res.json(pedidos);
});

router.post("/", async (req, res) => {
  const pedido = await prisma.pedido.create({ data: req.body });
  res.json(pedido);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = await prisma.pedido.findUnique({ where: { id_pedido: id } });
  res.json(pedido);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPedido = await prisma.pedido.update({ where: { id_pedido: id }, data: req.body });
  res.json(updatedPedido);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.pedido.delete({ where: { id_pedido: id } });
  res.json({ message: "Pedido deleted" });
});

export default router;
