drop database if exists DBImpulsa_IN5CM;
create database DBImpulsa_IN5CM;
use DBImpulsa_IN5CM;

create table Usuario(
	id_usuario int primary key not null auto_increment,
    nombre varchar(50),
    apellido varchar(45),
    username varchar(59),
    correo varchar(100),
    password varchar(50),
    telefono int,
    rol varchar(100),
    estado varchar(10),
    fecha_registro date
);

create table Organizacion(
	id_organizacion int primary key auto_increment not null,
    nombre varchar(100),
    foto longblob,
    tipo varchar(20),
    descripcion text,
    correo varchar(100),
    telefono int,
    sitio_web text,
    pais varchar(50),
    estado varchar(10),
    fecha_registro date,
    id_usuario int,
    foreign key (id_usuario) references Usuario (id_usuario)
);

create table Oportunidad(
	id_oportunidad int primary key not null auto_increment,
    titulo varchar(50),
    tipo varchar(20),
    categoria varchar(20),
    descripcion text,
    requisitos text,
    fecha_publicacion date,
    fecha_limite date,
    modalidad varchar(20),
    ubicacion varchar(100),
    foto longblob,
    estado varchar(10),
    id_organizacion int not null,
    foreign key (id_organizacion) references Organizacion(id_organizacion)
);

create table Perfil(
	id_perfil int primary key not null auto_increment,
    foto longblob,
    institucion varchar(100),
    carrera varchar(100),
    biografia text,
    experiencia_anios int,
    links text,
    rol varchar(10),
    id_usuario int,
    foreign key (id_usuario) references Usuario(id_usuario)
);

create table Documento(
	id_documento int primary key not null auto_increment,
    nombre varchar(50),
    tipo_documento varchar(50),
    archivo longblob,
    fecha_registro date,
    id_perfil int, 
    foreign key (id_perfil) references Perfil(id_perfil)
);

create table Titulo(
	id_titulo int primary key not null auto_increment,
    titulo varchar(50),
    descripcion text,
    id_perfil int,
    foreign key (id_perfil) references Perfil(id_perfil)
);

create table Habilidad(
	id_habilidad int primary key not null auto_increment,
    nombre varchar(50),
    descripcion text,
    nivel varchar(20),
    id_perfil int,
    foreign key (id_perfil) references Perfil(id_perfil)
);

create table Experiencia(
	id_experiencia int primary key not null auto_increment,
    empresa varchar(100),
    cargo varchar(100),
    fecha_inicio date,
    fecha_fin varchar(45),
    descripcion text,
    id_perfil int,
	foreign key (id_perfil) references Perfil(id_perfil)
);

create table Recomendacion(
	id_recomendacion int primary key not null auto_increment,
    porcentaje int,
    fecha_generacion date,
    id_perfil int,
    id_oportunidad int,
	foreign key (id_perfil) references Perfil(id_perfil),
    foreign key (id_oportunidad) references Oportunidad(id_oportunidad)
);

create table Favorito(
	id_favorito int primary key not null auto_increment,
    id_usuario int,
    id_oportunidad int,
    foreign key (id_usuario) references Usuario(id_usuario),
    foreign key (id_oportunidad) references Oportunidad(id_oportunidad)
);

create table Historial(
	id_historial int primary key not null auto_increment,
    pregunta text,
    respuesta text,
    fecha date,
    id_perfil int,
    foreign key (id_perfil) references Perfil(id_perfil)
);

create table Feedback(
	id_feedback int primary key not null auto_increment,
    mensaje text,
    calificacion int,
    fecha date,
    id_usuario int,
    foreign key (id_usuario) references Usuario(id_usuario)
);

create table Notificacion(
	id_notificacion int primary key not null auto_increment,
    titulo varchar(100),
    mensaje text,
    fecha_envio date,
    tipo varchar(50),
    id_perfil int,
    id_organizacion int,
    foreign key (id_perfil) references Perfil(id_perfil),
    foreign key (id_organizacion) references Organizacion(id_organizacion)
);

create table Postulacion(
	id_postulacion int primary key not null auto_increment,
    fecha_post date,
    estado varchar(45),
    observaciones text,
    id_perfil int,
    id_oportunidad int,
    foreign key (id_perfil) references Perfil(id_perfil),
    foreign key (id_oportunidad) references Oportunidad(id_oportunidad)
);


