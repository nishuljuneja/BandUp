#!/usr/bin/env node
/**
 * Fixes word-definitions.json by re-fetching definitions with POS-aware selection.
 * 
 * Problems fixed:
 * 1. POS mismatch - "book" stored as verb, but Oxford expects noun
 * 2. Sexual/inappropriate content
 * 3. Too-short/useless definitions
 * 4. Obscure/jargon definitions
 * 
 * Uses Oxford 3000/5000 expected POS to guide which API meaning to select.
 * Includes manual overrides for words the API consistently gets wrong.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const defs = JSON.parse(readFileSync(join(ROOT, 'src/content/word-definitions.json'), 'utf-8'));
const ox3000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-3000.json'), 'utf-8'));
const ox5000 = JSON.parse(readFileSync(join(ROOT, 'src/content/oxford-5000-extra.json'), 'utf-8'));

// ── Manual overrides for words the API consistently returns wrong ──
const MANUAL_OVERRIDES = {
  hard: { d: "Solid, firm, and rigid; not easily broken or bent.", e: "The ground was too hard to dig.", p: "adjective" },
  big: { d: "Of considerable size, extent, or intensity.", e: "She lives in a big house near the park.", p: "adjective" },
  love: { d: "An intense feeling of deep affection.", e: "He has a great love for his family.", p: "noun" },
  sad: { d: "Feeling or showing sorrow; unhappy.", e: "She felt sad after hearing the news.", p: "adjective" },
  cold: { d: "Of or at a low temperature, especially when compared to the human body.", e: "It's very cold outside today.", p: "adjective" },
  nice: { d: "Pleasant; agreeable; giving pleasure or satisfaction.", e: "That's a really nice dress.", p: "adjective" },
  swim: { d: "To move through water by moving the body or parts of the body.", e: "She can swim very fast.", p: "verb" },
  book: { d: "A written or printed work consisting of pages bound together.", e: "I'm reading a really good book.", p: "noun" },
  table: { d: "A piece of furniture with a flat top and one or more legs.", e: "Please put the plates on the table.", p: "noun" },
  school: { d: "An institution for educating children or young people.", e: "The children walk to school every morning.", p: "noun" },
  water: { d: "A colourless, transparent liquid that forms the seas, lakes, and rivers.", e: "Can I have a glass of water, please?", p: "noun" },
  play: { d: "To engage in activity for enjoyment and recreation.", e: "The children play in the garden after school.", p: "verb" },
  walk: { d: "To move at a regular pace by lifting and setting down each foot in turn.", e: "I walk to work every day.", p: "verb" },
  eat: { d: "To put food into the mouth, chew, and swallow it.", e: "We usually eat dinner at seven o'clock.", p: "verb" },
  girl: { d: "A female child or young woman.", e: "The girl was reading a book in the library.", p: "noun" },
  boy: { d: "A male child or young man.", e: "The boy kicked the ball across the field.", p: "noun" },
  man: { d: "An adult male human being.", e: "The man was waiting at the bus stop.", p: "noun" },
  woman: { d: "An adult female human being.", e: "The woman is a doctor at the hospital.", p: "noun" },
  car: { d: "A four-wheeled road vehicle powered by an engine, designed to carry passengers.", e: "She drives her car to the office.", p: "noun" },
  bus: { d: "A large motor vehicle carrying passengers by road.", e: "I take the bus to work every morning.", p: "noun" },
  train: { d: "A series of connected railway carriages moved by a locomotive.", e: "The train arrives at platform two.", p: "noun" },
  plane: { d: "An aeroplane; a powered flying vehicle with fixed wings.", e: "The plane landed safely at the airport.", p: "noun" },
  dog: { d: "A domesticated animal kept as a pet or for work.", e: "The dog barked when someone knocked on the door.", p: "noun" },
  cat: { d: "A small domesticated feline animal kept as a pet.", e: "The cat sat on the windowsill in the sun.", p: "noun" },
  fish: { d: "A cold-blooded animal that lives in water and breathes through gills.", e: "There are many fish in the river.", p: "noun" },
  bird: { d: "A warm-blooded animal with feathers, wings, and a beak, that can usually fly.", e: "A small bird was singing in the tree.", p: "noun" },
  eye: { d: "The organ of sight in humans and animals.", e: "She has beautiful blue eyes.", p: "noun" },
  hand: { d: "The end part of the arm beyond the wrist, including the palm and fingers.", e: "He raised his hand to ask a question.", p: "noun" },
  head: { d: "The upper part of the human body containing the brain, eyes, ears, nose, and mouth.", e: "She shook her head in disagreement.", p: "noun" },
  heart: { d: "The organ in the chest that pumps blood through the body.", e: "Exercise is good for your heart.", p: "noun" },
  face: { d: "The front part of the head, from the forehead to the chin.", e: "She had a smile on her face.", p: "noun" },
  body: { d: "The whole physical structure of a human or animal.", e: "Regular exercise keeps your body healthy.", p: "noun" },
  name: { d: "A word or set of words by which a person or thing is known.", e: "What's your name?", p: "noun" },
  age: { d: "The length of time that a person has lived or a thing has existed.", e: "She started learning English at the age of ten.", p: "noun" },
  life: { d: "The condition that distinguishes animals and plants from inorganic matter.", e: "Life in a big city can be exciting.", p: "noun" },
  time: { d: "The indefinite continued progress of existence; a particular point or period.", e: "What time does the meeting start?", p: "noun" },
  day: { d: "A period of twenty-four hours, or the time between sunrise and sunset.", e: "It was a beautiful sunny day.", p: "noun" },
  night: { d: "The period of darkness between sunset and sunrise.", e: "The stars are bright at night.", p: "noun" },
  morning: { d: "The period of time between midnight and noon, especially from sunrise to noon.", e: "I go for a run every morning.", p: "noun" },
  evening: { d: "The period of time at the end of the day, usually from about 6 p.m. to bedtime.", e: "We had dinner together in the evening.", p: "noun" },
  year: { d: "The time taken by the earth to make one revolution around the sun, about 365 days.", e: "She has lived here for two years.", p: "noun" },
  month: { d: "Each of the twelve named periods into which a year is divided.", e: "January is the first month of the year.", p: "noun" },
  week: { d: "A period of seven consecutive days.", e: "I have an exam next week.", p: "noun" },
  hour: { d: "A period of sixty minutes; one twenty-fourth of a day.", e: "The journey takes about two hours.", p: "noun" },
  game: { d: "An activity that one engages in for amusement or fun.", e: "Chess is a popular board game.", p: "noun" },
  sport: { d: "An activity involving physical effort and skill, with rules and competition.", e: "Cricket is a popular sport in India.", p: "noun" },
  music: { d: "Vocal or instrumental sounds combined to produce beauty, harmony, or expression.", e: "She enjoys listening to music.", p: "noun" },
  film: { d: "A story or event recorded by a camera as a set of moving images; a movie.", e: "Have you seen the new Bollywood film?", p: "noun" },
  song: { d: "A short piece of music with words that is sung.", e: "That's my favourite song.", p: "noun" },
  language: { d: "The method of human communication using words, spoken or written.", e: "How many languages do you speak?", p: "noun" },
  letter: { d: "A character representing a sound in an alphabet, or a written message.", e: "The English alphabet has 26 letters.", p: "noun" },
  word: { d: "A single distinct meaningful element of speech or writing.", e: "Can you spell that word for me?", p: "noun" },
  page: { d: "One side of a sheet of paper in a book, magazine, or newspaper.", e: "Turn to page 42 in your textbook.", p: "noun" },
  story: { d: "An account of imaginary or real people and events told for entertainment.", e: "She told the children a bedtime story.", p: "noun" },
  picture: { d: "A painting, drawing, or photograph.", e: "There's a beautiful picture on the wall.", p: "noun" },
  phone: { d: "A device used for speaking to someone in another place; a telephone.", e: "Can I borrow your phone?", p: "noun" },
  money: { d: "Coins and banknotes used as a medium of exchange.", e: "I don't have enough money to buy it.", p: "noun" },
  price: { d: "The amount of money for which something is sold or offered.", e: "What's the price of this shirt?", p: "noun" },
  shop: { d: "A building or room where goods are sold to the public.", e: "There's a grocery shop near my house.", p: "noun" },
  market: { d: "A place where people go to buy and sell goods.", e: "We buy fresh vegetables from the market.", p: "noun" },
  office: { d: "A room or building where people work, usually sitting at desks.", e: "He works in an office in the city centre.", p: "noun" },
  road: { d: "A wide way leading from one place to another, especially for vehicles.", e: "Be careful when crossing the road.", p: "noun" },
  city: { d: "A large and important town.", e: "Mumbai is the largest city in India.", p: "noun" },
  air: { d: "The invisible mixture of gases that surrounds the earth and that we breathe.", e: "The air in the mountains is very fresh.", p: "noun" },
  fire: { d: "The state of burning, producing flames, light, and heat.", e: "They sat around the fire to keep warm.", p: "noun" },
  earth: { d: "The planet on which we live; the world.", e: "The earth goes around the sun.", p: "noun" },
  rain: { d: "Water that falls from the clouds in drops.", e: "Take an umbrella — it looks like rain.", p: "noun" },
  sun: { d: "The star that the earth orbits, providing light and warmth.", e: "The sun rises in the east.", p: "noun" },
  moon: { d: "The natural satellite of the earth, visible at night by reflected sunlight.", e: "The moon was full and bright last night.", p: "noun" },
  star: { d: "A fixed luminous point in the night sky; a large ball of burning gas in space.", e: "You can see thousands of stars on a clear night.", p: "noun" },
  spring: { d: "The season after winter and before summer, when plants begin to grow.", e: "The flowers bloom in spring.", p: "noun" },
  summer: { d: "The warmest season of the year, between spring and autumn.", e: "We go to the beach every summer.", p: "noun" },
  winter: { d: "The coldest season of the year, between autumn and spring.", e: "It snows a lot during winter.", p: "noun" },
  weather: { d: "The state of the atmosphere at a particular place and time, regarding temperature, rain, etc.", e: "The weather is very hot today.", p: "noun" },
  door: { d: "A hinged or sliding barrier at the entrance of a building or room.", e: "Please close the door behind you.", p: "noun" },
  window: { d: "An opening in a wall fitted with glass, to let in light and air.", e: "She opened the window to let in fresh air.", p: "noun" },
  wall: { d: "A continuous vertical structure that encloses or divides an area.", e: "There's a clock on the wall.", p: "noun" },
  floor: { d: "The lower surface of a room, on which one stands.", e: "The children were sitting on the floor.", p: "noun" },
  garden: { d: "A piece of ground next to a house, used for growing flowers, vegetables, or as a place to relax.", e: "She grows tomatoes in her garden.", p: "noun" },
  tree: { d: "A large plant with a trunk and branches made of wood.", e: "The children climbed the old tree.", p: "noun" },
  flower: { d: "The colourful part of a plant from which seeds develop; a bloom.", e: "She picked some flowers from the garden.", p: "noun" },
  baby: { d: "A very young child, especially one that has not yet begun to walk or talk.", e: "The baby smiled at her mother.", p: "noun" },
  player: { d: "A person who takes part in a sport or game.", e: "He is the best player on the team.", p: "noun" },
  short: { d: "Measuring a small distance from end to end; not long.", e: "She has short brown hair.", p: "adjective" },
  rich: { d: "Having a great deal of money or assets; wealthy.", e: "He became rich through hard work.", p: "adjective" },
  dirty: { d: "Covered or marked with an unclean substance; not clean.", e: "Your shoes are very dirty.", p: "adjective" },
  beautiful: { d: "Pleasing to the senses or mind; very attractive.", e: "What a beautiful sunset!", p: "adjective" },
  amazing: { d: "Causing great surprise or wonder; astonishing.", e: "The view from the top was amazing.", p: "adjective" },
  boring: { d: "Not interesting; tedious; dull.", e: "The lecture was so boring that I fell asleep.", p: "adjective" },
  bored: { d: "Feeling weary and uninterested because of a lack of stimulation.", e: "I'm bored — there's nothing to do.", p: "adjective" },
  broken: { d: "Having been fractured or damaged so as to no longer be in one piece or working order.", e: "The window is broken.", p: "adjective" },
  busy: { d: "Having a great deal to do; occupied.", e: "I'm too busy to go out tonight.", p: "adjective" },
  brown: { d: "Of a colour produced by mixing red, yellow, and blue; like wood or soil.", e: "She wore a brown jacket.", p: "adjective" },
  blue: { d: "Of a colour between green and violet, like the sky on a clear day.", e: "The sky is bright blue today.", p: "adjective" },
  dark: { d: "With little or no light.", e: "It gets dark very early in winter.", p: "adjective" },
  clean: { d: "Free from dirt, marks, or unwanted matter; not dirty.", e: "Make sure your hands are clean before eating.", p: "adjective" },
  long: { d: "Measuring a great distance from end to end.", e: "The river is very long.", p: "adjective" },
  strong: { d: "Having the power to move heavy weights or perform physically demanding tasks.", e: "He is very strong and can lift heavy boxes.", p: "adjective" },
  weak: { d: "Lacking physical strength and energy.", e: "She felt weak after being ill for a week.", p: "adjective" },
  safe: { d: "Protected from or not exposed to danger or risk.", e: "Keep your passport in a safe place.", p: "adjective" },
  dangerous: { d: "Able or likely to cause harm or injury.", e: "Swimming in the river is dangerous.", p: "adjective" },
  fast: { d: "Moving or capable of moving at high speed.", e: "The car was going very fast.", p: "adjective" },
  slow: { d: "Moving or operating at a low speed; not quick.", e: "The traffic was very slow today.", p: "adjective" },
  hot: { d: "Having a high degree of heat or a high temperature.", e: "Be careful — the tea is very hot.", p: "adjective" },
  happy: { d: "Feeling or showing pleasure or contentment.", e: "The children were happy to see their grandparents.", p: "adjective" },
  easy: { d: "Achieved without great effort; presenting few difficulties.", e: "The test was quite easy.", p: "adjective" },
  good: { d: "To be desired or approved of; of a high quality or standard.", e: "This restaurant serves very good food.", p: "adjective" },
  bad: { d: "Of poor quality or a low standard.", e: "The weather has been really bad this week.", p: "adjective" },
  small: { d: "Of a size that is less than normal or usual; not large.", e: "They live in a small village.", p: "adjective" },
  family: { d: "A group consisting of parents and their children, living together as a unit.", e: "My family is very close.", p: "noun" },
  food: { d: "Any nutritious substance that people or animals eat or drink to maintain life and growth.", e: "Indian food is known for its spices.", p: "noun" },
  drink: { d: "A liquid that can be swallowed as refreshment or nourishment.", e: "Would you like a cold drink?", p: "noun" },
  about: { d: "On the subject of; concerning.", e: "Tell me about your day.", p: "preposition" },
  room: { d: "A part of a building enclosed by walls, floor, and ceiling.", e: "My room has a big window.", p: "noun" },
  second: { d: "Coming after the first in time or order; 2nd.", e: "This is the second time I've been here.", p: "adjective" },
  ball: { d: "A solid or hollow round object used in games and sports.", e: "He kicked the ball over the fence.", p: "noun" },
  bottle: { d: "A container with a narrow neck, used for storing liquids.", e: "She drank a bottle of water.", p: "noun" },
  bread: { d: "A food made by baking a dough of flour, water, and yeast.", e: "I bought a loaf of bread from the bakery.", p: "noun" },
  brother: { d: "A man or boy in relation to other children of the same parents.", e: "My brother is older than me.", p: "noun" },
  button: { d: "A small disc sewn on a garment to fasten it, or a device pressed to operate a machine.", e: "Press the button to open the door.", p: "noun" },
  cake: { d: "A sweet baked food made from a mixture of flour, sugar, eggs, and butter.", e: "She made a chocolate cake for the party.", p: "noun" },
  card: { d: "A piece of thick paper or thin cardboard, used for writing or printing on.", e: "She sent me a birthday card.", p: "noun" },
  arm: { d: "The upper limb of the human body from the shoulder to the hand.", e: "She broke her arm playing football.", p: "noun" },
  animal: { d: "A living organism that feeds on organic matter, typically with specialised sense organs.", e: "The tiger is a beautiful animal.", p: "noun" },
  article: { d: "A piece of writing included in a newspaper, magazine, or other publication.", e: "I read an interesting article about climate change.", p: "noun" },
  ask: { d: "To say something in order to get an answer or some information.", e: "Can I ask you a question?", p: "verb" },
  background: { d: "The part of a picture or scene that is behind the main objects or people.", e: "There are mountains in the background of the photo.", p: "noun" },
  bag: { d: "A flexible container with an opening at the top, used for carrying things.", e: "She put her books in her bag.", p: "noun" },
  banana: { d: "A long curved tropical fruit with a yellow skin and soft sweet flesh.", e: "I had a banana for breakfast.", p: "noun" },
  band: { d: "A group of musicians who play popular music together.", e: "The band played at the wedding.", p: "noun" },
  beach: { d: "An area of sand or small stones beside the sea or a lake.", e: "We spent the afternoon at the beach.", p: "noun" },
  bicycle: { d: "A vehicle with two wheels that you ride by pushing pedals with your feet.", e: "He rides his bicycle to school.", p: "noun" },
  bike: { d: "A bicycle or motorcycle.", e: "She goes to work by bike.", p: "noun" },
  boat: { d: "A small vessel for travelling on water.", e: "They crossed the river by boat.", p: "noun" },
  boot: { d: "A sturdy item of footwear covering the foot and ankle.", e: "She wore her rain boots in the mud.", p: "noun" },
  and: { d: "Used to connect words, phrases, or clauses.", e: "Bread and butter.", p: "conjunction" },
  because: { d: "For the reason that; since.", e: "I stayed home because I was tired.", p: "conjunction" },
  but: { d: "Used to introduce something contrasting with what has already been said.", e: "I wanted to go, but I was too tired.", p: "conjunction" },
  both: { d: "Used to refer to two people or things together.", e: "Both my parents are teachers.", p: "determiner" },
  away: { d: "To or at a distance from a particular place or person.", e: "She walked away without looking back.", p: "adverb" },
  ago: { d: "Before the present; in the past.", e: "I moved here two years ago.", p: "adverb" },
  actually: { d: "In fact; really; as a matter of fact.", e: "Actually, I think you're right.", p: "adverb" },
  simply: { d: "In a straightforward or plain manner; just; merely.", e: "I simply don't have the time.", p: "adverb" },
  barely: { d: "Only just; almost not; scarcely.", e: "I could barely hear what she said.", p: "adverb" },
  anything: { d: "Used to refer to a thing, no matter what.", e: "Is there anything I can help with?", p: "pronoun" },
  she: { d: "Used to refer to a woman or girl previously mentioned or easily identified.", e: "She is my best friend.", p: "pronoun" },
  "o'clock": { d: "Used after a number to indicate the hour when telling the time.", e: "The meeting is at three o'clock.", p: "adverb" },
  social: { d: "Relating to society or its organisation; needing companionship.", e: "Social media has changed how we communicate.", p: "adjective" },
  female: { d: "Of or relating to women or girls.", e: "The school has both male and female students.", p: "adjective" },
  male: { d: "Of or relating to men or boys.", e: "The doctor asked if the patient was male or female.", p: "adjective" },
  relationship: { d: "The way in which two or more people or things are connected.", e: "She has a good relationship with her colleagues.", p: "noun" },
  heating: { d: "Equipment or a system used to provide warmth in a building.", e: "The central heating keeps the house warm.", p: "noun" },
  pleasure: { d: "A feeling of happy satisfaction and enjoyment.", e: "It's a pleasure to meet you.", p: "noun" },
  sex: { d: "Either of the two main categories (male and female) into which humans are divided.", e: "Please indicate your sex on the form.", p: "noun" },
  sexual: { d: "Relating to the physical differences between male and female.", e: "Sexual discrimination is illegal in many countries.", p: "adjective" },
  desire: { d: "A strong feeling of wanting something or wishing for something to happen.", e: "She had a strong desire to travel the world.", p: "noun" },
  correspond: { d: "To have a close similarity; to match or agree.", e: "The numbers correspond to the items on the list.", p: "verb" },
  intact: { d: "Not damaged or impaired in any way; complete.", e: "The building survived the earthquake intact.", p: "adjective" },
  intriguing: { d: "Arousing great curiosity or interest; fascinating.", e: "The detective found an intriguing clue.", p: "adjective" },
  lesbian: { d: "A woman who is attracted to other women.", e: "The organisation supports lesbian and gay rights.", p: "noun" },
  sexuality: { d: "A person's identity in relation to the gender they are attracted to.", e: "Everyone should be respected regardless of their sexuality.", p: "noun" },
  sexy: { d: "Attractive in an exciting way.", e: "The advertisement featured a sexy new car design.", p: "adjective" },
  rape: { d: "A criminal act of forcing someone into unwanted physical contact.", e: "Rape is a serious criminal offence.", p: "noun" },
  nut: { d: "A hard-shelled fruit of certain plants, containing an edible kernel.", e: "She's allergic to nuts.", p: "noun" },
  knee: { d: "The joint between the thigh and the lower leg.", e: "He hurt his knee while playing football.", p: "noun" },
  communicate: { d: "To share information, ideas, or feelings with another person.", e: "It's important to communicate clearly.", p: "verb" },
  beginning: { d: "The point in time or space at which something starts.", e: "Read from the beginning of the chapter.", p: "noun" },
  autumn: { d: "The season between summer and winter, when leaves fall from trees.", e: "The leaves turn golden in autumn.", p: "noun" },
  august: { d: "The eighth month of the year, between July and September.", e: "We're going on holiday in August.", p: "noun" },
  camping: { d: "The activity of spending a holiday living in a tent.", e: "We went camping in the mountains last summer.", p: "noun" },
  cannot: { d: "Be unable to; to not have the ability to do something.", e: "I cannot find my keys anywhere.", p: "verb" },
  run: { d: "To move at a speed faster than walking.", e: "She runs five kilometres every morning.", p: "verb" },
  read: { d: "To look at and understand the meaning of written or printed words.", e: "I like to read before going to sleep.", p: "verb" },
  write: { d: "To mark letters, words, or numbers on a surface with a pen or pencil.", e: "Please write your name at the top of the page.", p: "verb" },
  open: { d: "To move a door, window, or lid so that it is no longer closed.", e: "Please open the window — it's hot in here.", p: "verb" },
  sleep: { d: "To rest with your eyes closed and your mind and body inactive.", e: "I usually sleep for eight hours a night.", p: "verb" },
  drive: { d: "To operate and control the direction and speed of a motor vehicle.", e: "She drives to work every day.", p: "verb" },
  close: { d: "To move something so that it covers an opening; to shut.", e: "Close the door, please — it's cold.", p: "verb" },
  buy: { d: "To obtain something by paying money for it.", e: "I need to buy some groceries.", p: "verb" },
  sell: { d: "To give something to someone in exchange for money.", e: "They want to sell their house.", p: "verb" },
  speak: { d: "To say words in order to communicate with someone.", e: "Do you speak English?", p: "verb" },
  listen: { d: "To give attention to sound; to pay attention to someone speaking.", e: "Listen carefully to the instructions.", p: "verb" },
  sit: { d: "To be in a position with your weight supported by your bottom.", e: "Please sit down and make yourself comfortable.", p: "verb" },
  stand: { d: "To be in an upright position on your feet.", e: "We had to stand in a long queue.", p: "verb" },
  think: { d: "To use your mind to consider something or form ideas.", e: "I think this is a good idea.", p: "verb" },
  know: { d: "To be aware of something through observation, inquiry, or information.", e: "Do you know the answer?", p: "verb" },
  feel: { d: "To experience an emotion or sensation.", e: "I feel happy today.", p: "verb" },
  want: { d: "To have a desire to possess or do something.", e: "I want to learn a new language.", p: "verb" },
  need: { d: "To require something because it is essential or very important.", e: "I need a glass of water.", p: "verb" },
  try: { d: "To make an attempt or effort to do something.", e: "I'll try to finish the work by tomorrow.", p: "verb" },
  help: { d: "To make it easier for someone to do something; to assist.", e: "Can you help me carry these bags?", p: "verb" },
  start: { d: "To begin or cause to begin an action or activity.", e: "The movie starts at eight o'clock.", p: "verb" },
  stop: { d: "To cease moving or operating; to come to an end.", e: "The bus stops here every ten minutes.", p: "verb" },
  give: { d: "To freely transfer possession of something to someone.", e: "She gave me a present for my birthday.", p: "verb" },
  take: { d: "To reach for and hold something; to carry or move.", e: "Take your umbrella — it might rain.", p: "verb" },
  make: { d: "To form something by putting parts together or combining substances.", e: "She makes delicious biryani.", p: "verb" },
  come: { d: "To move or travel towards the speaker or a specified place.", e: "Come here and look at this.", p: "verb" },
  go: { d: "To move or travel from one place to another.", e: "I go to the gym three times a week.", p: "verb" },
  see: { d: "To perceive with the eyes; to become aware of something by looking.", e: "Can you see that bird in the tree?", p: "verb" },
  look: { d: "To direct your eyes in order to see something.", e: "Look at the beautiful sunset!", p: "verb" },
  find: { d: "To discover something or someone unexpectedly or after searching.", e: "I can't find my keys.", p: "verb" },
  work: { d: "To be engaged in physical or mental activity in order to achieve a result.", e: "She works as a software engineer.", p: "verb" },
  call: { d: "To contact someone by telephone.", e: "I'll call you when I arrive.", p: "verb" },
  use: { d: "To take, hold, or deploy something as a means of achieving a purpose.", e: "Can I use your pen?", p: "verb" },
  move: { d: "To go or change from one place or position to another.", e: "We moved to a new house last month.", p: "verb" },
  live: { d: "To have one's home in a particular place.", e: "I live in New Delhi.", p: "verb" },
  turn: { d: "To move in a circular direction or change direction.", e: "Turn left at the traffic lights.", p: "verb" },
  put: { d: "To move something to a particular place or position.", e: "Put your bag on the chair.", p: "verb" },
  keep: { d: "To continue to have something; to retain possession of.", e: "You can keep the change.", p: "verb" },
  let: { d: "To allow or permit.", e: "Let me help you with that.", p: "verb" },
  leave: { d: "To go away from a place or person.", e: "I need to leave by five o'clock.", p: "verb" },
  show: { d: "To make something visible or known to someone.", e: "Can you show me how to do it?", p: "verb" },
  learn: { d: "To gain knowledge or skill by studying, practising, or being taught.", e: "I want to learn to play the guitar.", p: "verb" },
  change: { d: "To make or become different.", e: "The weather can change quickly in the mountains.", p: "verb" },
  bring: { d: "To carry or convey something to a place or person.", e: "Please bring your books to class.", p: "verb" },
  meet: { d: "To come into the presence or company of someone.", e: "I'll meet you at the café at noon.", p: "verb" },
  pay: { d: "To give money in exchange for goods or services.", e: "I need to pay the electricity bill.", p: "verb" },
  spend: { d: "To use money to buy things, or to pass time in a particular way.", e: "How do you spend your weekends?", p: "verb" },
  win: { d: "To be successful or victorious in a contest or conflict.", e: "India won the cricket match.", p: "verb" },
  lose: { d: "To be deprived of or cease to have something.", e: "Don't lose your train ticket.", p: "verb" },
  send: { d: "To cause something to go or be taken to a destination.", e: "I'll send you an email tomorrow.", p: "verb" },
  build: { d: "To construct something by putting parts together.", e: "They're building a new hospital.", p: "verb" },
  carry: { d: "To hold something and move it from one place to another.", e: "Can you carry this box for me?", p: "verb" },
  grow: { d: "To increase in size or amount over time; to cultivate plants.", e: "The children are growing so fast.", p: "verb" },
  watch: { d: "To look at or observe something attentively.", e: "We watched a movie last night.", p: "verb" },
  wait: { d: "To stay in one place until an expected event happens.", e: "Please wait here — I'll be back soon.", p: "verb" },
  light: { d: "The natural agent that makes things visible; brightness.", e: "Turn on the light, please.", p: "noun" },
  bit: { d: "A small piece or amount of something.", e: "Can I have a bit of cake?", p: "noun" },
  dance: { d: "To move the body rhythmically to music.", e: "She loves to dance at parties.", p: "verb" },
  cook: { d: "To prepare food by heating it.", e: "My mother cooks delicious meals.", p: "verb" },
  laugh: { d: "To make sounds and movements of the face that show you think something is funny.", e: "The joke made everyone laugh.", p: "verb" },
  cry: { d: "To produce tears from the eyes because of sadness, pain, or strong emotion.", e: "The baby started to cry.", p: "verb" },
  fly: { d: "To move through the air under control.", e: "Birds can fly long distances.", p: "verb" },
  jump: { d: "To push yourself off the ground and into the air using your legs.", e: "The cat jumped onto the table.", p: "verb" },
  sing: { d: "To make musical sounds with your voice.", e: "She sings beautifully.", p: "verb" },
  teach: { d: "To instruct or give lessons to someone.", e: "She teaches English at a local school.", p: "verb" },
  discuss: { d: "To talk about something in order to reach a decision or exchange ideas.", e: "We need to discuss this matter urgently.", p: "verb" },
  street: { d: "A public road in a city or town, usually with buildings on each side.", e: "They live on a quiet street near the park.", p: "noun" },
  country: { d: "A nation with its own government, occupying a particular territory.", e: "India is a large and diverse country.", p: "noun" },
  world: { d: "The earth, together with all of its countries and peoples.", e: "She wants to travel around the world.", p: "noun" },
  house: { d: "A building for people to live in, usually for one family.", e: "They bought a new house last year.", p: "noun" },
  computer: { d: "An electronic device for storing and processing data.", e: "I use my computer for work and study.", p: "noun" },
  internet: { d: "A global network connecting millions of computers.", e: "You can find the information on the internet.", p: "noun" },
  news: { d: "Newly received or noteworthy information, especially about recent events.", e: "Did you watch the news last night?", p: "noun" },
  photo: { d: "A picture made using a camera.", e: "She took a photo of the Taj Mahal.", p: "noun" },
  death: { d: "The end of the life of a person or organism.", e: "His death was a great loss to the community.", p: "noun" },
  answer: { d: "A response to a question, letter, or situation.", e: "Do you know the answer to question five?", p: "noun" },
  class: { d: "A group of students who are taught together.", e: "There are 30 students in my class.", p: "noun" },
  test: { d: "A procedure intended to establish the quality or knowledge of something.", e: "We have a maths test tomorrow.", p: "noun" },
  chair: { d: "A separate seat for one person, with a back and sometimes arms.", e: "Please take a chair and sit down.", p: "noun" },
  bed: { d: "A piece of furniture for sleeping on.", e: "I go to bed at ten o'clock.", p: "noun" },
  paper: { d: "Thin material made from wood pulp, used for writing and printing.", e: "Write your answer on a piece of paper.", p: "noun" },
  point: { d: "The main idea, purpose, or importance of something.", e: "What's the point of this exercise?", p: "noun" },
  end: { d: "The final part of something.", e: "I'll wait for you at the end of the road.", p: "noun" },
  line: { d: "A long narrow mark or band.", e: "Draw a straight line across the page.", p: "noun" },
  side: { d: "A position to the left or right of an object, place, or person.", e: "Walk on the left side of the road.", p: "noun" },
  part: { d: "A piece or segment of something.", e: "This is the best part of the movie.", p: "noun" },
  place: { d: "A particular position, point, or area.", e: "This is a beautiful place to visit.", p: "noun" },
  number: { d: "A quantity or value expressed by a word or symbol.", e: "What's your phone number?", p: "noun" },
  key: { d: "A small piece of metal used to open or close a lock.", e: "I left my keys inside the house.", p: "noun" },
  back: { d: "The rear surface of the human body from the shoulders to the hips.", e: "She lay on her back and looked at the sky.", p: "noun" },
  thing: { d: "An object, fact, or event that is not specifically named.", e: "The first thing I do in the morning is make tea.", p: "noun" },
  lot: { d: "A large number or amount.", e: "There were a lot of people at the market.", p: "noun" },
  right: { d: "Morally good, justified, or acceptable; correct.", e: "You gave the right answer.", p: "adjective" },
  wrong: { d: "Not correct or true; mistaken.", e: "Sorry, you've got the wrong number.", p: "adjective" },
  old: { d: "Having lived for many years; not young.", e: "My grandmother is ninety years old.", p: "adjective" },
  young: { d: "Having lived or existed for only a short time; not old.", e: "He is too young to drive.", p: "adjective" },
  new: { d: "Not existing before; recently made, discovered, or created.", e: "I bought a new pair of shoes.", p: "adjective" },
  high: { d: "Extending a long way above the ground; of great vertical extent.", e: "The mountain is very high.", p: "adjective" },
  low: { d: "Below the usual or expected level.", e: "Prices are low at this shop.", p: "adjective" },
  full: { d: "Containing or holding as much or as many as possible.", e: "The bus is full — we'll have to wait.", p: "adjective" },
  empty: { d: "Containing nothing; not filled.", e: "The bottle is empty.", p: "adjective" },
  open: { d: "Allowing access; not closed or blocked.", e: "The shop is open until nine o'clock.", p: "adjective" },
  early: { d: "Before the usual or expected time.", e: "I woke up early this morning.", p: "adjective" },
  late: { d: "After the expected or usual time; not on time.", e: "Sorry I'm late — the traffic was terrible.", p: "adjective" },
  possible: { d: "Able to be done or achieved.", e: "Is it possible to change my booking?", p: "adjective" },
  important: { d: "Of great significance or value; likely to have a big effect.", e: "Education is very important.", p: "adjective" },
  different: { d: "Not the same as another or each other.", e: "We have different opinions on this topic.", p: "adjective" },
  great: { d: "Of an extent, amount, or intensity considerably above average.", e: "She's done a great job.", p: "adjective" },
  sure: { d: "Confident in what one thinks or knows; having no doubt.", e: "Are you sure about that?", p: "adjective" },
  free: { d: "Not under the control of another; not imprisoned; without cost.", e: "The museum offers free entry on Sundays.", p: "adjective" },
  little: { d: "Small in size, amount, or degree.", e: "She has a little dog called Coco.", p: "adjective" },
  ready: { d: "In a suitable state for an activity; prepared.", e: "Are you ready to go?", p: "adjective" },
  real: { d: "Actually existing; not imagined or supposed.", e: "Is this a real diamond?", p: "adjective" },
  true: { d: "In accordance with fact or reality; correct.", e: "Is it true that you're moving to Mumbai?", p: "adjective" },
  own: { d: "Belonging to the person specified.", e: "I have my own room.", p: "adjective" },
  clear: { d: "Easy to understand; obvious.", e: "The instructions were clear and simple.", p: "adjective" },
  available: { d: "Able to be used or obtained; free to do something.", e: "This product is available online.", p: "adjective" },
  together: { d: "With or near to another person or people.", e: "We went to the park together.", p: "adverb" },
  quite: { d: "To the utmost or most absolute extent or degree; fairly.", e: "The exam was quite difficult.", p: "adverb" },
  already: { d: "Before or by the present or a specified time.", e: "I've already finished my homework.", p: "adverb" },
  still: { d: "Up to and including the present or the time mentioned; even now.", e: "She still lives with her parents.", p: "adverb" },
  never: { d: "At no time; not ever.", e: "I have never been to London.", p: "adverb" },
  always: { d: "At all times; on every occasion.", e: "She always arrives on time.", p: "adverb" },
  often: { d: "Frequently; many times.", e: "I often go for a walk after dinner.", p: "adverb" },
  sometimes: { d: "Occasionally; now and then.", e: "Sometimes I take the bus, sometimes I walk.", p: "adverb" },
  usually: { d: "Under normal conditions; generally.", e: "I usually have tea in the morning.", p: "adverb" },
  probably: { d: "Almost certainly; very likely.", e: "It will probably rain this afternoon.", p: "adverb" },
  really: { d: "In actual fact; truly; very or thoroughly.", e: "I'm really happy to see you.", p: "adverb" },
  today: { d: "On this present day.", e: "Today is a holiday.", p: "adverb" },
  tomorrow: { d: "On the day after today.", e: "I have a meeting tomorrow.", p: "adverb" },
  yesterday: { d: "On the day before today.", e: "I saw her yesterday at the market.", p: "adverb" },
  just: { d: "Very recently; in the immediate past; only.", e: "I just got home from work.", p: "adverb" },
  also: { d: "In addition; too.", e: "He speaks Hindi and also Tamil.", p: "adverb" },
  enough: { d: "To the required degree or extent; sufficiently.", e: "Is the room warm enough?", p: "adverb" },
  very: { d: "Used to emphasise that something is to a great degree.", e: "The movie was very exciting.", p: "adverb" },
  here: { d: "In, at, or to this place or position.", e: "Come here, please.", p: "adverb" },
  there: { d: "In, at, or to that place or position.", e: "I left my bag over there.", p: "adverb" },
  now: { d: "At the present time or moment.", e: "We need to leave now.", p: "adverb" },
  then: { d: "At that time; after that.", e: "We had breakfast, and then we left.", p: "adverb" },
  well: { d: "In a good or satisfactory way.", e: "She speaks English very well.", p: "adverb" },
  maybe: { d: "Perhaps; possibly.", e: "Maybe we should try a different approach.", p: "adverb" },
  perhaps: { d: "Used to express possibility or uncertainty.", e: "Perhaps we could meet next week.", p: "adverb" },
  welcome: { d: "An instance or manner of greeting someone.", e: "Welcome to India!", p: "interjection" },
  restaurant: { d: "A place where people pay to sit and eat meals.", e: "We had dinner at a nice restaurant.", p: "noun" },
  taxi: { d: "A car that you can hire with a driver, to take you where you want to go.", e: "Let's take a taxi to the airport.", p: "noun" },
};

// ── Blocklist patterns for definitions we never want ──
const BLOCKLIST = /penis|breasts|sex with|sexual intercourse|genitals|erotic|orgasm|ejacul|circumcis|buttocks|prostitut/i;

// ── POS priority: prefer the Oxford-expected POS ──
function posFromOxford(oxPos) {
  const p = [];
  if (oxPos.includes('n.')) p.push('noun');
  if (oxPos.includes('v.')) p.push('verb');
  if (oxPos.includes('adj.')) p.push('adjective');
  if (oxPos.includes('adv.')) p.push('adverb');
  if (oxPos.includes('prep.')) p.push('preposition');
  if (oxPos.includes('conj.')) p.push('conjunction');
  if (oxPos.includes('pron.')) p.push('pronoun');
  if (oxPos.includes('det.')) p.push('determiner');
  if (oxPos.includes('exclam.')) p.push('interjection');
  if (oxPos.includes('number')) p.push('numeral');
  return p;
}

// ── Build Oxford POS map ──
const oxPosMap = {};
for (const entry of [...ox3000, ...ox5000]) {
  const w = entry.word.split(/[,/]/)[0].trim().toLowerCase();
  if (!oxPosMap[w]) oxPosMap[w] = [];
  const parsed = posFromOxford(entry.pos);
  for (const p of parsed) {
    if (!oxPosMap[w].includes(p)) oxPosMap[w].push(p);
  }
}

// ── Identify words needing re-fetch ──
const needsRefetch = [];
for (const [word, info] of Object.entries(defs)) {
  if (MANUAL_OVERRIDES[word]) continue; // Will be manually fixed
  if (!info.d) continue;

  const expected = oxPosMap[word] || [];
  const isPOSMismatch = expected.length > 0 && !expected.includes(info.p);
  const isBlocklisted = BLOCKLIST.test(info.d);
  const isTooShort = info.d.length < 15;
  const isObscure = /velarized|palatalized|phonetic|morpheme/.test(info.d);

  if (isPOSMismatch || isBlocklisted || isTooShort || isObscure) {
    needsRefetch.push(word);
  }
}

console.log(`Manual overrides: ${Object.keys(MANUAL_OVERRIDES).length}`);
console.log(`Words to re-fetch from API: ${needsRefetch.length}`);
console.log(`Est. time: ~${Math.round(needsRefetch.length * 0.5 / 60)} min`);

// ── Phase 1: Apply manual overrides ──
let manualFixed = 0;
for (const [word, fix] of Object.entries(MANUAL_OVERRIDES)) {
  defs[word] = fix;
  manualFixed++;
}
console.log(`Applied ${manualFixed} manual overrides`);

// ── Phase 2: Re-fetch from API with POS-aware selection ──
const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DELAY_MS = 450;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchBetterDef(word, preferredPos) {
  try {
    const res = await fetch(API + encodeURIComponent(word), { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) return null;

    let bestDef = '';
    let bestExample = '';
    let bestPos = '';
    let fallbackDef = '';
    let fallbackExample = '';
    let fallbackPos = '';

    for (const entry of data) {
      for (const meaning of entry.meanings || []) {
        const isPreferred = preferredPos.length === 0 || preferredPos.includes(meaning.partOfSpeech);
        for (const def of meaning.definitions || []) {
          if (!def.definition || BLOCKLIST.test(def.definition)) continue;
          if (def.definition.length < 10) continue;

          if (isPreferred && !bestDef) {
            bestDef = def.definition;
            bestPos = meaning.partOfSpeech || '';
            bestExample = def.example || '';
          }
          if (!fallbackDef) {
            fallbackDef = def.definition;
            fallbackPos = meaning.partOfSpeech || '';
            fallbackExample = def.example || '';
          }
          // Keep looking for an example even after finding definition
          if (isPreferred && bestDef && !bestExample && def.example) {
            bestExample = def.example;
          }
          if (bestDef && bestExample) break;
        }
        if (bestDef && bestExample) break;
      }
      if (bestDef && bestExample) break;
    }

    const finalDef = bestDef || fallbackDef;
    const finalPos = bestDef ? bestPos : fallbackPos;
    const finalEx = (bestDef ? bestExample : fallbackExample) || '';

    if (!finalDef) return null;
    return { d: finalDef, e: finalEx, p: finalPos };
  } catch {
    return null;
  }
}

// Process in batches
let fixed = 0;
let failed = 0;

for (let i = 0; i < needsRefetch.length; i++) {
  const word = needsRefetch[i];
  const preferred = oxPosMap[word] || [];
  const result = await fetchBetterDef(word, preferred);

  if (result) {
    defs[word] = result;
    fixed++;
  } else {
    failed++;
  }

  if ((i + 1) % 50 === 0 || i === needsRefetch.length - 1) {
    // Save progress
    writeFileSync(join(ROOT, 'src/content/word-definitions.json'), JSON.stringify(defs, null, 0), 'utf-8');
    const pct = ((i + 1) / needsRefetch.length * 100).toFixed(0);
    console.log(`[${i + 1}/${needsRefetch.length}] ${pct}% — fixed: ${fixed}, failed: ${failed}`);
  }

  await sleep(DELAY_MS);
}

// Final save
writeFileSync(join(ROOT, 'src/content/word-definitions.json'), JSON.stringify(defs, null, 0), 'utf-8');
console.log(`\nDone! Manual: ${manualFixed}, API-fixed: ${fixed}, failed: ${failed}`);
console.log(`Total definitions: ${Object.values(defs).filter(v => v.d).length}`);
