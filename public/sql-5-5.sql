-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2024 at 08:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `players_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_files`
--

CREATE TABLE `academic_files` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academic_files`
--

INSERT INTO `academic_files` (`id`, `user_id`, `sort_order`, `is_active`, `info`, `created_at`) VALUES
('qFvQ7ZnQwDn2C5Kq5z1H', '1234', 1, 1, '{\"type\":\"sat\",\"file_src\":\"SUH7g6buepQDQRFfwbKO.png\",\"description\":\"vfgsdf\"}', '2024-05-05 05:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `additional_sports`
--

CREATE TABLE `additional_sports` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `basic_info`
--

CREATE TABLE `basic_info` (
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(222) NOT NULL,
  `gender` varchar(222) NOT NULL,
  `profile_photo_src` varchar(222) NOT NULL,
  `cover_photo_src` varchar(222) NOT NULL,
  `username` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basic_info`
--

INSERT INTO `basic_info` (`info`, `name`, `gender`, `profile_photo_src`, `cover_photo_src`, `username`) VALUES
('{\"name\":\"abcde\",\"gender\":\"male\",\"date_of_birth\":\"2024-05-16\",\"primary_phone\":\"32423423\",\"primary_email\":\"sdfsd\",\"secondary_phone\":\"32232332\",\"secondary_email\":\"dfsfdsf\",\"personalStatement\":\"sdfsfsdafsa sdafdsadsffffffffffffffffffffff sdf dsfds\",\"youtube\":\"https://youtube.com/dsdfsdf\",\"instagram\":\"dfdsf\",\"facebook\":\"sdfsdf\",\"twitter\":\"sdfdsfsdf\",\"guardian_primary_phone\":\"32323\",\"guardian_name\":\"23233\",\"guardian_primary_email\":\"23233232\",\"guardian_secondary_phone\":\"2323\",\"guardian_secondary_email\":\"2332\",\"guardian_highest_education_level\":\"sdd\"}', 'abcde', 'male', '', '', 'abcde'),
('{ 	\"personal_statement\": \"abc\", 	\"youtube_link\": \"sdfsdf\", 	\"facebook_link\": \"dsfdsf\" }', 'arjun', '', '', '', 'arjun-CxGO1tel'),
('', 'asdfsdf', '', '', '', 'asdfsdf-QWXhmd1o'),
('', 'dsdfsd', '', '', '', 'dsdfsd-A9JcsJ9C');

-- --------------------------------------------------------

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `id` varchar(333) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coaches`
--

INSERT INTO `coaches` (`id`, `user_id`, `sort_order`, `is_active`, `info`, `created_at`) VALUES
('6LrMCI5RJNJnmBqLWuQX', '1234', 1, 1, '{\"coach_name\":\"werew\",\"coach_type\":\"junior\",\"phone\":\"werwer\",\"email\":\"wer\",\"team\":\"wer\",\"interested\":\"yes\"}', 0),
('JR8Qbztd3hc2HuZNVl04', '1234', 1, 1, '{\"coach_name\":\"ret\",\"coach_type\":\"club\",\"phone\":\"wer\",\"email\":\"wer\",\"team\":\"werwer\",\"interested\":\"yes\"}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`id`, `user_id`, `sort_order`, `is_active`, `info`, `created_at`) VALUES
('GGAjW3Wn4md9f7L1a1iU', 'dsdfsd-A9JcsJ9C', 1, 1, '{\"level\":\"intermediate\",\"field_of_study\":\"Electronics Engineering\",\"institution\":\"Thapathali Campus\",\"start_date\":\"2024-05-28\",\"end_date\":\"2024-05-09\",\"extra_info\":\"80% Grade\"}', '2024-05-05 05:21:14'),
('oz1TxrKbeJmNBn6scEuq', '1234', 1, 1, '{\"level\":\"bachelor\",\"field_of_study\":\"vcvgdgf\",\"institution\":\"dfg\",\"start_date\":\"2024-05-30\",\"end_date\":\"2024-05-25\",\"extra_info\":\"sdfsdf\"}', '2024-05-04 08:14:11');

-- --------------------------------------------------------

--
-- Table structure for table `jwts`
--

CREATE TABLE `jwts` (
  `user_id` varchar(1000) NOT NULL,
  `jwt` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `key_stats`
--

CREATE TABLE `key_stats` (
  `username` varchar(200) NOT NULL,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `sport` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `key_stats`
--

INSERT INTO `key_stats` (`username`, `info`, `sport`) VALUES
('abcde', '{\"primary_position\":\"center-back\",\"dominant-foot\":\"switch\",\"2_mile_time\":\"12\",\"height\":\"23\",\"weight\":\"12\",\"beep_level\":10}', 'soccor');

-- --------------------------------------------------------

--
-- Table structure for table `press_or_interviews`
--

CREATE TABLE `press_or_interviews` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` varchar(333) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `user_id`, `sort_order`, `is_active`, `info`, `created_at`) VALUES
('3V42F5lBOFQWk7yucOw1', '1234', 1, 1, '{\"team_name\":\"d\",\"year\":\"werwer\",\"starter\":\"no\",\"jersey_number\":\"wer\",\"schedule_url\":\"werwer\",\"team_award\":\"werwe\",\"individual_award\":\"wer\",\"other_info\":\"wer\",\"team_level\":\"junior-varsity\"}', '2024-05-03 14:30:16'),
('9nRaW9ZieBcwcX5VzJAW', '1234', 1, 0, '{\"team_name\":\"adf\",\"year\":\"asd\",\"starter\":\"yes\",\"jersey_number\":\"dsf\",\"schedule_url\":\"sdf\",\"team_award\":\"sdfdsf\",\"individual_award\":\"sdf\",\"other_info\":\"sdfsf\",\"team_level\":\"sophomore\"}', '2024-05-03 14:26:45');

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `id` varchar(111) NOT NULL,
  `user_id` varchar(111) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`id`, `user_id`, `sort_order`, `is_active`, `info`, `created_at`) VALUES
