import { DeviceAsParam } from "@types"
import { convertObjectKeysCase } from "@utils"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

export const getDevices = async () => {
  const response = await fetch(`${API_URL}/devices`, { method: "GET" })
  const json = await response.json()

  return convertObjectKeysCase(json, "camelCase")
}

export const getDevice = async (id: string) => {
  const response = await fetch(`${API_URL}/devices/${id}`, { method: "GET" })
  const json = await response.json()

  return convertObjectKeysCase(json, "camelCase")
}

export const createDevice = async (device: DeviceAsParam) => {
  const response = await fetch(`${API_URL}/devices`, {
    method: "POST",
    body: JSON.stringify(convertObjectKeysCase(device, "snake_case")),
    headers: { "Content-Type": "application/json" },
  })
  const json = await response.json()

  return convertObjectKeysCase(json, "camelCase")
}

export const updateDevice = async (id: string, device: DeviceAsParam) => {
  const response = await fetch(`${API_URL}/devices/${id}`, {
    method: "PUT",
    body: JSON.stringify(convertObjectKeysCase(device, "snake_case")),
    headers: { "Content-Type": "application/json" },
  })
  const json = await response.json()

  return convertObjectKeysCase(json, "camelCase")
}

export const deleteDevice = async (id: string) => {
  const response = await fetch(`${API_URL}/devices/${id}`, { method: "DELETE" })
  const json = await response.json()

  return convertObjectKeysCase(json, "camelCase")
}
