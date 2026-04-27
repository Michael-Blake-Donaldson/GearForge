import { Quiz } from "@/types/Quiz";

const makeQuiz = (
  id: string,
  lessonId: string,
  title: string,
  questions: Quiz["questions"],
): Quiz => ({
  id,
  lessonId,
  title,
  questions,
});

export const quizzes: Quiz[] = [
  makeQuiz("am-q1", "am-l1", "Pushrod vs OHC Quiz", [
    {
      id: "am-q1-1",
      question: "What is a key packaging trait of pushrod engines?",
      options: [
        "Higher overall engine height",
        "Camshafts mounted in cylinder heads",
        "Compact height due to cam-in-block design",
        "No valve actuation hardware",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Pushrod engines place camshafts in the block, often reducing overall engine height.",
    },
    {
      id: "am-q1-2",
      question: "Why are overhead cam designs often chosen?",
      options: [
        "They eliminate timing components",
        "They simplify transfer case design",
        "They improve valve event control at high RPM",
        "They remove the need for lubrication",
      ],
      correctAnswerIndex: 2,
      explanation:
        "OHC layouts support precise valve timing/lift strategies, especially at higher engine speeds.",
    },
    {
      id: "am-q1-3",
      question: "Which statement is most accurate?",
      options: [
        "Pushrod always means low power",
        "OHC always means better towing",
        "Valvetrain choice depends on packaging and performance targets",
        "Both layouts behave identically under load",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Engine architecture is selected according to platform priorities and constraints.",
    },
  ]),
  makeQuiz("am-q2", "am-l2", "RWD and 4WD Quiz", [
    {
      id: "am-q2-1",
      question:
        "What additional component does 4WD add compared with basic RWD?",
      options: [
        "Intercooler",
        "Transfer case",
        "Fuel rail",
        "Alternator regulator",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A transfer case helps distribute torque to front and rear axles in 4WD systems.",
    },
    {
      id: "am-q2-2",
      question: "What is a major benefit of controlled torque distribution?",
      options: [
        "Lower coolant temperature",
        "Reduced wheel slip on low traction surfaces",
        "Higher battery voltage",
        "Shorter wheelbase",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Distributing torque effectively improves traction and stability on slippery terrain.",
    },
    {
      id: "am-q2-3",
      question: "RWD torque is primarily routed to which axle?",
      options: ["Front axle", "Rear axle", "Both axles evenly", "Neither axle"],
      correctAnswerIndex: 1,
      explanation:
        "In standard RWD architecture, power flows through the rear differential.",
    },
  ]),
  makeQuiz("am-q3", "am-l3", "Truck Suspension Quiz", [
    {
      id: "am-q3-1",
      question: "What is the core goal of truck suspension calibration?",
      options: [
        "Maximize cabin noise",
        "Balance comfort, control, and payload support",
        "Eliminate damping force",
        "Reduce wheel travel to zero",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Suspension tuning must handle varying loads while maintaining stability and ride quality.",
    },
    {
      id: "am-q3-2",
      question: "Why does payload influence suspension behavior?",
      options: [
        "Payload changes static and dynamic axle loads",
        "Payload only affects tire color",
        "Payload disconnects dampers",
        "Payload removes spring rate",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Load alters weight transfer and ride height, requiring robust suspension control.",
    },
    {
      id: "am-q3-3",
      question: "What can poor damping cause under towing?",
      options: [
        "More efficient combustion",
        "Pitch and oscillation instability",
        "Lower engine displacement",
        "Reduced steering angle",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Inadequate damping can lead to uncontrolled body motions and unstable handling.",
    },
  ]),
  makeQuiz("am-q4", "am-l4", "Brake Bias Quiz", [
    {
      id: "am-q4-1",
      question: "Brake bias refers to what?",
      options: [
        "Fuel-to-air ratio",
        "Front-to-rear brake force distribution",
        "Alternator output mapping",
        "Camshaft advance angle",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Brake bias determines how stopping force is split between front and rear axles.",
    },
    {
      id: "am-q4-2",
      question: "Why is brake bias critical in larger vehicles?",
      options: [
        "It changes wheel diameter",
        "It controls stopping stability under load transfer",
        "It lowers octane demand",
        "It increases turbo lag",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Weight transfer during braking can destabilize a vehicle if force is not balanced properly.",
    },
    {
      id: "am-q4-3",
      question: "Too much rear braking force under light load can cause:",
      options: [
        "Battery overcharging",
        "Rear axle instability",
        "Lower hydraulic pressure",
        "Higher fuel economy",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Excess rear braking can reduce rear traction and lead to instability.",
    },
  ]),
  makeQuiz("jp-q1", "jp-l1", "Inline-4 Fundamentals Quiz", [
    {
      id: "jp-q1-1",
      question: "Why are inline-4 engines common in compact platforms?",
      options: [
        "They require no cooling system",
        "They package efficiently and support economy goals",
        "They only run on diesel",
        "They remove drivetrain losses",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Inline-4 designs are compact and efficient, fitting many transverse layouts.",
    },
    {
      id: "jp-q1-2",
      question:
        "A key design priority in many reliability-focused platforms is:",
      options: [
        "High service complexity",
        "Predictable long-term operation",
        "Maximum cylinder count",
        "Extremely high boost pressure",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Reliability-oriented designs prioritize durability and manageable maintenance.",
    },
    {
      id: "jp-q1-3",
      question: "Which choice best matches inline-4 strengths?",
      options: [
        "Large packaging footprint",
        "High manufacturing complexity",
        "Efficiency and serviceability balance",
        "No vibration control needed",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Inline-4 layouts are often selected for balanced efficiency and maintainability.",
    },
  ]),
  makeQuiz("jp-q2", "jp-l2", "Variable Valve Timing Quiz", [
    {
      id: "jp-q2-1",
      question: "What does variable valve timing primarily adjust?",
      options: [
        "Wheel alignment",
        "Valve event timing/lift behavior",
        "Fuel tank capacity",
        "Brake rotor diameter",
      ],
      correctAnswerIndex: 1,
      explanation:
        "VVT/VTEC systems adapt valve operation to improve performance and efficiency.",
    },
    {
      id: "jp-q2-2",
      question: "A practical benefit of variable valvetrain control is:",
      options: [
        "Worse low-speed drivability",
        "Broader useful power/efficiency band",
        "No need for camshafts",
        "Lower tire pressure",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Adaptive valve control helps engines perform well across different loads and RPM.",
    },
    {
      id: "jp-q2-3",
      question: "Why is VVT not just a high-RPM feature?",
      options: [
        "It also supports low-speed efficiency and response",
        "It only works during cold starts",
        "It disables intake airflow",
        "It replaces spark control",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Timing adjustment improves behavior across the entire operating range.",
    },
  ]),
  makeQuiz("jp-q3", "jp-l3", "CVT Operation Quiz", [
    {
      id: "jp-q3-1",
      question: "What distinguishes a CVT from a conventional automatic?",
      options: [
        "No transmission fluid",
        "Continuous ratio variation instead of fixed gear steps",
        "No torque transfer components",
        "Mandatory manual clutch pedal",
      ],
      correctAnswerIndex: 1,
      explanation:
        "CVTs vary ratio continuously to meet efficiency or performance targets.",
    },
    {
      id: "jp-q3-2",
      question: "In steady cruising, CVT logic often aims to:",
      options: [
        "Increase engine RPM without reason",
        "Hold efficient engine operating points",
        "Disable power steering",
        "Maximize shift shock",
      ],
      correctAnswerIndex: 1,
      explanation: "CVTs can keep RPM near efficient zones for fuel economy.",
    },
    {
      id: "jp-q3-3",
      question: "CVT drivability depends heavily on:",
      options: [
        "Paint color",
        "Control software calibration",
        "Seat material",
        "Wheel offset only",
      ],
      correctAnswerIndex: 1,
      explanation: "Control strategy determines responsiveness and smoothness.",
    },
  ]),
  makeQuiz("jp-q4", "jp-l4", "Hybrid Power Split Quiz", [
    {
      id: "jp-q4-1",
      question: "Hybrid efficiency is mainly achieved by:",
      options: [
        "Larger fuel tanks",
        "Coordinated use of engine and electric torque",
        "Higher idle speed",
        "Disabling regenerative braking",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Hybrid systems optimize source usage based on operating conditions.",
    },
    {
      id: "jp-q4-2",
      question: "Regenerative braking primarily:",
      options: [
        "Increases engine displacement",
        "Recovers kinetic energy to electrical storage",
        "Reduces tire diameter",
        "Lowers compression ratio",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Regeneration converts braking energy into stored electrical energy.",
    },
    {
      id: "jp-q4-3",
      question: "Which element is central to blending hybrid torque sources?",
      options: [
        "Power electronics and control logic",
        "Manual choke control",
        "Mechanical distributor",
        "Leaf spring tuning",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Inverters/controllers coordinate motor and engine contribution.",
    },
  ]),
  makeQuiz("eu-q1", "eu-l1", "Turbocharging Quiz", [
    {
      id: "eu-q1-1",
      question: "A turbocharger primarily increases:",
      options: [
        "Fuel octane directly",
        "Intake air mass entering cylinders",
        "Wheelbase",
        "Brake fluid pressure",
      ],
      correctAnswerIndex: 1,
      explanation:
        "More intake air mass enables higher potential torque output.",
    },
    {
      id: "eu-q1-2",
      question: "What helps regulate boost pressure?",
      options: [
        "Wastegate control",
        "Crankshaft counterweights",
        "Coolant cap pressure",
        "Windshield aerodynamics",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Wastegate and control logic manage turbine energy and boost level.",
    },
    {
      id: "eu-q1-3",
      question: "A major calibration challenge in turbo systems is:",
      options: [
        "Seat ergonomics",
        "Thermal and transient response control",
        "Paint curing time",
        "Door seal stiffness",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Turbo systems must manage heat and boost response under changing load.",
    },
  ]),
  makeQuiz("eu-q2", "eu-l2", "Direct Injection Quiz", [
    {
      id: "eu-q2-1",
      question: "Direct injection places fuel where?",
      options: [
        "Intake manifold only",
        "Directly into combustion chamber",
        "Exhaust manifold",
        "Transmission housing",
      ],
      correctAnswerIndex: 1,
      explanation:
        "DI injects fuel inside the cylinder, requiring precise timing/pressure control.",
    },
    {
      id: "eu-q2-2",
      question: "What strongly influences DI combustion quality?",
      options: [
        "Spray pattern and injection timing",
        "Wheel offset",
        "Cabin humidity",
        "Tire tread block size",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Atomization and timing affect mixture formation and burn stability.",
    },
    {
      id: "eu-q2-3",
      question: "DI systems generally require:",
      options: [
        "Low-pressure bicycle pump",
        "High-pressure fuel delivery hardware",
        "Mechanical fuel choke",
        "Two spark plugs per tire",
      ],
      correctAnswerIndex: 1,
      explanation:
        "High-pressure pumps/injectors are central to direct injection operation.",
    },
  ]),
  makeQuiz("eu-q3", "eu-l3", "DSG and DCT Quiz", [
    {
      id: "eu-q3-1",
      question: "Why can DCT shifts be very fast?",
      options: [
        "No clutch engagement needed",
        "Next gear is preselected with dual clutches",
        "No transmission control module",
        "No torque path",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Dual-clutch systems prepare the next gear before shift execution.",
    },
    {
      id: "eu-q3-2",
      question: "Shift quality in DCT systems depends on:",
      options: [
        "Clutch and torque coordination",
        "Headlight color temperature",
        "Mirror shape",
        "Window tint",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Mechatronic logic coordinates clutch pressures and torque handoff.",
    },
    {
      id: "eu-q3-3",
      question:
        "Compared with many traditional automatics, DCT behavior often feels:",
      options: [
        "Slower and less direct",
        "Sharper under sport-oriented calibration",
        "Uncontrollable at all times",
        "Completely identical in all cases",
      ],
      correctAnswerIndex: 1,
      explanation:
        "DCT systems can provide direct, rapid shift feel when tuned for performance.",
    },
  ]),
  makeQuiz("eu-q4", "eu-l4", "CAN Bus Quiz", [
    {
      id: "eu-q4-1",
      question: "CAN bus allows modules to:",
      options: [
        "Share data over a common communication network",
        "Share engine oil physically",
        "Bypass wiring entirely",
        "Remove all control units",
      ],
      correctAnswerIndex: 0,
      explanation:
        "CAN enables distributed modules to exchange data efficiently.",
    },
    {
      id: "eu-q4-2",
      question: "Why is message arbitration important on CAN?",
      options: [
        "It gives decorative priorities",
        "It allows critical messages to transmit reliably",
        "It controls seat position memory",
        "It adjusts wheel alignment",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Prioritized arbitration helps critical control messages win bus access when needed.",
    },
    {
      id: "eu-q4-3",
      question: "A practical CAN use case is coordination between:",
      options: [
        "ABS and powertrain modules",
        "Cupholder and paint modules only",
        "Door handles and wheel nuts only",
        "None of the above",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Safety and powertrain modules exchange real-time information over CAN.",
    },
  ]),
];

export const quizzesById = Object.fromEntries(
  quizzes.map((quiz) => [quiz.id, quiz]),
);
