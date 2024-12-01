const express = require('express');
const cors = require('cors'); 
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'], 
};

app.use(cors(corsOptions)); 
app.use(express.json());

let budgets = []; 
let companies = []; 

app.post('/api/budgets', (req, res) => {
  const { description, value } = req.body;
  if (!description || !value) {
    return res.status(400).send('Descrição e valor são obrigatórios');
  }

  const newBudget = {
    id: budgets.length + 1, 
    description,
    value,
  };

  budgets.push(newBudget);
  res.status(201).json(newBudget);
});

app.get('/api/budgets', (req, res) => {
  res.json(budgets);
});

app.put('/api/budgets/:id', (req, res) => {
  const { id } = req.params;
  const { description, value } = req.body;

  const budget = budgets.find(b => b.id === parseInt(id));
  if (!budget) {
    return res.status(404).send('Orçamento não encontrado');
  }

  if (description) {
    budget.description = description;
  }
  if (value) {
    budget.value = value;
  }

  res.json(budget); 
});

app.delete('/api/budgets/:id', (req, res) => {
  const { id } = req.params;
  const budgetIndex = budgets.findIndex(b => b.id === parseInt(id));
  if (budgetIndex === -1) {
    return res.status(404).send('Orçamento não encontrado');
  }

  budgets.splice(budgetIndex, 1);
  res.status(204).send();
});

app.post('/api/companies', (req, res) => {
  const { companyName, responsibleName, address, phone, email, cnpj } = req.body;
  if (!companyName || !responsibleName || !address || !phone || !email || !cnpj) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const newCompany = {
    id: companies.length + 1, 
    companyName,
    responsibleName,
    address,
    phone,
    email,
    cnpj,
  };

  companies.push(newCompany);
  res.status(201).json(newCompany);
});

app.get('/api/companies', (req, res) => {
  res.json(companies);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});