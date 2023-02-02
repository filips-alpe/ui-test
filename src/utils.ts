import { Device } from "./types";

export function matchesSearch(device: Device, query: string) {
  return (
    device.line.name.toLowerCase().includes(query.toLowerCase()) ||
    device.product.name.toLowerCase().includes(query.toLowerCase())
  );
}

export function matchesFilters(device: Device, productLines: string[]) {
  if (productLines.length === 0) {
    return true;
  }
  return productLines.includes(device.line.name);
}
