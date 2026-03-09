'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Robust English TTS hook.
 *
 * Voice priority:
 *  1. en-GB  (clear British English)
 *  2. en-AU  (Commonwealth accent)
 *  3. en-US  (American English)
 *  4. Any English voice
 *  5. Browser default (null)
 *
 * Handles the common Chrome quirk where getVoices() returns [] on first call
 * and later fires 'voiceschanged'. Also retries with increasing delay for
 * Edge / Firefox where the event sometimes doesn't fire.
 */

function pickBest(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  // 1. en-GB
  const enGB = voices.find((v) => v.lang.startsWith('en-GB'));
  if (enGB) return enGB;

  // 2. en-AU
  const enAU = voices.find((v) => v.lang.startsWith('en-AU'));
  if (enAU) return enAU;

  // 3. en-US
  const enUS = voices.find((v) => v.lang.startsWith('en-US'));
  if (enUS) return enUS;

  // 4. Any English voice
  const anyEn = voices.find((v) => v.lang.startsWith('en'));
  if (anyEn) return anyEn;

  return null;
}

export function useEnglishVoice() {
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
    u.lang = 'en-GB';
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
