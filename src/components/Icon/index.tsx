import { twMerge } from "tailwind-merge"

interface IconProps {
  src: string
  className?: string
  alt?: string
}

export const Icon = ({ src, className, alt }: IconProps) => {
  return <img src={src} className={twMerge("h-4 w-4 text-white", className)} alt={alt}></img>
}

export default Icon
