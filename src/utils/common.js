export const convertByPercentage = ary => {
  const max = Math.max(...ary)

  if (max >= 0 && max <= 0.00001) {
    return ary.map(x => ({
      value: x,
      percentage: 7,
    }))
  }

  return ary.map(x => ({
    value: x,
    percentage: (x / max) * 100,
  }))
}

export const sumUpArray = ary => ary.reduce((prev, cur) => prev + cur, 0)

export const userNameFromCognito = authData => {
  if (!authData || !authData.signInUserSession || !authData.signInUserSession.accessToken) {
    return undefined
  }
  const { payload } = authData.signInUserSession.accessToken
  if (!payload || !payload.username) {
    return undefined
  }

  return payload.username
}
