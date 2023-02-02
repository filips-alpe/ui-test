import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Device } from "src/types";
import { matchesFilters, matchesSearch } from "src/utils";

const DEVICE_LIST_URL = "https://static.ui.com/fingerprint/ui/public.json";
const DEFAULT_IMAGE_RESOLUTION = "257x257";

export function DeviceList() {
  const devices = useDevices();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProductLines, setFilterProductLines] = useState<string[]>([]);

  function applySearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function applyFilter() {
    const filterValues: string[] = [];
    document
      .querySelectorAll("[name=productLines]:checked")
      .forEach((input: HTMLInputElement) => {
        filterValues.push(input.value);
      });
    setFilterProductLines(filterValues);
  }

  const devicesToShow = devices.filter(
    (device) =>
      matchesFilters(device, filterProductLines) &&
      matchesSearch(device, searchQuery),
  );

  const productLines = Array.from(
    new Set(devices.map((d) => d.line.name)),
  ).sort();

  return (
    <>
      <input
        type="search"
        placeholder="Search"
        onChange={applySearch}
        style={{
          background: "#F6F6F8",
          border: "none",
          outline: "none",
          borderRadius: "4px",
          margin: "8px 0 8px 30px",
          padding: "5px 10px",
        }}
      />
      <div
        style={{
          borderTop: "1px solid #EDEDF0",
          marginBottom: "20px",
        }}
      />
      <fieldset
        style={{
          position: "absolute",
          right: 0,
          width: "200px",
          fontSize: "14px",
          lineHeight: "24px",
          background: "#fff",
          boxShadow: "0px 12px 48px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div>
          <legend
            style={{
              fontWeight: 700,
            }}
          >
            Product line
          </legend>
          {productLines.map((line, i) => (
            <>
              <input
                key={i}
                type="checkbox"
                name="productLines"
                onChange={applyFilter}
                value={line}
              />
              {line}
              <br />
            </>
          ))}
        </div>
      </fieldset>
      <table
        style={{
          width: "100%",
          textAlign: "left",
          lineHeight: "24px",
          color: "rgba(0, 0, 0, 0.65)",
          borderCollapse: "collapse",
          marginLeft: "9vw",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: "140px",
                textAlign: "right",
                paddingRight: "40px",
                color: "#BDBDBD",
                fontSize: "12px",
                fontWeight: 400,
              }}
              data-testid="num-of-results"
            >
              {devicesToShow.length} devices
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Product line
            </th>
            <th
              style={{
                fontSize: "14px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {devicesToShow.slice(0, 15).map((device) => (
            <tr
              key={device.id}
              style={{
                borderTop: "1px solid #EDEDF0",
                fontSize: "14px",
              }}
            >
              <td
                style={{
                  textAlign: "right",
                  paddingRight: "40px",
                }}
              >
                <Image
                  src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_${DEFAULT_IMAGE_RESOLUTION}.png`}
                  alt={`${device.product.name} image`}
                  width={24}
                  height={24}
                  style={{
                    verticalAlign: "middle",
                  }}
                />
              </td>
              <td>{device.line.name}</td>
              <td>{device.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetch(DEVICE_LIST_URL);
      const data = await response.json();
      setDevices(data.devices);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchDevices();
  }, []);

  return devices;
};
