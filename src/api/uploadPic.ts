import * as qiniu from 'qiniu-js'

export const uploadPic = (file: Object, observer: Object) => {
  if (!file) {
    return
  }
  let config = {
    useCdnDomain: true,
    disableStatisticsReport: false,
    retryCount: 5,
    region: qiniu.region.z2,
  }
  const putExtra = {
    fname: '',
    params: {},
    mimeType: null,
    // mimeType: ['image/png', 'image/jpeg', 'image/gif']
  }
  const observable = qiniu.upload(
    file,
    null,
    'NvUJpL0MTiBoGaVWyAWmIcHo0H8Vak6fBxhWohXz:JPGSG6yByBIuV4C965jvsPNrciE=:eyJzY29wZSI6ImNoYXJsZXNmb3J1bSIsImRlYWRsaW5lIjoxNjEzNzA1MTgxfQ==',
    putExtra,
    config
  )

  const subscription = observable.subscribe(observer)
}
