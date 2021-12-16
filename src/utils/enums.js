const Enum_Rol = {
  ADMINISTRADOR: "Administrador",
  ESTUDIANTE: "Estudiante",
  LIDER: "Líder",
};

const Enum_EstadoUsuario = {
  PENDIENTE: "Pendiente",
  AUTORIZADO: "Autorizado",
  NO_AUTORIZADO: "No autorizado",
};

const Enum_EstadoEstudiante = {
  PENDIENTE: "Pendiente",
  AUTORIZADO: "Autorizado",
};

const Enum_EstadoProyecto = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
};

const Enum_TipoObjetivos = {
  GENERAL: "General",
  ESPECIFICO: "Específico",
};
const Enum_FaseProyecto = {
  NULO: "",
  INICIADO: "Iniciado",
  DESARROLLO: "Desarrollo",
  TERMINADO: "Terminado",
};
export {
  Enum_Rol,
  Enum_EstadoUsuario,
  Enum_EstadoProyecto,
  Enum_TipoObjetivos,
  Enum_FaseProyecto,
  Enum_EstadoEstudiante,
};
