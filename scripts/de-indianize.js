/**
 * Systematic find-and-replace to make all content globally diverse.
 * Run: node scripts/de-indianize.js
 */
const fs = require('fs');
const path = require('path');

// Files to process
const contentFiles = [
  'src/content/reading-passages.ts',
  'src/content/grammar-lessons.ts',
  'src/content/grammar-lessons-extra.ts',
  'src/content/listening-exercises.ts',
  'src/content/listening-exercises-extra.ts',
  'src/content/writing-prompts.ts',
  'src/content/speaking-exercises.ts',
  'src/content/practice-tests.ts',
  'src/content/vocabulary.ts',
];

const uiFiles = [
  'src/lib/useIndianVoice.ts',
  'src/app/leaderboard/LeaderboardClient.tsx',
  'src/app/listening/ListeningClient.tsx',
  'src/app/speaking/SpeakingClient.tsx',
  'src/app/daily-practice/DailyPracticeClient.tsx',
  'src/app/vocabulary/VocabularyClient.tsx',
  'src/components/Exercises.tsx',
  'src/app/analytics/AnalyticsClient.tsx',
  'src/lib/writing-grader.ts',
];

// ── Name replacements (whole word, case-sensitive) ──
const nameMap = {
  'Anita': 'Emma',
  'Rajesh': 'Robert',
  'Sunita': 'Helen',
  'Amit': 'David',
  'Moti': 'Max',
  'Ravi': 'James',
  'Priya': 'Sophie',
  'Meera': 'Maria',
  'Arjun': 'Lucas',
  'Vikram': 'Oliver',
  'Neha': 'Anna',
  'Rohan': 'Daniel',
  'Rahul': 'Thomas',
  'Farah': 'Leila',
  'Sneha': 'Clara',
  'Deepa': 'Nina',
  'Arun': 'Mark',
  'Divya': 'Sarah',
  'Sahil': 'Ryan',
  'Sita': 'Lily',
  'Sharma': 'Wilson',
  'Kumar': 'Anderson',
};

// ── City replacements ──
const cityMap = {
  'Pune': 'Melbourne',
  'Delhi': 'London',
  'Delhi-NCR': 'Greater London',
  'New Delhi': 'London',
  'Mumbai': 'Sydney',
  'Bangalore': 'Toronto',
  'Bengaluru': 'Toronto',
  'Chennai': 'Vancouver',
  'Kolkata': 'Berlin',
  'Hyderabad': 'Singapore',
  'Jaipur': 'Amsterdam',
  'Lucknow': 'Vienna',
  'Varanasi': 'Prague',
  'Shimla': 'Zurich',
  'Rishikesh': 'Queenstown',
  'Ahmedabad': 'Dublin',
  'Mangalore': 'Porto',
  'Indore': 'Lyon',
  'Coimbatore': 'Lisbon',
  'Kanpur': 'Hamburg',
  'Allahabad': 'Munich',
  'Agra': 'Florence',
  'Dehradun': 'Geneva',
  'Manali': 'Interlaken',
  'Bihar': 'Wales',
  'Kerala': 'Scotland',
  'Rajasthan': 'Arizona',
  'Bengal': 'Yorkshire',
  'Uttarakhand': 'the Alps',
  'Himachal Pradesh': 'Switzerland',
  'Tamil Nadu': 'Scotland',
  'Thumba, Kerala': 'Woomera, Australia',
  'Thumba': 'Woomera',
  'Dharnai village': 'Feldheim village',
  'Dharnai': 'Feldheim',
};

// ── Food replacements ──
const foodMap = {
  'masala chai': 'coffee',
  'chai wallah': 'coffee vendor',
  'Chai, Chai!': 'Coffee, coffee!',
  'chai': 'coffee',
  'samosas': 'sandwiches',
  'samosa': 'sandwich',
  'biryani': 'pasta',
  'Biryani': 'Pasta',
  'dal': 'soup',
  'sabzi': 'vegetables',
  'paratha': 'bread',
  'paranthas': 'pastries',
  'gulab jamun': 'chocolate cake',
  'barfi': 'cookies',
  'raita': 'salad dressing',
  'upma': 'porridge',
  'poha': 'cereal',
  'Maggi': 'noodles',
  'rajma-chawal': 'rice and beans',
  'vada pav': 'burger',
  'golgappas': 'tacos',
  'golgappa': 'taco',
  'puchka': 'taco',
  'pani puri': 'tacos',
  'chole bhature': 'fish and chips',
  'jalebis': 'doughnuts',
  'jalebi': 'doughnut',
  'lassi': 'lemonade',
  'ladoo': 'brownies',
  'laddu': 'brownies',
  'dosa': 'crepe',
  'dosas': 'crepes',
  'filter coffee': 'espresso',
  'coriander': 'parsley',
  'green chillies': 'peppers',
  'guavas': 'pears',
  'kathi rolls': 'wraps',
};

