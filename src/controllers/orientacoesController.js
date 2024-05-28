
const pool = require('../config/connectionBD');
const path = require('path');

// Rota para a página cadastrar orientações
const rotaCadastrarOrientacoes = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cadastrar-orientacoes.html'));
};

// Rota para a página listar orientações
const rotaListarOrientacoes = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'listar-orientacoes.html'));
};

// Rota para a página de sucesso
const rotaParaSucesso = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'sucesso-orientacoes.html'));
};






// Criar uma Orientacao
async function cadastrarOrientacao(req, res) {
    const { titulo, descricao } = req.body;
    const image = req.file;

    if (!titulo) {
        return res.status(400).json({ error: 'O campo título é obrigatório.' });
    }

    if (!descricao) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
    }
    
    try {
        const resultado = await pool.query(
            'INSERT INTO orientacoes (titulo, descricao, imagem) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descricao, image ? image.path : null]
        );

        // Redirecionar o usuário de volta para a página do formulário após o sucesso
        return res.status(201).redirect('/sucesso');

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar uma Orientação' });
    }
}







// Listar todos as Orientacoes
async function listarOrientacoes(req, res) {
    try {
        const resultado = await pool.query('SELECT * FROM orientacoes');
        return res.json(resultado.rows);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar Orientações.' });
    }
}






// Listar uma Orientacao específica
async function listarOrientacao(req, res) {
    const { id } = req.params;
    try {
        const resultado = pool.query(
            'SELECT * FROM orientacoes where id = $1'
            [id]
        );
        if (resultado.rows == 0) {

            return res.status(404).json({MENSAGEM: 'Rota de orientação não encontrada..'})    
        }

        return res.status(200).json(resultado.rows[0]);
    
    } catch (error) {

        return res.status(500).json({Erro: 'Orientação não localizada'})
    }
}








// Deletar uma Orientacao
async function deletarOrientacao(req, res) {
    const { id } = req.params;
    try {
        const resultado = await pool.query(
            'DELETE FROM orientacoes where id = $1 RETURNING *',
            [id]
        );

        if (resultado.rowCount === 0 ) {

            return res.status(404).json({mensage: 'Rota de orientação não encontrada. '});

        }

        return res.status(200).json({mensagem: 'Orientação deletada com sucesso. '});

    } catch (error) {

        console.error('Erro ao deletar orientação:', error);
        return res.status(500).json({ erro: 'Erro ao deletar orientação.' });
        
    }
}



module.exports = {
    rotaCadastrarOrientacoes, 
    rotaListarOrientacoes,
    rotaParaSucesso,
    listarOrientacoes,
    listarOrientacao,
    cadastrarOrientacao,
    deletarOrientacao
}
