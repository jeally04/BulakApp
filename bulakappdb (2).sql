-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 01:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bulakappdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `detection_history`
--

CREATE TABLE `detection_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `flower_name` varchar(255) DEFAULT NULL,
  `confidence` float DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `detected_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `detection_history`
--

INSERT INTO `detection_history` (`id`, `user_id`, `flower_name`, `confidence`, `image_path`, `detected_at`) VALUES
(1, NULL, 'Anthurium', 0.848496, NULL, '2025-02-25 18:51:28'),
(2, NULL, 'Anthurium', 0.420105, NULL, '2025-02-25 18:51:28'),
(3, NULL, 'White Anthurium', 0.543059, NULL, '2025-02-25 18:55:04'),
(4, NULL, 'Magenta Chrysanthemum', 0.450305, NULL, '2025-02-25 18:55:46'),
(5, NULL, 'Anthurium', 0.892891, NULL, '2025-02-25 18:56:55'),
(6, NULL, 'Anthurium', 0.763079, NULL, '2025-02-25 18:59:16'),
(7, NULL, 'Anthurium', 0.762277, NULL, '2025-02-25 19:03:34'),
(8, 1, 'Anthurium', 0.848496, NULL, '2025-02-25 19:24:09'),
(9, 1, 'Anthurium', 0.420105, NULL, '2025-02-25 19:24:09'),
(10, 1, 'Desert Rose', 0.905237, NULL, '2025-02-25 19:50:45'),
(11, 1, 'White Anthurium', 0.876422, NULL, '2025-02-25 19:59:22'),
(12, 1, 'White Anthurium', 0.863384, NULL, '2025-02-25 20:26:02'),
(13, 1, 'Desert Rose', 0.907319, NULL, '2025-02-25 20:35:05'),
(14, 1, 'Sunflower', 0.469324, NULL, '2025-02-25 20:51:39'),
(15, 1, 'White Rose', 0.681513, NULL, '2025-02-25 21:13:40'),
(16, 1, 'Anthurium', 0.899749, NULL, '2025-03-03 02:07:59'),
(17, 1, 'White Anthurium', 0.587336, NULL, '2025-03-03 03:15:02'),
(18, 6, 'White Anthurium', 0.543059, NULL, '2025-03-03 04:56:26'),
(19, 6, 'Desert Rose', 0.559804, NULL, '2025-03-03 04:57:48'),
(20, 1, 'Desert Rose', 0.825715, NULL, '2025-03-05 05:57:21'),
(23, 1, 'Desert Rose', 0.568904, NULL, '2025-03-05 06:52:40'),
(24, 6, 'White Rose', 0.656775, NULL, '2025-03-06 06:38:29'),
(25, 6, 'White Rose', 0.720856, NULL, '2025-03-06 06:40:03'),
(26, 6, 'Desert Rose', 0.857156, NULL, '2025-03-06 06:40:24'),
(27, 6, 'Desert Rose', 0.742399, NULL, '2025-03-06 06:40:24'),
(28, 1, 'Sunflower', 0.936732, NULL, '2025-03-06 07:20:59'),
(29, 1, 'Red Rose', 0.744841, NULL, '2025-03-06 07:21:07'),
(30, 1, 'Red Rose', 0.616725, NULL, '2025-03-06 07:21:22'),
(31, 1, 'Desert Rose', 0.83474, NULL, '2025-03-06 07:21:32'),
(32, 1, 'Desert Rose', 0.776656, NULL, '2025-03-06 07:21:32'),
(33, 1, 'Desert Rose', 0.701967, NULL, '2025-03-06 07:21:32'),
(34, 1, 'Desert Rose', 0.384707, NULL, '2025-03-06 07:21:32'),
(35, 1, 'Sunflower', 0.872925, NULL, '2025-03-06 07:21:54'),
(36, 1, 'Yellow Rose', 0.886765, NULL, '2025-03-06 07:22:16'),
(37, 1, 'Red Rose', 0.683504, NULL, '2025-03-06 07:22:16'),
(38, 1, 'Red Rose', 0.270086, NULL, '2025-03-06 07:22:16'),
(39, 1, 'Yellow Rose', 0.974258, NULL, '2025-03-06 07:22:25'),
(40, 1, 'Yellow Rose', 0.374544, NULL, '2025-03-06 07:22:25'),
(41, 1, 'Sunflower', 0.29459, NULL, '2025-03-06 07:22:33'),
(42, 1, 'Yellow Rose', 0.508582, NULL, '2025-03-06 07:22:42'),
(43, 1, 'White Rose', 0.261082, NULL, '2025-03-06 07:22:51'),
(44, 1, 'White Rose', 0.261082, NULL, '2025-03-06 07:23:01'),
(45, 1, 'Desert Rose', 0.705463, NULL, '2025-03-06 07:23:18'),
(46, 1, 'Desert Rose', 0.65688, NULL, '2025-03-06 07:23:18'),
(47, 1, 'Desert Rose', 0.645971, NULL, '2025-03-06 07:23:18'),
(48, 1, 'Red Rose', 0.690948, NULL, '2025-03-06 07:23:31'),
(49, 1, 'White Rose', 0.578254, NULL, '2025-03-06 07:23:31'),
(50, 1, 'Yellow Rose', 0.946012, NULL, '2025-03-06 07:23:57'),
(51, 1, 'White Rose', 0.841857, NULL, '2025-03-06 07:24:25'),
(52, 1, 'Red Rose', 0.461421, NULL, '2025-03-06 07:24:34'),
(53, 1, 'White Rose', 0.803655, NULL, '2025-03-06 07:25:04'),
(54, 1, 'Yellow Rose', 0.900509, NULL, '2025-03-06 08:03:12'),
(55, 1, 'Yellow Rose', 0.747436, NULL, '2025-03-06 08:23:08'),
(56, 1, 'Yellow Rose', 0.963681, NULL, '2025-03-06 08:52:17'),
(57, 1, 'Yellow Rose', 0.779339, NULL, '2025-03-06 08:52:46'),
(58, 1, 'White Rose', 0.413596, NULL, '2025-03-06 08:52:58'),
(59, 1, 'Yellow Rose', 0.827529, NULL, '2025-03-06 08:53:18'),
(60, 1, 'Yellow Rose', 0.32502, NULL, '2025-03-06 08:53:18'),
(61, 1, 'Red Rose', 0.914803, NULL, '2025-03-06 08:53:29'),
(62, 1, 'Yellow Rose', 0.90207, NULL, '2025-03-06 08:56:29'),
(63, 1, 'White Rose', 0.557973, NULL, '2025-03-06 08:56:39'),
(64, 1, 'Yellow Rose', 0.845045, NULL, '2025-03-11 05:32:35'),
(65, 1, 'Yellow Rose', 0.6592, NULL, '2025-03-11 05:32:52'),
(66, 1, 'Yellow Rose', 0.572482, NULL, '2025-03-11 05:32:52'),
(67, 1, 'Sunflower', 0.327506, NULL, '2025-03-11 05:32:52'),
(68, 1, 'Yellow Rose', 0.422141, NULL, '2025-03-11 05:33:03'),
(69, 1, 'Pink Rose', 0.541125, NULL, '2025-03-11 05:33:35'),
(70, 1, 'Red Rose', 0.818877, NULL, '2025-03-11 05:33:44'),
(71, 1, 'Desert Rose', 0.965817, NULL, '2025-03-11 05:33:58'),
(72, 1, 'White Rose', 0.712614, NULL, '2025-03-11 05:34:08'),
(73, 1, 'White Rose', 0.311296, NULL, '2025-03-11 05:34:51'),
(74, 1, 'Red Rose', 0.914803, NULL, '2025-03-11 05:35:07'),
(75, 1, 'Desert Rose', 0.557375, NULL, '2025-03-11 05:35:19'),
(76, 1, 'Desert Rose', 0.532825, NULL, '2025-03-11 05:35:19'),
(77, 1, 'Yellow Rose', 0.853804, NULL, '2025-03-11 05:35:32'),
(78, 1, 'Yellow Rose', 0.789001, NULL, '2025-03-11 05:35:32'),
(79, 1, 'Yellow Rose', 0.526457, NULL, '2025-03-11 05:35:32'),
(80, 1, 'Yellow Rose', 0.90207, NULL, '2025-03-11 05:35:52'),
(81, 1, 'Yellow Rose', 0.97869, NULL, '2025-03-11 05:36:34'),
(82, 1, 'Yellow Rose', 0.927129, NULL, '2025-03-11 05:36:34'),
(83, 1, 'Yellow Rose', 0.856394, NULL, '2025-03-11 05:36:34'),
(84, 1, 'Red Rose', 0.529787, NULL, '2025-03-11 05:36:45'),
(85, 1, 'Red Rose', 0.461421, NULL, '2025-03-11 05:36:57'),
(86, 1, 'Red Rose', 0.820314, NULL, '2025-03-11 05:37:17'),
(87, 1, 'Yellow Rose', 0.900509, NULL, '2025-03-13 17:23:34'),
(88, 1, 'Yellow Rose', 0.853158, NULL, '2025-03-13 17:23:40'),
(89, 1, 'Yellow Rose', 0.469367, NULL, '2025-03-13 17:23:45'),
(90, 1, 'Yellow Rose', 0.747436, NULL, '2025-03-13 17:23:50'),
(91, 1, 'Yellow Rose', 0.938649, NULL, '2025-03-13 17:23:54'),
(92, 1, 'Yellow Rose', 0.888009, NULL, '2025-03-13 17:23:59'),
(93, 1, 'Red Rose', 0.689672, NULL, '2025-03-13 17:23:59'),
(94, 1, 'Red Rose', 0.265601, NULL, '2025-03-13 17:23:59'),
(95, 1, 'Yellow Rose', 0.93968, NULL, '2025-03-13 17:24:07'),
(96, 1, 'Yellow Rose', 0.895784, NULL, '2025-03-13 17:24:12'),
(97, 1, 'Yellow Rose', 0.844745, NULL, '2025-03-13 17:24:19'),
(98, 1, 'Yellow Rose', 0.965784, NULL, '2025-03-13 17:24:26'),
(99, 1, 'Sunflower', 0.468759, NULL, '2025-03-13 17:24:42'),
(100, 1, 'Sunflower', 0.41304, NULL, '2025-03-13 17:24:42'),
(101, 1, 'Sunflower', 0.389942, NULL, '2025-03-13 17:24:42'),
(102, 1, 'Red Rose', 0.894986, NULL, '2025-03-13 17:24:59'),
(103, 1, 'Sunflower', 0.845979, NULL, '2025-03-13 17:30:04'),
(104, 1, 'Sunflower', 0.921672, NULL, '2025-03-13 17:30:09'),
(105, 1, 'Sunflower', 0.644229, NULL, '2025-03-13 17:30:17'),
(106, 1, 'Red Rose', 0.807638, NULL, '2025-03-13 17:30:27'),
(107, 1, 'Red Rose', 0.258756, NULL, '2025-03-13 17:31:04'),
(108, 1, 'White Rose', 0.266206, NULL, '2025-03-13 17:31:35'),
(109, 1, 'Desert Rose', 0.946571, NULL, '2025-03-13 17:31:45'),
(110, 1, 'Desert Rose', 0.96215, NULL, '2025-03-14 08:05:10'),
(111, 1, 'Desert Rose', 0.645833, NULL, '2025-03-14 08:05:10'),
(112, 1, 'Sunflower', 0.936732, NULL, '2025-03-14 08:05:21'),
(113, 1, 'Red Rose', 0.818877, NULL, '2025-03-14 08:05:27'),
(114, 1, 'Desert Rose', 0.950055, NULL, '2025-03-14 08:05:36'),
(115, 1, 'Desert Rose', 0.93556, NULL, '2025-03-14 08:05:36'),
(116, 1, 'Yellow Rose', 0.952517, NULL, '2025-03-14 08:07:13'),
(117, 1, 'Desert Rose', 0.925301, NULL, '2025-03-14 08:07:35'),
(118, 1, 'Desert Rose', 0.838666, NULL, '2025-03-14 08:07:43'),
(119, 1, 'Desert Rose', 0.688353, NULL, '2025-03-14 08:07:43'),
(120, 1, 'Sunflower', 0.838232, NULL, '2025-03-14 08:22:17'),
(121, 1, 'Sunflower', 0.701362, NULL, '2025-03-14 08:22:17'),
(122, 1, 'Sunflower', 0.88496, NULL, '2025-03-14 09:17:34'),
(123, 1, 'Sunflower', 0.859301, NULL, '2025-03-14 09:17:34'),
(124, 1, 'Red Rose', 0.818877, NULL, '2025-03-14 09:17:45'),
(125, 1, 'Red Rose', 0.961412, NULL, '2025-03-14 12:12:22'),
(126, 1, 'Red Rose', 0.92998, NULL, '2025-03-14 12:12:22'),
(127, 1, 'Magenta Chrysanthemum', 0.922894, NULL, '2025-03-14 12:12:22'),
(128, 1, 'Yellow Chrysanthemum', 0.912819, NULL, '2025-03-14 12:12:22'),
(129, 1, 'Yellow Chrysanthemum', 0.81735, NULL, '2025-03-14 12:12:22'),
(130, 1, 'Pink Rose', 0.78079, NULL, '2025-03-14 12:12:22'),
(131, 1, 'Yellow Chrysanthemum', 0.661996, NULL, '2025-03-14 12:12:22'),
(132, 1, 'Magenta Chrysanthemum', 0.608695, NULL, '2025-03-14 12:12:22'),
(133, 1, 'White Rose', 0.607479, NULL, '2025-03-14 12:12:22'),
(134, 1, 'Yellow Chrysanthemum', 0.279302, NULL, '2025-03-14 12:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flower_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `flower_id`) VALUES
(4, 1, 4),
(6, 1, 1),
(7, 1, 15),
(8, 1, 20),
(9, 1, 22),
(10, 1, 2),
(11, 6, 18),
(12, 6, 1),
(14, 6, 14),
(15, 6, 5),
(16, 6, 12),
(17, 6, 15),
(18, 6, 20),
(19, 1, 12),
(21, 1, 13),
(22, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `flowers`
--

CREATE TABLE `flowers` (
  `id` int(11) NOT NULL,
  `flower_name` varchar(100) NOT NULL,
  `flower_type_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `lifespan` varchar(100) DEFAULT NULL,
  `flower_size` varchar(100) DEFAULT NULL,
  `scientific_name` varchar(255) DEFAULT NULL,
  `family` varchar(255) DEFAULT NULL,
  `conditions` text DEFAULT NULL,
  `garden_use` text DEFAULT NULL,
  `symbolism` text DEFAULT NULL,
  `interesting_facts` text DEFAULT NULL,
  `name_story` text DEFAULT NULL,
  `other_names` varchar(500) DEFAULT NULL,
  `bloom_time` varchar(300) DEFAULT NULL,
  `flower_color` varchar(500) DEFAULT NULL,
  `uses_on_events` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `flowers`
--

INSERT INTO `flowers` (`id`, `flower_name`, `flower_type_id`, `image_url`, `description`, `lifespan`, `flower_size`, `scientific_name`, `family`, `conditions`, `garden_use`, `symbolism`, `interesting_facts`, `name_story`, `other_names`, `bloom_time`, `flower_color`, `uses_on_events`) VALUES
(1, 'Red Rose', 1, '\\src\\Assets\\redrose.jpg', 'The Red Rose is one of the most iconic flowers, symbolizing love and beauty. With its rich, velvety petals and intoxicating fragrance, it has captured the hearts of many throughout history. Known for its vibrant color, this flower thrives in well-drained soil and full sun, typically living for 3-5 years. Whether used in romantic gestures or as a garden centerpiece, the Red Rose remains a timeless favorite.', '3-5 years', 'Medium', 'Rosa chinensis', 'Rosaceae', 'Full sun, well-drained soil', 'Garden borders, landscaping', 'Love, beauty', 'Roses have been cultivated for thousands of years.', 'Named after the Latin word for dew, \"rosa.\"', 'Romance Rose, Passion Flower', 'Late Spring to Summer', 'Red', 'Weddings, Anniversaries, Romantic Occasions'),
(2, 'Yellow Rose', 1, '\\src\\Assets\\yellow rose.jpg', 'The Yellow Rose is a vibrant flower representing joy, friendship, and new beginnings. With its bright hue and delightful fragrance, this rose is often associated with platonic love and celebration. Originating from the Middle East, it thrives in moist soil and full sun, typically living for 1-2 years. The Yellow Rose is a popular choice for gifting on occasions such as graduations and anniversaries, symbolizing a positive connection and cheerful spirit, making it a beloved choice among floral en', '1-2 years', 'Medium', 'Rosa lutea', 'Rosaceae', 'Full sun, moist soil', 'Hedges, ornamental', 'Joy, friendship', 'The yellow rose is native to the Middle East.', 'Its name comes from the Latin word for rose.', 'Friendship Rose', 'Spring to Summer', 'Yellow', 'Weddings, Anniversaries, Birthdays'),
(3, 'Dutch Tulip', 2, '\\src\\Assets\\dutch tulips.jpg', 'The Dutch Tulip is a celebrated spring-blooming flower known for its bold colors and distinctive cup shape. Symbolizing love and fame, it flourishes in cool climates with well-drained soil, and typically lives for 2-3 years. The Tulip holds a significant place in history, particularly during the 17th century’s “Tulip Mania,” a period of speculative frenzy that drove prices for tulip bulbs to extraordinary heights. Today, the Tulip remains a favorite in gardens and floral arrangements, captivatin', '2-3 years', 'Small', 'Tulipa gesneriana', 'Liliaceae', 'Cool climates, well-drained soil', 'Garden borders, ornamental', 'Love, fame', 'Tulips were once worth more than gold during \"Tulip Mania\".', 'Named after Persian word \"dulband\" meaning turban.', 'Tulipa', 'Spring', 'Varies (Red, Yellow, Purple, etc.)', 'Weddings, Celebrations, Easter'),
(4, 'White Daisy', 3, '\\src\\Assets\\white daisy.jpg', 'The White Daisy is a classic flower that embodies purity and innocence. Known for its striking white petals surrounding a sunny yellow center, this annual flower flourishes in moist soil and full sun. Typically small in size, it closes its petals at night, emphasizing its connection to nature. The name Daisy comes from \"days eye\", as it opens to greet the morning light, making it a charming addition to any garden.', 'Annual', 'Small', 'Bellis perennis', 'Asteraceae', 'Full sun, moist soil', 'Ornamental gardens, meadows', 'Purity, innocence', 'Daisies close their petals at night.', 'The name daisy comes from \"day’s eye\" because it opens in the morning.', 'Bellis Perennis', 'Spring to Autumn', 'White', 'Weddings, Funerals, Memorials'),
(5, 'Sunflower', 4, '\\src\\Assets\\Sunflower.jpg', 'The Sunflower is a large, bright flower that symbolizes adoration and loyalty. Known for its striking yellow petals and tall stature, this annual flower thrives in dry soil and full sun. It has a lifespan of one season, typically reaching impressive heights. Sunflowers are unique in their ability to track the sun’s movement throughout the day, a phenomenon known as heliotropism, adding to their charm and appeal in gardens and fields alike.', 'Annual', 'Large', 'Helianthus annuus', 'Asteraceae', 'Full sun, dry soil', 'Gardens, farms', 'Adoration, loyalty', 'Sunflowers track the sun’s movement.', 'Named for their sun-like appearance.', 'Helianthus', 'Summer', 'Yellow', 'Weddings, Birthdays, Celebrations'),
(6, 'Lavender', 5, '\\src\\Assets\\lavender.jpg', 'Lavender is a fragrant perennial flower that symbolizes calm and serenity. Its lovely purple spikes bloom in dry soil and full sun, making it a favorite for herbal gardens and ornamental uses. Small in size, Lavender has a lifespan of several years and is renowned for its calming scent, often used in aromatherapy and relaxation. The name Lavender comes from the Latin \"lavare,\" meaning to wash, highlighting its historical use in cleansing rituals.', 'Perennial', 'Small', 'Lavandula angustifolia', 'Lamiaceae', 'Dry soil, full sun', 'Herbal gardens, ornamental', 'Calm, serenity', 'Lavender oil is used for relaxation.', 'Named from Latin \"lavare\" meaning to wash.', 'Lavandula', 'Summer', 'Purple', 'Lavender is often used in weddings and as a gift for celebrations.'),
(7, 'Cherry Blossom', 6, '\\src\\Assets\\cherry blossom.jpg', 'Cherry Blossoms are short-lived but incredibly beautiful flowers that symbolize beauty and fragility. These small pink blooms thrive in cool climates with moist soil and are often found in ornamental gardens and parks. Each year, the Cherry Blossom tree produces stunning displays of flowers for a brief period, making them a celebrated event in many cultures. Known as \"sakura\" in Japan, they represent the fleeting nature of life and the beauty of transience.', 'Short-lived', 'Small', 'Prunus serrulata', 'Rosaceae', 'Cool climates, moist soil', 'Ornamental gardens, parks', 'Beauty, fragility', 'Cherry blossoms bloom for a short period each year.', 'Known as \"sakura\" in Japan, a symbol of the fleeting nature of life.', 'Sakura', 'Spring', 'Pink', 'Weddings, Spring Celebrations, New Year\'s Day'),
(8, 'Lotus', 7, '\\src\\Assets\\lotus.jpg', 'The Lotus is a perennial flower that symbolizes purity and enlightenment. Known for its large blossoms that rise above murky waters, the Lotus thrives in still water and full sun, often seen in water gardens and ponds. This flower holds a sacred status in many Asian cultures, representing resilience and the ability to thrive despite adversity. It is admired for its beauty and its profound symbolism in spiritual traditions.', 'Perennial', 'Large', 'Nelumbo nucifera', 'Nelumbonaceae', 'Still water, full sun', 'Water gardens, ponds', 'Purity, enlightenment', 'The lotus grows in muddy water but remains unstained.', 'Sacred in many Asian cultures.', 'Sacred Lotus', 'Summer', 'White, Pink, Blue', 'Weddings, Spiritual Ceremonies, Festivals'),
(9, 'Orchid', 8, '\\src\\Assets\\orchids.jpg', 'The Orchid is an exotic flower renowned for its intricate petal structures, symbolizing love and beauty. Belonging to the vast Orchidaceae family, these small flowers prefer indirect light and high humidity, making them popular for indoor pots and tropical gardens. With over 25,000 species, Orchids are known for their diversity and stunning appearances. The name Orchid comes from the Greek word \"orchis,\" meaning testicle, a reference to the shape of the tubers of some species.', 'Varies', 'Small', 'Orchidaceae family', 'Orchidaceae', 'Indirect light, high humidity', 'Indoor pots, tropical gardens', 'Love, beauty', 'There are over 25,000 species of orchids.', 'The name comes from the Greek word \"orchis\" meaning testicle.', 'Moth Orchid', 'Varies by Species', 'Varies (White, Purple, Pink, etc.)', 'Weddings, Anniversaries, Funerals'),
(10, 'Bluebell', 9, '/src/Assets/bluebell.jpg', 'The Bluebell is a perennial flower that symbolizes humility and gratitude. These small blooms thrive in moist, well-drained soil, often carpeting woodland floors during spring. Known for their delicate bell shape, Bluebells are beloved for their vibrant blue hue. The name Bluebell reflects the flower’s distinct shape, creating enchanting displays that captivate nature lovers and gardeners alike, especially in naturalized settings.', 'Perennial', 'Small', 'Hyacinthoides non-scripta', 'Asparagaceae', 'Moist, well-drained soil', 'Woodlands, gardens', 'Humility, gratitude', 'Bluebells form carpets in spring woodlands.', 'The name comes from the flower’s bell shape.', 'Campanula', 'Spring to Early Summer', 'Blue', 'Spring Events, Anniversaries, Birthdays'),
(11, 'Peony', 10, '/src/Assets/peony.jpg', 'The Peony is a large, fluffy flower that symbolizes romance and prosperity. Typically thriving in full sun and rich soil, these perennials are often used for ornamental purposes and as cut flowers. With a lifespan of several years, Peonies bloom in stunning colors, making them a traditional flower for Chinese weddings. Their name is derived from Paeon, the Greek god of healing, showcasing their historical significance in various cultures.', 'Perennial', 'Large', 'Paeonia lactiflora', 'Paeoniaceae', 'Full sun, rich soil', 'Cut flowers, ornamental', 'Romance, prosperity', 'Peonies are a traditional flower for Chinese weddings.', 'Named after Paeon, the Greek god of healing.', 'Paeonia', 'Late Spring to Early Summer', 'Varies (Pink, White, Red, etc.)', 'Weddings, Anniversaries, Memorials'),
(12, 'Pink Rose', 1, '\\src\\Assets\\pink roses2.jpg', 'A soft and elegant flower symbolizing admiration and grace.', '2-3 weeks', 'Medium to large', 'Rosa gallica', 'Rosaceae', 'Prefers well-drained soil, moderate sunlight, and regular watering.', 'Used in gardens for ornamental purposes, as well as in bouquets for various occasions.', 'Admiration, gratitude, elegance, love, and affection.', 'Pink roses are known for their delicate fragrance and appearance. They are also a popular choice for gifting on Valentine\\\'s Day and anniversaries.', 'The pink rose has been cultivated for centuries, and in ancient times it symbolized the beauty and warmth of love.', 'Blush Rose, Sweetheart Rose', 'Spring, Summer, and Early Fall', 'Pink', 'Weddings: Represents admiration and appreciation for the bride, often used in wedding decorations. \r\n\r\nAnniversaries: A symbol of enduring love and affection, often gifted to partners. \r\n\r\nSpecial Occasions: Conveys gratitude and admiration, used in various celebrations.'),
(13, 'White Rose', 1, '\\src\\Assets\\white rose.jpg', 'A pure and elegant flower symbolizing innocence, purity, and new beginnings. Often associated with remembrance and love.', '2-3 years', 'Medium', 'Rosa alba', 'Rosaceae', 'Prefers well-drained soil, moderate sunlight, and regular watering.', 'Used in gardens for ornamental purposes, and also in bouquets for weddings and memorials.', 'Purity, innocence, remembrance, and new beginnings.', 'White roses are often used in religious ceremonies, weddings, and to symbolize remembrance for lost loved ones.', 'The white rose has been a symbol of purity and innocence for centuries, and in medieval times, it was associated with Virgin Mary.', 'Shining Rose, Bridal Rose', 'Spring, Summer, and Early Fall', 'White', 'Weddings\r\nFunerals/Memorials\r\nAnniversaries'),
(14, 'Desert Rose', 1, '\\src\\Assets\\desert rose.jpeg', 'A stunning and resilient flower known for its ability to thrive in harsh desert conditions. Symbolizes strength, beauty, and endurance.', '2-3 years', 'Small to Medium', 'Adenium obesum', 'Apocynaceae', 'Prefers well-drained soil, full sunlight, and minimal watering. Tolerates dry conditions.', 'Used in gardens and as a decorative plant in arid regions, as well as in bonsai culture.', 'Strength, beauty, endurance, and resilience.', 'Desert roses are well known for their unique appearance and ability to survive in the most arid environments. They are often used in bonsai cultivation.', 'The Desert Rose gets its name from the stunning rosette shape and the way it thrives in desert climates, with blooms that resemble roses.', 'Adenium, Impala Lily', 'Spring to Summer', 'Red, Pink, White', 'Weddings\r\nBonsai Cultivation\r\nGifts'),
(15, 'Gumamela', 11, '\\src\\Assets\\gumamela.jpg', 'A colorful and tropical flower, known for its large, bright petals and symbolic meaning of beauty, love, and femininity. It is also used in traditional medicine.', '1-2 years', 'Medium', 'Hibiscus rosa-sinensis', 'Malvaceae', 'Prefers well-drained soil, full sunlight, and moderate watering.', 'Commonly used in tropical gardens for its vibrant colors, and in traditional medicine for its various health benefits.', 'Beauty, love, femininity, and delicate strength.', 'Gumamela flowers are not only admired for their beauty but also used in various traditional medicines. The leaves are used to treat fevers and respiratory issues.', 'The name \"Gumamela\" is widely used in the Philippines, while Hibiscus is the more global term. It is often featured in cultural festivals in tropical regions.', 'Hibiscus, China Rose', 'Spring, Summer, and Fall', 'Red, Pink, Yellow, White, Purple', 'Weddings: Symbolizes beauty and love, often used in wedding decorations, especially in tropical-themed weddings. \r\n\r\nGifts: A traditional gift symbolizing feminine beauty and affection. \r\n\r\nMedicine: Used in traditional medicine to treat various ailments like fever and cough.'),
(16, 'Anthurium', 12, '\\src\\Assets\\anthurium.jpg', 'Anthurium, commonly known as the Flamingo Flower or Laceleaf, is a striking tropical plant that features glossy, heart-shaped spathes and long-lasting blooms. The flower comes in various colors, including red, pink, white, and green. It is a popular ornamental plant known for its beauty and its symbolism of enduring love and luxury.', 'Perennial', 'Medium to Large', 'Anthurium andraeanum', 'Araceae', 'Prefers indirect sunlight and well-drained, moist soil. Needs moderate watering and thrives in warm, humid environments.', 'Commonly used as an ornamental plant, especially in tropical regions and as a houseplant for its elegant appearance and air-purifying qualities.', 'Symbolizes enduring love, luxury, beauty, and hospitality.', 'Anthurium is famous for its long-lasting blooms and striking spathes, which are often confused with the flowers themselves. The plant can bloom throughout the year, making it a favorite for both indoor and outdoor gardens.', 'The name \"Anthurium\" comes from the Greek words \"anthos\" meaning flower and \"oura\" meaning tail, referring to the spadix. It is also called the Flamingo Flower due to its vivid red spathes that resemble a flamingo’s plumage.', 'Flamingo Flower, Laceleaf, Pigtail Plant', 'Year-round', 'Red, Pink, White, Green, Purple', 'Weddings: Often used in wedding bouquets and arrangements to symbolize enduring love. Housewarmings: A popular gift for new homes, symbolizing hospitality and prosperity. Anniversaries: Given to mark long-lasting relationships and love.'),
(18, 'Chrysanthemum', 7, '\\src\\Assets\\Chrysanthemum111.jpg', 'Chrysanthemum, commonly known as mums, is a flowering plant of the genus Chrysanthemum in the family Asteraceae. They are native to Asia and northeastern Europe. Chrysanthemums are widely grown for their attractive flowers, which come in various shapes, sizes, and colors.', '1 to 2 years', 'Small to large', 'Chrysanthemum morifolium', 'Asteraceae', 'Prefers full sunlight, well-drained soil, and moderate watering.', 'Used in gardens as ornamental plants, often for borders, hedges, and flower beds.', 'Symbolizes optimism, joy, and longevity in many cultures. In some Asian countries, it is associated with autumn and is also a symbol of rebirth and life.', 'Chrysanthemums are one of the most widely cultivated flowers in the world, with hundreds of different varieties. Some types are also used for medicinal purposes, such as in traditional Chinese medicine.', 'The name \"Chrysanthemum\" comes from the Greek words \"chrysos\" meaning gold and \"anthemon\" meaning flower, originally referring to yellow chrysanthemums.', 'Mum, Kiku, Florist’s Chrysanthemum', 'Blooms in late summer to fall, typically from August to November.', 'Wide range, including white, yellow, red, purple, pink, and orange.', 'Used in weddings, funerals, and other ceremonial events, depending on the culture and region.'),
(19, 'Yellow Chrysanthemum', 1, '\\src\\Assets\\yellowchrysanthemum.jpg', 'Yellow Chrysanthemums are a popular variety of Chrysanthemum known for their bright, vibrant yellow flowers. These flowers are often associated with positive energy, cheerfulness, and happiness, making them a favorite in floral arrangements for celebrations.', '1 to 2 years', 'Medium to large', 'Chrysanthemum morifolium (Yellow variety)', 'Asteraceae', 'Requires full sunlight, well-drained soil, and moderate watering. Prefers cooler climates but can adapt to various conditions.', 'Ideal for use in gardens as ornamental plants, pots, or cut flowers for floral arrangements.', 'Symbolizes joy, happiness, and friendship. In some cultures, it is a symbol of longevity and is used in celebrations, especially in the autumn season.', 'Yellow Chrysanthemums are often used in traditional Chinese medicine for their purported health benefits, such as aiding in reducing inflammation and boosting immunity.', 'The yellow variety of Chrysanthemums has become especially significant in various cultures, often used in festivals like the Chinese Chrysanthemum Festival.', 'Golden Mum, Yellow Mum, Autumn Mum', 'Typically blooms in late summer to fall, often peaking in October to November.', 'Bright yellow, golden, and sometimes pale yellow hues.', 'Commonly used in weddings, birthdays, and other festive events to symbolize joy, as well as in funerals as a sign of respect and remembrance.'),
(20, 'Magenta Chrysanthemum', 1, '\\src\\Assets\\magentachrysanthemum.jpg', 'Magenta Chrysanthemums are a striking variety of Chrysanthemum with deep, vibrant magenta petals. This flower is celebrated for its beauty and vivid color, often used in floral displays for its bold, eye-catching appearance. It represents a sense of love, affection, and admiration.', '1 to 2 years', 'Medium to large', 'Chrysanthemum morifolium (Magenta variety)', 'Asteraceae', 'Prefers full sunlight and well-drained, slightly acidic soil. Requires moderate watering, and thrives in cooler climates but is adaptable to various conditions.', 'Often used in ornamental gardens, pots, and as cut flowers for decorative purposes in various floral arrangements.', 'Symbolizes love, admiration, and deep affection. It is often given to express gratitude and appreciation. In some cultures, magenta chrysanthemums are also seen as a symbol of strength and resilience.', 'Magenta Chrysanthemums are known for their striking color, often standing out in mixed arrangements, and are considered a favorite in many cultural festivals and events.', 'The magenta variety is often associated with the colors of autumn and is a popular flower during the fall season in many parts of the world.', 'Magenta Mum, Purple Mum, Fall Mum', 'Blooms in late summer to fall, usually from September to November.', 'Magenta, deep pink, and sometimes purple hues.', 'Widely used in weddings, anniversaries, and as a token of affection or appreciation. They can also be used in remembrance ceremonies and fall celebrations.'),
(21, 'White Anthurium', 1, '\\src\\Assets\\whiteanthurium.jpg', 'White Anthuriums are elegant, tropical flowers known for their glossy, heart-shaped spathes and long-lasting beauty. The white variety is particularly prized for its clean, pristine appearance, symbolizing purity and peace. They are often used in high-end floral arrangements and home decor.', 'Perennial', 'Medium to large', 'Anthurium andreanum', 'Araceae', 'Prefers bright, indirect light and well-drained soil. Thrives in humid environments with regular watering but does not tolerate standing water.', 'Ideal for use in indoor decorative arrangements, as houseplants, or in luxury floral displays for events.', 'Symbolizes purity, peace, and innocence. In some cultures, it is also seen as a symbol of hospitality and happiness, making it a popular gift.', 'White Anthuriums are one of the longest-lasting cut flowers, often staying fresh for weeks. They are also known for their air-purifying qualities.', 'The name \"Anthurium\" comes from the Greek words \"anthos\" meaning flower and \"oura\" meaning tail, referring to its tail-like spadix. The white variety is sometimes referred to as the \"Flamingo Flower.\"', 'Flamingo Flower, Laceleaf, Pigtail Flower', 'Blooms throughout the year under optimal conditions, typically with a peak during spring and summer.', 'White spathes with a yellowish spadix in the center.', 'Weddings\r\nCorporate Events\r\nUpscale decorations\r\nSympathy Arrangements'),
(22, 'Yellow Alder', 1, '\\src\\Assets\\yellowalder.jpg', 'Yellow Alder (Turnera ulmifolia) is a small, flowering shrub native to tropical and subtropical regions. It features bright yellow flowers that bloom year-round, with a distinctive five-petaled shape. It is known for its ability to attract pollinators and is often used in gardens for its vibrant color and ornamental appeal.', 'Perennial', 'Small to medium', 'Turnera ulmifolia', 'Passifloraceae', 'Prefers full sunlight and well-drained soil. Tolerates drought but benefits from regular watering in hot climates.', 'Used in gardens and landscapes for ornamental purposes, especially in tropical and subtropical regions.', 'Symbolizes beauty, cheerfulness, and strength. In some cultures, yellow alder is considered a symbol of positive energy and is used to bring joy and light to spaces.', 'The flowers of Yellow Alder are not only admired for their beauty but are also known to have medicinal uses in some traditional practices, such as for treating skin irritations and minor wounds.', 'The name \"Alder\" is likely derived from its resemblance to the leaves of the alder tree, though the plant is not related to actual alder species. It is also called the \"Wild Alder\" in some regions.', 'Turnera, Wild Alder, Yellow Alder Bush', 'Blooms year-round, with peak blooming in the warmer months (spring to summer).', 'Bright yellow with a contrasting dark center and sometimes orange tinges at the base of the petals.', 'Used in tropical gardens, ornamental landscapes, and in traditional medicine. Occasionally used in floral arrangements, particularly for their cheerful color.');

-- --------------------------------------------------------

--
-- Table structure for table `flower_types`
--

CREATE TABLE `flower_types` (
  `id` int(11) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  `imgs` varchar(255) NOT NULL,
  `description` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `flower_types`
--

INSERT INTO `flower_types` (`id`, `type_name`, `imgs`, `description`) VALUES
(1, 'Roses', '/src/Assets/roses.jpg', 'Thorny shrubs with beautiful blooms. Symbolize love and beauty.'),
(2, 'Tulips', '/src/Assets/tulips.jpg', 'Spring-blooming flowers known for their bright colors and cup shape.'),
(3, 'Daisies', '/src/Assets/daisies.jpg', 'White petal flowers with a yellow center, symbolizing purity and innocence.'),
(4, 'Orchids', '/src/Assets/orchidss.jpg', 'Exotic flowers with intricate petal structures, symbolizing luxury and beauty.'),
(5, 'Lilies', '/src/Assets/lilies.jpg', 'Large, fragrant flowers, often associated with purity and funerals.'),
(6, 'Sunflowers', '/src/Assets/sunflowers.jpg', 'Bright yellow blooms that follow the sun, symbolizing adoration and loyalty.'),
(7, 'Chrysanthemums', '/src/Assets/Chrysanthemums.jpg', 'Flowers symbolizing longevity and happiness, popular in autumn.'),
(8, 'Lavender', '/src/Assets/lavenders.jpg', 'Known for its calming scent and purple color, symbolizes serenity and purity.'),
(9, 'Peonies', '/src/Assets/peonies.jpg', 'Large, fluffy blooms often symbolizing romance and prosperity.'),
(10, 'Marigolds', '/src/Assets/marigolds.jpg', 'Bright orange or yellow flowers associated with resilience and positive energy.'),
(11, 'Hibiscus', '/src/Assets/Hibiscus.jpg', 'Hibiscus, commonly known as Gumamela in the Philippines, is a vibrant and tropical flowering plant that belongs to the Malvaceae family. It is widely admired for its strikingly large, colorful blossoms, which come in shades of red, pink, white, yellow, and purple. The flowers are typically funnel-shaped with five or more petals, and they are often characterized by their prominent, protruding stame'),
(12, 'Anthuriums', '/src/Assets/anthuriumm.jpg', 'Anthurium, often called the Flamingo Flower or Laceleaf, is a striking, tropical flowering plant known for its glossy, heart-shaped spathes and long-lasting blooms. It belongs to the Araceae family and is popular for its ornamental appeal, making it a favorite for both indoor and outdoor gardens. The vibrant red spathe is one of the most iconic features of the flower, although it c');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `flower_id` int(11) DEFAULT NULL,
  `action_type` enum('added_to_favorite','search','scanned') NOT NULL,
  `search_term` varchar(255) DEFAULT NULL,
  `scan_data` text DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `user_id`, `flower_id`, `action_type`, `search_term`, `scan_data`, `timestamp`) VALUES
(1, 1, NULL, 'search', 'rose', NULL, '2024-10-04 02:00:00'),
(2, 1, 1, 'added_to_favorite', NULL, NULL, '2024-10-04 02:05:00'),
(3, 2, NULL, 'search', 'tulip', NULL, '2024-10-04 03:15:00'),
(4, 2, 3, 'added_to_favorite', NULL, NULL, '2024-10-04 03:20:00'),
(5, 3, NULL, 'search', 'daisy', NULL, '2024-10-04 04:20:00'),
(6, 3, 4, 'added_to_favorite', NULL, NULL, '2024-10-04 04:25:00'),
(7, 2, 1, 'scanned', NULL, 'Scanned flower: Red Rose', '2024-10-04 06:30:00'),
(8, 4, NULL, 'search', 'lavender', NULL, '2024-10-04 07:10:00'),
(9, 1, 7, 'added_to_favorite', NULL, NULL, '2024-10-04 07:25:00'),
(10, 3, 9, 'added_to_favorite', NULL, NULL, '2024-10-04 08:00:00'),
(11, 4, NULL, 'scanned', NULL, 'Scanned flower: Bluebell', '2024-10-04 08:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `picture` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `picture`, `name`) VALUES
(1, 'jealsotto@gmail.com', 'jeal', 'jeal', '', ''),
(2, 'sample@gmail.com', 'sample', '123', '', ''),
(3, 'elly@gmail.com', 'elly', '123', '', ''),
(4, 'jean@gmail.com', 'jean', 'jean', '', ''),
(5, 'jjjjssss@gmail.com', 'jjjjssss', 'jjjjssss', '', ''),
(6, 'alfie@gmail.com', 'alfie', 'alfie', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detection_history`
--
ALTER TABLE `detection_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `flower_id` (`flower_id`);

--
-- Indexes for table `flowers`
--
ALTER TABLE `flowers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flower_type_id` (`flower_type_id`);

--
-- Indexes for table `flower_types`
--
ALTER TABLE `flower_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `flower_id` (`flower_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detection_history`
--
ALTER TABLE `detection_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `flowers`
--
ALTER TABLE `flowers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `flower_types`
--
ALTER TABLE `flower_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detection_history`
--
ALTER TABLE `detection_history`
  ADD CONSTRAINT `detection_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `detection_history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`flower_id`) REFERENCES `flowers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flowers`
--
ALTER TABLE `flowers`
  ADD CONSTRAINT `flowers_ibfk_1` FOREIGN KEY (`flower_type_id`) REFERENCES `flower_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`flower_id`) REFERENCES `flowers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
