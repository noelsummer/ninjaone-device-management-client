import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Icon from "."

describe("Icon component", () => {
  test("renders with default props", () => {
    render(<Icon src="<svg></svg>" />)
    const imgElement = screen.getByRole("img")
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute("src", "<svg></svg>")
    expect(imgElement).toHaveClass("h-4 w-4 text-white")
  })

  test("renders with custom className", () => {
    render(<Icon src="<svg></svg>" className="custom-class" />)
    const imgElement = screen.getByRole("img")
    expect(imgElement).toHaveClass("custom-class")
  })

  test("renders with alt text", () => {
    render(<Icon src="<svg></svg>" alt="icon" />)
    const imgElement = screen.getByRole("img", { name: /icon/i })
    expect(imgElement).toHaveAttribute("alt", "icon")
  })

  test("renders without alt text when not provided", () => {
    render(<Icon src="<svg></svg>" />)
    const imgElement = screen.getByRole("img")
    expect(imgElement).not.toHaveAttribute("alt")
  })
})
