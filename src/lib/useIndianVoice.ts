'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Robust Indian-English TTS hook.
 *
 * Voice priority:
 *  1. en-IN voices (prefer names with India / Hindi / Heera / Ravi / Neerja / Prabhat / Rishi / Aditi / Kajal)
 *  2. Any voice whose *name* contains "India" regardless of lang tag
 *  3. en-GB  (closer to Indian accent than en-US)
 *  4. en-AU  (another Commonwealth accent)
 *  5. Any English voice
 *  6. Browser default (null)
 *
 * Handles the common Chrome quirk where getVoices() returns [] on first call
 * and later fires 'voiceschanged'. Also retries with increasing delay for
 * Edge / Firefox where the event sometimes doesn't fire.
 */

const PREFERRED_NAME =
  /india|hindi|heera|ravi|neerja|prabhat|rishi|aditi|kajal/i;

function pickBest(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  // 1. en-IN voices
  const enIN = voices.filter(
    (v) => v.lang === 'en-IN' || v.lang.startsWith('en-IN'),
  );
  if (enIN.length) {
    return enIN.find((v) => PREFERRED_NAME.test(v.name)) ?? enIN[0];
  }

  // 2. Any voice whose name mentions India
  const namedIndia = voices.find(
    (v) => /india/i.test(v.name) && v.lang.startsWith('en'),
  );
  if (namedIndia) return namedIndia;

  // 3. en-GB
  const enGB = voices.find((v) => v.lang.startsWith('en-GB'));
  if (enGB) return enGB;

  // 4. en-AU
  const enAU = voices.find((v) => v.lang.startsWith('en-AU'));
  if (enAU) return enAU;

  // 5. Any English voice
  const anyEn = voices.find((v) => v.lang.startsWith('en'));
  if (anyEn) return anyEn;

  return null;
}

export function useIndianVoice() {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    synthRef.current = synth;

    const update = () => {
      const voices = synth.getVoices();
      voiceRef.current = pickBest(voices);
    };

    update(); // attempt immediately (works in Firefox / Safari)
    synth.addEventListener('voiceschanged', update);

    // Fallback: retry after 250 ms and 1 s for browsers that never fire
    // the event but load voices asynchronously.
    const t1 = setTimeout(update, 250);
    const t2 = setTimeout(update, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      synth.removeEventListener('voiceschanged', update);
      synth.cancel();
    };
  }, []);

  const speak = useCallback((text: string, rate?: number) => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-IN';
    u.rate = rate ?? 0.9;

    if (voiceRef.current) {
      u.voice = voiceRef.current;
    }

    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    synth.speak(u);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsPlaying(false);
  }, []);

  return { speak, stop, isPlaying } as const;
}
