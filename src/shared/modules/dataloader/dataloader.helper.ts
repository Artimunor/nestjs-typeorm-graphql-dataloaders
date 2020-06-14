export function generateOneToManyMap<K, E>(groupBy: string, data: E[]): Map<K, E[]> {
  const map = new Map<K, E[]>();
  data.forEach(row => {
    const value = map.get(row[groupBy]);

    if (value) {
      map.set(row[groupBy], value.concat(row));
    } else {
      map.set(row[groupBy], [row]);
    }
  });
  return map;
}

export function generateManyToManyMap<K, E, E2>(
  groupBy: string,
  resolveKey: string,
  data: E[],
): Map<K, E2[]> {
  const map = new Map<K, E2[]>();
  data.forEach(row => {
    const value = map.get(row[groupBy]);

    if (value) {
      map.set(row[groupBy], value.concat(...row[resolveKey]));
    } else {
      map.set(row[groupBy], [...row[resolveKey]]);
    }
  });
  return map;
}
