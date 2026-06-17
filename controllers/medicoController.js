import prisma from "../config/prisma.js";

// LISTAR
export const listarMedicos = async (req, res) => {
  try {
    const medicos = await prisma.medico.findMany({
      include: {
        especialidade: true
      }
    });

    res.status(200).json(medicos);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar médicos",
      erro: error.message
    });
  }
};

// BUSCAR POR ID
export const buscarMedicoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const medico = await prisma.medico.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        especialidade: true
      }
    });

    if (!medico) {
      return res.status(404).json({
        mensagem: "Médico não encontrado"
      });
    }

    res.status(200).json(medico);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar médico",
      erro: error.message
    });
  }
};

// CRIAR
export const criarMedico = async (req, res) => {
  try {
    const {
      nome,
      crm,
      telefone,
      email,
      especialidadeId
    } = req.body;

    const medicoExistente = await prisma.medico.findUnique({
      where: {
        crm
      }
    });

    if (medicoExistente) {
      return res.status(400).json({
        mensagem: "CRM já cadastrado"
      });
    }

    const medico = await prisma.medico.create({
      data: {
        nome,
        crm,
        telefone,
        email,
        especialidadeId
      }
    });

    res.status(201).json(medico);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar médico",
      erro: error.message
    });
  }
};

// ATUALIZAR
export const atualizarMedico = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      crm,
      telefone,
      email,
      especialidadeId
    } = req.body;

    const medico = await prisma.medico.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        crm,
        telefone,
        email,
        especialidadeId
      }
    });

    res.status(200).json(medico);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar médico",
      erro: error.message
    });
  }
};

// EXCLUIR
export const excluirMedico = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.medico.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      mensagem: "Médico removido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover médico",
      erro: error.message
    });
  }
};