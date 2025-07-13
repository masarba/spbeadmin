import api from "./api"

const resource = "/data-pse"

export const allDataPse = () => api.get(resource)

export const createDataPse = data_pse => api.post(resource, data_pse)

export const updateDataPse = (id, data_pse) => api.put(`${resource}/${id}`, data_pse)

export const removeDataPse = id => api.delete(`${resource}/${id}`)

export const completeDataPse = (id, data_pse) => api.put(`${resource}/${id}/complete`, data_pse)