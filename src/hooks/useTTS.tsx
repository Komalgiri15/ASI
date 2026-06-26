import { useCallback } from 'react';

/**
 * Simple Text‑to‑Speech hook using the Web Speech API.
 * Returns a `speak` function that accepts a string and optionally a voice name.
 * The hook gracefully degrades when the API is unavailable.
 */
export default function useTTS() {
  const speak = useCallback((text: string, voiceName?: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('TTS not supported in this browser');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceName) {
      const voice = speechSynthesis.getVoices().find(v => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }
    // Cancel any ongoing speech to avoid overlap
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  return speak;
}
