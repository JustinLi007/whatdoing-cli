// longest common subsequence
export default function lcs(text1: string, text2: string): number {
  const rows = text1.length;
  const cols = text2.length;

  const table = Array.from({ length: rows + 1 }, () => {
    return Array.from({ length: cols + 1 }, () => {
      return 0;
    });
  });

  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 0; c--) {
      if (text1.charAt(r) === text2.charAt(c)) {
        table[r][c] = table[r + 1][c + 1] + 1;
        continue;
      }

      table[r][c] = Math.max(
        table[r + 1][c],
        table[r][c + 1],
      );
    }
  }

  return table[0][0];
};
