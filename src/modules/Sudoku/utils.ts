export function getAvailableValues(usedValues: number[]): number[] {
  const usedValuesSet = new Set(usedValues);
  const availableValues = [];
  for (let i = 1; i < 10; i++) {
    if (!usedValuesSet.has(i)) {
      availableValues.push(i);
    }
  }
  return availableValues;
}