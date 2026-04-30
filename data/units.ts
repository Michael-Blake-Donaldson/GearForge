import { Unit } from "@/types/Unit";

export const units: Unit[] = [
  // ── American ─────────────────────────────────────────────────────────────
  {
    id: "am-1",
    regionId: "american",
    title: "American Powertrain Foundations",
    description:
      "Core engine and driveline architecture common to U.S. platforms.",
    order: 1,
    lessonIds: ["am-l1", "am-l2"],
  },
  {
    id: "am-2",
    regionId: "american",
    title: "American Chassis and Utility Systems",
    description:
      "Suspension, brake bias, and utility-focused driveline behavior.",
    order: 2,
    lessonIds: ["am-l3", "am-l4"],
  },
  {
    id: "am-3",
    regionId: "american",
    title: "American Performance and Emissions",
    description:
      "High-output engine tuning, forced induction on domestic platforms, and emissions compliance.",
    order: 3,
    lessonIds: ["am-l5", "am-l6"],
  },

  // ── Japanese ──────────────────────────────────────────────────────────────
  {
    id: "jp-1",
    regionId: "japanese",
    title: "Japanese Efficiency Architecture",
    description: "Engine efficiency and valvetrain control strategies.",
    order: 1,
    lessonIds: ["jp-l1", "jp-l2"],
  },
  {
    id: "jp-2",
    regionId: "japanese",
    title: "Japanese Drivability Systems",
    description: "CVT behavior and hybrid integration fundamentals.",
    order: 2,
    lessonIds: ["jp-l3", "jp-l4"],
  },
  {
    id: "jp-3",
    regionId: "japanese",
    title: "Japanese AWD and Safety Systems",
    description:
      "Symmetrical AWD layouts, torque vectoring, and active safety electronics.",
    order: 3,
    lessonIds: ["jp-l5", "jp-l6"],
  },

  // ── European ──────────────────────────────────────────────────────────────
  {
    id: "eu-1",
    regionId: "european",
    title: "European Forced Induction and Fueling",
    description: "Turbocharging and direct injection control mechanics.",
    order: 1,
    lessonIds: ["eu-l1", "eu-l2"],
  },
  {
    id: "eu-2",
    regionId: "european",
    title: "European Electronic Networks",
    description: "High-speed networked modules and transmission logic.",
    order: 2,
    lessonIds: ["eu-l3", "eu-l4"],
  },
  {
    id: "eu-3",
    regionId: "european",
    title: "European Chassis Dynamics",
    description:
      "Adaptive damping, active aerodynamics, and precision handling systems.",
    order: 3,
    lessonIds: ["eu-l5", "eu-l6"],
  },

  // ── Korean ────────────────────────────────────────────────────────────────
  {
    id: "ko-1",
    regionId: "korean",
    title: "Korean Compact Efficiency",
    description:
      "Gasoline direct injection, turbocharged small-displacement engines, and Smartstream architecture.",
    order: 1,
    lessonIds: ["ko-l1", "ko-l2"],
  },
  {
    id: "ko-2",
    regionId: "korean",
    title: "Korean Platform Dynamics",
    description:
      "HTRAC AWD system, multi-link suspension tuning, and N-performance engineering.",
    order: 2,
    lessonIds: ["ko-l3", "ko-l4"],
  },

  // ── EV & Hybrid ───────────────────────────────────────────────────────────
  {
    id: "ev-1",
    regionId: "ev-hybrid",
    title: "High Voltage Fundamentals",
    description:
      "Battery cell chemistry, pack architecture, BMS operation, and HV safety.",
    order: 1,
    lessonIds: ["ev-l1", "ev-l2"],
  },
  {
    id: "ev-2",
    regionId: "ev-hybrid",
    title: "Electric Propulsion and Regeneration",
    description:
      "Motor types, inverter control, regenerative braking systems, and thermal management.",
    order: 2,
    lessonIds: ["ev-l3", "ev-l4"],
  },

  // ── Diesel & Heavy-Duty ───────────────────────────────────────────────────
  {
    id: "dh-1",
    regionId: "diesel-heavy",
    title: "Diesel Combustion Science",
    description:
      "Common-rail injection, compression ignition, turbo diesel architecture, and fuel delivery.",
    order: 1,
    lessonIds: ["dh-l1", "dh-l2"],
  },
  {
    id: "dh-2",
    regionId: "diesel-heavy",
    title: "Emissions and Heavy-Duty Drivetrains",
    description:
      "DEF/SCR aftertreatment, DPF operation, air brakes, and heavy-duty transmission design.",
    order: 2,
    lessonIds: ["dh-l3", "dh-l4"],
  },
];
