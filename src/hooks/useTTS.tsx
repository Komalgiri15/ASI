import { useCallback } from 'react';
import { useGame } from '@/state/gameContext';

// Keep a global reference to prevent garbage collection of the active utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Simple Text‑to‑Speech hook using the Web Speech API.
 * Returns a `speak` function that accepts a string and optionally voice/callback options.
 * The hook gracefully degrades when the API is unavailable.
 */
export default function useTTS() {
  const { state } = useGame();

  const speak = useCallback((
    text: string,
    options?: string | { voiceName?: string; onEnd?: () => void }
  ) => {
    // 1. Clear callbacks on previous utterance and cancel any ongoing speech to prevent overlap
    if (activeUtterance) {
      activeUtterance.onend = null;
      activeUtterance.onerror = null;
      activeUtterance = null;
    }
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }

    let voiceName: string | undefined;
    let onEndCallback: (() => void) | undefined;

    if (typeof options === 'string') {
      voiceName = options;
    } else if (options && typeof options === 'object') {
      voiceName = options.voiceName;
      onEndCallback = options.onEnd;
    }

    if (state.soundMuted) {
      if (onEndCallback) {
        onEndCallback();
      }
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.warn('TTS not supported in this browser');
      if (onEndCallback) {
        onEndCallback();
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance; // Keep reference to prevent garbage collection
    
    // Retrieve all available voices
    const voices = speechSynthesis.getVoices();
    let targetVoice = null;
    
    if (voiceName) {
      targetVoice = voices.find(v => v.name === voiceName);
    }
    
    // Try to find a female voice if no specific voice was found
    if (!targetVoice && voices.length > 0) {
      const femaleKeywords = ['zira', 'samantha', 'aria', 'victoria', 'hazel', 'jenny', 'karen', 'emma', 'susan', 'female', 'woman', 'google us english'];
      targetVoice = voices.find(v => {
        const nameLower = v.name.toLowerCase();
        return femaleKeywords.some(keyword => nameLower.includes(keyword)) && v.lang.startsWith('en');
      });
      
      // Fallback: English voice that is likely not male
      if (!targetVoice) {
        const maleKeywords = ['david', 'mark', 'george', 'ravi', 'male', 'guy', 'man'];
        targetVoice = voices.find(v => {
          const nameLower = v.name.toLowerCase();
          return v.lang.startsWith('en') && !maleKeywords.some(keyword => nameLower.includes(keyword));
        });
      }
    }
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    if (onEndCallback) {
      utterance.onend = () => {
        if (activeUtterance === utterance) {
          activeUtterance = null;
        }
        onEndCallback!();
      };
      utterance.onerror = (event) => {
        // 'interrupted' is fired when cancel() is called. We don't want to run the callback in that case.
        if (activeUtterance === utterance && event.error !== 'interrupted') {
          activeUtterance = null;
          onEndCallback!();
        }
      };
    }
    
    speechSynthesis.speak(utterance);
  }, [state.soundMuted]);

  return speak;
}

