export default function kmp(haystack: string, needle: string): number {
  const nLen = needle.length;
  const hLen = haystack.length;
  const lps: number[] = Array(nLen).fill(0);

  let prevLsp = 0;
  let i = 1;
  while (i < nLen) {
    if (needle.charAt(i) === needle.charAt(prevLsp)) {
      lps[i] = prevLsp + 1;
      prevLsp++;
      i++;
    } else if (prevLsp === 0) {
      i++;
    } else {
      prevLsp = lps[prevLsp - 1];
    }
  }

  let hi = 0;
  let ni = 0;
  while (hi < hLen) {
    if (haystack.charAt(hi) === needle.charAt(ni)) {
      hi++;
      ni++;
    } else {
      if (ni === 0) {
        hi++;
      } else {
        ni = lps[ni - 1];
      }
    }

    if (ni >= nLen) {
      return hi - nLen;
    }
  }

  return -1;
}; 
