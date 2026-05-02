type UnitBlueprint = {
  title: string;
  description: string;
};

type RegionBlueprint = {
  id:
    | "american"
    | "japanese"
    | "european"
    | "korean"
    | "ev-hybrid"
    | "diesel-heavy";
  code: "am" | "jp" | "eu" | "ko" | "ev" | "dh";
  displayName: string;
  appName: string;
  description: string;
  focusAreas: string[];
  accentColor: string;
  units: UnitBlueprint[];
};

export const curriculumRegions: RegionBlueprint[] = [
  {
    id: "american",
    code: "am",
    displayName: "American Vehicles",
    appName: "American",
    description:
      "Torque-heavy platforms, trucks/SUVs, and robust driveline architecture.",
    focusAreas: ["V6 and V8 engines", "Pushrod vs OHC", "RWD and 4WD systems"],
    accentColor: "#1dd3b0",
    units: [
      {
        title: "Powertrain Foundations",
        description:
          "Core U.S. engine, valvetrain, and driveline fundamentals.",
      },
      {
        title: "Chassis and Utility Systems",
        description:
          "Suspension, braking, and towing behavior under real loads.",
      },
      {
        title: "Performance and Emissions",
        description:
          "Boost strategies, OBD diagnostics, and compliance readiness.",
      },
      {
        title: "Electronics and Driveability",
        description:
          "Sensors, control loops, and fault tracing in modern platforms.",
      },
      {
        title: "Field Diagnostics Mastery",
        description:
          "System-level diagnosis and service workflow decision making.",
      },
    ],
  },
  {
    id: "japanese",
    code: "jp",
    displayName: "Japanese Vehicles",
    appName: "Japanese",
    description:
      "Reliability-first engineering with efficient packaging and precision controls.",
    focusAreas: [
      "Inline-4 engines",
      "VTEC/VVT systems",
      "CVT and hybrid architecture",
    ],
    accentColor: "#39a0ff",
    units: [
      {
        title: "Efficiency Architecture",
        description:
          "Packaging decisions that maximize reliability and economy.",
      },
      {
        title: "Drivability Systems",
        description: "CVT and hybrid torque blending for smooth operation.",
      },
      {
        title: "AWD and Safety Systems",
        description:
          "Traction logic, torque vectoring, and active safety behavior.",
      },
      {
        title: "Diagnostics and Calibration",
        description:
          "ECU strategy, adaptation logic, and repeatable troubleshooting.",
      },
      {
        title: "Advanced Platform Integration",
        description:
          "How efficiency, safety, and control networks operate as one.",
      },
    ],
  },
  {
    id: "european",
    code: "eu",
    displayName: "European Vehicles",
    appName: "European",
    description:
      "Performance-oriented systems, advanced electronics, and precision handling.",
    focusAreas: [
      "Turbo/direct injection",
      "DSG and DCT",
      "CAN bus electronics",
    ],
    accentColor: "#61f2c2",
    units: [
      {
        title: "Forced Induction and Fueling",
        description: "Turbo response, thermal limits, and injection precision.",
      },
      {
        title: "Electronic Networks",
        description:
          "Control-module communication and coordinated drivetrain logic.",
      },
      {
        title: "Chassis Dynamics",
        description: "Adaptive damping, active aero, and confidence at speed.",
      },
      {
        title: "Service Strategy and Faults",
        description:
          "Diagnosing high-complexity faults with systematic processes.",
      },
      {
        title: "Performance Systems Mastery",
        description:
          "Integrating drivetrain, brake, and stability calibration choices.",
      },
    ],
  },
  {
    id: "korean",
    code: "ko",
    displayName: "Korean Vehicles",
    appName: "Korean",
    description:
      "Modern compact engineering and fast adoption of electrified systems.",
    focusAreas: ["Turbo small engines", "GDI systems", "Hybrid growth"],
    accentColor: "#5ce1ff",
    units: [
      {
        title: "Compact Efficiency",
        description: "Downsized turbo architecture and GDI fundamentals.",
      },
      {
        title: "Platform Dynamics",
        description:
          "AWD response, suspension tuning, and stability strategies.",
      },
      {
        title: "Electrification Integration",
        description:
          "Mild hybrid and hybrid integration in modern Korean platforms.",
      },
      {
        title: "Diagnostics Workflow",
        description: "Fast fault isolation with practical workshop workflows.",
      },
      {
        title: "Performance and Reliability",
        description:
          "Balancing spirited tuning with long-term service reliability.",
      },
    ],
  },
  {
    id: "ev-hybrid",
    code: "ev",
    displayName: "Electric and Hybrid Vehicles",
    appName: "EV / Hybrid",
    description:
      "EV and HEV fundamentals from energy storage to propulsion control.",
    focusAreas: ["Battery systems", "Inverters", "Thermal management"],
    accentColor: "#72f8d4",
    units: [
      {
        title: "High Voltage Foundations",
        description:
          "Battery chemistry, pack architecture, and HV safety discipline.",
      },
      {
        title: "Propulsion and Regeneration",
        description: "Motor/inverter behavior and energy recovery strategy.",
      },
      {
        title: "Thermal and Power Electronics",
        description:
          "Heat control, charging behavior, and component protection.",
      },
      {
        title: "Diagnostics and Service Safety",
        description:
          "Isolation testing, fault tracing, and safe service sequencing.",
      },
      {
        title: "Advanced EV Systems",
        description:
          "System integration and range/performance optimization tradeoffs.",
      },
    ],
  },
  {
    id: "diesel-heavy",
    code: "dh",
    displayName: "Diesel and Heavy Duty Vehicles",
    appName: "Diesel / Heavy Duty",
    description:
      "Compression ignition systems, heavy drivetrains, and fleet durability principles.",
    focusAreas: ["Turbo diesel", "DEF systems", "Heavy-duty transmissions"],
    accentColor: "#84b8ff",
    units: [
      {
        title: "Diesel Combustion Science",
        description:
          "Injection timing, compression ignition, and torque behavior.",
      },
      {
        title: "Aftertreatment and Emissions",
        description:
          "DPF, SCR/DEF systems, and emissions compliance readiness.",
      },
      {
        title: "Heavy Drivetrain Systems",
        description:
          "AMT behavior, driveline durability, and load-based control.",
      },
      {
        title: "Fleet Diagnostics",
        description: "Troubleshooting repeat failures across duty cycles.",
      },
      {
        title: "Reliability and Service Operations",
        description: "Preventive planning and long-haul reliability strategy.",
      },
    ],
  },
];

export const lessonModuleTemplates = [
  {
    slug: "foundation",
    titleSuffix: "Foundations",
    hook: "Why this concept matters in real workshop decisions.",
  },
  {
    slug: "components",
    titleSuffix: "Component Function",
    hook: "How each subsystem contributes to whole-vehicle behavior.",
  },
  {
    slug: "diagnostics",
    titleSuffix: "Diagnostics Flow",
    hook: "How to isolate faults before replacing parts.",
  },
  {
    slug: "symptoms",
    titleSuffix: "Symptoms and Failure Modes",
    hook: "What drivers feel versus what the system is actually doing.",
  },
  {
    slug: "optimization",
    titleSuffix: "Optimization Strategy",
    hook: "Balancing reliability, performance, and compliance goals.",
  },
  {
    slug: "case-study",
    titleSuffix: "Workshop Case Study",
    hook: "Applying theory under realistic service constraints.",
  },
] as const;

export const quizQuestionTypes = [
  "multiple-choice",
  "true-false",
  "matching",
  "scenario",
  "ordering",
] as const;
