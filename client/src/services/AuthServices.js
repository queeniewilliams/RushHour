import Client from './'
export const Register = async (formData) => {
  try {
    const res = await Client.post(`/auth/register`, formData)
    return res.data
  } catch (error) {
    throw error
  }
}
export const Login = async (formData) => {
  try {
    const res = await Client.post(`/auth/login`, formData)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetProfile = async (id) => {
  try {
    const res = await Client.get(`/auth/profile/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
