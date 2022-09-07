const jwtExpireTime = {
  accessToken: {
    formated: '10m',
    milliseconds: 1000 * 60 * 10
  },
  refreshToken: {
    formated: '1h',
    milliseconds: 1000 * 60 * 60
  }
}

export default jwtExpireTime
