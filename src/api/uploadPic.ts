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
    'NvUJpL0MTiBoGaVWyAWmIcHo0H8Vak6fBxhWohXz:HLELLMHvKKN-8UZ-m7mDT55x2JA=:eyJzY29wZSI6ImNoYXJsZXNmb3J1bSIsImRlYWRsaW5lIjoxNjE5ODUxOTAyfQ==',
    putExtra,
    config
  )

  const subscription = observable.subscribe(observer)
}
