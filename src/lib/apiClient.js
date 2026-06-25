import { getApiBaseUrl } from './apiConfig.js'

export class ApiError extends Error {
  constructor(message, { status, data, payload } = {}) {
    super(message || 'Request failed')
    this.name = 'ApiError'
    this.status = status ?? 0
    this.data = data ?? null
    this.payload = payload ?? null
  }
}

const buildUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}${normalizedPath}`
}

const parseJsonSafely = async (response) => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

const unwrapResponse = (payload, response) => {
  if (!payload || typeof payload !== 'object') {
    throw new ApiError('Invalid API response', {
      status: response.status,
      payload,
    })
  }

  if (payload.success === false) {
    throw new ApiError(payload.message || 'Request failed', {
      status: response.status,
      data: payload.data ?? null,
      payload,
    })
  }

  return payload.data ?? null
}

const request = async (method, path, { body, headers } = {}) => {
  const init = {
    method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  }

  if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  let response

  try {
    response = await fetch(buildUrl(path), init)
  } catch (error) {
    throw new ApiError(error?.message || 'Network request failed', {
      status: 0,
    })
  }

  const payload = await parseJsonSafely(response)

  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed with status ${response.status}`, {
      status: response.status,
      data: payload?.data ?? null,
      payload,
    })
  }

  return unwrapResponse(payload, response)
}

export const apiGet = (path, options) => request('GET', path, options)

export const apiPost = (path, body, options) =>
  request('POST', path, { ...options, body })

export const apiPut = (path, body, options) =>
  request('PUT', path, { ...options, body })

export const apiPatch = (path, body, options) =>
  request('PATCH', path, { ...options, body })

export const apiDelete = (path, options) => request('DELETE', path, options)
