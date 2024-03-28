-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 28, 2024 at 08:56 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `firstname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `age` int NOT NULL,
  `address` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `education_level` enum('ปฐมศึกษา','มัธยม','มหาวิทยาลัย') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `subject` enum('ไทย','สังคม','คณิต','ประวิติศาสตร์','อังกฤษ','ฟิสิกส์','เคมี','ชีวะ','จีน') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `grade` enum('A','B','C','D','F','W') CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `activity` enum('ลูกเสือ','พละ','บำเพ็ญประโยน์') CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstname`, `lastname`, `age`, `address`, `education_level`, `subject`, `grade`, `activity`) VALUES
(1, 'asd', 'asdngg', 12, 'ฟหก', 'มัธยม', 'ไทย', 'A', 'ลูกเสือ'),
(2, 'sdfgsd', 'hdfgh', 16, 'ghfgh', 'ปฐมศึกษา', 'ไทย', 'A', 'ลูกเสือ'),
(3, 'asdasd', 'asda', 12, 'asd', 'ปฐมศึกษา', 'ไทย', 'A', 'ลูกเสือ'),
(4, 'asdasd', 'asda', 12, 'asd', 'ปฐมศึกษา', 'ไทย', 'A', 'ลูกเสือ'),
(5, 'asdasd', 'asd', 12, 'asdasd', 'มหาวิทยาลัย', 'ไทย', 'A', 'ลูกเสือ'),
(6, 'asd', 'asdas', 12, 'asd', 'ปฐมศึกษา', 'ไทย', 'A', 'ลูกเสือ'),
(7, 'ASD', 'asd', 23, 'sdfg', 'ปฐมศึกษา', 'ไทย', 'A', 'ลูกเสือ'),
(8, 'asd', 'asdngg', 12, 'ฟหก', 'มัธยม', 'ไทย', 'A', 'ลูกเสือ'),
(9, 'asd', 'asdngg', 12, 'ฟหก', 'มัธยม', 'ไทย', 'A', 'ลูกเสือ'),
(10, 'asd', 'asdngg', 12, 'ฟหก', 'มัธยม', 'ไทย', 'A', 'ลูกเสือ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
