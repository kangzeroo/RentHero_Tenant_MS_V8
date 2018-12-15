const axios = require('axios')
const BILLINGS_MICROSERVICE = require('../credentials/'+ process.env.NODE_ENV +'/API_URLS').BILLINGS_MICROSERVICE

exports.recordConvoUsage = (convo_id) => {
  const p = new Promise((res, rej) => {
    // const headers = {
    //   headers: {
    //     Authorization: `Bearer xxxx`
    //   }
    // }
    // axios.post(`${BILLINGS_MICROSERVICE}/record_convo_usage`, { convo_id, }, headers)
    //   .then((data) => {
    //     console.log(`------ Successful POST/recordConvoUsage ------`)
    //     console.log(data.data)
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     console.log('------> Failed POST/recordConvoUsage')
    //     console.log(err)
    //     rej(err)
    //   })
    res()
  })
  return p
}

exports.recordCallUsage = (proxy_id, duration, callbackObj) => {
  const p = new Promise((res, rej) => {
    // const headers = {
    //   headers: {
    //     "Authorization": `Bearer xxxx`,
    //   }
    // }
    // console.log('RECORD CALL USAGE BEGIN')
    // console.log(proxy_id, duration, callbackObj, BILLINGS_MICROSERVICE)
    // axios.post(`${BILLINGS_MICROSERVICE}/record_call_usage`, { proxy_id, duration, callbackObj, }, headers)
    //   .then((data) => {
    //     console.log(`------ Successful POST/recordCallUsage ------`)
    //     console.log(data.data)
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     console.log('------> Failed POST/recordCallUsage')
    //     console.log(err)
    //     rej(err)
    //   })
    res()
  })
  return p
}
