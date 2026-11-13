import type { Word } from "../overridden/words";

const g = (pairs: [string, number][]): Word[] => pairs.map(([w, t]) => ({ w, t }));

// Word start times (s), Whisper transcription of voiceover-3.
export const GROUPS: Word[][] = [
  g([["You", 0.0], ["can't", 0.14], ["think", 0.38], ["your", 0.5], ["way", 0.66], ["out", 0.8], ["of", 0.96], ["stress.", 1.04]]),
  g([["Your", 1.6], ["nervous", 1.66], ["system", 1.88], ["isn't", 2.26], ["listening", 2.54], ["to", 2.82], ["logic,", 2.96]]),
  g([["but", 3.44], ["it", 3.62], ["will", 3.72], ["listen", 3.84], ["to", 4.12], ["place.", 4.28]]),
  g([["12", 4.94], ["men", 5.1], ["took", 5.32], ["two", 5.52], ["walks,", 5.72]]),
  g([["one", 6.26], ["through", 6.44], ["crowded", 6.68], ["city", 6.96], ["streets", 7.22]]),
  g([["and", 7.56], ["one", 7.94], ["through", 8.1], ["a", 8.3], ["quiet", 8.4], ["forest.", 8.62]]),
  g([["The", 9.34], ["forest", 9.42], ["walk", 9.66], ["changed", 9.88], ["everything.", 10.16]]),
  g([["Tension", 10.98], ["dropped,", 11.22], ["depression", 11.76], ["eased,", 12.02]]),
  g([["vigor,", 12.8], ["the", 13.38], ["energy", 13.46], ["to", 13.7], ["engage", 13.9], ["with", 14.14], ["life", 14.32], ["rose.", 14.56]]),
  g([["All", 15.52], ["measured,", 15.68], ["all", 16.24], ["significant.", 16.34]]),
  g([["The", 17.26], ["city", 17.34], ["walk", 17.54], ["didn't", 17.76], ["do", 18.12], ["this,", 18.3]]),
  g([["only", 18.82], ["the", 19.0], ["forest", 19.16], ["did.", 19.42]]),
  g([["Fast,", 19.98], ["because", 20.58], ["stress", 20.8], ["isn't", 21.14], ["only", 21.48], ["in", 21.7], ["your", 21.84], ["head,", 21.94]]),
  g([["it's", 22.38], ["in", 22.54], ["your", 22.64], ["heart", 22.76], ["rate.", 22.98]]),
  g([["In", 23.42], ["the", 23.54], ["tension", 23.62], ["you", 23.84], ["hold,", 24.04]]),
  g([["in", 24.46], ["the", 24.54], ["cortisol", 24.62], ["flooding", 24.92], ["your", 25.26], ["system,", 25.48]]),
  g([["change", 26.04], ["the", 26.2], ["environment", 26.38]]),
  g([["and", 26.8], ["your", 27.26], ["body", 27.36], ["remembers", 27.58], ["how", 27.86], ["to", 28.16], ["reset.", 28.28]]),
];

export const at = (word: string, after = 0) => {
  for (const grp of GROUPS) for (const x of grp) if (x.t >= after && x.w.replace(/[,.]/g, "") === word) return x.t;
  throw new Error(`word not found: ${word}`);
};
