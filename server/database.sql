-- BulakApp Database Schema & Seed Data
USE bulakappdb;

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  picture VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flower_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(255) NOT NULL,
  imgs VARCHAR(500) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS flowers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flower_name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  family VARCHAR(255),
  other_names VARCHAR(500),
  lifespan VARCHAR(255),
  flower_size VARCHAR(255),
  bloom_time VARCHAR(255),
  flower_color VARCHAR(255),
  description TEXT,
  symbolism TEXT,
  garden_use TEXT,
  interesting_facts TEXT,
  name_story TEXT,
  uses_on_events TEXT,
  image_url VARCHAR(500),
  flower_type_id INT,
  FOREIGN KEY (flower_type_id) REFERENCES flower_types(id)
);

CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  flower_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, flower_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (flower_id) REFERENCES flowers(id)
);

CREATE TABLE IF NOT EXISTS detection_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  flower_name VARCHAR(255) NOT NULL,
  confidence FLOAT DEFAULT 0,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ============================================================
-- FLOWER TYPES SEED DATA
-- ============================================================

INSERT INTO flower_types (id, type_name, imgs) VALUES
(1, 'Roses', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/800px-Sunflower_from_Silesia2.jpg'),
(2, 'Sunflowers', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/800px-Sunflower_from_Silesia2.jpg'),
(3, 'Tropical', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hibiscus_rosa-sinensis.jpg/800px-Hibiscus_rosa-sinensis.jpg'),
(4, 'Anthuriums', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Anthurium_andraeanum.jpg/800px-Anthurium_andraeanum.jpg'),
(5, 'Chrysanthemums', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chrysanthemum_x_morifolium_2.jpg/800px-Chrysanthemum_x_morifolium_2.jpg');

-- ============================================================
-- FLOWERS SEED DATA  (IDs match the flowerIdMap in the client)
-- ============================================================

INSERT INTO flowers (id, flower_name, scientific_name, family, other_names, lifespan, flower_size, bloom_time, flower_color, description, symbolism, garden_use, interesting_facts, name_story, uses_on_events, image_url, flower_type_id) VALUES
(1, 'Red Rose', 'Rosa rubiginosa', 'Rosaceae', 'Sweetbriar, Eglantine', 'Perennial', '3–5 cm', 'Spring to Summer', 'Red',
 'The red rose is one of the most iconic flowers in the world, known for its velvety petals and sweet fragrance. It thrives in tropical and subtropical climates and is widely cultivated in the Philippines.',
 'Love, passion, romance, and deep affection. It is the universal symbol of true love.',
 'Used as a centerpiece plant in garden beds, borders, and container gardens.',
 'A single red rose was the flower of choice of Aphrodite, the Greek goddess of love.',
 'The name "rose" comes from the Latin word "rosa," believed to be derived from the Greek "rhodon."',
 'Weddings, Valentines Day, anniversaries, and romantic events.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rosa_rubiginosa_1.jpg/800px-Rosa_rubiginosa_1.jpg', 1),

(2, 'Yellow Rose', 'Rosa foetida', 'Rosaceae', 'Austrian Briar', 'Perennial', '3–5 cm', 'Spring to Summer', 'Yellow',
 'The yellow rose is a cheerful and vibrant flower that symbolizes friendship and joy. It is widely grown in Philippine gardens for its bright color and pleasant scent.',
 'Friendship, joy, caring, and new beginnings. A symbol of platonic love.',
 'Excellent as a border plant or in mixed flower beds to add bright color.',
 'Yellow roses were originally discovered in the Middle East in the 18th century.',
 'Named for its distinctive yellow color, "foetida" refers to its strong scent.',
 'Graduation ceremonies, friendship celebrations, and get-well occasions.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Rosa_foetida.jpg/800px-Rosa_foetida.jpg', 1),

(5, 'Sunflower', 'Helianthus annuus', 'Asteraceae', 'Common Sunflower, Mirasol', 'Annual', '7–15 cm', 'Summer to Fall', 'Yellow',
 'The sunflower is a tall, striking plant with large yellow flower heads that famously follow the sun. It is commonly grown throughout the Philippines and symbolizes warmth and positivity.',
 'Adoration, loyalty, longevity, and happiness. Associated with the sun and positivity.',
 'Perfect as a background plant in garden beds, also grown for seeds and oil.',
 'Sunflowers can grow up to 3 meters tall and their heads can reach 30 cm in diameter.',
 'The name "Helianthus" comes from the Greek words "helios" (sun) and "anthos" (flower).',
 'Birthdays, graduation parties, summer festivals, and sunflower-themed weddings.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/800px-Sunflower_from_Silesia2.jpg', 2),

(12, 'Pink Rose', 'Rosa chinensis', 'Rosaceae', 'China Rose, Monthly Rose', 'Perennial', '3–5 cm', 'Year-round', 'Pink',
 'The pink rose is a beloved flower known for its delicate beauty and gentle fragrance. It is one of the most commonly cultivated roses in the Philippines.',
 'Grace, admiration, gratitude, and gentle love. Represents femininity and elegance.',
 'Popular in rose gardens, borders, and as cut flowers for bouquets.',
 'Pink roses were among the first roses cultivated in China over 1,000 years ago.',
 'The species name "chinensis" refers to its Chinese origin.',
 'Baby showers, mothers day, appreciation events, and feminine-themed celebrations.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rosa_chinensis_viridiflora.jpg/800px-Rosa_chinensis_viridiflora.jpg', 1),

(13, 'White Rose', 'Rosa alba', 'Rosaceae', 'White Rose of York, Alba Rose', 'Perennial', '4–6 cm', 'Late Spring to Summer', 'White',
 'The white rose is a pure and elegant flower associated with peace, purity, and new beginnings. It is widely used in formal events and ceremonies in the Philippines.',
 'Purity, innocence, reverence, and new beginnings. A symbol of spirituality.',
 'Popular in formal garden designs, trellises, and as elegant cut flowers.',
 'White roses have been associated with the Virgin Mary in Christian traditions.',
 '"Alba" is Latin for "white," describing the flower\'s pure white color.',
 'Weddings, baptisms, first communions, and memorial services.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Rosa_alba_maxima.jpg/800px-Rosa_alba_maxima.jpg', 1),

(14, 'Desert Rose', 'Adenium obesum', 'Apocynaceae', 'Impala Lily, Mock Azalea, Sabi Star', 'Perennial succulent', '3–5 cm', 'Spring to Summer', 'Pink, Red, White',
 'The desert rose is a striking succulent plant with thick swollen stems and beautiful trumpet-shaped flowers. Despite its name, it thrives in Philippine tropical conditions when given proper drainage.',
 'Beauty in adversity, perseverance, and strength. Represents survival in harsh conditions.',
 'Used as a decorative potted plant, bonsai, and in rock gardens.',
 'The desert rose is not actually a rose; it belongs to the Apocynaceae family.',
 'Named for its rose-like flowers and its natural habitat in arid desert regions of Africa.',
 'Decorative displays, garden shows, and office or home interior decoration.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/AdeniumObesum.jpg/800px-AdeniumObesum.jpg', 3),

(15, 'Gumamela', 'Hibiscus rosa-sinensis', 'Malvaceae', 'Hibiscus, China Rose, Shoeflower', 'Perennial shrub', '8–15 cm', 'Year-round', 'Red, Pink, Yellow, Orange, White',
 'The gumamela is the national flower of Malaysia and one of the most popular ornamental plants in the Philippines. It produces large, trumpet-shaped flowers that bloom almost year-round.',
 'Delicate beauty, fame, glory, and fleeting fame. In the Philippines, it represents hospitality.',
 'Commonly planted as hedges, borders, and specimen plants in Philippine gardens.',
 'Gumamela flowers are edible and can be used to make herbal tea and natural food coloring.',
 '"Gumamela" comes from the Spanish "jamameluco," derived from Arabic "abutilon."',
 'Fiestas, cultural events, garden parties, and Filipino traditional celebrations.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hibiscus_rosa-sinensis.jpg/800px-Hibiscus_rosa-sinensis.jpg', 3),

(16, 'Anthurium', 'Anthurium andraeanum', 'Araceae', 'Flamingo Flower, Laceleaf, Tailflower', 'Perennial', '5–10 cm', 'Year-round', 'Red, Pink, White, Orange',
 'The anthurium is a striking tropical plant known for its waxy, heart-shaped spathes and long-lasting blooms. It is widely grown in the Philippines both as an ornamental plant and as a cut flower.',
 'Hospitality, happiness, and abundance. The heart-shaped spathe symbolizes love and romance.',
 'Popular as an indoor plant and in tropical landscape designs.',
 'Anthurium flowers can last up to 8 weeks as cut flowers.',
 'The name "Anthurium" comes from the Greek words "anthos" (flower) and "oura" (tail).',
 'Weddings, corporate events, and as decorative centerpieces for formal occasions.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Anthurium_andraeanum.jpg/800px-Anthurium_andraeanum.jpg', 4),

(18, 'Chrysanthemum', 'Chrysanthemum morifolium', 'Asteraceae', 'Mum, Hardy Mum, Pot Mum', 'Perennial', '5–12 cm', 'Fall', 'Various (white, yellow, pink, red)',
 'The chrysanthemum is one of the most celebrated flowers in Asia, known for its diverse colors and forms. In the Philippines, it is a popular garden plant and cut flower.',
 'Longevity, loyalty, joy, and optimism. In Asia, it symbolizes rejuvenation and nobility.',
 'Excellent for autumn garden displays, containers, and borders.',
 'Chrysanthemums have been cultivated in China for over 2,500 years.',
 '"Chrysanthemum" comes from the Greek "chrysos" (gold) and "anthemon" (flower).',
 'All Saints Day, birthdays, and festive occasions in the Philippines.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Chrysanthemum_x_morifolium_2.jpg/800px-Chrysanthemum_x_morifolium_2.jpg', 5),

(19, 'Yellow Chrysanthemum', 'Chrysanthemum indicum', 'Asteraceae', 'Indian Chrysanthemum, Small Flower Mum', 'Perennial', '3–6 cm', 'Fall to Winter', 'Yellow',
 'The yellow chrysanthemum is a vibrant variety known for its cheerful golden blooms. It is commonly seen in Philippine markets and gardens, especially during the November All Saints Day season.',
 'Longevity, wealth, and good fortune. In Chinese culture, it represents the joy of life.',
 'Popular in mass plantings, containers, and as cut flowers for festive arrangements.',
 'Yellow chrysanthemums are used in traditional Chinese medicine for their health benefits.',
 '"Indicum" refers to India, where this species was first documented by Western botanists.',
 'All Saints Day cemetery decorations, Chinese New Year, and festive arrangements.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chrysanthemum_indicum1.jpg/800px-Chrysanthemum_indicum1.jpg', 5),

(20, 'Magenta Chrysanthemum', 'Chrysanthemum zawadskii', 'Asteraceae', 'Pink Mum, Magenta Mum', 'Perennial', '4–8 cm', 'Fall', 'Magenta, Deep Pink',
 'The magenta chrysanthemum is a striking variety with deep pink to purple-magenta blooms. It adds a bold splash of color to Philippine gardens and is highly sought after as a cut flower.',
 'Cheerfulness, compassion, and deep admiration. The magenta color represents gratitude.',
 'Used in colorful garden borders and as eye-catching cut flowers.',
 'Magenta chrysanthemums are bred through careful hybridization to achieve their deep color.',
 'Named after the Polish botanist Alexander Zawadzki who first catalogued this species.',
 'Colorful floral arrangements for festivals, parties, and special occasions.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Chrysanthemum_zawadskii.jpg/800px-Chrysanthemum_zawadskii.jpg', 5),

(21, 'White Anthurium', 'Anthurium andraeanum var. album', 'Araceae', 'White Laceleaf, White Flamingo Flower', 'Perennial', '5–10 cm', 'Year-round', 'White',
 'The white anthurium is an elegant variety of the anthurium plant, prized for its pure white waxy spathes and long-lasting blooms. It is especially popular in the Philippines for weddings and formal events.',
 'Purity, peace, and new beginnings. The white spathe represents elegance and grace.',
 'Popular as an indoor ornamental plant and in tropical wedding floral arrangements.',
 'White anthuriums can remain fresh as cut flowers for up to 6 weeks.',
 'The white variety was developed through selective breeding from the original red anthurium.',
 'Weddings, baptisms, debut celebrations, and formal corporate events.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/White_Anthurium.jpg/800px-White_Anthurium.jpg', 4),

(22, 'Yellow Alder', 'Turnera ulmifolia', 'Passifloraceae', 'Sage Rose, Buttercup, Day Flower', 'Perennial shrub', '3–5 cm', 'Year-round', 'Yellow',
 'The yellow alder is a cheerful, fast-growing shrub that blooms almost continuously throughout the year. It is commonly found growing wild along roadsides and in gardens across the Philippines.',
 'Cheerfulness, resilience, and simple beauty. Represents everyday joy and abundance.',
 'Used as a ground cover, border plant, and in butterfly gardens due to its nectar-rich flowers.',
 'Yellow alder flowers open in the morning and close by afternoon, blooming fresh each day.',
 'Despite being called "alder," it is not related to alder trees but named for its leaf resemblance.',
 'Casual garden events, school programs, and community celebrations.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Turnera_ulmifolia_1.jpg/800px-Turnera_ulmifolia_1.jpg', 3),

(23, 'Sampaguita', 'Jasminum sambac', 'Oleaceae', 'Arabian Jasmine, Kampupot, Pikake', 'Perennial shrub', '1–2 cm', 'Year-round', 'White',
 'Sampaguita is the national flower of the Philippines, cherished for its delicate white petals and intensely sweet fragrance. It is commonly woven into garlands and leis and sold in churches and markets across the country.',
 'Purity, simplicity, humility, and eternal love. As the national flower, it represents the Filipino spirit.',
 'Ideal as a fragrant hedge, trellis climber, or container plant in Philippine home gardens.',
 'Sampaguita garlands are traditionally offered to religious images and honored guests as a sign of respect.',
 'The name comes from the Tagalog words "sumpa kita" meaning "I promise you," reflecting its association with love and devotion.',
 'Religious festivals, debut celebrations, weddings, and as offerings at church altars.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Jasminum_sambac_%28L.%29_Aiton.jpg/800px-Jasminum_sambac_%28L.%29_Aiton.jpg', 3),

(24, 'Bougainvillea', 'Bougainvillea spectabilis', 'Nyctaginaceae', 'Paper Flower, Bugambilya, Santa Rita', 'Perennial woody vine', '3–5 cm', 'Year-round', 'Magenta, Pink, Red, Orange, White',
 'Bougainvillea is one of the most vibrant and widely grown ornamental plants in the Philippines. Its showy papery bracts in vivid shades of magenta, pink, and orange cascade dramatically over fences, walls, and trellises.',
 'Passion, beauty, and welcoming energy. It represents a warm and vibrant spirit.',
 'Excellent as a climbing vine on trellises, fences, and walls, or shaped as a colorful hedge or bonsai.',
 'What look like bougainvillea petals are actually bracts — modified leaves. The real flower is the tiny white center bloom.',
 'Named after French explorer Louis Antoine de Bougainville, in whose honor the plant was named after his 18th-century circumnavigation voyage.',
 'Garden parties, fiestas, outdoor weddings, and as colorful gate and entrance decorations.',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Bougainvillea_spectabilis3.jpg/800px-Bougainvillea_spectabilis3.jpg', 3);
