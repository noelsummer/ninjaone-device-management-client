import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { twMerge } from "tailwind-merge"
import ChevronDownIcon from "@components/Icon/ChevronDownIcon"
import ChevronUpIcon from "@components/Icon/ChevronUpIcon"

interface SelectProps {
  label?: string
  prefix?: ReactNode
  suffix?: ReactNode
  multiple?: boolean
  className?: string
  items: Record<string, any>
  required?: boolean
  value: string[]
  setValue: Dispatch<SetStateAction<string[]>>
}

export const Select = ({
  label,
  prefix,
  suffix,
  multiple,
  className,
  items,
  required,
  value,
  setValue,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: string) => {
    if (multiple) {
      if (value.includes(item)) {
        setValue(value.filter((x) => x != item))
      } else {
        setValue([...value, item])
      }
    } else {
      setValue([item])
      setIsOpen(false)
    }
  }

  return (
    <div className={twMerge("w-full", className)}>
      <p className="mb-1">
        <span>{label}</span>
        {required && <span className="ml-1">*</span>}
      </p>
      <div className="relative w-full text-gray-600">
        <div
          className="flex h-10 w-full items-center rounded border px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {prefix && <div className="mr-2">{prefix}</div>}
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {value.length === Object.keys(items).length ? "All" : value.join(", ")}
          </div>
          <span className="ml-2">{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
          {suffix && <div className="ml-2">{suffix}</div>}
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded border bg-white shadow">
            {Object.keys(items).map((key) => (
              <div
                key={key}
                className={twMerge(
                  "cursor-pointer px-4 py-2 hover:bg-gray-200",
                  value.includes(key) && "bg-gray-100",
                )}
                onClick={() => handleItemClick(key)}
              >
                {key}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
