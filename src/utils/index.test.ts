import { isValidPositiveNumber } from "."

describe("isValidPositiveNumber", () => {
  test("returns true for valid positive integers", () => {
    expect(isValidPositiveNumber("1")).toBe(true)
    expect(isValidPositiveNumber("123")).toBe(true)
    expect(isValidPositiveNumber("100000")).toBe(true)
  })

  test("returns true for valid positive decimal numbers", () => {
    expect(isValidPositiveNumber("1.0")).toBe(true)
    expect(isValidPositiveNumber("0.1")).toBe(true)
    expect(isValidPositiveNumber("123.456")).toBe(true)
  })

  test("returns false for zero", () => {
    expect(isValidPositiveNumber("0")).toBe(false)
  })

  test("returns false for negative numbers", () => {
    expect(isValidPositiveNumber("-1")).toBe(false)
    expect(isValidPositiveNumber("-0.1")).toBe(false)
    expect(isValidPositiveNumber("-123")).toBe(false)
  })

  test("returns false for strings with leading zeros", () => {
    expect(isValidPositiveNumber("01")).toBe(false)
    expect(isValidPositiveNumber("00123")).toBe(false)
  })

  test("returns false for invalid strings", () => {
    expect(isValidPositiveNumber("abc")).toBe(false)
    expect(isValidPositiveNumber("123abc")).toBe(false)
    expect(isValidPositiveNumber("")).toBe(false)
  })

  test("returns false for numbers with multiple dots", () => {
    expect(isValidPositiveNumber("1.2.3")).toBe(false)
  })

  test("returns false for numbers with leading dot", () => {
    expect(isValidPositiveNumber(".123")).toBe(false)
  })

  test("returns true for valid positive numbers with trailing zeros after the decimal point", () => {
    expect(isValidPositiveNumber("1.00")).toBe(true)
    expect(isValidPositiveNumber("123.4500")).toBe(true)
  })
})
