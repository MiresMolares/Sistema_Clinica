import prisma from "../config/prisma.js";

// LISTAR
export const listarEspecialidades = async (req, res) => {
  try {
    const especialidades = await prisma.especialidade.findMany();

    res.status(200).json(especialidades);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar especialidades",
      erro: error.message
    });
  }
};

// BUSCAR POR ID
export const buscarEspecialidadePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const especialidade = await prisma.especialidade.findUnique({
      where: { id: Number(id) }
    });

    if (!especialidade) {
      return res.status(404).json({
        mensagem: "Especialidade não encontrada"
      });
    }

    res.status(200).json(especialidade);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar especialidade",
      erro: error.message
    });
  }
};

// CRIAR
export const criarEspecialidade = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    const especialidade = await prisma.especialidade.create({
      data: {
        nome,
        descricao
      }
    });

    res.status(201).json(especialidade);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar especialidade",
      erro: error.message
    });
  }
};

// ATUALIZAR
export const atualizarEspecialidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const especialidade = await prisma.especialidade.update({
      where: { id: Number(id) },
      data: {
        nome,
        descricao
      }
    });

    res.status(200).json(especialidade);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar especialidade",
      erro: error.message
    });
  }
};

// EXCLUIR
export const excluirEspecialidade = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.especialidade.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      mensagem: "Especialidade removida com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover especialidade",
      erro: error.message
    });
  }
};  

