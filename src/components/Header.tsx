import { Logo } from "./Logo";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
        <h1>Devices</h1>
      </div>
      <h2>Author/Filips Alpe</h2>
    </header>
  );
}