// ── Cultural replacements ──
const cultureMap = {
  'Diwali': 'New Year',
  'rangoli': 'decorations',
  'diyas': 'candles',
  'diya': 'candle',
  'puja': 'celebration',
  'rupees': 'dollars',
  'rupee': 'dollar',
  '₹': '$',
  'crore': 'million',
  'cricket': 'football',
  'Cricket': 'Football',
  'Bollywood': 'Hollywood',
  'IIT': 'MIT',
  'IITs': 'top universities',
  'UPSC': 'civil service exams',
  'ISRO': 'NASA',
  'Aadhaar': 'national ID system',
  'Vande Bharat Express': 'high-speed rail services',
  'Vande Bharat': 'high-speed rail',
  'Rajdhani Express': 'express train service',
  'AIIMS': 'major hospitals',
  'Flipkart': 'Shopify',
  'Zomato': 'DoorDash',
  'Swiggy': 'Uber Eats',
  'Ola': 'Lyft',
  'Urban Company': 'TaskRabbit',
  'NITI Aayog': 'government advisory',
  'UPI': 'digital payments',
  'FSSAI': 'Food Standards Agency',
  'Mangalyaan': 'Mars Orbiter',
  'Chandrayaan-3': 'Artemis III',
  'Chandrayaan': 'Artemis',
  'Gaganyaan': 'crewed spaceflight',
  'gagannauts': 'astronauts',
  'IN-SPACe': 'commercial space authorization',
  'sari': 'dress',
  'kurta': 'shirt',
  'tabla': 'drums',
  'wickets': 'goals',
  'wicket': 'goal',
  'overs': 'halves',
  'innings': 'half',
  'bowlers': 'defenders',
  'batsman': 'striker',
  'bat first': 'kick off first',
  'toss': 'coin toss',
  'runs': 'goals',
  // Indian-specific references
  'PM-KUSUM programme': 'government green energy scheme',
  'Startup India': 'enterprise initiative',
  'NEP 2020': 'Education Reform Act',
  'NEP': 'Education Reform Act',
  'Rohit Sharma': 'Marcus Rashford',
  'Sachin Tendulkar': 'Lionel Messi',
  'Sundar Pichai': 'Elon Musk',
  'Dr. Kalam': 'Dr. Hawking',
  'RRR': 'Parasite',
  'KGF Chapter 2': 'Squid Game',
  'ShareChat': 'TikTok',
  'Koo': 'Threads',
};

