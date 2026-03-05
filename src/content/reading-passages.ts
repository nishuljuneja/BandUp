import { type ReadingPassage } from '../lib/firestore';

// Reading passages set in Indian contexts, organized by CEFR level
// Topics are relevant to Indian daily life, culture, and current affairs

export const readingPassages: ReadingPassage[] = [
  // ==================== A1 ====================
  {
    id: 'a1-read-01',
    level: 'A1',
    title: 'My Family',
    content: `My name is Anita. I am from Pune. I am 25 years old. I live with my family.

My family is not very big. I have a father, a mother, and one brother. My father's name is Rajesh. He is a shopkeeper. My mother's name is Sunita. She is a homemaker. She makes very good food. My brother's name is Amit. He is 20 years old. He is a college student.

We have a small house. It has three rooms. We also have a dog. His name is Moti. He is brown and white.

Every morning, my mother makes chai for everyone. We drink chai together. On Sundays, we go to the park. I love my family very much.`,
    wordCount: 120,
    topic: 'Family',
    indianContext: true,
    vocabulary: ['family', 'shopkeeper', 'homemaker', 'student', 'morning'],
    questions: [
      {
        id: 'a1-r1-q1',
        type: 'multiple-choice',
        question: 'Where is Anita from?',
        questionTranslations: {
          hi: 'अनिता कहाँ से है?', ta: 'அனிதா எங்கிருந்து வருகிறாள்?',
          te: 'అనిత ఎక్కడి నుండి?', bn: 'অনিতা কোথা থেকে?',
          mr: 'अनिता कुठून आहे?', kn: 'ಅನಿತಾ ಎಲ್ಲಿಂದ?',
          ml: 'അനിത എവിടെ നിന്ന്?', gu: 'અનિતા ક્યાંથી છે?',
          pa: 'ਅਨੀਤਾ ਕਿੱਥੋਂ ਹੈ?', od: 'ଅନିତା କେଉଁଠାରୁ?', en: 'Where is Anita from?',
        },
        options: ['Mumbai', 'Pune', 'Delhi', 'Chennai'],
        correctAnswer: 'Pune',
        explanation: 'The passage says "I am from Pune."',
      },
      {
        id: 'a1-r1-q2',
        type: 'multiple-choice',
        question: 'How many brothers does Anita have?',
        questionTranslations: {
          hi: 'अनिता के कितने भाई हैं?', ta: 'அனிதாவுக்கு எத்தனை சகோதரர்கள்?',
          te: 'అనితకు ఎంత మంది సోదరులు?', bn: 'অনিতার কতজন ভাই?',
          mr: 'अनिताला किती भाऊ?', kn: 'ಅನಿತಾಗೆ ಎಷ್ಟು ಸಹೋದರರು?',
          ml: 'അനിതയ്ക്ക് എത്ര സഹോദരന്മാർ?', gu: 'અનિતાને કેટલા ભાઈ?',
          pa: 'ਅਨੀਤਾ ਦੇ ਕਿੰਨੇ ਭਰਾ ਹਨ?', od: 'ଅନିତାର କେତେ ଭାଇ?', en: '',
        },
        options: ['None', 'One', 'Two', 'Three'],
        correctAnswer: 'One',
        explanation: 'The passage says "I have... one brother."',
      },
      {
        id: 'a1-r1-q3',
        type: 'multiple-choice',
        question: 'What does the family do every morning?',
        questionTranslations: {
          hi: 'परिवार हर सुबह क्या करता है?', ta: 'குடும்பம் ஒவ்வொரு காலையும் என்ன செய்கிறது?',
          te: 'కుటుంబం ప్రతి ఉదయం ఏం చేస్తుంది?', bn: 'পরিবার প্রতি সকালে কী করে?',
          mr: 'कुटुंब दर सकाळी काय करतो?', kn: 'ಕುಟುಂಬ ಪ್ರತಿ ಬೆಳಿಗ್ಗೆ ಏನು ಮಾಡುತ್ತದೆ?',
          ml: 'കുടുംബം ഓരോ രാവിലെയും എന്താണ് ചെയ്യുന്നത്?', gu: 'પરિવાર દર સવારે શું કરે છે?',
          pa: 'ਪਰਿਵਾਰ ਹਰ ਸਵੇਰੇ ਕੀ ਕਰਦਾ ਹੈ?', od: 'ପରିବାର ପ୍ରତିଦିନ ସକାଳେ କ\'ଣ କରେ?', en: '',
        },
        options: ['Go to the park', 'Drink chai together', 'Watch TV', 'Go to school'],
        correctAnswer: 'Drink chai together',
        explanation: 'The passage says "We drink chai together."',
      },
    ],
  },

  // ==================== A2 ====================
  {
    id: 'a2-read-01',
    level: 'A2',
    title: 'A Trip to the Market',
    content: `Last Saturday, Ravi went to the local market in his neighbourhood. He needed to buy vegetables and fruits for the week.

First, he went to the vegetable seller. He bought two kilos of tomatoes, one kilo of onions, and some green chillies. The vegetables were fresh and not very expensive. He paid ₹150 for everything.

Then, he walked to the fruit stall. He saw many fruits — mangoes, bananas, apples, and guavas. Mangoes were his favourite, but they were expensive because it was not mango season. He bought one dozen bananas for ₹60 and one kilo of apples for ₹200.

After shopping, Ravi stopped at a small tea stall. He had a cup of masala chai and ate two samosas. It was a good morning.

On his way home, he met his neighbour, Mrs. Sharma. She asked him about the prices at the market. He told her that tomatoes were cheap this week.`,
    wordCount: 160,
    topic: 'Shopping & Daily Life',
    indianContext: true,
    vocabulary: ['market', 'neighbourhood', 'vegetables', 'expensive', 'favourite', 'season', 'dozen'],
    questions: [
      {
        id: 'a2-r1-q1',
        type: 'multiple-choice',
        question: 'Why were mangoes expensive?',
        questionTranslations: {
          hi: 'आम महंगे क्यों थे?', ta: 'மாம்பழங்கள் ஏன் விலை அதிகமாக இருந்தன?',
          te: 'మామిడి పండ్లు ఎందుకు ఖరీదు?', bn: 'আম দামি কেন ছিল?',
          mr: 'आंबे महाग का होते?', kn: 'ಮಾವಿನಹಣ್ಣುಗಳು ಏಕೆ ದುಬಾರಿ?',
          ml: 'മാങ്ങ എന്തുകൊണ്ട് ചെലവേറിയതായിരുന്നു?', gu: 'કેરી મોંઘી કેમ હતી?',
          pa: 'ਅੰਬ ਮਹਿੰਗੇ ਕਿਉਂ ਸਨ?', od: 'ଆମ୍ବ ମହଙ୍ଗା କାହିଁକି ଥିଲା?', en: '',
        },
        options: [
          'They were imported',
          'It was not mango season',
          'The quality was very good',
          'The seller was expensive',
        ],
        correctAnswer: 'It was not mango season',
        explanation: 'The passage says "they were expensive because it was not mango season."',
      },
      {
        id: 'a2-r1-q2',
        type: 'multiple-choice',
        question: 'How much did Ravi spend on vegetables?',
        questionTranslations: {
          hi: 'रवि ने सब्जियों पर कितना ख़र्च किया?', ta: 'ரவி காய்கறிகளுக்கு எவ்வளவு செலவு செய்தார்?',
          te: 'రవి కూరగాయలకు ఎంత ఖర్చు చేశాడు?', bn: 'রবি সবজিতে কত খরচ করল?',
          mr: 'रवीने भाज्यांवर किती खर्च केला?', kn: 'ರವಿ ತರಕಾರಿಗಳಿಗೆ ಎಷ್ಟು ಖರ್ಚು ಮಾಡಿದ?',
          ml: 'രവി പച്ചക്കറികൾക്ക് എത്ര ചെലവഴിച്ചു?', gu: 'રવિએ શાકભાજી પર કેટલો ખર્ચ કર્યો?',
          pa: 'ਰਵੀ ਨੇ ਸਬਜ਼ੀਆਂ \'ਤੇ ਕਿੰਨਾ ਖ਼ਰਚ ਕੀਤਾ?', od: 'ରବି ପରିବା ଉପରେ କେତେ ଖର୍ଚ୍ଚ କଲେ?', en: '',
        },
        options: ['₹60', '₹150', '₹200', '₹410'],
        correctAnswer: '₹150',
        explanation: 'The passage says "He paid ₹150 for everything" (the vegetables).',
      },
      {
        id: 'a2-r1-q3',
        type: 'multiple-choice',
        question: 'Where did Ravi meet Mrs. Sharma?',
        questionTranslations: {
          hi: 'रवि ने श्रीमती शर्मा से कहाँ मुलाकात की?', ta: '',
          te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['At the tea stall', 'At the fruit stall', 'On his way home', 'At the vegetable shop'],
        correctAnswer: 'On his way home',
        explanation: 'The passage says he met Mrs. Sharma "on his way home."',
      },
    ],
  },

  // ==================== B1 ====================
  {
    id: 'b1-read-01',
    level: 'B1',
    title: 'The Indian Railway Experience',
    content: `Indian Railways is one of the largest railway networks in the world. Every day, millions of people travel by train across the country. For most Indians, the train is not just a mode of transport — it is an experience.

If you have ever taken a long-distance train in India, you know what I mean. The journey begins at the station, which is always busy and full of energy. Vendors walk along the platform selling chai, samosas, and magazines. Families arrive with large bags and small children. There is an announcement on the loudspeaker, but it is often difficult to understand.

Once the train starts moving, the real experience begins. Strangers become friends within minutes. People share food with each other — this is a uniquely Indian habit that surprises many foreign travellers. Someone will always offer you a piece of their homemade paratha or a cup of chai.

The landscape changes as the train moves through different states. You might see green paddy fields in Bengal, dry deserts in Rajasthan, or coconut trees in Kerala. The train becomes a moving window into India's diversity.

However, Indian Railways also faces challenges. Trains are often delayed, stations can be overcrowded, and cleanliness is sometimes a concern. The government has been working on modernising the system with newer trains like the Vande Bharat Express.

Despite these challenges, there is something magical about an Indian train journey. It connects people from different backgrounds, languages, and cultures. For many Indians, some of their best memories are from train journeys.`,
    wordCount: 240,
    topic: 'Travel & Culture',
    indianContext: true,
    vocabulary: ['network', 'vendor', 'announcement', 'landscape', 'diversity', 'modernising', 'challenges'],
    questions: [
      {
        id: 'b1-r1-q1',
        type: 'multiple-choice',
        question: 'According to the passage, what surprises foreign travellers about Indian trains?',
        questionTranslations: {
          hi: 'लेख के अनुसार, भारतीय ट्रेनों के बारे में विदेशी यात्रियों को क्या हैरान करता है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'The speed of the trains',
          'People sharing food with strangers',
          'The number of stations',
          'The cost of tickets',
        ],
        correctAnswer: 'People sharing food with strangers',
        explanation: 'The passage says sharing food "is a uniquely Indian habit that surprises many foreign travellers."',
      },
      {
        id: 'b1-r1-q2',
        type: 'multiple-choice',
        question: 'What is the Vande Bharat Express an example of?',
        questionTranslations: {
          hi: 'वंदे भारत एक्सप्रेस किसका उदाहरण है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A traditional train',
          'The government modernising railways',
          'A train that goes to all states',
          'The cheapest train in India',
        ],
        correctAnswer: 'The government modernising railways',
        explanation: 'The passage mentions Vande Bharat as an example of "modernising the system."',
      },
      {
        id: 'b1-r1-q3',
        type: 'multiple-choice',
        question: 'Which of the following is NOT mentioned as a challenge for Indian Railways?',
        questionTranslations: {
          hi: 'निम्नलिखित में से कौन भारतीय रेलवे की चुनौती के रूप में उल्लेखित नहीं है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Trains are often delayed', 'Ticket prices are too high', 'Stations can be overcrowded', 'Cleanliness is sometimes a concern'],
        correctAnswer: 'Ticket prices are too high',
        explanation: 'The passage mentions delays, overcrowding, and cleanliness — but not ticket prices.',
      },
    ],
  },

  // ==================== B2 ====================
  {
    id: 'b2-read-01',
    level: 'B2',
    title: 'The Rise of India\'s Startup Ecosystem',
    content: `Over the past decade, India has emerged as one of the world's most vibrant startup ecosystems. Cities like Bangalore, Hyderabad, Mumbai, and Delhi-NCR have become hotbeds of innovation, attracting billions of dollars in venture capital and producing dozens of "unicorns" — startups valued at over one billion dollars.

Several factors have contributed to this remarkable growth. First, India's large and young population provides both a massive consumer base and a talented workforce. With over 1.5 million engineers graduating annually, the country has no shortage of technical talent. Second, the rapid penetration of smartphones and affordable data plans has created a digital infrastructure that startups can leverage.

The government has also played a facilitating role through initiatives like "Startup India" and reforms to make it easier to register and operate businesses. Additionally, the success of early Indian startups like Flipkart, Ola, and Zomato has inspired a new generation of entrepreneurs and demonstrated that world-class companies can be built in India.

However, the ecosystem is not without its challenges. Many startups struggle with profitability, and the "growth at all costs" mentality has led to several high-profile failures. The regulatory environment, while improving, can still be complex and unpredictable. Furthermore, there is a significant urban-rural divide, with most startup activity concentrated in a few metropolitan cities.

Despite these hurdles, the trajectory remains positive. Indian startups are increasingly expanding into tier-2 and tier-3 cities, addressing uniquely Indian problems such as agricultural supply chains, vernacular education, and financial inclusion. The next phase of India's startup story will likely be defined by companies that combine innovation with sustainability and social impact.`,
    wordCount: 260,
    topic: 'Business & Economy',
    indianContext: true,
    vocabulary: ['ecosystem', 'venture capital', 'unicorn', 'leverage', 'profitability', 'regulatory', 'trajectory'],
    questions: [
      {
        id: 'b2-r1-q1',
        type: 'multiple-choice',
        question: 'What does the term "unicorn" refer to in the context of this passage?',
        questionTranslations: {
          hi: 'इस लेख के संदर्भ में "यूनिकॉर्न" शब्द का क्या अर्थ है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A mythical creature',
          'A startup valued at over $1 billion',
          'A government initiative',
          'A type of venture capital fund',
        ],
        correctAnswer: 'A startup valued at over $1 billion',
        explanation: 'The passage defines unicorns as "startups valued at over one billion dollars."',
      },
      {
        id: 'b2-r1-q2',
        type: 'multiple-choice',
        question: 'According to the passage, what is one criticism of the startup ecosystem?',
        questionTranslations: {
          hi: 'लेख के अनुसार, स्टार्टअप पारिस्थितिकी तंत्र की एक आलोचना क्या है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'Too many engineers in India',
          'The "growth at all costs" mentality',
          'Too much government regulation',
          'Lack of smartphone users',
        ],
        correctAnswer: 'The "growth at all costs" mentality',
        explanation: 'The passages mentions "the \'growth at all costs\' mentality has led to several high-profile failures."',
      },
      {
        id: 'b2-r1-q3',
        type: 'multiple-choice',
        question: 'Which is mentioned as a focus area for startups expanding to smaller cities?',
        questionTranslations: {
          hi: 'छोटे शहरों में विस्तार करने वाले स्टार्टअप का ध्यान किस क्षेत्र पर है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Social media marketing', 'Agricultural supply chains', 'International trade', 'Real estate development'],
        correctAnswer: 'Agricultural supply chains',
        explanation: 'The passage mentions agricultural supply chains as one of the "uniquely Indian problems" being addressed.',
      },
    ],
  },

  // ==================== C1 ====================
  {
    id: 'c1-read-01',
    level: 'C1',
    title: 'The Right to Privacy in the Digital Age',
    content: `In August 2017, a nine-judge bench of the Supreme Court of India unanimously declared that the right to privacy is a fundamental right protected under the Indian Constitution. The landmark judgement in Justice K. S. Puttaswamy v. Union of India was precipitated by challenges to Aadhaar, the world's largest biometric identification system, which assigns a unique twelve-digit number to every resident.

The ruling established that privacy encompasses bodily autonomy, informational self-determination, and the sanctity of personal choices—including what one eats, whom one associates with, and how one expresses identity. Writing for the majority, Justice D. Y. Chandrachud observed that "the right to privacy is an intrinsic part of the right to life and personal liberty under Article 21."

Yet the practical implications have proved far more complex than the legal pronouncement itself. The subsequent Personal Data Protection Bill underwent multiple drafts over five years before evolving into the Digital Personal Data Protection Act of 2023. Critics argue that the legislation grants the government sweeping exemptions, permitting state agencies to process personal data without consent on grounds of national security. Proponents counter that a regulatory framework, however imperfect, is preferable to the legal vacuum that preceded it.

Meanwhile, India's data economy continues to expand at a staggering pace. With over 800 million internet users—most accessing the web via affordable smartphones—the country generates vast quantities of data daily. Fintech applications, e-commerce platforms, and telemedicine services have been transformative, particularly for rural populations historically excluded from formal banking and healthcare. However, this digitisation has also introduced new vulnerabilities: data breaches, algorithmic discrimination, and the pervasive surveillance architecture enabled by cross-linked databases.

The tension between technological progress and individual privacy is unlikely to be resolved definitively. What the Puttaswamy judgement accomplished was to shift the burden of justification onto the state, requiring that any intrusion into privacy satisfy the tests of legality, necessity, and proportionality. Whether future legislation and judicial interpretation will uphold this standard remains one of the defining questions of Indian constitutional governance in the twenty-first century.`,
    wordCount: 290,
    topic: 'Law & Technology',
    indianContext: true,
    vocabulary: ['unanimous', 'precipitated', 'biometric', 'autonomy', 'self-determination', 'sanctity', 'intrinsic', 'sweeping', 'exemptions', 'proportionality'],
    questions: [
      {
        id: 'c1-r1-q1',
        type: 'multiple-choice',
        question: 'What was the immediate catalyst for the Supreme Court ruling on the right to privacy?',
        questionTranslations: {
          hi: 'निजता के अधिकार पर सुप्रीम कोर्ट के फैसले का तात्कालिक कारण क्या था?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'A petition against social media companies',
          'Challenges to the Aadhaar biometric ID system',
          'A data breach at a government agency',
          'International pressure from the United Nations',
        ],
        correctAnswer: 'Challenges to the Aadhaar biometric ID system',
        explanation: 'The passage states the judgement "was precipitated by challenges to Aadhaar."',
      },
      {
        id: 'c1-r1-q2',
        type: 'multiple-choice',
        question: 'According to the passage, what is a major criticism of the Digital Personal Data Protection Act of 2023?',
        questionTranslations: {
          hi: '2023 के डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम की एक प्रमुख आलोचना क्या है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: [
          'It is too strict on businesses',
          'It does not cover rural populations',
          'It grants the government broad exemptions to process data without consent',
          'It was passed without parliamentary debate',
        ],
        correctAnswer: 'It grants the government broad exemptions to process data without consent',
        explanation: 'The passage mentions critics argue the legislation "grants the government sweeping exemptions, permitting state agencies to process personal data without consent."',
      },
      {
        id: 'c1-r1-q3',
        type: 'multiple-choice',
        question: 'According to the Puttaswamy judgement, who bears the burden of justification for privacy intrusions?',
        questionTranslations: {
          hi: 'पुट्टस्वामी फैसले के अनुसार, निजता के हनन के औचित्य का भार किस पर है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['The citizen whose privacy is affected', 'The state', 'The judiciary', 'Private companies'],
        correctAnswer: 'The state',
        explanation: 'The passage says the judgement "shift[ed] the burden of justification onto the state."',
      },
      {
        id: 'c1-r1-q4',
        type: 'multiple-choice',
        question: 'Which is NOT one of the three tests for privacy intrusion under the Puttaswamy standard?',
        questionTranslations: {
          hi: 'पुट्टस्वामी मानक के तहत निजता के हनन की कौन सी परीक्षा नहीं है?',
          ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '',
        },
        options: ['Legality', 'Efficiency', 'Necessity', 'Proportionality'],
        correctAnswer: 'Efficiency',
        explanation: 'The three tests are legality, necessity, and proportionality — not efficiency.',
      },
    ],
  },

  // ==================== A1 - Additional ====================
  {
    id: 'a1-read-02',
    level: 'A1',
    title: 'My School Day',
    content: `My name is Rohan. I am 10 years old. I go to a school in Jaipur. My school is near my house. I walk to school every day.

My school starts at 8 o'clock in the morning. I wake up at 6:30. First, I brush my teeth and take a bath. Then I eat breakfast. My mother makes parathas and gives me a glass of milk.

At school, I have many subjects. I like Maths and English. My favourite teacher is Mrs. Gupta. She teaches us English. She is very kind. I also like Art class because I can draw and paint.

During lunch, I eat the food my mother packs. I usually have rice, dal, and sabzi. After lunch, I play with my friends. We play cricket in the ground.

School finishes at 2 o'clock. I come home and drink water. Then I do my homework. In the evening, I play outside with my neighbours.`,
    wordCount: 150,
    topic: 'Daily Routine',
    indianContext: true,
    vocabulary: ['school', 'morning', 'breakfast', 'subject', 'favourite', 'homework'],
    questions: [
      {
        id: 'a1-r2-q1',
        type: 'multiple-choice',
        question: 'How does Rohan go to school?',
        questionTranslations: { hi: 'रोहन स्कूल कैसे जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['By bus', 'By auto-rickshaw', 'He walks', 'His father drives him'],
        correctAnswer: 'He walks',
        explanation: 'The passage says "I walk to school every day."',
      },
      {
        id: 'a1-r2-q2',
        type: 'multiple-choice',
        question: 'What does Rohan eat for breakfast?',
        questionTranslations: { hi: 'रोहन नाश्ते में क्या खाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Rice and dal', 'Parathas and milk', 'Bread and eggs', 'Idli and chutney'],
        correctAnswer: 'Parathas and milk',
        explanation: 'The passage says "My mother makes parathas and gives me a glass of milk."',
      },
      {
        id: 'a1-r2-q3',
        type: 'multiple-choice',
        question: 'Who is Mrs. Gupta?',
        questionTranslations: { hi: 'श्रीमती गुप्ता कौन हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Rohan\'s mother', 'The Maths teacher', 'The English teacher', 'The school principal'],
        correctAnswer: 'The English teacher',
        explanation: 'The passage says "My favourite teacher is Mrs. Gupta. She teaches us English."',
      },
      {
        id: 'a1-r2-q4',
        type: 'multiple-choice',
        question: 'What time does Rohan\'s school finish?',
        questionTranslations: { hi: 'रोहन का स्कूल कितने बजे ख़त्म होता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['12 o\'clock', '1 o\'clock', '2 o\'clock', '3 o\'clock'],
        correctAnswer: '2 o\'clock',
        explanation: 'The passage says "School finishes at 2 o\'clock."',
      },
    ],
  },
  {
    id: 'a1-read-03',
    level: 'A1',
    title: 'At the Doctor',
    content: `Yesterday, Meera was not feeling well. She had a headache and a fever. Her mother took her to Dr. Khan's clinic.

The clinic is on MG Road. It is a small clinic. There were five people waiting. Meera and her mother sat on chairs and waited.

After twenty minutes, it was Meera's turn. Dr. Khan asked, "What is the problem?" Meera said, "I have a headache and I feel hot." Dr. Khan checked her temperature. It was 101 degrees. He also looked at her throat.

Dr. Khan said, "You have a viral fever. It is nothing serious. Take this medicine three times a day. Drink lots of water and rest at home. Don't go to school for two days."

Meera's mother bought the medicine from the shop next to the clinic. It cost ₹120. At home, Meera drank warm soup and slept. After two days, she felt much better.`,
    wordCount: 145,
    topic: 'Health',
    indianContext: true,
    vocabulary: ['doctor', 'clinic', 'fever', 'medicine', 'temperature', 'rest'],
    questions: [
      {
        id: 'a1-r3-q1',
        type: 'multiple-choice',
        question: 'Why did Meera go to the doctor?',
        questionTranslations: { hi: 'मीरा डॉक्टर के पास क्यों गई?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['She fell down', 'She had a headache and fever', 'She had a stomach ache', 'She broke her arm'],
        correctAnswer: 'She had a headache and fever',
        explanation: 'The passage says "She had a headache and a fever."',
      },
      {
        id: 'a1-r3-q2',
        type: 'multiple-choice',
        question: 'What was Meera\'s temperature?',
        questionTranslations: { hi: 'मीरा का तापमान कितना था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['99 degrees', '100 degrees', '101 degrees', '102 degrees'],
        correctAnswer: '101 degrees',
        explanation: 'The passage says "It was 101 degrees."',
      },
      {
        id: 'a1-r3-q3',
        type: 'multiple-choice',
        question: 'How long should Meera stay at home?',
        questionTranslations: { hi: 'मीरा को कितने दिन घर पर रहना चाहिए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One day', 'Two days', 'Three days', 'One week'],
        correctAnswer: 'Two days',
        explanation: 'The doctor said "Don\'t go to school for two days."',
      },
      {
        id: 'a1-r3-q4',
        type: 'multiple-choice',
        question: 'How much did the medicine cost?',
        questionTranslations: { hi: 'दवाई की कीमत कितनी थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['₹80', '₹100', '₹120', '₹150'],
        correctAnswer: '₹120',
        explanation: 'The passage says "It cost ₹120."',
      },
    ],
  },
  {
    id: 'a1-read-04',
    level: 'A1',
    title: 'My Favourite Festival',
    content: `Diwali is my favourite festival. It comes in October or November. It is the festival of lights. People all over India celebrate Diwali.

Before Diwali, my family cleans the whole house. We also paint the walls. My mother buys new curtains. We put rangoli at the door. My sister makes very beautiful rangoli with colours.

On Diwali day, we wear new clothes. In the morning, we do puja. My father lights diyas in every room. My mother makes sweets — she makes gulab jamun and barfi. They are very tasty.

In the evening, we light candles and diyas outside the house. It looks very beautiful. Then we burst some crackers. My neighbours also come and give us sweets. We give them sweets too.

At night, my whole family sits together. We eat dinner and sweets. We are very happy. I love Diwali because everyone is together and happy.`,
    wordCount: 150,
    topic: 'Festivals & Culture',
    indianContext: true,
    vocabulary: ['festival', 'celebrate', 'lights', 'sweets', 'beautiful', 'together'],
    questions: [
      {
        id: 'a1-r4-q1',
        type: 'multiple-choice',
        question: 'When does Diwali come?',
        questionTranslations: { hi: 'दिवाली कब आती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['January or February', 'March or April', 'July or August', 'October or November'],
        correctAnswer: 'October or November',
        explanation: 'The passage says "It comes in October or November."',
      },
      {
        id: 'a1-r4-q2',
        type: 'multiple-choice',
        question: 'Who makes the rangoli?',
        questionTranslations: { hi: 'रंगोली कौन बनाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['The narrator\'s mother', 'The narrator\'s sister', 'The narrator\'s father', 'The neighbours'],
        correctAnswer: 'The narrator\'s sister',
        explanation: 'The passage says "My sister makes very beautiful rangoli with colours."',
      },
      {
        id: 'a1-r4-q3',
        type: 'multiple-choice',
        question: 'What sweets does the mother make?',
        questionTranslations: { hi: 'माँ कौन सी मिठाई बनाती हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Jalebi and ladoo', 'Gulab jamun and barfi', 'Rasgulla and sandesh', 'Kheer and halwa'],
        correctAnswer: 'Gulab jamun and barfi',
        explanation: 'The passage says "she makes gulab jamun and barfi."',
      },
      {
        id: 'a1-r4-q4',
        type: 'multiple-choice',
        question: 'What does the family put at the door?',
        questionTranslations: { hi: 'परिवार दरवाज़े पर क्या रखता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Flowers', 'Candles', 'Rangoli', 'A lamp'],
        correctAnswer: 'Rangoli',
        explanation: 'The passage says "We put rangoli at the door."',
      },
    ],
  },

  // ==================== A2 - Additional ====================
  {
    id: 'a2-read-02',
    level: 'A2',
    title: 'Cooking Biryani',
    content: `Last weekend, Farah decided to cook chicken biryani for her family. Biryani is a popular rice dish in India. It takes a long time to prepare, but it is worth it.

First, Farah went to the market and bought the ingredients. She needed basmati rice, chicken, onions, tomatoes, yoghurt, and many spices like cumin, cardamom, and bay leaves. She also bought fresh mint and coriander leaves.

At home, she washed the rice and soaked it in water for 30 minutes. While the rice was soaking, she cut the onions and marinated the chicken with yoghurt and spices. She fried the onions until they were golden brown. Then she added the chicken and cooked it slowly.

Next, she boiled the rice until it was half-cooked. She layered the rice over the chicken in a big pot. She added saffron milk on top for colour and flavour. She covered the pot tightly and cooked it on a very low flame for 25 minutes.

When she opened the pot, the smell was amazing. The family sat down together and ate the biryani with raita and salad. Everyone loved it. Farah's father said it was the best biryani he had ever eaten.`,
    wordCount: 195,
    topic: 'Food & Cooking',
    indianContext: true,
    vocabulary: ['ingredients', 'marinated', 'soaked', 'layered', 'flavour', 'recipe'],
    questions: [
      {
        id: 'a2-r2-q1',
        type: 'multiple-choice',
        question: 'How long did Farah soak the rice?',
        questionTranslations: { hi: 'फ़राह ने चावल कितनी देर भिगोए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['10 minutes', '20 minutes', '30 minutes', '1 hour'],
        correctAnswer: '30 minutes',
        explanation: 'The passage says "soaked it in water for 30 minutes."',
      },
      {
        id: 'a2-r2-q2',
        type: 'multiple-choice',
        question: 'What did Farah add on top for colour?',
        questionTranslations: { hi: 'फ़राह ने रंग के लिए ऊपर क्या डाला?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Turmeric powder', 'Food colouring', 'Saffron milk', 'Red chilli powder'],
        correctAnswer: 'Saffron milk',
        explanation: 'The passage says "She added saffron milk on top for colour and flavour."',
      },
      {
        id: 'a2-r2-q3',
        type: 'multiple-choice',
        question: 'What did the family eat with the biryani?',
        questionTranslations: { hi: 'परिवार ने बिरयानी के साथ क्या खाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Naan and chutney', 'Raita and salad', 'Pickle and papad', 'Roti and dal'],
        correctAnswer: 'Raita and salad',
        explanation: 'The passage says "ate the biryani with raita and salad."',
      },
      {
        id: 'a2-r2-q4',
        type: 'multiple-choice',
        question: 'How long was the final cooking on low flame?',
        questionTranslations: { hi: 'धीमी आँच पर आख़िरी बार कितनी देर पकाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['15 minutes', '20 minutes', '25 minutes', '30 minutes'],
        correctAnswer: '25 minutes',
        explanation: 'The passage says "cooked it on a very low flame for 25 minutes."',
      },
    ],
  },
  {
    id: 'a2-read-03',
    level: 'A2',
    title: 'The Cricket Match',
    content: `Last Sunday, there was a big cricket match between India and Australia. Vikram and his friends were very excited. They decided to watch the match together at Vikram's house.

The match started at 2 o'clock in the afternoon. India won the toss and chose to bat first. The Indian team scored 287 runs in 50 overs. Rohit Sharma played very well and scored 98 runs, but he missed his century by just 2 runs. Everyone was disappointed for him.

During the break, Vikram's mother brought snacks — samosas, chips, and cold drinks. The friends talked about the first innings and predicted what would happen next.

In the second innings, Australia started well. But then Indian bowlers took three quick wickets. The crowd in the stadium was cheering loudly. At home, Vikram and his friends were shouting too.

In the end, Australia needed 15 runs from the last over, but they could only score 8. India won the match by 6 runs! Everyone was very happy. Vikram and his friends celebrated with loud cheers and more snacks.

It was a wonderful Sunday.`,
    wordCount: 180,
    topic: 'Sports',
    indianContext: true,
    vocabulary: ['match', 'score', 'innings', 'wickets', 'celebrate', 'disappointed'],
    questions: [
      {
        id: 'a2-r3-q1',
        type: 'multiple-choice',
        question: 'What did India choose to do after winning the toss?',
        questionTranslations: { hi: 'टॉस जीतने के बाद भारत ने क्या चुना?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Bowl first', 'Bat first', 'Field first', 'Take a break'],
        correctAnswer: 'Bat first',
        explanation: 'The passage says "India won the toss and chose to bat first."',
      },
      {
        id: 'a2-r3-q2',
        type: 'multiple-choice',
        question: 'How many runs did Rohit Sharma score?',
        questionTranslations: { hi: 'रोहित शर्मा ने कितने रन बनाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['87 runs', '92 runs', '98 runs', '100 runs'],
        correctAnswer: '98 runs',
        explanation: 'The passage says "scored 98 runs, but he missed his century by just 2 runs."',
      },
      {
        id: 'a2-r3-q3',
        type: 'multiple-choice',
        question: 'By how many runs did India win?',
        questionTranslations: { hi: 'भारत ने कितने रन से जीत हासिल की?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['2 runs', '4 runs', '6 runs', '8 runs'],
        correctAnswer: '6 runs',
        explanation: 'The passage says "India won the match by 6 runs!"',
      },
      {
        id: 'a2-r3-q4',
        type: 'multiple-choice',
        question: 'What did Vikram\'s mother bring during the break?',
        questionTranslations: { hi: 'ब्रेक में विक्रम की माँ ने क्या लाया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Biryani and raita', 'Pizza and juice', 'Samosas, chips, and cold drinks', 'Sandwiches and tea'],
        correctAnswer: 'Samosas, chips, and cold drinks',
        explanation: 'The passage says "samosas, chips, and cold drinks."',
      },
    ],
  },
  {
    id: 'a2-read-04',
    level: 'A2',
    title: 'A New Mobile Phone',
    content: `Priya wanted to buy a new mobile phone. Her old phone was three years old and very slow. She saved money from her job for four months.

She went to the electronics shop on Commercial Street with her friend Neha. The shop had many phones from different brands — Samsung, Xiaomi, Realme, and Apple. An Apple phone was ₹80,000, which was too expensive for Priya.

The salesman showed her several phones between ₹15,000 and ₹20,000. She liked a Samsung phone with a good camera and large battery. The battery could last two days on one charge. The phone also had 128 GB storage.

Neha suggested a Xiaomi phone that was ₹3,000 cheaper and had similar features. But Priya liked the Samsung camera better. She decided to buy the Samsung phone for ₹18,000.

The salesman also suggested a phone cover and screen protector for ₹500. Priya thought it was a good idea and bought them too. She paid using UPI from her bank account.

Priya was very happy with her new phone. The first thing she did was take a selfie with Neha and post it on Instagram.`,
    wordCount: 180,
    topic: 'Technology & Shopping',
    indianContext: true,
    vocabulary: ['electronics', 'brands', 'features', 'battery', 'storage', 'expensive'],
    questions: [
      {
        id: 'a2-r4-q1',
        type: 'multiple-choice',
        question: 'How long did Priya save money?',
        questionTranslations: { hi: 'प्रिया ने कितने महीने पैसे बचाए?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Two months', 'Three months', 'Four months', 'Six months'],
        correctAnswer: 'Four months',
        explanation: 'The passage says "She saved money from her job for four months."',
      },
      {
        id: 'a2-r4-q2',
        type: 'multiple-choice',
        question: 'Why did Priya not buy the Apple phone?',
        questionTranslations: { hi: 'प्रिया ने Apple फ़ोन क्यों नहीं ख़रीदा?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was too heavy', 'It had a small screen', 'It was too expensive', 'It had no camera'],
        correctAnswer: 'It was too expensive',
        explanation: 'The passage says the Apple phone "was too expensive for Priya."',
      },
      {
        id: 'a2-r4-q3',
        type: 'multiple-choice',
        question: 'How much did the Samsung phone cost?',
        questionTranslations: { hi: 'Samsung फ़ोन की कीमत कितनी थी?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['₹15,000', '₹17,000', '₹18,000', '₹20,000'],
        correctAnswer: '₹18,000',
        explanation: 'The passage says "She decided to buy the Samsung phone for ₹18,000."',
      },
      {
        id: 'a2-r4-q4',
        type: 'multiple-choice',
        question: 'How did Priya pay for the phone?',
        questionTranslations: { hi: 'प्रिया ने फ़ोन का भुगतान कैसे किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Cash', 'Credit card', 'UPI', 'EMI'],
        correctAnswer: 'UPI',
        explanation: 'The passage says "She paid using UPI from her bank account."',
      },
    ],
  },

  // ==================== B1 - Additional ====================
  {
    id: 'b1-read-02',
    level: 'B1',
    title: 'Street Food Culture in India',
    content: `India is famous for its street food. From the golgappas of Delhi to the vada pav of Mumbai, from the kathi rolls of Kolkata to the dosas of Chennai, every city has its own special street food identity.

Street food in India is not just about taste — it is about the experience. Watching a vendor skilfully prepare your dish on a tiny cart, the sizzle of oil, the aroma of fresh spices, and the crowd of hungry people around you create a unique atmosphere.

One reason street food is so popular is its affordability. A plate of chole bhature or a serving of pav bhaji costs between ₹30 and ₹80, making it accessible to almost everyone. Students, office workers, families, and even tourists regularly eat street food.

However, street food also raises concerns about hygiene. The food is prepared in open areas, and not all vendors follow clean practices. In recent years, the Food Safety and Standards Authority of India (FSSAI) has been working to improve hygiene standards. Many cities have introduced "clean street food hubs" where vendors are trained and regularly inspected.

Despite the hygiene concerns, the demand for street food continues to grow. Food bloggers and YouTube channels have made famous street food stalls even more popular. Some vendors now accept digital payments, have social media accounts, and even franchise their businesses.

Street food is deeply connected to India's culture. It brings people together across social and economic barriers: a billionaire and a student might eat at the same chaat stall. This democratic nature of street food is what makes it truly special.`,
    wordCount: 240,
    topic: 'Food & Culture',
    indianContext: true,
    vocabulary: ['vendor', 'affordability', 'hygiene', 'accessible', 'franchise', 'democratic'],
    questions: [
      {
        id: 'b1-r2-q1',
        type: 'multiple-choice',
        question: 'According to the passage, what makes street food accessible to most people?',
        questionTranslations: { hi: 'लेख के अनुसार, स्ट्रीट फ़ूड को अधिकतर लोगों के लिए सुलभ क्या बनाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Its taste', 'Its affordability', 'Its hygiene standards', 'Its availability online'],
        correctAnswer: 'Its affordability',
        explanation: 'The passage says a serving "costs between ₹30 and ₹80, making it accessible to almost everyone."',
      },
      {
        id: 'b1-r2-q2',
        type: 'multiple-choice',
        question: 'What is the FSSAI doing about street food?',
        questionTranslations: { hi: 'FSSAI स्ट्रीट फ़ूड के बारे में क्या कर रहा है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banning street food', 'Improving hygiene standards', 'Reducing prices', 'Opening new restaurants'],
        correctAnswer: 'Improving hygiene standards',
        explanation: 'The passage says FSSAI "has been working to improve hygiene standards."',
      },
      {
        id: 'b1-r2-q3',
        type: 'multiple-choice',
        question: 'What does the author mean by the "democratic nature" of street food?',
        questionTranslations: { hi: 'लेखक "स्ट्रीट फ़ूड के लोकतांत्रिक स्वभाव" से क्या मतलब रखता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It is part of election campaigns', 'People vote for their favourite stalls', 'People from all backgrounds eat at the same stalls', 'It is regulated by the government'],
        correctAnswer: 'People from all backgrounds eat at the same stalls',
        explanation: 'The passage says "a billionaire and a student might eat at the same chaat stall."',
      },
      {
        id: 'b1-r2-q4',
        type: 'multiple-choice',
        question: 'How has social media affected street food vendors?',
        questionTranslations: { hi: 'सोशल मीडिया ने स्ट्रीट फ़ूड विक्रेताओं को कैसे प्रभावित किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has reduced their business', 'It has made famous stalls even more popular', 'It has forced them to close', 'It has increased food prices'],
        correctAnswer: 'It has made famous stalls even more popular',
        explanation: 'The passage says "Food bloggers and YouTube channels have made famous street food stalls even more popular."',
      },
    ],
  },
  {
    id: 'b1-read-03',
    level: 'B1',
    title: 'Social Media and Indian Youth',
    content: `Social media has transformed how young Indians communicate, learn, and spend their free time. Platforms like Instagram, YouTube, WhatsApp, and X (formerly Twitter) have millions of users in India, with a large percentage being under 25 years old.

For many young people, social media is a source of information and inspiration. Students use YouTube to learn everything from mathematics to cooking. Young entrepreneurs use Instagram to market their small businesses. Activists use social media to raise awareness about important issues like climate change, education, and gender equality.

However, social media also has a darker side. Many young people spend too much time scrolling through their phones, which affects their sleep, studies, and mental health. Cyberbullying is a growing problem, especially among teenagers. Fake news spreads quickly on platforms like WhatsApp, and it can be difficult to tell what is true and what is false.

Experts recommend that young people should limit their screen time to two hours per day. They should also think critically about the content they see and not believe everything they read online. Parents play an important role in guiding their children about safe internet use.

Some schools in India have started digital literacy programmes to teach students how to use social media responsibly. These programmes cover topics like online safety, recognising fake news, and managing screen time effectively.

Despite the challenges, social media remains a powerful tool for connection and creativity. The key is to use it wisely and maintain a healthy balance between online and offline life.`,
    wordCount: 230,
    topic: 'Technology & Society',
    indianContext: true,
    vocabulary: ['transformed', 'entrepreneurs', 'awareness', 'cyberbullying', 'literacy', 'responsibly'],
    questions: [
      {
        id: 'b1-r3-q1',
        type: 'multiple-choice',
        question: 'According to experts, how much daily screen time is recommended for young people?',
        questionTranslations: { hi: 'विशेषज्ञों के अनुसार, युवाओं के लिए दैनिक स्क्रीन समय कितना अनुशंसित है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['One hour', 'Two hours', 'Three hours', 'Four hours'],
        correctAnswer: 'Two hours',
        explanation: 'The passage says experts recommend limiting "screen time to two hours per day."',
      },
      {
        id: 'b1-r3-q2',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a negative effect of social media?',
        questionTranslations: { hi: 'सोशल मीडिया के नकारात्मक प्रभाव के रूप में किसका उल्लेख नहीं किया गया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Cyberbullying', 'Spread of fake news', 'Financial fraud', 'Affects sleep and studies'],
        correctAnswer: 'Financial fraud',
        explanation: 'The passage mentions cyberbullying, fake news, and effects on sleep/studies — but not financial fraud.',
      },
      {
        id: 'b1-r3-q3',
        type: 'multiple-choice',
        question: 'What have some schools introduced to address social media concerns?',
        questionTranslations: { hi: 'कुछ स्कूलों ने सोशल मीडिया की चिंताओं को दूर करने के लिए क्या शुरू किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banning phones in school', 'Digital literacy programmes', 'Social media exams', 'Counselling for every student'],
        correctAnswer: 'Digital literacy programmes',
        explanation: 'The passage says "Some schools in India have started digital literacy programmes."',
      },
      {
        id: 'b1-r3-q4',
        type: 'multiple-choice',
        question: 'How do young entrepreneurs use social media?',
        questionTranslations: { hi: 'युवा उद्यमी सोशल मीडिया का उपयोग कैसे करते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['To apply for government jobs', 'To market their small businesses', 'To find investment from banks', 'To take online exams'],
        correctAnswer: 'To market their small businesses',
        explanation: 'The passage says "Young entrepreneurs use Instagram to market their small businesses."',
      },
    ],
  },
  {
    id: 'b1-read-04',
    level: 'B1',
    title: 'The Monsoon Season',
    content: `The monsoon is one of the most important seasons in India. It usually arrives in June and lasts until September. For a largely agricultural country, the monsoon is the lifeline of the economy.

Around 60% of India's farmland depends on rain for irrigation. If the monsoon arrives on time and brings enough rain, crops grow well and food prices remain stable. A weak monsoon can lead to drought, crop failure, and rising food costs, which affects millions of farmers and their families.

But the monsoon is more than just economics. It has a deep emotional and cultural significance. After months of scorching summer heat, the first rain brings immense relief and joy. Children dance in the rain, the air smells fresh, and the landscape turns green almost overnight. Bollywood movies and Indian poetry are full of romantic images of the monsoon.

However, heavy monsoon rains also bring serious problems. Flooding is common in many cities, especially Mumbai, Chennai, and Kolkata. Roads become waterlogged, trains stop running, and people struggle to get to work. In rural areas, floods can destroy homes and crops. Landslides in hilly regions like Uttarakhand and Himachal Pradesh cause loss of life every year.

Climate change has made the monsoon more unpredictable. Some years, the monsoon is delayed; other years, certain regions receive too much rain while others receive too little. Scientists are studying how global warming will affect future monsoon patterns.

The monsoon remains at the heart of Indian life — it is celebrated, feared, and deeply respected.`,
    wordCount: 240,
    topic: 'Environment & Agriculture',
    indianContext: true,
    vocabulary: ['monsoon', 'irrigation', 'drought', 'scorching', 'waterlogged', 'unpredictable'],
    questions: [
      {
        id: 'b1-r4-q1',
        type: 'multiple-choice',
        question: 'What percentage of India\'s farmland depends on rain?',
        questionTranslations: { hi: 'भारत की कितनी प्रतिशत कृषि भूमि बारिश पर निर्भर है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['40%', '50%', '60%', '75%'],
        correctAnswer: '60%',
        explanation: 'The passage says "Around 60% of India\'s farmland depends on rain."',
      },
      {
        id: 'b1-r4-q2',
        type: 'multiple-choice',
        question: 'Which is NOT mentioned as a city that faces flooding?',
        questionTranslations: { hi: 'बाढ़ का सामना करने वाले शहर के रूप में किसका उल्लेख नहीं है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Mumbai', 'Chennai', 'Bangalore', 'Kolkata'],
        correctAnswer: 'Bangalore',
        explanation: 'The passage mentions Mumbai, Chennai, and Kolkata — but not Bangalore.',
      },
      {
        id: 'b1-r4-q3',
        type: 'multiple-choice',
        question: 'What happens if the monsoon is weak?',
        questionTranslations: { hi: 'अगर मानसून कमज़ोर हो तो क्या होता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Floods in cities', 'Drought and crop failure', 'More tourism', 'Lower temperatures'],
        correctAnswer: 'Drought and crop failure',
        explanation: 'The passage says "A weak monsoon can lead to drought, crop failure, and rising food costs."',
      },
      {
        id: 'b1-r4-q4',
        type: 'multiple-choice',
        question: 'How has climate change affected the monsoon?',
        questionTranslations: { hi: 'जलवायु परिवर्तन ने मानसून को कैसे प्रभावित किया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has made it more predictable', 'It has shortened the season', 'It has made it more unpredictable', 'It has eliminated flooding'],
        correctAnswer: 'It has made it more unpredictable',
        explanation: 'The passage says "Climate change has made the monsoon more unpredictable."',
      },
    ],
  },

  // ==================== B2 - Additional ====================
  {
    id: 'b2-read-02',
    level: 'B2',
    title: 'India\'s Space Programme: Punching Above Its Weight',
    content: `In September 2014, India made history when its Mars Orbiter Mission, known as Mangalyaan, successfully entered Mars' orbit on its first attempt. What made this achievement even more remarkable was its cost: approximately ₹450 crore (about $74 million) — less than the budget of many Hollywood science fiction films. This frugal approach to space exploration has become a defining characteristic of the Indian Space Research Organisation (ISRO).

ISRO's origins trace back to 1962, when India's space programme began with rockets transported on bicycles and assembled in a church near Thumba, Kerala. Since then, it has evolved into one of the world's most capable and cost-effective space agencies. The Polar Satellite Launch Vehicle (PSLV) has become a workhorse, launching over 300 foreign satellites for 36 countries, generating significant revenue.

In 2023, India achieved another milestone with the Chandrayaan-3 mission, which successfully landed a rover near the Moon's south pole. India became only the fourth country to achieve a soft landing on the Moon and the first to land near the south pole, a region believed to contain water ice crucial for future space exploration.

ISRO's success challenges the assumption that space exploration is exclusively for wealthy nations. By emphasising ingenious engineering over expensive technology, and by developing most components domestically, ISRO has demonstrated that innovation does not always require massive budgets.

However, the organisation faces challenges. Critics argue that India, with significant poverty and infrastructure gaps, should prioritise development spending over space exploration. ISRO officials counter that satellite technology directly benefits citizens through weather forecasting, communication in remote areas, disaster management, and GPS navigation.`,
    wordCount: 250,
    topic: 'Science & Technology',
    indianContext: true,
    vocabulary: ['frugal', 'milestone', 'ingenious', 'domestically', 'aspiration', 'pragmatism'],
    questions: [
      {
        id: 'b2-r2-q1',
        type: 'multiple-choice',
        question: 'What was notable about the cost of Mangalyaan?',
        questionTranslations: { hi: 'मंगलयान की लागत में क्या उल्लेखनीय था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was the most expensive mission ever', 'It cost less than many Hollywood films', 'It was funded entirely by private companies', 'It was paid for by other countries'],
        correctAnswer: 'It cost less than many Hollywood films',
        explanation: 'The passage says the cost was "less than the budget of many Hollywood science fiction films."',
      },
      {
        id: 'b2-r2-q2',
        type: 'multiple-choice',
        question: 'What was significant about Chandrayaan-3\'s landing location?',
        questionTranslations: { hi: 'चंद्रयान-3 के लैंडिंग स्थान में क्या महत्वपूर्ण था?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It was the first landing on the Moon', 'It was the first landing near the south pole', 'It discovered life on the Moon', 'It landed on Mars instead'],
        correctAnswer: 'It was the first landing near the south pole',
        explanation: 'The passage says India was "the first to land near the south pole."',
      },
      {
        id: 'b2-r2-q3',
        type: 'multiple-choice',
        question: 'How do ISRO officials justify the space programme\'s costs?',
        questionTranslations: { hi: 'ISRO अधिकारी अंतरिक्ष कार्यक्रम की लागत को कैसे उचित ठहराते हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It creates jobs for engineers', 'Satellite technology directly benefits citizens', 'It attracts foreign investment', 'It improves India\'s military strength'],
        correctAnswer: 'Satellite technology directly benefits citizens',
        explanation: 'The passage mentions benefits like "weather forecasting, communication in remote areas, disaster management, and GPS navigation."',
      },
      {
        id: 'b2-r2-q4',
        type: 'multiple-choice',
        question: 'Where did India\'s early space programme begin?',
        questionTranslations: { hi: 'भारत का प्रारंभिक अंतरिक्ष कार्यक्रम कहाँ शुरू हुआ?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Bangalore', 'Sriharikota', 'Thumba, Kerala', 'Ahmedabad'],
        correctAnswer: 'Thumba, Kerala',
        explanation: 'The passage describes rockets "assembled in a church near Thumba, Kerala."',
      },
    ],
  },
  {
    id: 'b2-read-03',
    level: 'B2',
    title: 'The Gig Economy in Urban India',
    content: `At any given moment in a major Indian city, thousands of delivery riders are navigating through traffic, carrying food, groceries, and packages to customers' doors. These workers form the backbone of India's rapidly growing gig economy — a labour market characterised by short-term, flexible jobs rather than permanent employment.

Apps like Swiggy, Zomato, Urban Company, and Ola have created enormous employment opportunities. According to a NITI Aayog report, India had approximately 7.7 million gig workers in 2020, and this number is expected to grow to 23.5 million by 2030. For many workers, especially those migrating from rural areas, these platforms offer a way to earn money without needing formal qualifications.

The appeal of gig work lies in its flexibility. Workers can choose when and how much they work. A college student might deliver food in the evenings, while a homemaker might offer salon services through Urban Company during the day.

However, the gig economy has a less appealing side. Workers are classified as "partners" rather than employees, which means they receive no health insurance, paid leave, provident fund, or job security. Working conditions can be demanding. Delivery riders face dangerous road conditions and pressure to meet tight deadlines. Average earnings, once fuel and vehicle maintenance are deducted, often fall below minimum wage levels.

The Indian government has begun addressing these concerns. The Code on Social Security, 2020, includes provisions for extending social security benefits to gig workers, though implementation has been slow.`,
    wordCount: 230,
    topic: 'Economy & Labour',
    indianContext: true,
    vocabulary: ['gig economy', 'characterised', 'flexibility', 'provisions', 'implementation', 'qualifications'],
    questions: [
      {
        id: 'b2-r3-q1',
        type: 'multiple-choice',
        question: 'How many gig workers is India expected to have by 2030?',
        questionTranslations: { hi: '2030 तक भारत में कितने गिग कर्मचारी होने की उम्मीद है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['7.7 million', '15 million', '23.5 million', '50 million'],
        correctAnswer: '23.5 million',
        explanation: 'The passage says this number "is expected to grow to 23.5 million by 2030."',
      },
      {
        id: 'b2-r3-q2',
        type: 'multiple-choice',
        question: 'Why are gig workers classified as "partners" rather than employees?',
        questionTranslations: { hi: 'गिग कर्मचारियों को कर्मचारी के बजाय "भागीदार" क्यों वर्गीकृत किया जाता है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They own shares in the company', 'To avoid providing employment benefits', 'Because they invest in the business', 'They work in equal partnerships'],
        correctAnswer: 'To avoid providing employment benefits',
        explanation: 'The passage explains this classification means workers receive "no health insurance, paid leave, provident fund, or job security."',
      },
      {
        id: 'b2-r3-q3',
        type: 'multiple-choice',
        question: 'What legislative step has the Indian government taken for gig workers?',
        questionTranslations: { hi: 'भारत सरकार ने गिग कर्मचारियों के लिए क्या विधायी कदम उठाया है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Banned all gig work', 'Introduced the Code on Social Security, 2020', 'Made gig work illegal for students', 'Required all gig workers to form unions'],
        correctAnswer: 'Introduced the Code on Social Security, 2020',
        explanation: 'The passage mentions "The Code on Social Security, 2020, includes provisions for extending social security benefits."',
      },
      {
        id: 'b2-r3-q4',
        type: 'multiple-choice',
        question: 'What makes gig work earnings lower than expected?',
        questionTranslations: { hi: 'गिग कार्य की कमाई अपेक्षा से कम क्या बनाती है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['High tax rates', 'Fuel and vehicle maintenance costs', 'Platform subscription fees', 'Government fines'],
        correctAnswer: 'Fuel and vehicle maintenance costs',
        explanation: 'The passage says "once fuel and vehicle maintenance are deducted, [earnings] often fall below minimum wage."',
      },
    ],
  },
  {
    id: 'b2-read-04',
    level: 'B2',
    title: 'Mental Health Awareness in India',
    content: `For decades, mental health has been one of the most neglected areas of healthcare in India. Cultural stigma, a severe shortage of professionals, and limited public awareness have meant that millions of Indians suffering from conditions like depression, anxiety, and PTSD go untreated.

India has fewer than 1 psychiatrist per 100,000 people, compared to about 16 per 100,000 in countries like the United States. The situation is even worse in rural areas, where mental health services are virtually nonexistent.

Cultural attitudes play a major role. In many communities, mental illness is attributed to personal weakness, supernatural causes, or family shame. These attitudes discourage people from seeking help and perpetuate a cycle of suffering in silence.

However, there are encouraging signs of change. The Mental Healthcare Act of 2017 was a landmark legislation that gave every citizen the right to access mental healthcare. Helplines like iCall and Vandrevala Foundation provide free counselling services. Companies, particularly in the IT sector, are introducing employee wellness programmes that include mental health support.

Social media has also played a positive role. Celebrities and public figures speaking openly about their struggles with depression and anxiety have helped normalise conversations about mental health. Youth-led organisations are conducting awareness campaigns in schools and colleges.

The path forward requires training more mental health professionals, integrating mental health into primary healthcare, and fundamentally shifting cultural perceptions. While progress is slow, the conversation has begun — and that itself represents a significant step forward.`,
    wordCount: 230,
    topic: 'Health & Society',
    indianContext: true,
    vocabulary: ['stigma', 'perpetuate', 'landmark', 'normalise', 'systemic', 'well-being'],
    questions: [
      {
        id: 'b2-r4-q1',
        type: 'multiple-choice',
        question: 'How many psychiatrists does India have per 100,000 people?',
        questionTranslations: { hi: 'भारत में प्रति 1,00,000 लोगों पर कितने मनोचिकित्सक हैं?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Fewer than 1', 'About 5', 'About 10', 'About 16'],
        correctAnswer: 'Fewer than 1',
        explanation: 'The passage says "India has fewer than 1 psychiatrist per 100,000 people."',
      },
      {
        id: 'b2-r4-q2',
        type: 'multiple-choice',
        question: 'What did the Mental Healthcare Act of 2017 establish?',
        questionTranslations: { hi: '2017 के मानसिक स्वास्थ्य अधिनियम ने क्या स्थापित किया?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Free medicine for all patients', 'The right to access mental healthcare', 'Mandatory counselling in schools', 'Ban on mental health stigma'],
        correctAnswer: 'The right to access mental healthcare',
        explanation: 'The passage says the Act "gave every citizen the right to access mental healthcare."',
      },
      {
        id: 'b2-r4-q3',
        type: 'multiple-choice',
        question: 'Which sector is mentioned as introducing employee wellness programmes?',
        questionTranslations: { hi: 'कौन सा क्षेत्र कर्मचारी कल्याण कार्यक्रम शुरू करने के लिए उल्लेखित है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Agriculture', 'Manufacturing', 'IT sector', 'Government services'],
        correctAnswer: 'IT sector',
        explanation: 'The passage says "Companies, particularly in the IT sector, are introducing employee wellness programmes."',
      },
      {
        id: 'b2-r4-q4',
        type: 'multiple-choice',
        question: 'How has social media helped the mental health conversation?',
        questionTranslations: { hi: 'सोशल मीडिया ने मानसिक स्वास्थ्य की बातचीत में कैसे मदद की है?', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['By providing medical prescriptions', 'By celebrities speaking openly about their struggles', 'By replacing professional therapy', 'By banning negative content'],
        correctAnswer: 'By celebrities speaking openly about their struggles',
        explanation: 'The passage says celebrities "speaking openly about their struggles... have helped normalise conversations."',
      },
    ],
  },

  // ==================== C1 - Additional ====================
  {
    id: 'c1-read-02',
    level: 'C1',
    title: 'Artificial Intelligence and India\'s Workforce',
    content: `India stands at a peculiar crossroads in the global AI revolution. As both one of the world's largest outsourcing destinations and a nation grappling with unemployment, it faces a dual reality: AI promises to transform India into a technological powerhouse, yet it simultaneously threatens to displace the very workforce that has driven the country's economic growth over the past three decades.

The Information Technology sector, which employs over 5 million people and contributes approximately 7.5% to India's GDP, is particularly exposed. Generative AI tools can now perform tasks that previously required teams of junior software developers, data entry operators, and customer support agents. A McKinsey report estimated that 50% of current work activities in India are technically automatable with existing technology.

However, the narrative of wholesale displacement oversimplifies a more complex reality. History suggests that technological revolutions create new categories of employment even as they eliminate others. The advent of ATMs, for instance, did not reduce the number of bank employees in India; instead, it freed them to undertake more complex, relationship-driven roles.

India has several structural advantages in this transition. Its demographic profile — with a median age of approximately 28 years — means the workforce is more adaptable than that of ageing societies. The country's strength in mathematics and engineering education provides a foundation for reskilling towards AI-adjacent roles. Moreover, India's vast informal economy, comprising nearly 90% of employment, operates in sectors where AI automation is far less immediately applicable.

The critical challenge lies in the pace and equity of transition. While elite institutions like the IITs pivot seamlessly towards AI curricula, the majority of India's engineering colleges lack the infrastructure and faculty to deliver quality AI education. Without deliberate policy intervention, the AI revolution risks exacerbating India's already significant inequalities.`,
    wordCount: 280,
    topic: 'Technology & Economy',
    indianContext: true,
    vocabulary: ['automatable', 'augment', 'demographic', 'exacerbating', 'curricula', 'displacement'],
    questions: [
      {
        id: 'c1-r2-q1',
        type: 'multiple-choice',
        question: 'According to the McKinsey report cited, what percentage of Indian work activities are automatable?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['25%', '35%', '50%', '75%'],
        correctAnswer: '50%',
        explanation: 'The passage cites "50% of current work activities in India are technically automatable."',
      },
      {
        id: 'c1-r2-q2',
        type: 'multiple-choice',
        question: 'What example does the author use to argue that technology doesn\'t always eliminate jobs?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['The decline of call centres', 'The introduction of ATMs in banks', 'The rise of smartphone factories', 'The growth of online education'],
        correctAnswer: 'The introduction of ATMs in banks',
        explanation: 'The passage uses the ATM example, noting ATMs "did not reduce the number of bank employees."',
      },
      {
        id: 'c1-r2-q3',
        type: 'multiple-choice',
        question: 'What structural advantage does India\'s informal economy provide against AI displacement?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It is already highly automated', 'It operates in sectors where AI automation is less applicable', 'Workers are already trained in AI', 'It is protected by labour unions'],
        correctAnswer: 'It operates in sectors where AI automation is less applicable',
        explanation: 'The passage says the informal economy "operates in sectors where AI automation is far less immediately applicable."',
      },
      {
        id: 'c1-r2-q4',
        type: 'multiple-choice',
        question: 'What gap does the passage identify in India\'s education system regarding AI?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['IITs do not teach AI courses', 'Most engineering colleges lack infrastructure for quality AI education', 'Students prefer arts over engineering', 'There are too many AI graduates'],
        correctAnswer: 'Most engineering colleges lack infrastructure for quality AI education',
        explanation: 'The passage says "the majority of India\'s engineering colleges lack the infrastructure and faculty."',
      },
    ],
  },
  {
    id: 'c1-read-03',
    level: 'C1',
    title: 'Climate Change and India\'s Coastline',
    content: `India possesses one of the world's longest coastlines, stretching approximately 7,500 kilometres across nine states and four union territories. Over 170 million people live in these coastal zones. As global temperatures rise and sea levels climb, this vast strip of land has become one of the country's most vulnerable frontiers.

The IPCC projects that global sea levels could rise by 0.3 to 1.1 metres by 2100. For India, even a modest rise of half a metre would be catastrophic. A 2019 study published in Nature Communications estimated that approximately 36 million Indians currently live on land that will be below the annual flood level by 2050.

Mumbai, India's financial capital, illustrates the stakes vividly. Built on reclaimed land, the city already experiences devastating flooding during heavy monsoon rains. Rising sea levels will compound this vulnerability exponentially. The city's iconic Marine Drive, dense slum settlements like Dharavi, and critical infrastructure including the international airport sit perilously close to sea level.

The Sundarbans, the world's largest mangrove forest straddling West Bengal and Bangladesh, faces an existential threat. Several islands have already been submerged, displacing thousands of residents. The mangroves themselves — which serve as natural barriers against cyclones — are retreating as salinity levels increase and coastlines erode.

India's response has been a mixture of adaptation and mitigation strategies. The National Action Plan on Climate Change includes a dedicated coastal management mission. Kerala, after devastating floods in 2018 and 2019, has pioneered community-based disaster resilience programmes.

Yet critics argue that these efforts remain piecemeal and inadequately funded relative to the scale of the challenge.`,
    wordCount: 250,
    topic: 'Environment & Climate',
    indianContext: true,
    vocabulary: ['vulnerability', 'reclaimed', 'exponentially', 'existential', 'mitigation', 'piecemeal'],
    questions: [
      {
        id: 'c1-r3-q1',
        type: 'multiple-choice',
        question: 'How many Indians are estimated to live on land that will be below flood level by 2050?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['10 million', '20 million', '36 million', '50 million'],
        correctAnswer: '36 million',
        explanation: 'The passage cites "approximately 36 million Indians" on such land.',
      },
      {
        id: 'c1-r3-q2',
        type: 'multiple-choice',
        question: 'Why is Mumbai particularly vulnerable to sea-level rise?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['It has no flood barriers', 'It was built on reclaimed land', 'It has the highest population in India', 'It receives the most rainfall in India'],
        correctAnswer: 'It was built on reclaimed land',
        explanation: 'The passage says "Built on reclaimed land, the city already experiences devastating flooding."',
      },
      {
        id: 'c1-r3-q3',
        type: 'multiple-choice',
        question: 'What is happening to the Sundarbans mangroves?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['They are expanding rapidly', 'They are being deforested for timber', 'They are retreating due to rising salinity and erosion', 'They are being protected successfully'],
        correctAnswer: 'They are retreating due to rising salinity and erosion',
        explanation: 'The passage says mangroves "are retreating as salinity levels increase and coastlines erode."',
      },
      {
        id: 'c1-r3-q4',
        type: 'multiple-choice',
        question: 'Which state is mentioned as pioneering community-based disaster resilience?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Maharashtra', 'Tamil Nadu', 'West Bengal', 'Kerala'],
        correctAnswer: 'Kerala',
        explanation: 'The passage says "Kerala... has pioneered community-based disaster resilience programmes."',
      },
    ],
  },
  {
    id: 'c1-read-04',
    level: 'C1',
    title: 'The Paradox of Indian Democracy',
    content: `India is the world's largest democracy by population, conducting elections of a scale and complexity unmatched anywhere on Earth. The 2024 general election involved approximately 970 million eligible voters, nearly a million polling stations, and an exercise spanning six weeks. Yet this remarkable democratic machinery coexists with persistent challenges that suggest the distance between procedural democracy and substantive democracy remains considerable.

On one hand, India's democratic credentials are genuinely impressive. Power has transferred peacefully between parties at both national and state levels. Voter turnout, averaging around 67% in recent general elections, is higher than in many established Western democracies. The Election Commission of India is widely regarded as one of the most competent electoral bodies in the developing world.

On the other hand, the quality of democratic governance presents a more complicated picture. The centralisation of executive power, the use of colonial-era sedition and public safety laws to curtail dissent, and the growing nexus between political parties and corporate interests raise legitimate concerns.

Perhaps the most striking paradox lies in representation. India's Parliament and state assemblies have become increasingly dominated by wealthy candidates. An analysis by the Association for Democratic Reforms found that over 40% of Members of Parliament in 2024 had declared criminal cases against them. The cost of contesting elections has soared to levels that effectively exclude ordinary citizens from political participation.

Federalism — the distribution of power between the Centre and states — adds another layer of complexity. While the Constitution envisions cooperative federalism, the reality often involves tension over fiscal resources and legislative authority.

Indian democracy defies simplistic narratives. It is simultaneously vibrant and flawed, resilient and fragile, evolving and constrained by historical legacies.`,
    wordCount: 260,
    topic: 'Politics & Governance',
    indianContext: true,
    vocabulary: ['procedural', 'substantive', 'centralisation', 'sedition', 'self-perpetuating', 'federalism'],
    questions: [
      {
        id: 'c1-r4-q1',
        type: 'multiple-choice',
        question: 'How many eligible voters were involved in the 2024 Indian general election?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['500 million', '750 million', '970 million', '1.2 billion'],
        correctAnswer: '970 million',
        explanation: 'The passage states "approximately 970 million eligible voters."',
      },
      {
        id: 'c1-r4-q2',
        type: 'multiple-choice',
        question: 'What does the passage identify as a barrier to ordinary citizens entering politics?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Lack of education', 'The high cost of contesting elections', 'Age restrictions', 'Religious requirements'],
        correctAnswer: 'The high cost of contesting elections',
        explanation: 'The passage says "The cost of contesting elections has soared to levels that effectively exclude ordinary citizens."',
      },
      {
        id: 'c1-r4-q3',
        type: 'multiple-choice',
        question: 'What percentage of MPs in 2024 had declared criminal cases against them?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Over 15%', 'Over 25%', 'Over 40%', 'Over 60%'],
        correctAnswer: 'Over 40%',
        explanation: 'The passage cites "over 40% of Members of Parliament in 2024 had declared criminal cases."',
      },
      {
        id: 'c1-r4-q4',
        type: 'multiple-choice',
        question: 'What is the average voter turnout mentioned for recent Indian general elections?',
        questionTranslations: { hi: '', ta: '', te: '', bn: '', mr: '', kn: '', ml: '', gu: '', pa: '', od: '', en: '' },
        options: ['Around 45%', 'Around 55%', 'Around 67%', 'Around 80%'],
        correctAnswer: 'Around 67%',
        explanation: 'The passage says "Voter turnout, averaging around 67% in recent general elections."',
      },
    ],
  },
];

export function getReadingPassagesByLevel(level: string): ReadingPassage[] {
  return readingPassages.filter((p) => p.level === level);
}

export function getReadingPassageById(id: string): ReadingPassage | undefined {
  return readingPassages.find((p) => p.id === id);
}
