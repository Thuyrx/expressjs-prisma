import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const pagamentos = await prisma.pagamento.findMany();
  res.json(pagamentos);
});

router.post("/", async (req, res) => {
  const pagamento = await prisma.pagamento.create({ data: req.body });
  res.json(pagamento);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const pagamento = await prisma.pagamento.findUnique({ where: { id_pagamento: id } });
  res.json(pagamento);
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPagamento = await prisma.pagamento.update({ where: { id_pagamento: id }, data: req.body });
  res.json(updatedPagamento);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.pagamento.delete({ where: { id_pagamento: id } });
  res.json({ message: "Pagamento deleted" });
});

export default router;
