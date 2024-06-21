import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { deleteDevice } from "@api/devices"
import Button from "@components/Button"
import { useToast } from "@components/Toast"
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import EllipsisIcon from "@components/Icon/EllipsisIcon"
import useRetryableFetch from "@hooks/useRetryableFetch"
import { useStore } from "@store"
import { Device } from "@types"
import { capitalizeFirstLetter } from "@utils"
import DeviceTypeIcon from "./DeviceTypeIcon"

interface DeviceItemProps {
  item: Device
}

export const DeviceItem = ({ item }: DeviceItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)
  const navigate = useNavigate()
  const { dispatch } = useStore()
  const toast = useToast()

  const { data: deleteDeviceResponse, refetch: callDeleteDevice } = useRetryableFetch({
    APICall: deleteDevice,
    failureContent: "Failed to delete device.",
  })

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as Node)) {
      setIsOpen(false)
    }
  }

  const handleEdit = (device: Device) => {
    navigate(`${device.id}`)
  }

  useEffect(() => {
    if (deleteDeviceResponse === 1) {
      setShowDeleteConfirmationModal(false)
      dispatch({
        type: "DELETE_DEVICE",
        payload: { id: item.id },
      })
      toast.success("Successfully deleted the device.")
    }
  }, [deleteDeviceResponse])

  return (
    <div
      ref={wrapperRef}
      tabIndex={-1}
      onBlur={handleBlur}
      className="group flex w-full items-center justify-between border-b-[1px] border-gray-100 px-2 py-1 hover:bg-gray-100 md:px-4 md:py-2"
    >
      <div>
        <p className="flex items-center">
          <span className="mr-1">
            <DeviceTypeIcon type={item.type} />
          </span>
          <span>{item.systemName}</span>
        </p>
        <p className="text-xs text-gray-500">
          {capitalizeFirstLetter(item.type.toLowerCase())} workstation - {item.hddCapacity} GB
        </p>
      </div>
      <div className="relative h-full w-20 min-w-20">
        <Button
          icon={<EllipsisIcon />}
          className="ml-auto hidden bg-transparent p-2 text-gray-600 hover:bg-gray-200 group-hover:block"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute right-0 z-20 mt-1 w-full rounded border bg-white shadow">
            <div
              tabIndex={0}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleEdit(item)}
            >
              Edit
            </div>
            <div
              tabIndex={0}
              className="cursor-pointer px-4 py-2 text-red-600 hover:bg-gray-200"
              onClick={() => setShowDeleteConfirmationModal(true)}
            >
              Delete
            </div>
          </div>
        )}
      </div>
      <ConfirmationModal
        title="Delete device?"
        content={
          <p>
            You are about to delete the device <span className="font-bold">{item.systemName}</span>.
            This action cannot be undone.
          </p>
        }
        isOpen={showDeleteConfirmationModal}
        onDismiss={() => setShowDeleteConfirmationModal(false)}
        okButton={
          <Button
            onClick={() => {
              callDeleteDevice(item.id)
            }}
            className="bg-red-700 text-sm text-gray-100 hover:bg-red-800"
          >
            Delete
          </Button>
        }
        cancelButton={
          <Button
            onClick={() => {
              setShowDeleteConfirmationModal(false)
            }}
            className="border-[1px] border-gray-300 bg-white text-sm text-gray-900 hover:bg-gray-100"
          >
            Cancel
          </Button>
        }
      />
    </div>
  )
}

export default DeviceItem
