/**
 *動的パラメータを置換する
 *
 * @param url - url
 *
 * @param key - key
 *
 * @param value - value
 */
const replaceUrlParameter = (
  url: string,
  key: string,
  value: string,
): string => {
  return url.replace(key, value)
}

export default replaceUrlParameter
