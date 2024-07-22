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

export function getTimeForBack(time: string | number) {
  const now = new Date(time)

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const milliseconds = String(now.getMilliseconds()).padStart(6, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`
}