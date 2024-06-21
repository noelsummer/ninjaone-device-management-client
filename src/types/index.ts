export type Case = "camelCase" | "snake_case" | "PascalCase"

export type DeviceType = "MAC" | "LINUX" | "WINDOWS"

export type Device = {
  id: string
  systemName: string
  type: DeviceType
  hddCapacity: string
}

export type DeviceAsParam = Omit<Device, "id">

export type DeviceSortByOrder = "asc" | "desc"

export type DeviceSortByOptionValue = {
  field: string
  order: DeviceSortByOrder
}
