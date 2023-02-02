import { test, describe } from "vitest";
import { Device } from "./types";
import { matchesFilters, matchesSearch } from "./utils";

const device = {
  product: { name: "Great product" },
  line: { name: "World's best products" },
} as Device;

describe("matchesSearch", () => {
  test("matches by product name, case insensitive", () => {
    expect(matchesSearch(device, "great")).toBe(true);
  });
  test("matches by line name", () => {
    expect(matchesSearch(device, "products")).toBe(true);
  });
});

describe("matchesFilters", () => {
  test("matches product line", () => {
    expect(matchesFilters(device, ["World's best products"])).toBe(true);
  });
  test("matches when filters are empty", () => {
    expect(matchesFilters(device, [])).toBe(true);
  });
  test("does not match another product line", () => {
    expect(matchesFilters(device, ["Boring products"])).toBe(false);
  });
});