('9n4b6F1HbEhIwFFZUCgV', '1234', 1, 1, '{\"training_for_sport\":\"sdfdsfkjkl\",\"years_of_training\":\"sdfdsf\",\"training_notes\":\"sdfdsf\"}', '2024-05-03 14:47:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `active_status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `phone`, `password`, `type`, `active_status`) VALUES
('arjun-CxGO1tel', 'arjun123', '', '$2a$10$OPwUVi0ndhIvd98u1ZpuJeWgvAYI1EJMGYYo8tWpo.y5iwXyDCeoC', 'custom', 1),
('asdfsdf-QWXhmd1o', 'rakshya', '', '$2a$10$v8ZanWFcBsrUHfYyI.FuFukFL/yiFSMXHDuu6T2IZjfLBiHmHfG6S', 'custom', 1),
('dsdfsd-A9JcsJ9C', 'arjun', '', '$2a$10$FTI38paaiQAgryf3HII/lOg0eU6o2fTKTw9UAg0QG3PxRkOZIssMu', 'custom', 1);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` varchar(222) NOT NULL,
  `thumbnail_src` varchar(1000) NOT NULL,
  `video_src` varchar(1000) NOT NULL,
  `type` varchar(222) NOT NULL,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `user_id` varchar(255) NOT NULL,
  `is_pinned` int(1) NOT NULL DEFAULT 0,
  `title` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `thumbnail_src`, `video_src`, `type`, `is_active`, `user_id`, `is_pinned`, `title`, `created_at`) VALUES
('8H512rdOXqC7gxpX5Xnn', '', 'https://abc.com', 'youtube', 0, '1234', 0, 'sfsdf', '2024-04-28 14:44:39'),
('gcAPwj0Z51lahrwzLSvx', '', 'https://abc.com.np', 'youtube', 0, '1234', 0, 'sdfdsfdsf', '2024-05-04 08:49:59'),
('N9FCQL1AXj2SYGVcgcMR', '', 'https://www.youtube.com/watch?v=vSW2M-BB1NE&list=RDvSW2M-BB1NE&start_radio=1', 'youtube', 0, '1234', 0, 'Arjun', '2024-05-03 14:25:56'),
('Qmhg8IBxgbPuCvwvMNpx', '', 'https://www.youtube.com/watch?v=pDNV4OnYzp8&list=RDpteDnAUDWpI&index=17', 'youtube', 1, 'dsdfsd-A9JcsJ9C', 0, 'dsfdsf', '2024-05-05 05:26:25'),
('qSYx7cvTTu38Jz8KmKg2', '', 'https://abc.com', 'youtube', 0, '1234', 0, 'asdfdsf', '2024-05-04 08:49:48'),
('yVpI3e8efKrUrf0gXPVs', '', 'https://www.youtube.com/watch?v=K4DyBUG242c', 'youtube', 1, '1234', 0, 'Cartoon On and On Song', '2024-05-04 07:06:23'),
('zlyj2N0So6C6p5BcYZwe', '', 'https://youtube.com/abc', 'youtube', 0, '1234', 0, 'sdfsdfsdf', '2024-05-03 14:47:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_files`
--
ALTER TABLE `academic_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `additional_sports`
--
ALTER TABLE `additional_sports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `basic_info`
--
ALTER TABLE `basic_info`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `key_stats`
--
ALTER TABLE `key_stats`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `press_or_interviews`
--
ALTER TABLE `press_or_interviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
