import { type VocabularyWord, type CEFRLevel, type SupportedLanguage } from '../lib/firestore';
import oxfordData from './oxford-3000.json';
import oxford5000Extra from './oxford-5000-extra.json';
import wordDefsRaw from './word-definitions.json';

// ------------------------------------------------------------------
// Oxford 3000 (A1-B2) + Oxford 5000 extra (B2-C1) word lists
// Combined: ~5300 unique words across all IELTS band levels
// ------------------------------------------------------------------

interface OxfordEntry {
  word: string;
  pos: string;
  level: string;
}

// Definitions fetched from the Free Dictionary API
const wordDefs: Record<string, { d: string; e: string; p: string }> = wordDefsRaw as Record<string, { d: string; e: string; p: string }>;

const emptyTranslations: Record<SupportedLanguage, string> = {
  en: '', hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
};

function cleanWord(w: string): string {
  let c = w;
  // Strip parenthetical annotations: "bank (money)" → "bank"
  c = c.replace(/\s*\(.*$/, '');
  // Strip grammar labels: "each det./pron./adv." → "each"
  c = c.replace(/\s+(det|pron|adv|adj|conj|prep|exclam|n|v)\..*/i, '');
  // Strip trailing numbers: "last1" → "last"
  c = c.replace(/\d+$/, '');
  // Split on comma/slash for any remaining noise
  c = c.split(/[,/]/)[0];
  return c.trim().toLowerCase();
}

function oxfordToVocabularyWord(entry: OxfordEntry, index: number): VocabularyWord {
  const levelMap: Record<string, CEFRLevel> = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1' };
  const key = cleanWord(entry.word);
  const def = wordDefs[key];
  return {
    id: `ox3k-${index}`,
    word: entry.word,
    partOfSpeech: entry.pos,
    level: levelMap[entry.level] || 'A1',
    meaning: { ...emptyTranslations, en: def?.d || entry.word },
    example: def?.e || '',
    exampleTranslation: { ...emptyTranslations },
    pronunciation: '',
    tags: [],
    oxfordList: (['A1', 'A2', 'B1'].includes(entry.level) ? 'A' : 'B') as 'A' | 'B',
  };
}

// Build vocabulary arrays from both Oxford lists
const oxford3000: VocabularyWord[] = (oxfordData as OxfordEntry[]).map(oxfordToVocabularyWord);

const oxford5000: VocabularyWord[] = (oxford5000Extra as OxfordEntry[]).map((entry, index) => ({
  ...oxfordToVocabularyWord(entry, index),
  id: `ox5k-${index}`,
  oxfordList: 'B' as const,
}));

// Combined Oxford vocabulary (3000 + 2000 extra = ~5300 unique words)
const oxfordVocabulary: VocabularyWord[] = [...oxford3000, ...oxford5000];

// Hand-crafted sample vocabulary with full translations (global market focus)

export const sampleVocabulary: VocabularyWord[] = [
  // ==================== A1 - Basic Everyday Words ====================
  {
    id: 'v-a1-001', word: 'family', partOfSpeech: 'noun', level: 'A1',
    meaning: {
      en: 'a group of people related to each other', hi: 'परिवार', ta: 'குடும்பம்', te: 'కుటుంబం',
      bn: 'পরিবার', mr: 'कुटुंब', kn: 'ಕುಟುಂಬ', ml: 'കുടുംബം', gu: 'પરિવાર', pa: 'ਪਰਿਵਾਰ', od: 'ପରିବାର',
    },
    example: 'I live with my family in London.',
    exampleTranslation: {
      en: '', hi: 'मैं अपने परिवार के साथ दिल्ली में रहता हूँ।', ta: 'நான் என் குடும்பத்துடன் டெல்லியில் வசிக்கிறேன்.',
      te: 'నేను నా కుటుంబంతో ఢిల్లీలో ఉంటాను.', bn: 'আমি আমার পরিবারের সাথে দিল্লিতে থাকি।',
      mr: 'मी माझ्या कुटुंबासोबत दिल्लीत राहतो.', kn: 'ನಾನು ನನ್ನ ಕುಟುಂಬದೊಂದಿಗೆ ದೆಹಲಿಯಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ.',
      ml: 'ഞാൻ എന്റെ കുടുംബത്തോടൊപ്പം ഡൽഹിയിൽ താമസിക്കുന്നു.', gu: 'હું મારા પરિવાર સાથે દિલ્હીમાં રહું છું.',
      pa: 'ਮੈਂ ਆਪਣੇ ਪਰਿਵਾਰ ਨਾਲ ਦਿੱਲੀ ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।', od: 'ମୁଁ ମୋ ପରିବାର ସହ ଦିଲ୍ଲୀରେ ରୁହେ।',
    },
    pronunciation: '/ˈfæm.ɪ.li/', tags: ['daily-life', 'relationships'], oxfordList: 'A',
  },
  {
    id: 'v-a1-002', word: 'water', partOfSpeech: 'noun', level: 'A1',
    meaning: {
      en: 'a clear liquid that you drink', hi: 'पानी', ta: 'தண்ணீர்', te: 'నీళ్ళు',
      bn: 'জল/পানি', mr: 'पाणी', kn: 'ನೀರು', ml: 'വെള്ളം', gu: 'પાણી', pa: 'ਪਾਣੀ', od: 'ପାଣି',
    },
    example: 'Can I have a glass of water, please?',
    exampleTranslation: {
      en: '', hi: 'क्या मुझे एक गिलास पानी मिल सकता है?', ta: 'தயவுசெய்து ஒரு கிளாஸ் தண்ணீர் தருவீர்களா?',
      te: 'దయచేసి ఒక గ్లాసు నీళ్ళు ఇస్తారా?', bn: 'একগ্লাস জল দেবেন?',
      mr: 'एक ग्लास पाणी मिळेल का?', kn: 'ಒಂದು ಲೋಟ ನೀರು ಕೊಡುತ್ತೀರಾ?',
      ml: 'ഒരു ഗ്ലാസ് വെള്ളം തരാമോ?', gu: 'એક ગ્લાસ પાણી આપશો?',
      pa: 'ਇੱਕ ਗਿਲਾਸ ਪਾਣੀ ਦੇਵੋਗੇ?', od: 'ଗୋଟିଏ ଗ୍ଲାସ ପାଣି ଦେବେ କି?',
    },
    pronunciation: '/ˈwɔː.tər/', tags: ['food-drink', 'daily-life'], oxfordList: 'A',
  },
  {
    id: 'v-a1-003', word: 'friend', partOfSpeech: 'noun', level: 'A1',
    meaning: {
      en: 'a person you like and enjoy spending time with', hi: 'दोस्त', ta: 'நண்பன்/நண்பி',
      te: 'స్నేహితుడు', bn: 'বন্ধু', mr: 'मित्र', kn: 'ಸ್ನೇಹಿತ', ml: 'സുഹൃത്ത്', gu: 'મિત્ર',
      pa: 'ਦੋਸਤ', od: 'ବନ୍ଧୁ',
    },
    example: 'Thomas is my best friend.',
    exampleTranslation: {
      en: '', hi: 'राहुल मेरा सबसे अच्छा दोस्त है।', ta: 'ராகுல் என் சிறந்த நண்பன்.',
      te: 'రాహుల్ నా మంచి స్నేహితుడు.', bn: 'রাহুল আমার সেরা বন্ধু।',
      mr: 'राहुल माझा सर्वात जवळचा मित्र आहे.', kn: 'ರಾಹುಲ್ ನನ್ನ ಆತ್ಮೀಯ ಸ್ನೇಹಿತ.',
      ml: 'രാഹുൽ എന്റെ ഏറ്റവും നല്ല സുഹൃത്താണ്.', gu: 'રાહુલ મારો સૌથી સારો મિત્ર છે.',
      pa: 'ਰਾਹੁਲ ਮੇਰਾ ਸਭ ਤੋਂ ਚੰਗਾ ਦੋਸਤ ਹੈ।', od: 'ରାହୁଲ ମୋର ସବୁଠାରୁ ଭଲ ବନ୍ଧୁ।',
    },
    pronunciation: '/frend/', tags: ['relationships', 'daily-life'], oxfordList: 'A',
  },
  {
    id: 'v-a1-004', word: 'school', partOfSpeech: 'noun', level: 'A1',
    meaning: {
      en: 'a place where children go to learn', hi: 'स्कूल/विद्यालय', ta: 'பள்ளி',
      te: 'పాఠశాల', bn: 'স্কুল/বিদ্যালয়', mr: 'शाळा', kn: 'ಶಾಲೆ', ml: 'സ്കൂൾ/വിദ്യാലയം',
      gu: 'શાળા', pa: 'ਸਕੂਲ', od: 'ବିଦ୍ୟାଳୟ',
    },
    example: 'My school is near the railway station.',
    exampleTranslation: {
      en: '', hi: 'मेरा स्कूल रेलवे स्टेशन के पास है।', ta: 'என் பள்ளி ரயில் நிலையம் அருகில் உள்ளது.',
      te: 'నా పాఠశాల రైల్వే స్టేషన్ దగ్గర ఉంది.', bn: 'আমার স্কুল রেলওয়ে স্টেশনের কাছে।',
      mr: 'माझी शाळा रेल्वे स्थानकाजवळ आहे.', kn: 'ನನ್ನ ಶಾಲೆ ರೈಲ್ವೆ ನಿಲ್ದಾಣದ ಹತ್ತಿರ ಇದೆ.',
      ml: 'എന്റെ സ്കൂൾ റെയിൽവേ സ്റ്റേഷന് സമീപമാണ്.', gu: 'મારી શાળા રેલવે સ્ટેશન નજીક છે.',
      pa: 'ਮੇਰਾ ਸਕੂਲ ਰੇਲਵੇ ਸਟੇਸ਼ਨ ਦੇ ਨੇੜੇ ਹੈ।', od: 'ମୋ ବିଦ୍ୟାଳୟ ରେଳ ଷ୍ଟେସନ ପାଖରେ।',
    },
    pronunciation: '/skuːl/', tags: ['education', 'daily-life'], oxfordList: 'A',
  },

  // ==================== B1 - Intermediate Words ====================
  {
    id: 'v-b1-001', word: 'experience', partOfSpeech: 'noun', level: 'B1',
    meaning: {
      en: 'knowledge or skill gained from doing something', hi: 'अनुभव', ta: 'அனுபவம்',
      te: 'అనుభవం', bn: 'অভিজ্ঞতা', mr: 'अनुभव', kn: 'ಅನುಭವ', ml: 'അനുഭവം', gu: 'અનુભવ',
      pa: 'ਤਜ਼ਰਬਾ', od: 'ଅଭିଜ୍ଞତା',
    },
    example: 'She has five years of experience in software development.',
    exampleTranslation: {
      en: '', hi: 'उसे सॉफ्टवेयर डेवलपमेंट में पाँच साल का अनुभव है।',
      ta: 'அவளுக்கு மென்பொருள் மேம்பாட்டில் ஐந்து வருட அனுபவம் உள்ளது.',
      te: 'ఆమెకు సాఫ్ట్‌వేర్ డెవలప్‌మెంట్‌లో ఐదేళ్ల అనుభవం ఉంది.',
      bn: 'তার সফটওয়্যার ডেভেলপমেন্টে পাঁচ বছরের অভিজ্ঞতা আছে।',
      mr: 'तिला सॉफ्टवेअर डेव्हलपमेंटमध्ये पाच वर्षांचा अनुभव आहे.',
      kn: 'ಅವಳಿಗೆ ಸಾಫ್ಟ್‌ವೇರ್ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಐದು ವರ್ಷಗಳ ಅನುಭವವಿದೆ.',
      ml: 'അവൾക്ക് സോഫ്റ്റ്‌വെയർ ഡെവലപ്‌മെന്റിൽ അഞ്ച് വർഷത്തെ അനുഭവമുണ്ട്.',
      gu: 'તેણીને સોફ્ટવેર ડેવલપમેન્ટમાં પાંચ વર્ષનો અનુભવ છે.',
      pa: 'ਉਸ ਨੂੰ ਸੌਫਟਵੇਅਰ ਡਿਵੈਲਪਮੈਂਟ ਵਿੱਚ ਪੰਜ ਸਾਲ ਦਾ ਤਜ਼ਰਬਾ ਹੈ।',
      od: 'ତାଙ୍କର ସଫ୍ଟୱେର ଡେଭଲପମେଣ୍ଟରେ ପାଞ୍ଚ ବର୍ଷର ଅଭିଜ୍ଞତା ଅଛି।',
    },
    pronunciation: '/ɪkˈspɪə.ri.əns/', tags: ['work', 'education'], oxfordList: 'A',
  },
  {
    id: 'v-b1-002', word: 'opportunity', partOfSpeech: 'noun', level: 'B1',
    meaning: {
      en: 'a chance to do something', hi: 'अवसर', ta: 'வாய்ப்பு', te: 'అవకాశం',
      bn: 'সুযোগ', mr: 'संधी', kn: 'ಅವಕಾಶ', ml: 'അവസരം', gu: 'તક', pa: 'ਮੌਕਾ', od: 'ସୁଯୋଗ',
    },
    example: 'Toronto offers many opportunities for IT professionals.',
    exampleTranslation: {
      en: '', hi: 'बैंगलोर आईटी पेशेवरों के लिए कई अवसर प्रदान करता है।',
      ta: 'பெங்களூர் IT நிபுணர்களுக்கு பல வாய்ப்புகளை வழங்குகிறது.',
      te: 'బెంగళూరు IT నిపుణులకు అనేక అవకాశాలు అందిస్తుంది.',
      bn: 'ব্যাঙ্গালোর IT পেশাদারদের জন্য অনেক সুযোগ দেয়।',
      mr: 'बंगळुरू IT व्यावसायिकांसाठी अनेक संधी देते.',
      kn: 'ಬೆಂಗಳೂರು IT ವೃತ್ತಿಪರರಿಗೆ ಅನೇಕ ಅವಕಾಶಗಳನ್ನು ನೀಡುತ್ತದೆ.',
      ml: 'ബാംഗ്ലൂർ IT പ്രൊഫഷണലുകൾക്ക് ധാരാളം അവസരങ്ങൾ നൽകുന്നു.',
      gu: 'બેંગ્લોર IT વ્યાવસાયિકો માટે ઘણી તકો પૂરી પાડે છે.',
      pa: 'ਬੈਂਗਲੋਰ IT ਪੇਸ਼ੇਵਰਾਂ ਲਈ ਕਈ ਮੌਕੇ ਦਿੰਦਾ ਹੈ।',
      od: 'ବାଙ୍ଗାଲୋର IT ପେଶାଦାରଙ୍କ ପାଇଁ ଅନେକ ସୁଯୋଗ ଦିଏ।',
    },
    pronunciation: '/ˌɒp.əˈtʃuː.nɪ.ti/', tags: ['work', 'education'], oxfordList: 'A',
  },

  // ==================== C1 - Advanced Words ====================
  {
    id: 'v-c1-001', word: 'sustainable', partOfSpeech: 'adjective', level: 'C1',
    meaning: {
      en: 'able to continue over time without damaging the environment', hi: 'टिकाऊ/स्थायी',
      ta: 'நிலையான', te: 'సుస్థిర', bn: 'টেকসই', mr: 'शाश्वत', kn: 'ಸುಸ್ಥಿರ',
      ml: 'സുസ്ഥിര', gu: 'ટકાઉ', pa: 'ਟਿਕਾਊ', od: 'ସ୍ଥାୟୀ',
    },
    example: 'the country needs sustainable solutions for its growing energy needs.',
    exampleTranslation: {
      en: '', hi: 'भारत को अपनी बढ़ती ऊर्जा जरूरतों के लिए टिकाऊ समाधान चाहिए।',
      ta: 'இந்தியாவின் வளரும் எரிசக்தித் தேவைகளுக்கு நிலையான தீர்வுகள் தேவை.',
      te: 'భారతదేశానికి పెరుగుతున్న ఇంధన అవసరాలకు సుస్థిర పరిష్కారాలు అవసరం.',
      bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
    },
    pronunciation: '/səˈsteɪ.nə.bəl/', tags: ['environment', 'society'], oxfordList: 'B',
  },
  {
    id: 'v-c1-002', word: 'bureaucracy', partOfSpeech: 'noun', level: 'C1',
    meaning: {
      en: 'a system of government with many complicated rules and processes', hi: 'नौकरशाही',
      ta: 'அதிகாரத்துவம்', te: 'అధికారవ్యవస్థ', bn: 'আমলাতন্ত্র', mr: 'नोकरशाही',
      kn: 'ಅಧಿಕಾರಶಾಹಿ', ml: 'ഉദ്യോഗസ്ഥമേധാവിത്വം', gu: 'અમલદારશાહી', pa: 'ਨੌਕਰਸ਼ਾਹੀ', od: 'ଆମଲାତନ୍ତ୍ର',
    },
    example: 'Cutting through bureaucracy is one of the biggest challenges for businesses in many countries.',
    exampleTranslation: {
      en: '', hi: 'नौकरशाही से गुजरना भारत में व्यवसायों के लिए सबसे बड़ी चुनौतियों में से एक है।',
      ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '',
    },
    pronunciation: '/bjʊˈrɒk.rə.si/', tags: ['government', 'society', 'work'], oxfordList: 'B',
  },

  // ==================== C2 - Expert / Band 8-9 Words ====================
  {
    id: 'v-c2-001', word: 'ubiquitous', partOfSpeech: 'adjective', level: 'C2',
    meaning: {
      en: 'present, appearing, or found everywhere', hi: 'सर्वव्यापी',
      ta: 'எங்கும் நிறைந்த', te: 'సర్వవ్యాపకమైన', bn: 'সর্বব্যাপী', mr: 'सर्वव्यापी',
      kn: 'ಸರ್ವವ್ಯಾಪಿ', ml: 'സർവ്വവ്യാപി', gu: 'સર્વવ્યાપી', pa: 'ਸਰਵਵਿਆਪਕ', od: 'ସର୍ବବ୍ୟାପୀ',
    },
    example: 'Smartphones have become ubiquitous in modern society.',
    exampleTranslation: { en: '', hi: 'स्मार्टफ़ोन आधुनिक समाज में सर्वव्यापी हो गए हैं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/juːˈbɪk.wɪ.təs/', tags: ['technology', 'society'], oxfordList: 'B',
  },
  {
    id: 'v-c2-002', word: 'paradigm', partOfSpeech: 'noun', level: 'C2',
    meaning: {
      en: 'a typical example or pattern of something; a model', hi: 'प्रतिमान',
      ta: 'முன்மாதிரி', te: 'నమూనా', bn: 'দৃষ্টান্ত', mr: 'प्रतिमान',
      kn: 'ಮಾದರಿ', ml: 'മാതൃക', gu: 'દાખલો', pa: 'ਨਮੂਨਾ', od: 'ପ୍ରତିମାନ',
    },
    example: 'The discovery represented a paradigm shift in scientific thinking.',
    exampleTranslation: { en: '', hi: 'इस खोज ने वैज्ञानिक सोच में एक प्रतिमान बदलाव का प्रतिनिधित्व किया।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ˈpær.ə.daɪm/', tags: ['academic', 'science'], oxfordList: 'B',
  },
  {
    id: 'v-c2-003', word: 'exacerbate', partOfSpeech: 'verb', level: 'C2',
    meaning: {
      en: 'to make a problem, bad situation, or negative feeling worse', hi: 'बिगाड़ना/बढ़ाना',
      ta: 'மோசமாக்கு', te: 'తీవ్రతరం చేయు', bn: 'আরও খারাপ করা', mr: 'बिघडवणे',
      kn: 'ಉಲ್ಬಣಗೊಳಿಸು', ml: 'വഷളാക്കുക', gu: 'વધુ ખરાબ કરવું', pa: 'ਵਿਗਾੜਨਾ', od: 'ଖରାପ କରିବା',
    },
    example: 'Climate change is expected to exacerbate food insecurity worldwide.',
    exampleTranslation: { en: '', hi: 'जलवायु परिवर्तन से दुनिया भर में खाद्य असुरक्षा बढ़ने की आशंका है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ɪɡˈzæs.ər.beɪt/', tags: ['academic', 'environment'], oxfordList: 'B',
  },
  {
    id: 'v-c2-004', word: 'juxtapose', partOfSpeech: 'verb', level: 'C2',
    meaning: {
      en: 'to place close together for contrasting effect', hi: 'एक साथ रखना (तुलना के लिए)',
      ta: 'ஒருங்கிணைத்து வை', te: 'పక్కపక్కనే ఉంచు', bn: 'পাশাপাশি রাখা', mr: 'शेजारी ठेवणे',
      kn: 'ಜೊತೆಜೊತೆಗೆ ಇಡು', ml: 'അടുത്തടുത്ത് വയ്ക്കുക', gu: 'સામસામે મૂકવું', pa: 'ਨਾਲ-ਨਾਲ ਰੱਖਣਾ', od: 'ପାଖାପାଖି ରଖିବା',
    },
    example: 'The artist juxtaposed images of wealth and poverty in the exhibition.',
    exampleTranslation: { en: '', hi: 'कलाकार ने प्रदर्शनी में अमीरी और गरीबी की तस्वीरें एक साथ रखीं।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ˌdʒʌk.stə.ˈpəʊz/', tags: ['academic', 'art'], oxfordList: 'B',
  },
  {
    id: 'v-c2-005', word: 'rhetoric', partOfSpeech: 'noun', level: 'C2',
    meaning: {
      en: 'the art of effective or persuasive speaking or writing', hi: 'वाक्पटुता/अलंकारशास्त्र',
      ta: 'சொல்லாற்றல்', te: 'వాక్చాతుర్యం', bn: 'বাগ্মিতা', mr: 'वक्तृत्व',
      kn: 'ವಾಕ್ಚಾತುರ್ಯ', ml: 'വാഗ്മിത', gu: 'વાકચાતુર્ય', pa: 'ਬੋਲੀ ਦੀ ਕਲਾ', od: 'ବାକପଟୁତା',
    },
    example: 'Political rhetoric often obscures the complexity of real issues.',
    exampleTranslation: { en: '', hi: 'राजनीतिक भाषणबाज़ी अक्सर असली मुद्दों की जटिलता को छिपा देती है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ˈret.ər.ɪk/', tags: ['politics', 'language'], oxfordList: 'B',
  },
  {
    id: 'v-c2-006', word: 'conundrum', partOfSpeech: 'noun', level: 'C2',
    meaning: {
      en: 'a confusing and difficult problem or question', hi: 'पहेली/दुविधा',
      ta: 'புதிர்', te: 'సమస్య', bn: 'ধাঁধা', mr: 'कूट प्रश्न',
      kn: 'ಒಗಟು', ml: 'പ്രഹേളിക', gu: 'કોયડો', pa: 'ਬੁਝਾਰਤ', od: 'ପ୍ରହେଳିକା',
    },
    example: 'The ethical conundrum of AI decision-making remains unresolved.',
    exampleTranslation: { en: '', hi: 'एआई निर्णय-प्रक्रिया की नैतिक दुविधा अभी भी अनसुलझी है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/kəˈnʌn.drəm/', tags: ['academic', 'philosophy'], oxfordList: 'B',
  },
  {
    id: 'v-c2-007', word: 'ameliorate', partOfSpeech: 'verb', level: 'C2',
    meaning: {
      en: 'to make something bad or unsatisfactory better', hi: 'सुधारना',
      ta: 'மேம்படுத்து', te: 'మెరుగుపరచు', bn: 'উন্নত করা', mr: 'सुधारणा करणे',
      kn: 'ಸುಧಾರಿಸು', ml: 'മെച്ചപ്പെടുത്തുക', gu: 'સુધારવું', pa: 'ਸੁਧਾਰਨਾ', od: 'ଉନ୍ନତ କରିବା',
    },
    example: 'Government programmes aim to ameliorate living conditions in rural areas.',
    exampleTranslation: { en: '', hi: 'सरकारी कार्यक्रमों का उद्देश्य ग्रामीण क्षेत्रों में जीवन स्थितियों में सुधार करना है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/əˈmiː.li.ə.reɪt/', tags: ['academic', 'society'], oxfordList: 'B',
  },
  {
    id: 'v-c2-008', word: 'dichotomy', partOfSpeech: 'noun', level: 'C2',
    meaning: {
      en: 'a division or contrast between two things', hi: 'द्विभाजन',
      ta: 'இரு கூறாகப் பிரிவு', te: 'ద్వంద్వం', bn: 'দ্বিবিভাজন', mr: 'द्विभाजन',
      kn: 'ದ್ವಿಭಜನೆ', ml: 'ദ്വന്ദ്വം', gu: 'દ્વિભાજન', pa: 'ਦੁਫੇੜ', od: 'ଦ୍ବିଭାଜନ',
    },
    example: 'There is a false dichotomy between economic growth and environmental protection.',
    exampleTranslation: { en: '', hi: 'आर्थिक विकास और पर्यावरण संरक्षण के बीच एक झूठा द्विभाजन है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/daɪˈkɒt.ə.mi/', tags: ['academic', 'philosophy'], oxfordList: 'B',
  },
  {
    id: 'v-c2-009', word: 'promulgate', partOfSpeech: 'verb', level: 'C2',
    meaning: {
      en: 'to make widely known; to put a law or decree into effect', hi: 'प्रख्यापित करना',
      ta: 'பிரகடனம் செய்', te: 'ప్రకటించు', bn: 'জারি করা', mr: 'जाहीर करणे',
      kn: 'ಪ್ರಕಟಿಸು', ml: 'പ്രഖ്യാപിക്കുക', gu: 'જાહેર કરવું', pa: 'ਜਾਰੀ ਕਰਨਾ', od: 'ଜାରି କରିବା',
    },
    example: 'The government promulgated new regulations on data privacy.',
    exampleTranslation: { en: '', hi: 'सरकार ने डेटा गोपनीयता पर नए नियम प्रख्यापित किए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ˈprɒm.əl.ɡeɪt/', tags: ['law', 'government'], oxfordList: 'B',
  },
  {
    id: 'v-c2-010', word: 'ephemeral', partOfSpeech: 'adjective', level: 'C2',
    meaning: {
      en: 'lasting for a very short time', hi: 'क्षणभंगुर',
      ta: 'நிலையற்ற', te: 'అశాశ్వతమైన', bn: 'ক্ষণস্থায়ী', mr: 'क्षणभंगुर',
      kn: 'ಕ್ಷಣಿಕ', ml: 'ക്ഷണികമായ', gu: 'ક્ષણભંગુર', pa: 'ਛਿਣ-ਭੰਗੁਰ', od: 'କ୍ଷଣସ୍ଥାୟୀ',
    },
    example: 'Social media fame is often ephemeral, lasting only days or weeks.',
    exampleTranslation: { en: '', hi: 'सोशल मीडिया की प्रसिद्धि अक्सर क्षणभंगुर होती है, केवल दिनों या हफ्तों तक रहती है।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ɪˈfem.ər.əl/', tags: ['academic', 'time'], oxfordList: 'B',
  },
  {
    id: 'v-c2-011', word: 'cognizant', partOfSpeech: 'adjective', level: 'C2',
    meaning: {
      en: 'having knowledge or awareness', hi: 'जागरूक/संज्ञान रखने वाला',
      ta: 'அறிந்திருக்கும்', te: 'అవగాహన ఉన్న', bn: 'সচেতন', mr: 'जाणकार',
      kn: 'ಅರಿವಿರುವ', ml: 'ബോധമുള്ള', gu: 'જાણકાર', pa: 'ਜਾਣੂ', od: 'ସଚେତନ',
    },
    example: 'Leaders must be cognizant of the social impact of their policies.',
    exampleTranslation: { en: '', hi: 'नेताओं को अपनी नीतियों के सामाजिक प्रभाव के प्रति जागरूक रहना चाहिए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/ˈkɒɡ.nɪ.zənt/', tags: ['academic', 'awareness'], oxfordList: 'B',
  },
  {
    id: 'v-c2-012', word: 'preclude', partOfSpeech: 'verb', level: 'C2',
    meaning: {
      en: 'to prevent from happening; make impossible', hi: 'रोकना/बाधा डालना',
      ta: 'தடுக்கு', te: 'అడ్డుకొను', bn: 'প্রতিরোধ করা', mr: 'प्रतिबंध करणे',
      kn: 'ತಡೆಗಟ್ಟು', ml: 'തടയുക', gu: 'અટકાવવું', pa: 'ਰੋਕਣਾ', od: 'ପ୍ରତିବନ୍ଧ କରିବା',
    },
    example: 'Budget constraints should not preclude investment in education.',
    exampleTranslation: { en: '', hi: 'बजट की कमी को शिक्षा में निवेश से नहीं रोकना चाहिए।', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '/prɪˈkluːd/', tags: ['academic', 'formal'], oxfordList: 'B',
  },
];

// ---------- Merged vocabulary: sample (detailed) + Oxford 3000 + Oxford 5000 ----------

// Build a lookup of sample words so we can overlay rich data on the Oxford list
const sampleLookup = new Map(sampleVocabulary.map((w) => [w.word.toLowerCase(), w]));

// Merge: start with Oxford list, overlay sample translations where available
const allVocabulary: VocabularyWord[] = oxfordVocabulary.map((oxWord) => {
  const detailed = sampleLookup.get(oxWord.word);
  if (detailed) {
    return { ...oxWord, ...detailed, id: oxWord.id };
  }
  return oxWord;
});

// Add any sample words NOT in Oxford list (C1/C2 sample words)
for (const sw of sampleVocabulary) {
  if (!oxfordVocabulary.some((o) => o.word === sw.word.toLowerCase())) {
    allVocabulary.push(sw);
  }
}

// Utility functions for vocabulary management
export function getVocabularyByLevel(level: string): VocabularyWord[] {
  if (level === 'C2') {
    // Band 8-9 (C2) includes its own words plus a selection of harder B2 & C1 words
    const c2Words = allVocabulary.filter((w) => w.level === 'C2');
    const b2Words = allVocabulary.filter((w) => w.level === 'B2');
    const c1Words = allVocabulary.filter((w) => w.level === 'C1');
    // Take the last (harder) 412 B2 words and last 427 C1 words
    const b2Selection = b2Words.slice(-412);
    const c1Selection = c1Words.slice(-427);
    return [...c2Words, ...b2Selection, ...c1Selection];
  }
  return allVocabulary.filter((w) => w.level === level);
}

export function getVocabularyByTag(tag: string): VocabularyWord[] {
  return allVocabulary.filter((w) => w.tags.includes(tag));
}

export function searchVocabulary(query: string): VocabularyWord[] {
  const lower = query.toLowerCase();
  return allVocabulary.filter(
    (w) => w.word.toLowerCase().includes(lower) ||
      w.meaning.en.toLowerCase().includes(lower)
  );
}

export function getVocabularyById(id: string): VocabularyWord | undefined {
  return allVocabulary.find((w) => w.id === id);
}

export function getVocabularyByIds(ids: string[]): VocabularyWord[] {
  const idSet = new Set(ids);
  return allVocabulary.filter((w) => idSet.has(w.id));
}

export { allVocabulary, oxfordVocabulary, oxford3000, oxford5000 };

export function formatOxfordWord(
  word: string,
  meaning: string,
  level: string,
  partOfSpeech: string,
  oxfordList: 'A' | 'B'
): Partial<VocabularyWord> {
  return {
    word,
    meaning: { en: meaning, hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    level: level as VocabularyWord['level'],
    partOfSpeech,
    example: '',
    exampleTranslation: { en: '', hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '' },
    pronunciation: '',
    tags: [],
    oxfordList,
  };
}
