export interface Device {
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
