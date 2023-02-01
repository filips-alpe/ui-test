import Image from "next/image";
import { useEffect, useState } from "react";

const DEVICE_LIST_URL = "https://static.ui.com/fingerprint/ui/public.json";
const DEFAULT_IMAGE_RESOLUTION = "257x257";

interface Device {
  id: string;
  line: {
    name: string;
  };
  product: {
    name: string;
  };
  icon: {
    id: string;
    resolutions: [number, number][];
  };
}

export function DeviceList() {
  const devices = useDevices();

  return (
    <table
      style={{
        width: "100%",
        textAlign: "left",
        lineHeight: "24px",
        color: "rgba(0, 0, 0, 0.65)",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "right",
              paddingRight: "40px",
              color: "#BDBDBD",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            {devices.length} devices
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
        {devices.slice(0, 15).map((device) => (
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
