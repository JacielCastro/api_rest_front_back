const express = require('express');
const multer = require('multer');

const { rotaCadastrarOrientacoes, rotaListarOrientacoes, rotaParaSucesso, cadastrarOrientacao, listarOrientacoes, listarOrientacao, deletarOrientacao } = require('../controllers/orientacoesController');

const router = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



// Rota para páginas HTML
router.get('/cadastrar-orientacoes', rotaCadastrarOrientacoes);
router.get('/listar-orientacoes', rotaListarOrientacoes);
router.get('/sucesso', rotaParaSucesso);

// Rota para submissão do formulário com upload de arquivo
router.post('/submit', upload.single('imagem'), cadastrarOrientacao);

// Rotas para operações CRUD de 'orientacoes'
router.get('/orientacoes/', listarOrientacoes);
router.get('/orientacao/:id', listarOrientacao);
router.delete('/orientacao/:id', deletarOrientacao);

module.exports = router;
