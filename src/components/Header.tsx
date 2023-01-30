import { Logo } from "./Logo";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "56px",
        background: "#F6F6F8",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 400,
            paddingLeft: "16px",
            letterSpacing: "-0.5px",
            color: "#838691",
            lineHeight: "28px",
          }}
        >
          Devices
        </h1>
      </div>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "28px",
          marginRight: "28px",
          textAlign: "right",
          height: "28px",
          color: "rgba(0, 0, 0, 0.65)",
        }}
      >
        Author/Filips Alpe
      </h2>
    </header>
  );
}
