const modelArquivos = require('../models/modelsArquivos');
const multer = require("multer");

exports.getArquivos = (req, res) => {
    const { id } = req.params;
    modelArquivos.getArquivos(id).then(
        sucess => {

            res.status(200).json({ arquivos: sucess });
        },
        error => res.status(500).json(error)
    );
}

exports.cadArquivos = (req, res) => {
    try {
        if (!req.body.hasOwnProperty("titulo")) throw { status: 404, message: "Título do arquivo não informado." };
        if (!req.body.hasOwnProperty("descricao")) throw { status: 404, message: "Descrição do arquivo não informada." };
        if (!req.body.hasOwnProperty("caminho_arquivo")) throw { status: 404, message: "Caminho do arquivo não informado." };
        if (!req.body.hasOwnProperty("data_criacao")) throw { status: 404, message: "Data de criação não informada." };

        const { titulo } = req.body;

        modelArquivos.validarTitulo(titulo).then((arq) => {
            if (arq.length > 0) {
                res.status(408).send("Já existe um arquivo com esse título.");
            } else {
                modelArquivos.cadArquivos(req).then(dados => {
                    res.status(200).send("Arquivo cadastrado com sucesso.");
                });
            };
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    };
}

exports.editArquivos = (req, res) => {
    try {
        if (!req.body.hasOwnProperty("id_arquivo"))
            throw {
                status: 404,
                message: "ID do Arquivo não informado"
            };

        const { id_arquivo, titulo } = req.body;
        modelArquivos.validarArquivo(id_arquivo).then((dados) => {
            if (dados.length === 0) {
                res.status(400).send("Arquivo não encontrado.");
            } else {
                modelArquivos.validarTitulo(titulo).then((arq) => {
                    if (arq.length > 0) {
                        res.status(408).send("Já existe um arquivo com esse título.");
                    } else {
                        if (!req.body.hasOwnProperty("titulo")) throw { status: 404, message: "Título do arquivo não informado." };
                        if (!req.body.hasOwnProperty("descricao")) throw { status: 404, message: "Descrição do arquivo não informada." };
                        if (!req.body.hasOwnProperty("caminho_arquivo")) throw { status: 404, message: "Caminho do arquivo não informado." };
                        if (!req.body.hasOwnProperty("data_criacao")) throw { status: 404, message: "Data de criação não informada." };
                        modelArquivos.editArquivos(req).then(dados => {
                            res.status(200).send("Arquivo atualizado com sucesso!");
                        });
                    }
                });
            };
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    };
}

exports.deleteArquivo = (req, res) => {
    try {
        const { id } = req.params;
        modelArquivos.validarArquivo(id).then((dados) => {

            if (dados.length === 0) {
                res.status(400).send("Arquivo não encontrado.");
            } else {
                modelArquivos.deleteArquivo(id).then((dados) => {
                    res.status(200).send("Arquivo excluído com sucesso!");
                }).catch(() => res.status(427).send("Falha ao excluir o arquivo!"));
            };
        });
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
    }
}

exports.upload = (req, res) => {
    const { filename, path } = req.file;
    console.log(req.file)
    try {
        res.status(200).send(`Arquivo ${filename} enviado com sucesso.`)    
    } catch (error) {
        res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");        
    }
}