import { DeviceType } from "@types"
import LinuxIcon from "@components/Icon/LinuxIcon"
import MacIcon from "@components/Icon/MacIcon"
import WindowsIcon from "@components/Icon/WindowsIcon"

interface DeviceIconProps {
  type: DeviceType
}

export const DeviceTypeIcon = ({ type }: DeviceIconProps) => {
  return {
    mac: <MacIcon />,
    linux: <LinuxIcon />,
    windows: <WindowsIcon />,
  }[type.toLocaleLowerCase()]
}

export default DeviceTypeIcon
