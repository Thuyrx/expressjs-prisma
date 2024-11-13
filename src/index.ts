import express from "express";
import todosRoutes from "../routes/todos"; // Importa o arquivo de rotas "todos.js"
import usuariosRoutes from "../routes/usuarios";
import carrinhosRoutes from "../routes/carrinhos";
import itensCarrinhoRoutes from "../routes/itensCarrinho";
import produtosRoutes from "../routes/produtos";
import pedidosRoutes from "../routes/pedidos";
import itensPedidoRoutes from "../routes/itensPedido";
import pagamentosRoutes from "../routes/pagamentos";

const app = express();
const port = process.env.PGPORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

// Registro das rotas
app.use("/todos", todosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/carrinhos", carrinhosRoutes);
app.use("/itens-carrinho", itensCarrinhoRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/itens-pedido", itensPedidoRoutes);
app.use("/pagamentos", pagamentosRoutes);
// Adicione outras rotas conforme necessário

// Rota inicial
app.get("/", (req, res) => {
  res.send(`
    <h1>API Central</h1>
    <p>Bem-vindo à API! Use os seguintes endpoints:</p>
    <ul>
      <li>GET, POST, PUT, DELETE /todos</li>
      <li>GET, POST, PUT, DELETE /usuarios</li>
      <li>GET, POST, PUT, DELETE /carrinhos</li>
      <li>GET, POST, PUT, DELETE /itens-carrinho</li>
      <li>GET, POST, PUT, DELETE /produtos</li>
      <li>GET, POST, PUT, DELETE /pedidos</li>
      <li>GET, POST, PUT, DELETE /itens-pedido</li>
      <li>GET, POST, PUT, DELETE /pagamentos</li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
