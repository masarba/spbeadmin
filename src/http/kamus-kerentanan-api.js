import api from "./api"

const resource = "/kamus-kerentanan"

export const allKerentanan = () => api.get(resource)

export const createKerentanan = kerentanan => api.post(resource, kerentanan)

export const updateKerentanan = (id, kerentanan) => api.put(`${resource}/${id}`, kerentanan)

export const removeKerentanan = id => api.delete(`${resource}/${id}`)

export const completeKerentanan = (id, kerentanan) => api.put(`${resource}/${id}/complete`, kerentanan)
