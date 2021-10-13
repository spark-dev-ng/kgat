-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 16, 2021 at 06:36 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gwarzo`
--

-- --------------------------------------------------------

--
-- Table structure for table `ex`
--

DROP TABLE IF EXISTS `ex`;
CREATE TABLE IF NOT EXISTS `ex` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `othername` varchar(20) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `pob` varchar(20) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `pword` varchar(20) NOT NULL,
  `age` int(20) NOT NULL,
  `lg` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `religion` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `pname` varchar(20) NOT NULL,
  `occupation` varchar(20) NOT NULL,
  `pnumber1` bigint(20) NOT NULL,
  `pnumber2` bigint(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `section` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ex`
--

INSERT INTO `ex` (`id`, `firstname`, `surname`, `othername`, `gender`, `pob`, `dob`, `pword`, `age`, `lg`, `state`, `religion`, `address`, `pname`, `occupation`, `pnumber1`, `pnumber2`, `email`, `section`) VALUES
(1, 'abdulkadir', '', '', '', '', '', 'mypassword', 0, '', '', '', '', '', '', 0, 0, '', ''),
(2, 'abdul', 'sarki', 'aliyu', 'male', '', '', 'my@pass', 0, '', '', '', '', '', '', 0, 0, '', ''),
(3, 'sady', 'ibr', 'ado', 'female', 'daneji', '19/08/1990', '1234', 0, '', '', '', '', '', '', 0, 0, '', ''),
(4, 'islaha', 'abdul', 'sarki', 'female', 'AKTH', '23/05/2016', 'my@esee', 5, 'KBT', 'Kano', '', '', '', '', 0, 0, '', ''),
(5, 'sopy', 'abdul', 'sarki', 'female', 'AKTH', '29/05/2017', 'my@pass', 4, 'Kumbotso', 'Kano', 'Islam', 'College', 'Abdulkadir', '', 0, 0, '', ''),
(6, 'aisha', 'aliyu', 'sarki', 'female', 'Kabara', '25 Aug, 1986', 'aisha@2020', 36, 'Kumbotso', 'Kano', 'Islam', 'Maikalwa No 256', 'Sarki', 'Farmer', 12345, 6789, '', ''),
(7, 'hadiza', 'aliyu', 'sarki', 'female', 'Kabara', '25 Aug, 1986', 'hdz@g', 36, 'Kumbotso', 'Kano', 'Islam', 'Maikalwa No 256', 'Sarki', 'Farmer', 8033333333, 8044444444, '', ''),
(8, 'musa', 'aliyu', 'sarki', 'female', 'Kabara', '25 Aug, 1979', 'musa@2020', 43, 'Kumbotso', 'Kano', 'Islam', 'Maikalwa No 256', 'Sarki', 'Farmer', 8055555555, 8044444444, '', ''),
(9, 'tijjani', 'aliyu', 'sarki', 'male', 'Kabara', '20/07/1973', 'tj', 48, 'Municipal', 'Kano', 'islam', 'koreke', 'Sarki', 'farmer', 9036539424, 812345678, 'tasneem@g', 'secondary'),
(10, 'tijjani', 'aliyu', 'sarki', 'male', 'Kabara', '20/07/1973', 'tj', 48, 'Municipal', 'Kano', 'islam', 'koreke', 'Sarki', 'farmer', 9036539424, 812345678, 'tasneem@g', 'secondary'),
(11, 'faisal', 'bature', 'ali', 'male', 'Maikalwa', '23/06/1975', '123456', 46, 'Kumbotso', 'Kano', 'Islam', 'Maikalwa No. ', 'Bature', 'Civil servant', 8011112222, 9022221111, 'faisal@gmail.com', 'secondary'),
(12, 'mikail', 'ibrahim', 'abdallah', 'male', 'Maikalwa', '22/08/2000', '123456', 21, 'Kumbotso', 'Kano', 'Islam', 'Maikalwa No 111', 'Ibrahim', 'Civil servant', 806666666, 9077777777, 'mikail@gmail.com', 'secondary'),
(13, 'ishaq', 'ib', 'ak', 'male', 'bagwai', '28/02/2000', '1234', 20, 'kbt', 'kano', 'islam', 'bagwai', 'ib', 'civil ser', 12345678, 87654321, 'i@g', 'secondary'),
(14, 'Abdallah', 'Abubakar', 'Faruk', 'male', 'Maikalwa', '20/01/2017', '123456', 3, 'Kumbotso', 'Kano', 'Islam', 'No 240 Layin kwakwa', 'Abubakar', 'Business Man', 8032866806, 8038866805, 'kilishi@gmail.com', 'nursery');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
