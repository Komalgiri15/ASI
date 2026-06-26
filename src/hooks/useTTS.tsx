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
    
    // Cancel any ongoing speech to avoid overlap
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  return speak;
}