// ── India-specific phrase replacements ──
const phraseMap = {
  'Indian Railways': 'European Railways',
  'Indian Railway': 'European Railway',
  'Indian English errors': 'common learner errors',
  'Indian English': 'British English',
  'Indian context': 'international context',
  'Indian youth': 'young people',
  'Indian market': 'global market',
  'Indian culture': 'world culture',
  'Indian democracy': 'modern democracy',
  'Indian Democracy': 'Modern Democracy',
  'Indian life': 'daily life',
  'Indian problems': 'local problems',
  'Indian villages': 'rural villages',
  'Indian film industry': 'global film industry',
  'Indian cotton': 'organic cotton',
  'Indian wooden': 'antique wooden',
  'Indian/British': 'British',
  'Indian speakers': 'Many learners',
  'Indian accent': 'clear English',
  'Indian startups': 'tech startups',
  'Indian astronauts': 'astronauts',
  'Indian space programme': 'the space programme',
  'Indian Space Research Organisation': 'the National Space Agency',
  'Indian Parliament': 'Parliament',
  'Indian general election': 'general election',
  'Indian policymakers': 'policymakers',
  'Indian healthcare': 'healthcare',
  'Indian skin': 'diverse skin',
  'Indian demographics': 'diverse demographics',
  'Indian datasets': 'local datasets',
  'Indian languages': 'local languages',
  'Indian Festival': 'Festival',
  'Indian monsoon': 'rainy season',
  'Indian classical': 'classical',
  'Indian cuisine': 'world cuisine',
  'Indian wedding': 'traditional wedding',
  'Indian Ocean': 'the ocean',
  'Indian': 'local',
  'Practice with clear English pronunciation': 'Practice with clear English pronunciation',
  'urban India': 'urban areas',
  'Urban India': 'Urban Areas',
  'rural India': 'rural areas',
  'Rural India': 'Rural Areas',
  'young Indians': 'young people',
  'Young Indians': 'Young People',
  'many Indians': 'many people',
  'most Indians': 'most people',
  'Indians': 'people',
  'from India': 'from Toronto',
  'in India,': 'worldwide,',
  'in India.': 'worldwide.',
  'in India ': 'in many countries ',
  'in India\\n': 'worldwide\\n',
  'of India': 'of the country',
  'across India': 'across the region',
  'about India': 'about the world',
  'around India': 'around the world',
  'visit India': 'visit Europe',
  'to India': 'to the country',
  'India is': 'The world is',
  'India has': 'The country has',
  'India had': 'The country had',
  'India made': 'The team made',
  'India became': 'The country became',
  'India stands': 'The world stands',
  'India possesses': 'The region possesses',
  'India produces': 'Countries produce',
  'India won': 'The team won',
  'India vs Australia': 'England vs Brazil',
  'India.': 'the country.',
  'India,': 'the country,',
  "India'": "the country'",
  "India\\'s": "the country\\'s",
  'India\\n': 'the country\\n',
  'India ': 'the country ',
  'indianContext: true,': '',
  'indianContext: false,': '',
  'Gali Number 4': 'Park Street',
  'Gali Number 7': 'Oak Avenue',
  'colony cricket': 'neighbourhood football',
  'colony': 'neighbourhood',
  'Ramu Kaka': 'the shopkeeper',
  'MG Road': 'High Street',
  'Chandni Chowk': 'Borough Market',
  'five-rupee stamp': 'one-dollar stamp',
  'fifty rupees': 'five dollars',
  'forty rupees': 'four dollars',
  'six hundred rupees': 'sixty dollars',
  'four hundred and fifty rupees': 'forty-five dollars',
  'eight hundred rupees': 'eighty dollars',
  'one hundred and fifty rupees': 'fifteen dollars',
  // Indian govt/institutions
  'Supreme Court of India': 'Supreme Court',
  'Election Commission of India': 'Electoral Commission',
  'Food Safety and Standards Authority of India': 'Food Standards Agency',
  'Association for Democratic Reforms': 'Electoral Reform Association',
  'Code on Social Security, 2020': 'Social Security Reform Act',
  'Digital Personal Data Protection Act': 'Data Protection Act',
  'Personal Data Protection Bill': 'Data Protection Bill',
  'Justice K. S. Puttaswamy v. Union of India': 'landmark privacy ruling',
  'Puttaswamy': 'the landmark ruling',
  'Justice D. Y. Chandrachud': 'the Chief Justice',
  'Article 21': 'the constitution',
  'Eighth Schedule of the Constitution': 'constitutional provisions',
  'Centre for Economic Data and Analysis': 'Economic Research Institute',
  // Company names
  'Infosys': 'Salesforce',
  'Wipro': 'Accenture',
  'TCS': 'IBM',
  'Qure.ai': 'DeepMind Health',
  'Niramai': 'Butterfly Network',
  'SigTuple': 'PathAI',
  // Locations in stories
  'Bandipur National Park': 'Kruger National Park',
  'Sundarbans': 'Amazon Rainforest',
  'Royal Bengal Tiger': 'African Elephant',
  'Lakshman Jhula bridge': 'bungee jumping bridge',
  'ashram': 'wellness retreat',
  'Goddess Lakshmi': 'good fortune',
};

// Build combined replacement map (order matters — longer/more specific first)
const allReplacements = { ...phraseMap, ...cultureMap, ...foodMap, ...cityMap, ...nameMap };

// Sort by key length descending to match longer strings first
const sortedKeys = Object.keys(allReplacements).sort((a, b) => b.length - a.length);

function applyReplacements(content) {
  let result = content;
  for (const key of sortedKeys) {
    if (!key || key.length === 0) continue; // skip empty keys
    const value = allReplacements[key];
    // Use global replacement
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      result = result.split(key).join(value);
    } catch(e) {
      console.error(`Error replacing "${key}":`, e.message);
    }
  }
  return result;
}

// Process content files
const root = path.resolve(__dirname, '..');
let totalChanges = 0;

for (const file of [...contentFiles, ...uiFiles]) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${file}`);
    continue;
  }
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = applyReplacements(original);
  
  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    // Count changes
    let changes = 0;
    const origLines = original.split('\n');
    const updLines = updated.split('\n');
    for (let i = 0; i < Math.max(origLines.length, updLines.length); i++) {
      if (origLines[i] !== updLines[i]) changes++;
    }
    totalChanges += changes;
    console.log(`✓ ${file} — ${changes} lines changed`);
  } else {
    console.log(`  ${file} — no changes needed`);
  }
}

console.log(`\nDone! ${totalChanges} total lines changed across all files.`);
