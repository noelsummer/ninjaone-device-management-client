import { useCallback, useEffect, useState } from "react"
import { createDevice, getDevice, updateDevice } from "@api/devices"
import { Button } from "@components/Button"
import { Modal } from "@components/Modal"
import { ModalHeader } from "@components/Modal/ModalHeader"
import { ModalBody } from "@components/Modal/ModalBody"
import { ModalFooter } from "@components/Modal/ModalFooter"
import { Input } from "@components/Input"
import Select from "@components/Select"
import { useToast } from "@components/Toast"
import LoadingIcon from "@components/Icon/LoadingIcon"
import useRetryableFetch from "@hooks/useRetryableFetch"
import { DEVICE_TYPE_FILTER_OPTIONS } from "@constants"
import { useStore } from "@store"
import { Device, DeviceAsParam, DeviceType } from "@types"
import { isValidPositiveNumber } from "@utils"

interface EditModalProps {
  id?: string
  isOpen?: boolean
  onDismiss?: () => void
}

export const EditModal = ({ id, isOpen, onDismiss }: EditModalProps) => {
  const [systemName, setSystemName] = useState<string>("")
  const [deviceType, setDeviceType] = useState<string[]>(["MAC"])
  const [hddCapacity, setHddCapacity] = useState<string>("")
  const { dispatch } = useStore()
  const toast = useToast()

  const {
    data: getDeviceResponse,
    error: getDeviceError,
    loading: getDeviceLoading,
    refetch: callGetDevice,
  } = useRetryableFetch({
    APICall: getDevice,
    failureContent: "Failed to get device.",
  })
  const { data: createDeviceResponse, refetch: callCreateDevice } = useRetryableFetch({
    APICall: createDevice,
    failureContent: "Failed to create device.",
  })
  const { data: updateDeviceResponse, refetch: callUpdateDevice } = useRetryableFetch({
    APICall: updateDevice,
    failureContent: "Failed to update device.",
  })

  const resetState = useCallback(() => {
    setSystemName("")
    setDeviceType(["MAC"])
    setHddCapacity("")
  }, [setSystemName, setDeviceType, setHddCapacity])

  useEffect(() => {
    if (id && id != "new") {
      callGetDevice(id)
    }
  }, [id])

  useEffect(() => {
    if (createDeviceResponse) {
      resetState()
      onDismiss?.()
      dispatch({
        type: "CREATE_DEVICE",
        payload: createDeviceResponse as Device,
      })
      toast.success("Successfully created a device.")
    }
  }, [createDeviceResponse])

  useEffect(() => {
    if (updateDeviceResponse === 1) {
      resetState()
      onDismiss?.()
      dispatch({
        type: "UPDATE_DEVICE",
        payload: {
          id: id as string,
          systemName,
          type: deviceType[0] as DeviceType,
          hddCapacity,
        },
      })
      toast.success("Successfully updated the device.")
    }
  }, [updateDeviceResponse])

  useEffect(() => {
    const device = getDeviceResponse as Device

    if (device) {
      setSystemName(device.systemName)
      setDeviceType([device.type])
      setHddCapacity(device.hddCapacity)
    }
  }, [getDeviceResponse])

  useEffect(() => {
    if (getDeviceError) {
      onDismiss?.()
    }
  }, [getDeviceError])

  if (!id) {
    return <></>
  }

  const handleSubmit = () => {
    if (!systemName) {
      toast.error("System name field is required!")
      return
    }
    if (!hddCapacity) {
      toast.error("HDD Capacity field is required!")
      return
    }
    if (!isValidPositiveNumber(hddCapacity)) {
      toast.error("HDD Capacity should be a positive number!")
      return
    }

    if (!id) {
      return
    }

    const device: DeviceAsParam = {
      systemName,
      type: deviceType[0] as DeviceType,
      hddCapacity,
    }

    if (id === "new") {
      callCreateDevice(device)
    } else {
      callUpdateDevice(id, device)
    }
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalHeader>{id === "new" ? "Add device" : "Edit device"}</ModalHeader>
      <ModalBody className="mb-6 mt-4">
        {id && id != "new" && getDeviceLoading ? (
          <span className="flex justify-center">
            <LoadingIcon />
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            <Input label="System name" value={systemName} setValue={setSystemName} required />
            <Select
              label="Device type"
              items={DEVICE_TYPE_FILTER_OPTIONS}
              value={deviceType}
              setValue={setDeviceType}
              required
            />
            <Input
              label="HDD capacity (GB)"
              value={hddCapacity}
              setValue={setHddCapacity}
              required
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <Button
            className="border-[1px] border-gray-300 bg-white text-sm text-gray-900 hover:bg-gray-100"
            onClick={onDismiss}
          >
            Cancel
          </Button>
          <Button className="text-sm" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
