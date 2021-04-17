import Client from './'

export const GetAllParkings = async () => {
  try {
    const res = await Client.get('/parking/all')
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetMyParkings = async (id) => {
  try {
    const res = await Client.get(`/parking/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreateParking = async (parking) => {
  try {
    const res = await Client.post(`/parking/add`, parking)
    return res.data
  } catch (error) {
    throw error
  }
}
export const UpdateParking = async (id, update) => {
  try {
    const res = await Client.put(`/parking/update/${id}`, update)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteParking = async (id) => {
  try {
    await Client.delete(`/parking/delete/${id}`)
  } catch (error) {
    throw error
  }
}
