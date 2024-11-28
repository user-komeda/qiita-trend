const MONTH_LAST_DATE = 0
/**
 *月の最終日を取得
 *
 * @param year - year
 *
 * @param month - month
 */
const getLastDate = (year: number, month: number): number => {
  const date = new Date(year, month, MONTH_LAST_DATE)
  return date.getDate()
}
export default getLastDate
