function groupBy<T>(
  items: Iterable<T>,
  callbackfn: (value: T, index: number) => string
): { [key: string]: Array<T> } {
  const obj: { [key: string]: any } = {}
  let k = 0

  for (const value of items) {
    const key = callbackfn(value, k++)
    if (key in obj) {
      obj[key].push(value)
    } else {
      obj[key] = [value]
    }
  }

  return obj
}
