export const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export const formatDate = date => {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return date.getDate() + '-' + months[date.getMonth()]
}

export const generteEvent = () => {
  if (Math.random() * 5 > 4) return Math.floor(Math.random() * 100)
  return null
}

export const parseHexColor = c => {
  var j = {}

  var s = c.replace(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/, function (_, r, g, b) {
    j.red = parseInt(r, 16)
    j.green = parseInt(g, 16)
    j.blue = parseInt(b, 16)
    return ''
  })

  if (s.length === 0) {
    return j
  }
}

export const getColorWithPercentage = (color1, color2, percentage) => {
  let a = parseHexColor(color1)
  let b = parseHexColor(color2)

  if (typeof a != 'undefined' && typeof b != 'undefined') {
    return (
      '#' +
      (a.red + parseInt((percentage * (b.red - a.red)) / 100)).toString(16) +
      (a.green + parseInt((percentage * (b.green - a.green)) / 100)).toString(16) +
      (a.blue + parseInt((percentage * (b.blue - a.blue)) / 100)).toString(16)
    )
  }
}

export const threeDots = a => {
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const dateStyling = e => {
  let date = new Date(e)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let dateNumber = date.getDate()
  let suffix = 'th'
  switch (dateNumber % 10) {
    case 1:
      suffix = 'st'
      break
    case 2:
      suffix = 'nd'
      break
    case 3:
      suffix = 'rd'
      break
    default:
      suffix = 'th'
  }
  return date.getDate() + suffix + ' ' + months[date.getMonth()]
}

export const toMillion = e => e / 1000000
export const toBillion = e => e / 1000000000

export const getTextWidth = (text, font) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  context.font = font || getComputedStyle(document.body).font

  return context.measureText(text).width
}

export const wrapABS = value => {
  return (value < 0 && '(') + Math.abs(value.toFixed(0)) + (value < 0 && ')')
}
