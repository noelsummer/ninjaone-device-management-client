import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getDevices } from "@api/devices"
import Button from "@components/Button"
import Input from "@components/Input"
import Select from "@components/Select"
import List from "@components/List"
import PlusIcon from "@components/Icon/PlusIcon"
import MagnifierIcon from "@components/Icon/MagnifierIcon"
import RefreshIcon from "@components/Icon/RefreshIcon"
import useRetryableFetch from "@hooks/useRetryableFetch"
import { DEVICE_TYPE_FILTER_OPTIONS, DEVICE_SORT_BY_OPTIONS } from "@constants"
import { useStore } from "@store"
import { Device } from "@types"
import DeviceItem from "./components/DeviceItem"
import EditModal from "./components/EditModal"

export const DeviceListPage = () => {
  const {
    data,
    loading,
    refetch: callGetDevices,
  } = useRetryableFetch({
    APICall: getDevices,
    failureContent: "Failed to get devices.",
  })

  const [devices, setDevices] = useState<Device[]>([])
  const [searchText, setSearchText] = useState<string>("")
  const [deviceTypes, setDeviceTypes] = useState<string[]>(Object.keys(DEVICE_TYPE_FILTER_OPTIONS))
  const [deviceSortBy, setDeviceSortBy] = useState<string[]>([
    Object.keys(DEVICE_SORT_BY_OPTIONS)[0],
  ])
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const params = useParams()
  const { state, dispatch } = useStore()

  useEffect(() => {
    callGetDevices()
  }, [])

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_DEVICES", payload: data as Device[] })
    }
  }, [data])

  useEffect(() => {
    const { id } = params

    if (!id) {
      return
    }

    setShowEditModal(true)
  }, [params])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const deviceTypes = urlParams.get("device-types")

    setSearchText(urlParams.get("search-text") ?? "")

    if (deviceTypes === null) {
      setDeviceTypes(Object.keys(DEVICE_TYPE_FILTER_OPTIONS))
    } else {
      setDeviceTypes(deviceTypes.length ? deviceTypes.split(",") : [])
    }
    setDeviceSortBy([urlParams.get("device-sort-by") ?? Object.keys(DEVICE_SORT_BY_OPTIONS)[0]])
  }, [])

  useEffect(() => {
    setDevices([...filedtedDevices])
  }, [state])

  useEffect(() => {
    setDevices([...filedtedDevices])
    updateURL()
  }, [searchText])

  useEffect(() => {
    setDevices([...filedtedDevices])
    updateURL()
  }, [deviceTypes])

  useEffect(() => {
    setDevices([...filedtedDevices])
    updateURL()
  }, [deviceSortBy])

  const filedtedDevices = useMemo(() => {
    return state.device.devices
      .filter((device) => device.systemName.toLowerCase().includes(searchText.toLocaleLowerCase()))
      .filter((device) => deviceTypes.includes(device.type))
      .sort((a, b) => {
        const { field, order } = DEVICE_SORT_BY_OPTIONS[deviceSortBy[0]]

        let aField: number | string = a[field as keyof Device]
        let bField: number | string = b[field as keyof Device]

        if (field == "hddCapacity") {
          aField = Number(aField)
          bField = Number(bField)
        }

        if (aField > bField) {
          return order === "asc" ? 1 : -1
        } else if (aField < bField) {
          return order === "asc" ? -1 : 1
        } else {
          return 0
        }
      })
  }, [state, searchText, deviceTypes, deviceSortBy])

  const updateURL = useCallback(() => {
    const searchParams = new URLSearchParams()

    searchParams.set("search-text", searchText)
    searchParams.set("device-types", deviceTypes.join(","))
    searchParams.set("device-sort-by", deviceSortBy[0])

    navigate(`?${searchParams.toString()}`, { replace: true })
  }, [searchText, deviceTypes, deviceSortBy])

  return (
    <>
      <section className="mb-4 flex flex-col items-start justify-start gap-y-4 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4 lg:mb-8">
        <h1 className="text-2xl font-bold">Devices</h1>
        <Button icon={<PlusIcon />} onClick={() => navigate("new")}>
          Add device
        </Button>
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-4">
          <Input
            prefixIcon={<MagnifierIcon />}
            placeholder="Search"
            className="md:max-w-60"
            value={searchText}
            setValue={setSearchText}
          />
          <Select
            prefix={<span className="whitespace-pre">Device Type: </span>}
            multiple
            items={DEVICE_TYPE_FILTER_OPTIONS}
            className="md:max-w-60"
            value={deviceTypes}
            setValue={setDeviceTypes}
          />
          <Select
            prefix={<span className="whitespace-pre">Sort by: </span>}
            items={DEVICE_SORT_BY_OPTIONS}
            className="md:max-w-60"
            value={deviceSortBy}
            setValue={setDeviceSortBy}
          />
          <Button
            icon={<RefreshIcon />}
            className="ml-auto bg-white text-gray-600 hover:text-gray-900"
            onClick={callGetDevices}
          />
        </div>
        <List title="Device" loading={loading} items={devices} ItemComponent={DeviceItem} />
      </section>
      <EditModal
        id={params.id}
        isOpen={showEditModal}
        onDismiss={() => {
          setShowEditModal(false)

          navigate("/devices")
        }}
      />
    </>
  )
}

export default DeviceListPage
