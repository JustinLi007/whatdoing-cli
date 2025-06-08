export default function editDistance(word1: string, word2: string): number {
  const rows = word1.length;
  const cols = word2.length;

  const table = Array.from({ length: rows + 1 }, () => {
    return Array.from({ length: cols + 1 }, () => {
      return 0;
    });
  });

  for (let i = cols; i >= 0; i--) {
    table[rows][i] = cols - i;
  }
  for (let i = rows; i >= 0; i--) {
    table[i][cols] = rows - i;
  }

  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 0; c--) {
      if (word1.charAt(r) === word2.charAt(c)) {
        table[r][c] = table[r + 1][c + 1];
        continue;
      }
      table[r][c] = Math.min(
        table[r + 1][c],
        table[r][c + 1],
        table[r + 1][c + 1],
      ) + 1;
    }
  }

  return table[0][0];
};
