const express = require('express');
const database = require('../database');
const router = express.Router();

// Rota POST
router.post('/cadastro-jogos', (req, res) => {
  const nome = req.body.nomeJogo;
  const descricao = req.body.descricao;
  const lancamento = req.body.lancamento;
  const plataforma = req.body.plataforma;
  const imagemUrl = req.body.imagem;

  const query = `INSERT INTO jogos (nome, descricao, lancamento, plataforma, imagemUrl) VALUES
  ('${nome}', '${descricao}', '${lancamento}', '${plataforma}', '${imagemUrl}')`;

  database.query(query)
    .then(() => {
      res.status(200).send({ message: 'Registro executado com sucesso' });
    })
    .catch((error) => {
      res.status(500).send({ erro: 'Não cadastrado devido a:', error });
    });
});

// Rota GET
router.get('/jogos', (req, res) => {
  database.query('SELECT * FROM jogos')
    .then((resultado) => {
      res.status(200).send({ jogos: resultado.rows });
    })
    .catch((erro) => {
      res.status(500).send({ erro: erro });
    });
});

// Rota DELETE
router.delete('/deletar/:id', (req, res) => {
  const id = req.params.id;

  database.query(`DELETE FROM jogos WHERE id = ${id}`)
    .then(() => {
      res.status(200).send({ message: 'Deletado com sucesso' });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

router.get('/nome', (req, res) => {
  database.query('SELECT nome FROM jogos')
    .then((resultado) => {
      res.status(200).send({ jogos: resultado.rows });
    })
    .catch((erro) => {
      res.status(500).send({ erro: erro });
    });
});

// Consulta
router.get('/consulta-jogo/:jogo', (req, res) => {
  const values = req.params.jogo;
  const query = `SELECT * FROM jogos WHERE nome LIKE '%${values}%'`;

  database.query(query)
    .then((resultado) => {
      res.status(200).send({ jogos: resultado.rows });
    })
    .catch((erro) => {
      res.status(500).send({ erro: erro });
    });
});

router.get('/consulta-id/:idJogo', (req, res) => {
  const values = req.params.idJogo;
  const query = `SELECT * FROM jogos WHERE id = '${values}'`;

  database.query(query)
    .then((resultado) => {
      res.status(200).send({ jogos: resultado.rows });
    })
    .catch((erro) => {
      res.status(500).send({ erro: erro });
    });
});

router.put('/editar-jogo/:idJogo', (req, res) => {
  const id = req.params.idJogo;
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  const lancamento = req.body.lancamento;
  const plataforma = req.body.plataforma;
  const imagemurl = req.body.imagemurl;

  const query = `UPDATE jogos SET 
    nome = '${nome}',
    descricao = '${descricao}',
    lancamento = '${lancamento}',
    plataforma = '${plataforma}',
    imagemurl = '${imagemurl}'
    WHERE id = ${id}`;

  database.query(query)
    .then(() => {
      res.status(200).send({ mensagem: 'Editado com sucesso' });
    })
    .catch((erro) => {
      res.status(500).send({ erro: erro });
    });
});

module.exports = router;
