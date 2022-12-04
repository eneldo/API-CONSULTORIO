/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     27/10/2022 7:34:25 p. m.                     */
/*==============================================================*/


/*==============================================================*/
/* Table: agenda_citas                                          */
/*==============================================================*/
create table agenda_citas
(
   id_agenda_cita       bigint not null auto_increment  comment '',
   id_medico            bigint not null  comment '',
   id_especialidad      bigint not null  comment '',
   fecha_cita           date not null  comment '',
   hora_cita            time not null  comment '',
   numero_consultorio   int not null  comment '',
   estado_cita          int(2) not null  comment '1 - disponible
             2 - no didponible
             3 - cancelada',
   primary key (id_agenda_cita)
);

/*==============================================================*/
/* Table: especialidades                                        */
/*==============================================================*/
create table especialidades
(
   id_especialidad      bigint not null auto_increment  comment '',
   nombre_especialidad  varchar(220) not null  comment '',
   primary key (id_especialidad)
);

/*==============================================================*/
/* Table: formula_medica                                        */
/*==============================================================*/
create table formula_medica
(
   id_formula_medica    bigint not null  comment '',
   fecha_formula        date not null  comment '',
   id_historia_clinica  bigint not null  comment '',
   id_medicamento       bigint not null  comment '',
   cantidad_medicamento float not null  comment '',
   primary key (id_formula_medica)
);

/*==============================================================*/
/* Table: historia_clinica                                      */
/*==============================================================*/
create table historia_clinica
(
   id_historia_clinica  bigint not null auto_increment  comment '',
   id_paciente          bigint not null  comment '',
   fecha_registro       date not null  comment '',
   hora_registro        time not null  comment '',
   temperatura          float not null  comment '',
   presion_arterial     float not null  comment '',
   peso                 float not null  comment '',
   edad                 int not null  comment '',
   estatura             float not null  comment '',
   diagnostico          text not null  comment '',
   primary key (id_historia_clinica)
);

/*==============================================================*/
/* Table: medicamentos                                          */
/*==============================================================*/
create table medicamentos
(
   id_medicamento       bigint not null  comment '',
   codigo_medicamento   varchar(30) not null  comment '',
   nombre_medicamento   varchar(250) not null  comment '',
   tipo_medicamento     int(2) not null  comment '1 - inyeccion
             2 - pastilla
             3 - jarabe
             4 - suspension',
   primary key (id_medicamento)
);

/*==============================================================*/
/* Table: reserva_citas                                         */
/*==============================================================*/
create table reserva_citas
(
   id_reserva_cita      bigint not null auto_increment  comment '',
   id_agenda_cita       bigint not null  comment '',
   id_usuario           bigint not null  comment '',
   primary key (id_reserva_cita)
);

/*==============================================================*/
/* Table: roles                                                 */
/*==============================================================*/
create table roles
(
   id_rol               bigint not null auto_increment  comment '',
   nombre_rol           varchar(200) not null  comment '',
   estado_rol           int(2) not null  comment '1 - activo
             2 - inactivo',
   primary key (id_rol)
);

/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/
create table usuarios
(
   id_usuario           bigint not null auto_increment  comment '',
   id_rol               bigint not null  comment '',
   nombres_usuario      varchar(100) not null  comment '',
   apellidos_usuario    varchar(100) not null  comment '',
   celular_usuario      bigint not null  comment '',
   correo_usuario       varchar(200) not null  comment '',
   direccion_usuario    text not null  comment '',
   usuario_acceso       varchar(150) not null  comment '',
   clave_acceso         varchar(150) not null  comment '',
   estado_usuario       int(2) not null  comment '1 - activo
             2 - inactivo',
   primary key (id_usuario)
);

alter table agenda_citas add constraint fk_agenda_c_reference_usuarios foreign key (id_medico)
      references usuarios (id_usuario) on delete cascade on update cascade;

alter table agenda_citas add constraint fk_agenda_c_reference_especial foreign key (id_especialidad)
      references especialidades (id_especialidad) on delete cascade on update cascade;

alter table formula_medica add constraint fk_formula__reference_historia foreign key (id_historia_clinica)
      references historia_clinica (id_historia_clinica) on delete cascade on update cascade;

alter table formula_medica add constraint fk_formula__reference_medicame foreign key (id_medicamento)
      references medicamentos (id_medicamento) on delete cascade on update cascade;

alter table historia_clinica add constraint fk_historia_reference_usuarios foreign key (id_paciente)
      references usuarios (id_usuario) on delete cascade on update cascade;

alter table reserva_citas add constraint fk_reserva__reference_agenda_c foreign key (id_agenda_cita)
      references agenda_citas (id_agenda_cita) on delete cascade on update cascade;

alter table reserva_citas add constraint fk_reserva__reference_usuarios foreign key (id_usuario)
      references usuarios (id_usuario) on delete cascade on update cascade;

alter table usuarios add constraint fk_usuarios_reference_roles foreign key (id_rol)
      references roles (id_rol) on delete cascade on update cascade;

