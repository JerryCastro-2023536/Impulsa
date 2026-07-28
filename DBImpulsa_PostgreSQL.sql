-- DROP DATABASE IF EXISTS DBImpulsa_IN5CM;
-- CREATE DATABASE DBImpulsa_IN5CM;

CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(45),
    username VARCHAR(59),
    correo VARCHAR(100),
    password VARCHAR(50),
    telefono INTEGER,
    rol VARCHAR(100),
    estado VARCHAR(50), 
    fecha_registro DATE
);

CREATE TABLE Organizacion (
    id_organizacion SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    foto BYTEA,
    tipo VARCHAR(20),
    descripcion TEXT,
    correo VARCHAR(100),
    telefono INTEGER,
    sitio_web TEXT,
    pais VARCHAR(50),
    estado VARCHAR(50), 
    fecha_registro DATE,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario) ON DELETE CASCADE
);

CREATE TABLE Oportunidad (
    id_oportunidad SERIAL PRIMARY KEY,
    titulo VARCHAR(50),
    tipo VARCHAR(20),
    categoria VARCHAR(20),
    descripcion TEXT,
    requisitos TEXT,
    fecha_publicacion DATE,
    fecha_limite DATE,
    modalidad VARCHAR(20),
    ubicacion VARCHAR(100),
    foto BYTEA,
    estado VARCHAR(50), 
    id_organizacion INTEGER NOT NULL,
    FOREIGN KEY (id_organizacion) REFERENCES Organizacion(id_organizacion) ON DELETE CASCADE
);

CREATE TABLE Perfil (
    id_perfil SERIAL PRIMARY KEY,
    foto BYTEA,
    institucion VARCHAR(100),
    carrera VARCHAR(100),
    biografia TEXT,
    experiencia_anios INTEGER,
    links TEXT,
    rol VARCHAR(50), 
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Documento (
    id_documento SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    tipo_documento VARCHAR(50),
    archivo BYTEA,
    fecha_registro DATE,
    id_perfil INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE Titulo (
    id_titulo SERIAL PRIMARY KEY,
    titulo VARCHAR(50),
    descripcion TEXT,
    id_perfil INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE Habilidad (
    id_habilidad SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    nivel VARCHAR(20),
    id_perfil INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE Experiencia (
    id_experiencia SERIAL PRIMARY KEY,
    empresa VARCHAR(100),
    cargo VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin VARCHAR(45), 
    descripcion TEXT,
    id_perfil INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE Recomendacion (
    id_recomendacion SERIAL PRIMARY KEY,
    porcentaje INTEGER,
    fecha_generacion DATE,
    id_perfil INTEGER,
    id_oportunidad INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE,
    FOREIGN KEY (id_oportunidad) REFERENCES Oportunidad(id_oportunidad) ON DELETE CASCADE
);

CREATE TABLE Favorito (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    id_oportunidad INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_oportunidad) REFERENCES Oportunidad(id_oportunidad) ON DELETE CASCADE
);

CREATE TABLE Historial (
    id_historial SERIAL PRIMARY KEY,
    pregunta TEXT,
    respuesta TEXT,
    fecha DATE,
    id_perfil INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE
);

CREATE TABLE Feedback (
    id_feedback SERIAL PRIMARY KEY,
    mensaje TEXT,
    calificacion INTEGER,
    fecha DATE,
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Notificacion (
    id_notificacion SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    mensaje TEXT,
    fecha_envio DATE,
    tipo VARCHAR(50),
    id_perfil INTEGER,
    id_organizacion INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE,
    FOREIGN KEY (id_organizacion) REFERENCES Organizacion(id_organizacion) ON DELETE CASCADE
);

CREATE TABLE Postulacion (
    id_postulacion SERIAL PRIMARY KEY,
    fecha_post DATE,
    estado VARCHAR(45),
    observaciones TEXT,
    id_perfil INTEGER,
    id_oportunidad INTEGER,
    FOREIGN KEY (id_perfil) REFERENCES Perfil(id_perfil) ON DELETE CASCADE,
    FOREIGN KEY (id_oportunidad) REFERENCES Oportunidad(id_oportunidad) ON DELETE CASCADE
);
