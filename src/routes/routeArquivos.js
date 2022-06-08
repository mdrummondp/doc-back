const multer = require("multer");
const uploadConfig = require("../config/upload");
const arquivoController = require("../controllers/controllerArquivos");

const uploadArquivo = multer(uploadConfig.upload('./uploads/arquivos/'));

module.exports = router => {
    router.get("/arquivo", arquivoController.getArquivos);
    router.get("/arquivo/:id", arquivoController.getArquivos);
    router.post("/arquivo/cadastrar", uploadArquivo.single('file'), arquivoController.cadArquivos);
    router.post("/arquivo/upload", uploadArquivo.single('file'), arquivoController.upload);
    router.put("/arquivo/atualizar", arquivoController.editArquivos);
    router.delete("/arquivo/deletar/:id", arquivoController.deleteArquivo);
}