import Image from "next/image";

export function DeviceList() {
  const devices = [
    { id: "06a25b40-ef1f-463a-82d9-13236866ea3d", line: "bar", name: "Baz" },
  ];

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
        {devices.map((device) => (
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
                src={`https://static.ui.com/fingerprint/ui/icons/${device.id}_257x257.png`}
                alt={`${device.name} image`}
                width={24}
                height={24}
                style={{
                  verticalAlign: "middle",
                }}
              />
            </td>
            <td>{device.line}</td>
            <td>{device.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
