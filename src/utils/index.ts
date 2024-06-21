import { Case } from "@types"

export const lowercaseFirstLetter = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertStringCase = (str: string, toCase: Case): string => {
  const replaceDelimitersWithUppercase = (str: string): string => {
    return str.replace(/([-_][a-z])/gi, (group) =>
      group.toUpperCase().replace("-", "").replace("_", ""),
    )
  }

  switch (toCase) {
    case "snake_case":
      return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()
    case "camelCase":
      return lowercaseFirstLetter(replaceDelimitersWithUppercase(str))
    case "PascalCase":
      return capitalizeFirstLetter(replaceDelimitersWithUppercase(str))
    default:
      return str
  }
}

export const convertObjectKeysCase = (obj: any, toCase: Case): typeof obj => {
  if (typeof obj !== "object" || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => convertObjectKeysCase(item, toCase))
  }

  return Object.keys(obj).reduce(
    (acc, key) => {
      const convertedKey = convertStringCase(key, toCase)
      acc[convertedKey] = convertObjectKeysCase(obj[key], toCase)
      return acc
    },
    {} as Record<string, any>,
  )
}

export const isValidPositiveNumber = (str: string) => {
  return /^(?!0$)(?!0\d)\d+(\.\d+)?$/.test(str)
}
