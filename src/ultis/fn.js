export const getArrSlider = (start, end, number) => {
  const limit = start > end ? number : end
  const output = []

  for (let i = start; i <= limit; i++) {
    output.push(i)
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i)
    }
  }

  return output
}

export const handleDevineNumber = (number) => {
  let countFollower
  if (number > 1000000) {
    (number / 1000000) < 10 ? countFollower = (number / 1000000).toFixed(1) : Math.round(number / 1000000)
    return `${countFollower}M`
  } else if (number > 1000) {
    countFollower = Math.round(number / 1000)
    return `${countFollower}K`
  } else {
    countFollower = number
    return number
  }
}