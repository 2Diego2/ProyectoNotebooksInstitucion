-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2024 a las 21:14:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registro_notebooks`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalacion_programa`
--

CREATE TABLE `instalacion_programa` (
  `ID_Instalacion` int(30) NOT NULL,
  `ID_Notebook` int(30) NOT NULL,
  `ID_Programa` int(30) NOT NULL,
  `Observaciones` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notebook`
--

CREATE TABLE `notebook` (
  `ID_Notebook` int(30) NOT NULL,
  `CodigoBarra` int(30) NOT NULL,
  `Estado` varchar(100) NOT NULL,
  `Observacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notebook`
--

INSERT INTO `notebook` (`ID_Notebook`, `CodigoBarra`, `Estado`, `Observacion`) VALUES
(1, 1, 'Disponible', ''),
(2, 1, 'Disponible', ''),
(3, 2, 'Disponible', ''),
(4, 3, 'Disponible', ''),
(5, 4, 'Disponible', ''),
(6, 5, 'Disponible', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `ID_Persona` int(30) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `Apellido` varchar(30) DEFAULT NULL,
  `Tipo` varchar(30) DEFAULT NULL,
  `DNI` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `programa`
--

CREATE TABLE `programa` (
  `ID_Programa` int(30) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Version` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `uso_notebook`
--

CREATE TABLE `uso_notebook` (
  `ID_USO` int(30) NOT NULL,
  `ID_Notebook` int(30) NOT NULL,
  `ID_Persona` int(30) NOT NULL,
  `Fecha_Desde` datetime(6) NOT NULL,
  `Fecha_Hasta` datetime(6) NOT NULL,
  `Observaciones` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `instalacion_programa`
--
ALTER TABLE `instalacion_programa`
  ADD PRIMARY KEY (`ID_Instalacion`,`ID_Notebook`,`ID_Programa`),
  ADD KEY `ID_Notebook` (`ID_Notebook`,`ID_Programa`),
  ADD KEY `ID_Programa` (`ID_Programa`);

--
-- Indices de la tabla `notebook`
--
ALTER TABLE `notebook`
  ADD PRIMARY KEY (`ID_Notebook`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`ID_Persona`);

--
-- Indices de la tabla `programa`
--
ALTER TABLE `programa`
  ADD PRIMARY KEY (`ID_Programa`);

--
-- Indices de la tabla `uso_notebook`
--
ALTER TABLE `uso_notebook`
  ADD PRIMARY KEY (`ID_USO`,`ID_Notebook`,`ID_Persona`),
  ADD KEY `ID_Notebook` (`ID_Notebook`,`ID_Persona`),
  ADD KEY `ID_Persona` (`ID_Persona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notebook`
--
ALTER TABLE `notebook`
  MODIFY `ID_Notebook` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `ID_Persona` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `instalacion_programa`
--
ALTER TABLE `instalacion_programa`
  ADD CONSTRAINT `instalacion_programa_ibfk_1` FOREIGN KEY (`ID_Programa`) REFERENCES `programa` (`ID_Programa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instalacion_programa_ibfk_2` FOREIGN KEY (`ID_Notebook`) REFERENCES `notebook` (`ID_Notebook`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `uso_notebook`
--
ALTER TABLE `uso_notebook`
  ADD CONSTRAINT `uso_notebook_ibfk_1` FOREIGN KEY (`ID_Notebook`) REFERENCES `notebook` (`ID_Notebook`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `uso_notebook_ibfk_2` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
