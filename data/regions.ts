import { Region } from "@/types/Region";

export const regions: Region[] = [
  {
    id: "american",
    name: "American Vehicles",
    description:
      "Torque-heavy platforms, trucks/SUVs, and robust driveline architecture.",
    focusAreas: ["V6 and V8 engines", "Pushrod vs OHC", "RWD and 4WD systems"],
    accentColor: "#1dd3b0",
    unitIds: ["am-1", "am-2"],
  },
  {
    id: "japanese",
    name: "Japanese Vehicles",
    description:
      "Reliability-first engineering with efficient packaging and precision controls.",
    focusAreas: [
      "Inline-4 engines",
      "VTEC/VVT systems",
      "CVT and hybrid architecture",
    ],
    accentColor: "#39a0ff",
    unitIds: ["jp-1", "jp-2"],
  },
  {
    id: "european",
    name: "European Vehicles",
    description:
      "Performance-oriented systems, advanced electronics, and precision handling.",
    focusAreas: [
      "Turbo/direct injection",
      "DSG and DCT",
      "CAN bus electronics",
    ],
    accentColor: "#61f2c2",
    unitIds: ["eu-1", "eu-2"],
  },
  {
    id: "korean",
    name: "Korean Vehicles",
    description:
      "Modern compact engineering and fast adoption of electrified systems.",
    focusAreas: ["Turbo small engines", "GDI systems", "Hybrid growth"],
    accentColor: "#5ce1ff",
    unitIds: [],
  },
  {
    id: "ev-hybrid",
    name: "Electric and Hybrid Vehicles",
    description:
      "EV and HEV fundamentals from energy storage to propulsion control.",
    focusAreas: ["Battery systems", "Inverters", "Thermal management"],
    accentColor: "#72f8d4",
    unitIds: [],
  },
  {
    id: "diesel-heavy",
    name: "Diesel and Heavy Duty Vehicles",
    description:
      "Compression ignition systems, heavy drivetrains, and fleet durability principles.",
    focusAreas: ["Turbo diesel", "DEF systems", "Heavy-duty transmissions"],
    accentColor: "#84b8ff",
    unitIds: [],
  },
];

export const starterRegionIds = ["american", "japanese", "european"];
