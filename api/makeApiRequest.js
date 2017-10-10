import { getConfigValue } from '../shared/config.js'

function isDevEnvironment() {
  return getConfigValue('NODE_ENV') == 'development'
}

function buildHeaders(body, addAuthHeader) {
  var headers = {}

  if (body) {
    headers['Content-Type'] = 'application/json'
  }

  if (addAuthHeader) {
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
  }

  return new Headers(headers)
}

function buildReqParams(method, body, addAuthHeader) {
  var reqParams = {
    method: method,  
    headers: buildHeaders(body, addAuthHeader),
  }

  if (body) {
    reqParams.body = JSON.stringify(body)
  }

  return reqParams
}

function tryParseJson(text) {
  try {
    return JSON.parse(text)
  } catch (err) {
    return text
  }
}

export default function makeApiRequest(uri, method, body, addAuthHeader, success, failure) {
  var request = new Request(uri, buildReqParams(method, body, addAuthHeader))
  fetch(request).then(function(res) {
    res.text().then(function(text) {
      var data = tryParseJson(text)
      if (isDevEnvironment()) {
        console.log(data)
      }

      if (res.ok) {
        success(data)
      } else {
        failure(data)
      }
    })
  }).catch(failure)
}
