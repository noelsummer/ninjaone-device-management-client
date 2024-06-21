import { DeviceSortByOptionValue } from "@types"

export const DEVICE_TYPE_FILTER_OPTIONS = {
  MAC: "MAC",
  LINUX: "LINUX",
  WINDOWS: "WINDOWS",
}

export const DEVICE_SORT_BY_OPTIONS: Record<string, DeviceSortByOptionValue> = {
  "Systen Name (Ascending)": {
    field: "systemName",
    order: "asc",
  },
  "System Name (Descending)": {
    field: "systemName",
    order: "desc",
  },
  "HDD Capacity (Ascending)": {
    field: "hddCapacity",
    order: "asc",
  },
  "HDD Capacity (Descending)": {
    field: "hddCapacity",
    order: "desc",
  },
  "Device Type (Ascending)": {
    field: "type",
    order: "asc",
  },
  "Device Type (Descending)": {
    field: "type",
    order: "desc",
  },
}
