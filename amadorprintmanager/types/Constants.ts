export const colors = [
  "Select Material",
  "Any",
  "Yellow",
  "Blue",
  "Purple",
  "Black",
  "Teal",
  "White",
];
export const printers = [
  "Select Printer",
  "Any (Non engineering Students select this)",
  "Prusa",
  "Bambu Lab",
];
//also controls the collumns that are displayed
export const literalToPrettyName = {
  name: "Job Name",
  date: "Date",
  userId: "SSID",
  cost: "Est. Cost",
  printTime: "Est. Time",
  printer: "Printer",
  color: "Color",
} as {
  [key: string]: string;
};
