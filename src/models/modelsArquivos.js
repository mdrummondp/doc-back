const dataConn = require("../conexao/conexao");
const querys = require("../conexao/querys");
const multer = require("multer");

const columns = [
    "titulo",
    "descricao",
    "caminho_arquivo",
    "data_criacao"
]

exports.getArquivos = (id = null) => {
    let SQLArquivos = "SELECT * FROM ARQUIVO"

    return new Promise(async (resolve, reject) => {
        const client = await dataConn.connect();
        if (id) {
            SQLArquivos += ` WHERE ID_ARQUIVO = ${id}`
        }
        SQLArquivos += " ORDER BY ID_ARQUIVO ASC"

        await client.query(SQLArquivos, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
}

exports.cadArquivos = (req) => {
    return new Promise(async (resolve, reject) => {

        let qryInsert = querys.insert("ARQUIVO", req.body, columns);

        const client = await dataConn.connect();

        await client.query(qryInsert, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.editArquivos = async (req) => {
    return new Promise(async (resolve, reject) => {

        let qryUpdate = querys.update("ARQUIVO", req.body, columns, ` WHERE ID_ARQUIVO = ${req.body.id_arquivo}`);

        const client = await dataConn.connect();

        await client.query(qryUpdate, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.deleteArquivo = (id) => {
    return new Promise(async (resolve, reject) => {

        let qryDelete = `DELETE FROM ARQUIVO WHERE ID_ARQUIVO = ${id}`;

        const client = await dataConn.connect();

        await client.query(qryDelete, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.validarArquivo = (id) => {
    let qryValidaArquivo = `SELECT * FROM ARQUIVO WHERE ID_ARQUIVO = ${id}`

    return new Promise(async (resolve, reject) => {

        const client = await dataConn.connect();
        await client.query(qryValidaArquivo, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};

exports.validarTitulo = (data) => {
    let qryValidaTitulo = `SELECT titulo FROM ARQUIVO WHERE titulo = '${data}'`

    return new Promise(async (resolve, reject) => {

        const client = await dataConn.connect();
        await client.query(qryValidaTitulo, function (err, resultado) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(resultado.rows);
            client.release();
        });
    });
};