import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(erro, req, res, next) {

  console.log(erro);

  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta(erro).enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    (erro).enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}