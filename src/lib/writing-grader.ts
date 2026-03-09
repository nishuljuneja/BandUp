/**
 * Rule-based writing grader for BandUp.
 * Evaluates grammar, spelling, punctuation, structure, vocabulary, and task adherence.
 * Returns score 0-10 with detailed feedback and highlighted mistakes.
 */

import type { CEFRLevel } from './firestore';

// ── Types ──

export interface WritingMistake {
  type: 'grammar' | 'spelling' | 'punctuation' | 'style' | 'structure';
  text: string;         // the offending text
  suggestion: string;   // corrected version or advice
  explanation: string;  // why it's wrong
}

export interface GradingResult {
  score: number;         // 0 – 10
  summary: string;       // one-line verdict
  strengths: string[];   // what the user did well
  improvements: string[];// areas to work on
  mistakes: WritingMistake[];
  breakdown: {
    grammar: number;      // 0 – 10
    spelling: number;
    punctuation: number;
    vocabulary: number;
    structure: number;
    taskAdherence: number;
  };
}

// ── Common error patterns ──

interface ErrorPattern {
  pattern: RegExp;
  type: WritingMistake['type'];
  suggestion: string;
  explanation: string;
}

const GRAMMAR_PATTERNS: ErrorPattern[] = [
  // Subject-verb agreement
  { pattern: /\b(I|we|they|you)\s+(is|was|has)\b/gi, type: 'grammar', suggestion: 'Use "am/are/were/have" with this subject', explanation: 'Subject-verb agreement error: the subject and verb don\'t match in number.' },
  { pattern: /\b(he|she|it)\s+(are|were|have)\b/gi, type: 'grammar', suggestion: 'Use "is/was/has" with this subject', explanation: 'Subject-verb agreement error: singular subject needs a singular verb.' },
  // Singular subject + "and have/are" (e.g. "It is big and have..." → "has")
  { pattern: /\b(he|she|it)\s+\w+\b[^.!?]*\band\s+have\b/gi, type: 'grammar', suggestion: 'Use "has" — the subject is singular (he/she/it)', explanation: 'When the subject is he, she, or it, use "has" instead of "have", even after "and".' },
  { pattern: /\b(he|she|it)\s+\w+\b[^.!?]*\band\s+are\b/gi, type: 'grammar', suggestion: 'Use "is" — the subject is singular (he/she/it)', explanation: 'When the subject is he, she, or it, use "is" instead of "are", even after "and".' },
  // Singular nouns followed by "have" instead of "has"
  { pattern: /\b(the\s+(?:house|room|city|school|car|building|office|shop|place|country|company|team|book|phone|table|dog|cat|child|garden|kitchen|park|hotel|hospital|restaurant|college|village|town|flat|apartment|movie|film|song|game|website|app))\s+have\b/gi, type: 'grammar', suggestion: 'Use "has" with a singular noun', explanation: 'Singular nouns take "has", not "have". E.g. "The house has 4 rooms."' },
  { pattern: /\b(my\s+(?:house|room|home|city|school|car|building|office|shop|place|country|company|team|book|phone|table|dog|cat|child|garden|kitchen|park|hotel|flat|apartment|friend|brother|sister|mother|father|wife|husband))\s+have\b/gi, type: 'grammar', suggestion: 'Use "has" with a singular noun', explanation: 'Singular nouns take "has", not "have". E.g. "My house has 4 rooms."' },
  // Common Indian English errors
  { pattern: /\b(I|he|she|we|they)\s+am\s+having\b/gi, type: 'grammar', suggestion: '"I have" or "I am eating/doing..."', explanation: '"Having" is often misused. Use "have" for possession and "am/is/are + verb-ing" for actions.' },
  { pattern: /\byesterday\s+I\s+(go|eat|come|do|make|take|see|give|get|buy|run|write|read)\b/gi, type: 'grammar', suggestion: 'Use past tense after "yesterday"', explanation: 'When describing past events, use the past tense form of the verb.' },
  { pattern: /\b(did\s+not|didn't)\s+\w+ed\b/gi, type: 'grammar', suggestion: 'Use base form after "did not"', explanation: 'After "did not / didn\'t", use the base form of the verb, not past tense.' },
  { pattern: /\bmore\s+(better|worse|bigger|smaller|easier|harder|faster|slower)\b/gi, type: 'grammar', suggestion: 'Remove "more" – the adjective is already comparative', explanation: 'Don\'t use "more" with adjectives that already have "-er" comparative form.' },
  { pattern: /\bmost\s+(best|worst|biggest|smallest|easiest|hardest)\b/gi, type: 'grammar', suggestion: 'Remove "most" – the adjective is already superlative', explanation: 'Don\'t use "most" with adjectives that already have "-est" superlative form.' },
  { pattern: /\bI\s+did\s+not\s+went\b/gi, type: 'grammar', suggestion: '"I did not go"', explanation: 'After "did not", use the base form "go", not the past tense "went".' },
  { pattern: /\bhe\s+don't\b/gi, type: 'grammar', suggestion: '"he doesn\'t"', explanation: 'Use "doesn\'t" with he/she/it, not "don\'t".' },
  { pattern: /\bshe\s+don't\b/gi, type: 'grammar', suggestion: '"she doesn\'t"', explanation: 'Use "doesn\'t" with he/she/it, not "don\'t".' },
  { pattern: /\bit\s+don't\b/gi, type: 'grammar', suggestion: '"it doesn\'t"', explanation: 'Use "doesn\'t" with he/she/it, not "don\'t".' },
  // Article misuse
  { pattern: /\ba\s+([aeiou]\w+)\b/gi, type: 'grammar', suggestion: 'Use "an" before vowel sounds', explanation: 'Use "an" instead of "a" before words starting with a vowel sound.' },
  { pattern: /\ban\s+([bcdfghjklmnpqrstvwxyz]\w+)\b/gi, type: 'grammar', suggestion: 'Use "a" before consonant sounds', explanation: 'Use "a" instead of "an" before words starting with a consonant sound.' },
  // Double negatives
  { pattern: /\b(don't|doesn't|didn't|won't|can't|isn't|aren't|wasn't|weren't)\s+\w+\s+no\b/gi, type: 'grammar', suggestion: 'Avoid double negatives – use "any" instead of "no"', explanation: 'Using two negatives in one sentence creates a double negative, which is grammatically incorrect.' },
  // Tense consistency
  { pattern: /\bwill\s+\w+ed\b/gi, type: 'grammar', suggestion: 'Use base form after "will"', explanation: 'After "will", use the base form of the verb, not the past tense.' },
  // There/their/they're
  { pattern: /\btheir\s+(is|are|was|were)\b/gi, type: 'grammar', suggestion: '"there is/are" or "they\'re"', explanation: '"Their" shows possession. Did you mean "there" (location/existence) or "they\'re" (they are)?' },
  { pattern: /\bthere\s+(house|car|book|family|school|friend|name|phone|dog|cat)\b/gi, type: 'grammar', suggestion: '"their" (possessive)', explanation: 'Use "their" when showing possession, not "there".' },
  // Its/it's confusion
  { pattern: /\bit's\s+(own|self)\b/gi, type: 'grammar', suggestion: '"its" (possessive, no apostrophe)', explanation: '"Its" (no apostrophe) shows possession. "It\'s" means "it is" or "it has".' },
  // your / you're confusion
  { pattern: /\byour\s+(welcome|right|wrong|correct|late|early|invited)\b/gi, type: 'grammar', suggestion: '"you\'re" (you are)', explanation: '"Your" shows possession. Use "you\'re" (you are) here.' },
  // Could/would/should + of
  { pattern: /\b(could|would|should)\s+of\b/gi, type: 'grammar', suggestion: '"could/would/should have"', explanation: 'The correct form is "could have", "would have", "should have" – not "of".' },
];

const COMMON_MISSPELLINGS: Record<string, string> = {
  'teh': 'the', 'adn': 'and', 'becuase': 'because', 'becasue': 'because',
  'beacuse': 'because', 'recieve': 'receive', 'acheive': 'achieve',
  'occured': 'occurred', 'occuring': 'occurring', 'untill': 'until',
  'goverment': 'government', 'govervent': 'government', 'enviroment': 'environment',
  'definately': 'definitely', 'defintely': 'definitely', 'seperate': 'separate',
  'occassion': 'occasion', 'ocassion': 'occasion', 'accomodate': 'accommodate',
  'wich': 'which', 'wiht': 'with', 'thier': 'their', 'freind': 'friend',
  'freinds': 'friends', 'toghether': 'together', 'togather': 'together',
  'beautifull': 'beautiful', 'beutiful': 'beautiful', 'intresting': 'interesting',
  'neccesary': 'necessary', 'neccessary': 'necessary', 'necessery': 'necessary',
  'noticable': 'noticeable', 'similiar': 'similar', 'diffirent': 'different',
  'diffrent': 'different', 'sucessful': 'successful', 'succesful': 'successful',
  'proffessional': 'professional', 'profesional': 'professional',
  'tommorow': 'tomorrow', 'tommorrow': 'tomorrow', 'calender': 'calendar',
  'explaination': 'explanation', 'knowlege': 'knowledge', 'knowladge': 'knowledge',
  'langugage': 'language', 'langauge': 'language', 'practise': 'practice',
  'writting': 'writing', 'writeing': 'writing', 'begining': 'beginning',
  'comming': 'coming', 'stoping': 'stopping', 'runing': 'running',
  'hapened': 'happened', 'happend': 'happened', 'realy': 'really',
  'finaly': 'finally', 'basicly': 'basically', 'hopfully': 'hopefully',
  'alot': 'a lot', 'arround': 'around', 'belive': 'believe',
  'peaple': 'people', 'poeple': 'people', 'whould': 'would',
  'shoud': 'should', 'couldnt': "couldn't", 'shouldnt': "shouldn't",
  'wouldnt': "wouldn't", 'doesnt': "doesn't", 'didnt': "didn't",
  'isnt': "isn't", 'arent': "aren't", 'wasnt': "wasn't",
  'im': "I'm", 'iam': "I am", 'dont': "don't", 'wont': "won't",
  'cant': "can't", 'thats': "that's", 'whats': "what's",
  'helo': 'hello', 'helllo': 'hello', 'gud': 'good',
  'bcoz': 'because', 'bcuz': 'because', 'pls': 'please',
  'plz': 'please', 'msg': 'message', 'sms': 'message',
  'luv': 'love', 'u': 'you', 'ur': 'your', 'r': 'are',
  'bfore': 'before', 'frm': 'from', 'abt': 'about',
  'evry': 'every', 'evryone': 'everyone', 'coz': 'because',
  'thru': 'through', 'tho': 'though', 'nite': 'night',
  'lite': 'light', 'rite': 'right', 'gonna': 'going to',
  'wanna': 'want to', 'kinda': 'kind of', 'gotta': 'got to',
  'prolly': 'probably', 'bout': 'about', 'ya': 'you',
};

// ── Grading functions ──

function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

function getWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function getUniqueWords(words: string[]): Set<string> {
  return new Set(words.map((w) => w.toLowerCase().replace(/[^a-z'-]/g, '')).filter(Boolean));
}

function checkSpelling(words: string[]): WritingMistake[] {
  const mistakes: WritingMistake[] = [];
  const seen = new Set<string>();
  for (const rawWord of words) {
    const clean = rawWord.toLowerCase().replace(/[^a-z']/g, '');
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    const correction = COMMON_MISSPELLINGS[clean];
    if (correction) {
      mistakes.push({
        type: 'spelling',
        text: rawWord,
        suggestion: correction,
        explanation: `"${clean}" should be spelled "${correction}".`,
      });
    }
  }
  return mistakes;
}

function checkGrammar(text: string): WritingMistake[] {
  const mistakes: WritingMistake[] = [];
  const seen = new Set<string>();
  for (const rule of GRAMMAR_PATTERNS) {
    let match: RegExpExecArray | null;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    while ((match = regex.exec(text)) !== null) {
      const key = `${rule.type}:${match[0].toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      mistakes.push({
        type: rule.type,
        text: match[0],
        suggestion: rule.suggestion,
        explanation: rule.explanation,
      });
    }
  }
  return mistakes;
}

function checkPunctuation(text: string): WritingMistake[] {
  const mistakes: WritingMistake[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);

  // Check for sentences not starting with uppercase
  let noCapCount = 0;
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length > 0 && /^[a-z]/.test(trimmed)) {
      noCapCount++;
    }
  }
  if (noCapCount > 0) {
    mistakes.push({
      type: 'punctuation',
      text: `${noCapCount} sentence${noCapCount > 1 ? 's' : ''} starting with lowercase`,
      suggestion: 'Capitalize the first letter of each sentence.',
      explanation: 'Every sentence should begin with a capital letter.',
    });
  }

  // "i" should be "I"
  if (/\bi\b/.test(text.replace(/\bI\b/g, ''))) {
    const lowercase_i = text.match(/(?<!\w)i(?!\w)/g);
    if (lowercase_i && lowercase_i.length > 0) {
      mistakes.push({
        type: 'punctuation',
        text: '"i" used instead of "I"',
        suggestion: 'Always capitalize "I" when referring to yourself.',
        explanation: 'The pronoun "I" is always capitalized in English.',
      });
    }
  }

  // Missing end punctuation
  const trimmed = text.trim();
  if (trimmed.length > 0 && !/[.!?]$/.test(trimmed)) {
    mistakes.push({
      type: 'punctuation',
      text: 'Missing punctuation at end',
      suggestion: 'End your writing with a period, question mark, or exclamation mark.',
      explanation: 'Complete sentences should end with proper punctuation.',
    });
  }

  // Multiple spaces
  if (/  +/.test(text)) {
    mistakes.push({
      type: 'style',
      text: 'Multiple consecutive spaces found',
      suggestion: 'Use a single space between words.',
      explanation: 'Extra spaces make your writing look untidy.',
    });
  }

  // No commas at all in long text
  const wordCount = getWords(text).length;
  if (wordCount > 50 && !text.includes(',')) {
    mistakes.push({
      type: 'punctuation',
      text: 'No commas used',
      suggestion: 'Use commas to separate clauses, items in a list, and after introductory phrases.',
      explanation: 'Commas help make longer texts clearer and easier to read.',
    });
  }

  return mistakes;
}

function assessVocabulary(words: string[], level: CEFRLevel): { score: number; feedback: string } {
  const unique = getUniqueWords(words);
  const total = words.length;
  const ratio = unique.size / Math.max(total, 1);

  // Level-based expectations for vocabulary diversity
  const thresholds: Record<CEFRLevel, { good: number; great: number }> = {
    'A1': { good: 0.35, great: 0.50 },
    'A2': { good: 0.40, great: 0.55 },
    'B1': { good: 0.45, great: 0.60 },
    'B2': { good: 0.50, great: 0.65 },
    'C1': { good: 0.55, great: 0.70 },
    'C2': { good: 0.60, great: 0.75 },
  };

  const t = thresholds[level];
  // Average word length as a proxy for word complexity
  const avgWordLen = words.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, '').length, 0) / Math.max(total, 1);
  const complexBonus = avgWordLen > 5.5 ? 1 : avgWordLen > 4.5 ? 0.5 : 0;

  if (ratio >= t.great) {
    return { score: Math.min(10, 9 + complexBonus), feedback: 'Excellent vocabulary range with good variety.' };
  }
  if (ratio >= t.good) {
    return { score: Math.min(10, 7 + complexBonus), feedback: 'Good vocabulary variety. Try using more synonyms to avoid repetition.' };
  }
  return { score: Math.max(3, 5 + complexBonus), feedback: 'Limited vocabulary variety. Try using different words instead of repeating the same ones.' };
}

function assessStructure(text: string, minWords: number, maxWords: number): { score: number; feedback: string } {
  const wordCount = getWords(text).length;
  const sentenceCount = countSentences(text);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const avgSentenceLen = wordCount / Math.max(sentenceCount, 1);

  let score = 7;
  let feedback = '';

  // Paragraph structure
  if (wordCount > 80 && paragraphs.length <= 1) {
    score -= 1;
    feedback += 'Consider breaking your text into paragraphs for better organisation. ';
  } else if (paragraphs.length >= 2) {
    score += 1;
    feedback += 'Good use of paragraphs. ';
  }

  // Sentence length variety
  if (avgSentenceLen > 25) {
    score -= 1;
    feedback += 'Some sentences are very long. Try breaking them into shorter ones. ';
  } else if (avgSentenceLen < 5 && sentenceCount > 3) {
    score -= 1;
    feedback += 'Your sentences are quite short. Try combining some ideas for better flow. ';
  } else {
    score += 1;
    feedback += 'Sentence lengths are well varied. ';
  }

  // Word count adherence
  if (wordCount > maxWords * 1.3) {
    score -= 1;
    feedback += `Your text exceeds the target length significantly (${wordCount} vs ${maxWords} words). `;
  } else if (wordCount > maxWords) {
    feedback += `Slightly over the target word count, but acceptable. `;
  }

  return { score: Math.max(2, Math.min(10, score)), feedback: feedback.trim() };
}

function assessTaskAdherence(text: string, instruction: string, level: CEFRLevel): { score: number; feedback: string } {
  let score = 7;
  let feedback = '';

  const lowerText = text.toLowerCase();
  const lowerInst = instruction.toLowerCase();

  // Check if it's an email format task
  if (lowerInst.includes('email') || lowerInst.includes('letter')) {
    const hasGreeting = /\b(dear|hello|hi|hey)\b/i.test(text);
    const hasClosing = /\b(regards|sincerely|wishes|thank|yours|cheers|see you)\b/i.test(text);
    if (hasGreeting) { score += 1; feedback += 'Good: includes a greeting. '; }
    else { score -= 1; feedback += 'Missing a greeting (Dear..., Hello...). '; }
    if (hasClosing) { score += 1; feedback += 'Good: includes a closing. '; }
    else { score -= 1; feedback += 'Missing a closing phrase (Regards, Best wishes...). '; }
  }

  // Check opinion/essay tasks
  if (lowerInst.includes('opinion') || lowerInst.includes('essay')) {
    const hasOpinionPhrases = /\b(I think|I believe|in my opinion|I feel|from my perspective|it seems|I agree|I disagree)\b/i.test(text);
    if (hasOpinionPhrases) { score += 1; feedback += 'Good use of opinion phrases. '; }
    else { score -= 1; feedback += 'For opinion pieces, use phrases like "I believe..." or "In my opinion..." '; }

    const hasLinkingWords = /\b(however|moreover|furthermore|although|therefore|consequently|nevertheless|on the other hand|in addition|firstly|secondly|in conclusion)\b/i.test(text);
    if (hasLinkingWords) { score += 1; feedback += 'Good use of linking words. '; }
    else { feedback += 'Try using more linking words (however, moreover, therefore) to connect ideas. '; }
  }

  // Check for proposal/report
  if (lowerInst.includes('proposal') || lowerInst.includes('report')) {
    const hasFormalTone = /\b(recommend|suggest|propose|therefore|consequently|accordingly|shall|ought)\b/i.test(text);
    if (hasFormalTone) { score += 1; feedback += 'Good formal register. '; }
    else { score -= 1; feedback += 'Use more formal language for proposals/reports (recommend, suggest, propose). '; }
  }

  // Check for description tasks
  if (lowerInst.includes('describe') || lowerInst.includes('write about')) {
    const hasAdjectives = /\b(big|small|beautiful|nice|good|great|old|new|clean|dirty|cozy|comfortable|lovely|wonderful|huge|tiny)\b/i.test(text);
    if (hasAdjectives) { score += 1; feedback += 'Good use of descriptive words. '; }
    else { feedback += 'Try using more descriptive adjectives to make your writing vivid. '; }
  }

  return { score: Math.max(2, Math.min(10, score)), feedback: feedback.trim() };
}

// ── Main grading function ──

export function gradeWriting(
  text: string,
  level: CEFRLevel,
  instruction: string,
  minWords: number,
  maxWords: number,
): GradingResult {
  const words = getWords(text);
  const wordCount = words.length;

  // Collect mistakes
  const spellingMistakes = checkSpelling(words);
  const grammarMistakes = checkGrammar(text);
  const punctuationMistakes = checkPunctuation(text);
  const allMistakes = [...grammarMistakes, ...spellingMistakes, ...punctuationMistakes];

  // Subscores
  const grammarErrorCount = grammarMistakes.length;
  const spellingErrorCount = spellingMistakes.length;
  const punctuationErrorCount = punctuationMistakes.length;

  const grammarScore = Math.max(2, 10 - grammarErrorCount * 2);
  const spellingScore = Math.max(2, 10 - spellingErrorCount * 2);
  const punctuationScore = Math.max(2, 10 - punctuationErrorCount * 1.5);

  const vocabResult = assessVocabulary(words, level);
  const structureResult = assessStructure(text, minWords, maxWords);
  const taskResult = assessTaskAdherence(text, instruction, level);

  // Weighted final score
  const finalRaw = (
    grammarScore * 0.25 +
    spellingScore * 0.15 +
    punctuationScore * 0.10 +
    vocabResult.score * 0.15 +
    structureResult.score * 0.15 +
    taskResult.score * 0.20
  );

  // Word count penalty
  let wordCountPenalty = 0;
  if (wordCount < minWords) {
    wordCountPenalty = Math.min(3, ((minWords - wordCount) / minWords) * 5);
  }

  const finalScore = Math.max(1, Math.min(10, Math.round((finalRaw - wordCountPenalty) * 10) / 10));

  // Build strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (grammarScore >= 8) strengths.push('Strong grammar with few errors.');
  else improvements.push('Work on grammar – especially subject-verb agreement and tense consistency.');

  if (spellingScore >= 8) strengths.push('Good spelling throughout.');
  else improvements.push('Check spelling carefully – consider reading your text aloud before submitting.');

  if (punctuationScore >= 8) strengths.push('Proper punctuation and capitalization.');
  else improvements.push('Pay attention to capitalization and end punctuation in every sentence.');

  if (vocabResult.score >= 8) strengths.push(vocabResult.feedback);
  else improvements.push(vocabResult.feedback);

  if (structureResult.score >= 8) strengths.push(structureResult.feedback);
  else improvements.push(structureResult.feedback);

  if (taskResult.score >= 8) strengths.push(taskResult.feedback);
  else if (taskResult.feedback) improvements.push(taskResult.feedback);

  if (wordCount >= minWords && wordCount <= maxWords) {
    strengths.push(`Good length (${wordCount} words within the ${minWords}–${maxWords} target).`);
  } else if (wordCount < minWords) {
    improvements.push(`Your text is too short (${wordCount}/${minWords} words). Develop your ideas further.`);
  }

  // Summary
  let summary: string;
  if (finalScore >= 9) summary = 'Outstanding work! Your writing is clear, well-structured, and nearly error-free.';
  else if (finalScore >= 7) summary = 'Good effort! Your writing is generally clear with some areas to polish.';
  else if (finalScore >= 5) summary = 'Fair attempt. There are several areas where you can improve.';
  else if (finalScore >= 3) summary = 'Needs improvement. Focus on grammar basics and sentence structure.';
  else summary = 'Keep practising! Start with simple sentences and build up from there.';

  return {
    score: finalScore,
    summary,
    strengths: strengths.length > 0 ? strengths : ['You made an effort – keep writing to improve!'],
    improvements: improvements.length > 0 ? improvements : ['Keep writing regularly to maintain your skills.'],
    mistakes: allMistakes,
    breakdown: {
      grammar: Math.round(grammarScore * 10) / 10,
      spelling: Math.round(spellingScore * 10) / 10,
      punctuation: Math.round(punctuationScore * 10) / 10,
      vocabulary: Math.round(vocabResult.score * 10) / 10,
      structure: Math.round(structureResult.score * 10) / 10,
      taskAdherence: Math.round(taskResult.score * 10) / 10,
    },
  };
}
