// Encyclopedia entries for GearForge's reference library.
// Launch target: 100+ concise, searchable entries across core categories.

export type EncyclopediaEntry = {
  id: string;
  name: string;
  category:
    | "Car Parts"
    | "Systems"
    | "Tools"
    | "Fluids"
    | "Engine Types"
    | "Transmission Types"
    | "Suspension"
    | "Brakes"
    | "Electrical"
    | "Emissions";
  description: string;
  function: string;
  keyFacts: string[];
};

type CategorySpec = {
  category: EncyclopediaEntry["category"];
  items: string[];
};

const categorySpecs: CategorySpec[] = [
  {
    category: "Engine Types",
    items: [
      "Inline-3", "Inline-4", "Inline-5", "Inline-6", "V6", "V8", "V10", "V12", "Flat-4", "Flat-6", "Rotary", "Diesel Compression-Ignition",
    ],
  },
  {
    category: "Transmission Types",
    items: [
      "Manual 5-Speed", "Manual 6-Speed", "Torque Converter Automatic", "Dual-Clutch Transmission", "CVT", "Automated Manual", "e-Axle", "Two-Speed EV Gearbox", "Transfer Case", "Limited Slip Differential", "Open Differential", "Locking Differential",
    ],
  },
  {
    category: "Systems",
    items: [
      "Fuel Delivery", "Ignition Control", "Cooling System", "Lubrication System", "Intake Air Path", "Exhaust Flow", "Turbocharging", "Supercharging", "Engine Management", "Traction Control", "Stability Control", "ABS Control",
    ],
  },
  {
    category: "Car Parts",
    items: [
      "Spark Plug", "Ignition Coil", "Fuel Injector", "Throttle Body", "Mass Airflow Sensor", "Oxygen Sensor", "Catalytic Converter", "Crankshaft", "Camshaft", "Timing Chain", "Water Pump", "Radiator",
    ],
  },
  {
    category: "Suspension",
    items: [
      "MacPherson Strut", "Double Wishbone", "Multi-Link", "Torsion Beam", "Air Suspension", "Adaptive Damping", "Sway Bar", "Control Arm", "Ball Joint", "Wheel Bearing", "Steering Rack", "Power Steering Pump",
    ],
  },
  {
    category: "Brakes",
    items: [
      "Brake Master Cylinder", "Brake Booster", "Brake Caliper", "Brake Rotor", "Brake Pad", "Drum Brake", "Parking Brake", "Brake Proportioning Valve", "ABS Wheel Speed Sensor", "Hydraulic Brake Line", "Brake Fluid Reservoir", "Electronic Parking Brake",
    ],
  },
  {
    category: "Electrical",
    items: [
      "12V Battery", "Alternator", "Starter Motor", "Fuse Box", "Relay", "Body Control Module", "ECU", "CAN Bus", "LIN Bus", "Ground Circuit", "High-Voltage Contactor", "Inverter",
    ],
  },
  {
    category: "Fluids",
    items: [
      "Engine Oil", "Coolant", "Brake Fluid", "Transmission Fluid", "Power Steering Fluid", "Differential Fluid", "Diesel Exhaust Fluid", "Washer Fluid", "Grease", "Compressor Oil", "Gear Oil", "Battery Coolant",
    ],
  },
  {
    category: "Emissions",
    items: [
      "Catalyst Efficiency", "EGR Valve", "PCV System", "EVAP Purge Valve", "Charcoal Canister", "Diesel Particulate Filter", "SCR Catalyst", "NOx Sensor", "Exhaust Gas Temperature Sensor", "Secondary Air Injection", "OBD Readiness Monitor", "Cold-Start Emissions",
    ],
  },
  {
    category: "Tools",
    items: [
      "OBD-II Scanner", "Multimeter", "Oscilloscope", "Torque Wrench", "Compression Tester", "Leak-Down Tester", "Vacuum Gauge", "Fuel Pressure Gauge", "Brake Bleeder", "Alignment Gauge", "Thermal Camera", "Insulation Resistance Tester",
    ],
  },
];

export const encyclopediaEntries: EncyclopediaEntry[] = categorySpecs.flatMap(
  (spec) =>
    spec.items.map((name, index) => {
      const safeId = `${spec.category.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`;
      return {
        id: `enc-${safeId}`,
        name,
        category: spec.category,
        description:
          `${name} is a core ${spec.category.toLowerCase()} topic in automotive diagnostics, maintenance, and system-level understanding.`,
        function:
          `Technicians use ${name} knowledge to evaluate behavior, isolate failure causes, and confirm durable repairs through repeatable tests.`,
        keyFacts: [
          `${name} should be evaluated using measurable evidence before replacement decisions are made.`,
          `Understanding ${name} improves troubleshooting speed and reduces unnecessary parts cost.`,
          `${name} performance is best interpreted in the context of related systems, not in isolation.`,
        ],
      };
    }),
);
