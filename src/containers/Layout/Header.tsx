import { useNavigate } from "react-router-dom"
import { Icon } from "@components/Icon"
import LogoSVG from "@assets/logo.svg"

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="flex h-14 w-full flex-shrink-0 justify-center bg-accent">
      <div className="container flex h-full items-center px-4 sm:px-6">
        <div onClick={() => navigate("/")}>
          <Icon
            src={LogoSVG}
            className="h-auto w-[120px] hover:cursor-pointer"
            alt="ninjaone-logo"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
