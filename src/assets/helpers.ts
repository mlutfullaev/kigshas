export const formatTime = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export const getTime = (time: string | number) => {
  const date = new Date(time)
  const day = formatTime(date.getDate())
  const month = formatTime(date.getMonth() + 1)
  const year = date.getFullYear()
  const hours = formatTime(date.getHours())
  const minutes = formatTime(date.getMinutes())
  const seconds = formatTime(date.getSeconds())
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}