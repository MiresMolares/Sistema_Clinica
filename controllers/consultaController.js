import prisma from "../config/prisma.js";

// LISTAR
export const listarConsultas = async (req, res) => {
  try {
    const consultas = await prisma.consulta.findMany({
      include: {
        paciente: true,
        medico: {
          include: {
            especialidade: true
          }
        },
        usuario: true
      }
    });

    res.status(200).json(consultas);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar consultas",
      erro: error.message
    });
  }
};

// BUSCAR POR ID
export const buscarConsultaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        paciente: true,
        medico: {
          include: {
            especialidade: true
          }
        },
        usuario: true
      }
    });

    if (!consulta) {
      return res.status(404).json({
        mensagem: "Consulta não encontrada"
      });
    }

    res.status(200).json(consulta);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar consulta",
      erro: error.message
    });
  }
};

// CRIAR CONSULTA
export const criarConsulta = async (req, res) => {
  try {
    const {
      pacienteId,
      medicoId,
      usuarioId,
      dataHora,
      valor,
      observacao
    } = req.body;

    const consulta = await prisma.consulta.create({
      data: {
        pacienteId,
        medicoId,
        usuarioId,
        dataHora: new Date(dataHora),
        valor,
        observacao
      }
    });

    res.status(201).json({
      mensagem: "Consulta agendada com sucesso",
      consulta
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao agendar consulta",
      erro: error.message
    });
  }
};

// FINALIZAR CONSULTA
export const finalizarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.update({
      where: {
        id: Number(id)
      },
      data: {
        status: "FINALIZADA"
      }
    });

    res.status(200).json({
      mensagem: "Consulta finalizada",
      consulta
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao finalizar consulta",
      erro: error.message
    });
  }
};

// CANCELAR CONSULTA
export const cancelarConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await prisma.consulta.update({
      where: {
        id: Number(id)
      },
      data: {
        status: "CANCELADA"
      }
    });

    res.status(200).json({
      mensagem: "Consulta cancelada",
      consulta
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cancelar consulta",
      erro: error.message
    });
  }
};

// EXCLUIR
export const excluirConsulta = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.consulta.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      mensagem: "Consulta removida com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover consulta",
      erro: error.message
    });
  }
};