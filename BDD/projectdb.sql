-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2024 at 01:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `Api_assignments`
--

CREATE TABLE `Api_assignments` (
  `id` int(11) NOT NULL,
  `surveillant` varchar(100) NOT NULL,
  `exam_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Api_assignments`
--

INSERT INTO `Api_assignments` (`id`, `surveillant`, `exam_id`) VALUES
(30, 'Kalloubi', 55),
(31, 'HANNANI', 56),
(32, 'Kalloubi', 57),
(33, 'Kalloubi', 58),
(34, 'HANNANI', 59),
(35, 'SALMAM', 60),
(36, 'HANNANI', 61),
(49, 'BAIDADA', 76),
(50, 'HANNANI', 77),
(51, 'Kalloubi', 78),
(52, 'BAIDADA', 79),
(53, 'HANNANI', 80);

-- --------------------------------------------------------

--
-- Table structure for table `Api_disponibilite`
--

CREATE TABLE `Api_disponibilite` (
  `id_dispo` int(11) NOT NULL,
  `day_of_week` varchar(10) NOT NULL,
  `hour` varchar(25) NOT NULL,
  `id_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Api_disponibilite`
--

INSERT INTO `Api_disponibilite` (`id_dispo`, `day_of_week`, `hour`, `id_user_id`) VALUES
(89, 'Mardi', '11:00 à 12:30', 1),
(90, 'Mardi', '13:30 à 15:00', 1),
(91, 'Mercredi', '9:00 à 10:30', 1),
(92, 'Mercredi', '11:00 à 12:30', 1),
(93, 'Mardi', '9:00 à 10:30', 25),
(94, 'Mardi', '11:00 à 12:30', 25),
(95, 'Mercredi', '9:00 à 10:30', 25),
(96, 'Mercredi', '11:00 à 12:30', 25),
(97, 'Mercredi', '13:30 à 15:00', 25),
(98, 'Vendredi', '9:00 à 10:30', 25),
(99, 'Vendredi', '11:00 à 12:30', 25),
(100, 'Vendredi', '9:00 à 10:30', 26),
(101, 'Vendredi', '11:00 à 12:30', 26),
(102, 'Vendredi', '13:30 à 15:00', 26),
(104, 'Mardi', '13:30 à 15:00', 26),
(105, 'Mardi', '15:30 à 17:00', 26),
(106, 'Samedi', '9:00 à 10:30', 26),
(107, 'Samedi', '11:00 à 12:30', 26),
(112, 'Jeudi', '9:00 à 10:30', 27),
(113, 'Jeudi', '11:00 à 12:30', 27),
(114, 'Jeudi', '13:30 à 15:00', 27),
(115, 'Jeudi', '15:30 à 17:00', 27),
(116, 'Samedi', '9:00 à 10:30', 27),
(117, 'Samedi', '11:00 à 12:30', 27),
(118, 'Samedi', '13:30 à 15:00', 27),
(119, 'Samedi', '15:30 à 17:00', 27),
(120, 'Mardi', '9:00 à 10:30', 28),
(121, 'Mardi', '11:00 à 12:30', 28),
(122, 'Mardi', '13:30 à 15:00', 28),
(123, 'Mardi', '15:30 à 17:00', 28),
(124, 'Vendredi', '9:00 à 10:30', 28),
(125, 'Vendredi', '11:00 à 12:30', 28),
(126, 'Vendredi', '15:30 à 17:00', 28),
(127, 'Vendredi', '13:30 à 15:00', 28),
(128, 'Mardi', '15:30 à 17:00', 28),
(129, 'Vendredi', '9:00 à 10:30', 28),
(130, 'Mercredi', '11:00 à 12:30', 1),
(131, 'Mercredi', '13:30 à 15:00', 1),
(132, 'Vendredi', '9:00 à 10:30', 1),
(133, 'Lundi', '11:00 à 12:30', 28),
(134, 'Lundi', '13:30 à 15:00', 28),
(135, 'Jeudi', '11:00 à 12:30', 28),
(136, 'Jeudi', '13:30 à 15:00', 28),
(137, 'Lundi', '11:00 à 12:30', 28),
(138, 'Lundi', '13:30 à 15:00', 28),
(139, 'Mardi', '9:00 à 10:30', 28),
(140, 'Mercredi', '9:00 à 10:30', 28),
(141, 'Jeudi', '11:00 à 12:30', 28),
(142, 'Jeudi', '13:30 à 15:00', 28),
(143, 'Mardi', '11:00 à 12:30', 34),
(144, 'Mardi', '13:30 à 15:00', 34);

-- --------------------------------------------------------

--
-- Table structure for table `Api_exam`
--

CREATE TABLE `Api_exam` (
  `id_exam` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `day_of_week` varchar(10) NOT NULL,
  `hour` varchar(25) DEFAULT NULL,
  `salle` varchar(10) DEFAULT NULL,
  `filiere` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Api_exam`
--

INSERT INTO `Api_exam` (`id_exam`, `subject`, `day_of_week`, `hour`, `salle`, `filiere`) VALUES
(55, 'Automatismes', 'Lundi', '9:00 à 10:30', 'C2', 'GEE-1'),
(56, 'Machines-Hydrauliques', 'Mardi', '9:00 à 10:30', 'Amphi', 'GEE-1'),
(57, 'Asservissement', 'Mardi', '11:00 à 12:30', 'C2', 'GEE-1'),
(58, 'RO', 'Mercredi', '9:00 à 10:30', 'C2', 'GEE-1'),
(59, 'Optimisation', 'Mercredi', '13:30 à 15:00', 'Amphi', 'GEE-1'),
(60, 'POO', 'Jeudi', '11:00 à 12:30', 'C2', 'GEE-1'),
(61, 'Reseaux LAN/WLAN', 'Vendredi', '9:00 à 10:30', 'C2', 'GEE-1'),
(76, 'Dev-mobile', 'Lundi', '11:00 à 12:30', 'C2', '2ITE-1'),
(77, 'Robotiques', 'Mardi', '11:00 à 12:30', 'C2', '2ITE-1'),
(78, 'POO', 'Mardi', '13:30 à 15:00', 'C1', '2ITE-1'),
(79, 'RO', 'Jeudi', '11:00 à 12:30', 'C1', '2ITE-1'),
(80, 'GL', 'Vendredi', '11:00 à 12:30', 'C2', '2ITE-1');

-- --------------------------------------------------------

--
-- Table structure for table `Api_user`
--

CREATE TABLE `Api_user` (
  `id_user` int(11) NOT NULL,
  `user_code` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `role` varchar(20) NOT NULL,
  `filiere` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Api_user`
--

INSERT INTO `Api_user` (`id_user`, `user_code`, `password`, `nom`, `prenom`, `email`, `telephone`, `role`, `filiere`) VALUES
(1, 'A100', '10/05/2002', 'Kalloubi', 'Fahd', 'kalloubifahd@gmail.com', '065599446677', 'Surveillant', NULL),
(2, '1', '10/05/2002', 'Admin', '', 'ensajexams@gmail.com', '0655593397', 'Admin', NULL),
(23, 'R120037000', 'EL ASSOULIR1200370006664', 'EL ASSOULI', 'Yassine', 'rd.fth2000@gmail.com', '‪0639976734‬', 'Etudiant', 'GEE-1'),
(25, 'A200', 'HANNANIA2003278', 'HANNANI', 'Asmaa', 'asmaahannani@gmail.com', '0655593388', 'Surveillant', 'none'),
(26, 'A300', 'AQQALA3002437', 'AQQAL', 'Abdelhak', 'aqqalabdelhak@gmail.com', '0655593377', 'Surveillant', 'none'),
(27, 'A400', 'SALMAMA4006185', 'SALMAM', 'Fatimezzahra', 'fatimezzahrasalmam@gmail.com', '0655594480', 'Surveillant', 'none'),
(28, 'A500', 'BAIDADAA5003988', 'BAIDADA', 'Chafik', 'chafikbaidada@gmail.com', '0655593391', 'Surveillant', 'none'),
(33, 'R120037398', 'FATTOUHIR1200373983202', 'FATTOUHI', 'Radwa', 'fattouhiradwa@gmail.com', '0655593397', 'Etudiant', '2ITE-1'),
(34, 'A600', 'ERRATTAHIA6001746', 'ERRATTAHI', 'Rahhal', 'testpfa8@gmail.com', '0655593390', 'Surveillant', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add user', 7, 'add_user'),
(26, 'Can change user', 7, 'change_user'),
(27, 'Can delete user', 7, 'delete_user'),
(28, 'Can view user', 7, 'view_user'),
(29, 'Can add disponibilite', 8, 'add_disponibilite'),
(30, 'Can change disponibilite', 8, 'change_disponibilite'),
(31, 'Can delete disponibilite', 8, 'delete_disponibilite'),
(32, 'Can view disponibilite', 8, 'view_disponibilite'),
(33, 'Can add exam', 9, 'add_exam'),
(34, 'Can change exam', 9, 'change_exam'),
(35, 'Can delete exam', 9, 'delete_exam'),
(36, 'Can view exam', 9, 'view_exam'),
(37, 'Can add assignments', 10, 'add_assignments'),
(38, 'Can change assignments', 10, 'change_assignments'),
(39, 'Can delete assignments', 10, 'delete_assignments'),
(40, 'Can view assignments', 10, 'view_assignments');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(10, 'Api', 'assignments'),
(8, 'Api', 'disponibilite'),
(9, 'Api', 'exam'),
(7, 'Api', 'user'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-05-07 17:22:24.549220'),
(2, 'auth', '0001_initial', '2024-05-07 17:22:24.753296'),
(3, 'admin', '0001_initial', '2024-05-07 17:22:24.802467'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-05-07 17:22:24.807733'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-05-07 17:22:24.812835'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-05-07 17:22:24.840532'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-05-07 17:22:24.858239'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-05-07 17:22:24.868509'),
(9, 'auth', '0004_alter_user_username_opts', '2024-05-07 17:22:24.872247'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-05-07 17:22:24.883422'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-05-07 17:22:24.883976'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-05-07 17:22:24.887516'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-05-07 17:22:24.896989'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-05-07 17:22:24.905626'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-05-07 17:22:24.917992'),
(16, 'auth', '0011_update_proxy_permissions', '2024-05-07 17:22:24.922366'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-05-07 17:22:24.932834'),
(18, 'sessions', '0001_initial', '2024-05-07 17:22:24.950663'),
(19, 'Api', '0001_initial', '2024-05-07 17:29:22.706636'),
(20, 'Api', '0002_remove_timeslot_hour_alter_disponibilite_day_of_week_and_more', '2024-05-07 17:29:22.734244'),
(21, 'Api', '0003_exam_delete_timeslot_and_more', '2024-05-07 17:29:22.750129'),
(22, 'Api', '0004_user_filiere_assignments', '2024-05-12 10:01:35.191083');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Api_assignments`
--
ALTER TABLE `Api_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Api_assignments_exam_id_67ceef01_fk_Api_exam_id_exam` (`exam_id`);

--
-- Indexes for table `Api_disponibilite`
--
ALTER TABLE `Api_disponibilite`
  ADD PRIMARY KEY (`id_dispo`),
  ADD KEY `Api_disponibilite_id_user_id_0e911577_fk_Api_user_id_user` (`id_user_id`);

--
-- Indexes for table `Api_exam`
--
ALTER TABLE `Api_exam`
  ADD PRIMARY KEY (`id_exam`);

--
-- Indexes for table `Api_user`
--
ALTER TABLE `Api_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `Api_user_user_code_9b813374_uniq` (`user_code`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Api_assignments`
--
ALTER TABLE `Api_assignments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `Api_disponibilite`
--
ALTER TABLE `Api_disponibilite`
  MODIFY `id_dispo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `Api_exam`
--
ALTER TABLE `Api_exam`
  MODIFY `id_exam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `Api_user`
--
ALTER TABLE `Api_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Api_assignments`
--
ALTER TABLE `Api_assignments`
  ADD CONSTRAINT `Api_assignments_exam_id_67ceef01_fk_Api_exam_id_exam` FOREIGN KEY (`exam_id`) REFERENCES `Api_exam` (`id_exam`);

--
-- Constraints for table `Api_disponibilite`
--
ALTER TABLE `Api_disponibilite`
  ADD CONSTRAINT `Api_disponibilite_id_user_id_0e911577_fk_Api_user_id_user` FOREIGN KEY (`id_user_id`) REFERENCES `Api_user` (`id_user`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
