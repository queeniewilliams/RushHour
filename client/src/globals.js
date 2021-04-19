export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}`
    : 'http://localhost:3001'
export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
export const ROUTE_URL = 'https://router.hereapi.com/v8/routes?'
export const GEOCODIO_KEY = process.env.REACT_APP_GEOCODIO_API_KEY
