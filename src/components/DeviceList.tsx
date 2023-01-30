export function DeviceList() {
  const devices = [{ id: "foo", line: "bar", name: "Baz" }];

  return (
    <table
      style={{
        width: "100%",
        textAlign: "left",
        lineHeight: "24px",
        color: "rgba(0, 0, 0, 0.65)",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "center",
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
              borderTop: "1px solid gray",
              fontSize: "14px",
            }}
          >
            <td></td>
            <td>{device.line}</td>
            <td>{device.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
