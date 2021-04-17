import Client from './'

export const GetAllComments = async (id) => {
  try {
    const res = await Client.get(`/comment/all/${id}`)
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
export const CreateComment = async (id, comment) => {
  try {
    const res = await Client.post(`/comment/add/${id}`, comment)
    return res.data
  } catch (error) {
    throw error
  }
}
export const UpdateComment = async (id) => {
  try {
    const res = await Client.put(`/comment/like/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteComment = async (id) => {
  try {
    await Client.delete(`/comment/${id}`)
  } catch (error) {
    throw error
  }
}
