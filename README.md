# Prueba Técnica - Backend Mid-Level

Este proyecto es una simulación de un terminal POS (datafono) sin hardware físico, construido como parte de una prueba técnica para una posición de desarrollador backend mid-level. Implementa una API RESTful que recibe, valida y almacena transacciones en **dos bases de datos simultáneamente**: MongoDB y PostgreSQL.

---

## Tecnologías utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** (NoSQL)
- **PostgreSQL** (Relacional)
- **Sequelize** y **Mongoose**
- **JWT** para autenticación
- **Swagger** para documentación
- **Jest** para testing

---

## Objetivo de la prueba

Construir un servicio backend que reciba y procese trazas simuladas de un datafono, demostrando dominio técnico en:

- Node.js y Express
- MongoDB y base de datos relacional (PostgreSQL)
- Buenas prácticas de arquitectura, autenticación y documentación

 Este proyecto es solo una **simulación**: no hay conexión real con redes bancarias, dispositivos físicos ni cifrado HSM.

---

## Requisitos funcionales

### 1. Autenticación

- Login simple con usuario y contraseña usando JWT
- Validación de usuarios contra **MongoDB** y **PostgreSQL**
- Rol único: `admin`

### 2. Recepción de trazas

- **POST** `/api/v1/transactions`
- Guarda la misma traza en **MongoDB** y **PostgreSQL**
- Validaciones mínimas:
  - Campos requeridos
  - Tipos de datos correctos

## 3. Consulta de historial

- **GET** `/api/v1/transactions`
- Respuesta paginada
- Filtros disponibles:
  - Rango de fechas (`startDate`, `endDate`)
  - Terminal ID (`terminalId`)
  - Estado de la transacción (`status`)

---

## 🧪 Instalación y ejecución

### 🔁 Clonar el repositorio

```bash
git clone https://github.com/pipefake/prueba_enmedio.git
cd prueba_enmedio


```json
{
  "terminalId": "POS1234",
  "amount": 35000,
  "currency": "COP",
  "cardMasked": "411111******1111",
  "transactionType": "SALE",
  "status": "APPROVED"
}

### Pasos para Arrancar el Proyecto

1. Clonar el repositorio.
2. Instalar las dependencias:

    ```bash
npm install
```

### Para Desarrollo

1. Arrancar el proyecto:

    ```bash
npm run dev
```

2. Abrir el navegador en [http://localhost:3000](http://localhost:3000).

### Para Producción

1. Construir el proyecto:

    ```bash
npm run build
```

2. Iniciar el servidor:

    ```bash
npm run start
```

3. Acceder a la documentación en Swagger en [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

### Para Pruebas

Ejecutar las pruebas con Jest:

```bash
npm run test
```

---

# Docker Setup - Prueba Técnica Backend

Este proyecto está completamente dockerizado y preparado para ejecutarse junto con **MongoDB** y **PostgreSQL** usando Docker Compose.

---

## 📦 Contenedores incluidos

- **backend**: API desarrollada con Node.js, Express y TypeScript
- **postgres**: Base de datos relacional PostgreSQL
- **mongodb**: Base de datos NoSQL MongoDB

---

## ▶️ Ejecución con Docker

### 1. Iniciar todos los servicios

Desde la raíz del proyecto:

```
docker-compose up --build
```

## 🧑🏻 Autor

Juan Felipe Jiménez Salazar
    📎 [GitHub - pipefake](https://github.com/pipefake)