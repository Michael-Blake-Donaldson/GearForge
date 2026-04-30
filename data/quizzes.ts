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

  // ── American Unit 3 Quizzes ───────────────────────────────────────────────

  makeQuiz("am-q5", "am-l5", "Supercharger vs Turbocharger Quiz", [
    {
      id: "am-q5-1",
      // Tests understanding of positive-displacement supercharger traits
      question:
        "Which type of supercharger provides the most immediate low-RPM boost with the least lag?",
      options: [
        "Centrifugal supercharger",
        "Roots or twin-screw positive-displacement supercharger",
        "Exhaust-driven turbocharger",
        "Variable geometry turbine",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Positive-displacement (Roots/twin-screw) superchargers are mechanically driven and deliver boost from idle, producing near-instant torque with no exhaust lag.",
    },
    {
      id: "am-q5-2",
      // Tests understanding of turbocharger energy source
      question: "What energy source drives a turbocharger's compressor wheel?",
      options: [
        "Engine crankshaft via a belt",
        "An electric motor",
        "Exhaust gas energy spinning the turbine",
        "Intake vacuum pressure",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Turbochargers harvest exhaust energy — the turbine spins from hot exhaust gas flow, which drives the compressor on the same shaft.",
    },
    {
      id: "am-q5-3",
      // Tests power curve knowledge
      question:
        "A centrifugal supercharger delivers boost that increases with:",
      options: [
        "Engine coolant temperature",
        "RPM, producing more power at the top of the rev range",
        "Fuel pressure only",
        "Ambient humidity",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Centrifugal superchargers spin faster as RPM rises, so boost and power build toward the top of the RPM range rather than at low speed.",
    },
  ]),

  makeQuiz("am-q6", "am-l6", "OBD-II Diagnostics Quiz", [
    {
      id: "am-q6-1",
      // Tests OBD-II mandate knowledge
      question:
        "OBD-II diagnostic capability has been required on US vehicles since:",
      options: ["1988", "1996", "2003", "2010"],
      correctAnswerIndex: 1,
      explanation:
        "The US EPA mandated OBD-II compliance starting with model year 1996 vehicles.",
    },
    {
      id: "am-q6-2",
      // Tests readiness monitor purpose
      question: "What does an OBD-II readiness monitor confirm?",
      options: [
        "That the oil is at the correct level",
        "That a specific system self-test has completed and passed",
        "That the tire pressure is within range",
        "That the transmission fluid was recently changed",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Readiness monitors are self-test routines the ECU runs to verify emission-related systems are functioning correctly.",
    },
    {
      id: "am-q6-3",
      // Tests consequence of incomplete monitors at inspection
      question:
        "A recently reset ECU will often fail an emissions inspection because:",
      options: [
        "The engine will not start after a reset",
        "The monitors have not yet completed their self-test cycles",
        "The VIN is erased during reset",
        "Fuel trims must be re-calibrated by a dealer",
      ],
      correctAnswerIndex: 1,
      explanation:
        "After an ECU reset, monitors are marked incomplete. Inspectors check monitor status, and incomplete monitors indicate the system has not proven itself functional.",
    },
  ]),

  // ── Japanese Unit 3 Quizzes ───────────────────────────────────────────────

  makeQuiz("jp-q5", "jp-l5", "Symmetrical AWD and Torque Vectoring Quiz", [
    {
      id: "jp-q5-1",
      // Tests understanding of symmetrical AWD benefit
      question:
        "What is a primary handling benefit of symmetrical AWD with equal-length driveshafts?",
      options: [
        "Higher top speed on dry pavement",
        "Reduced torque steer and improved traction balance side-to-side",
        "Lower center of gravity",
        "Elimination of all understeer in all conditions",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Equal-length driveshafts mean equal torque forces act on both front wheels, eliminating the pull-to-one-side torque steer common in asymmetric layouts.",
    },
    {
      id: "jp-q5-2",
      // Tests vectoring mechanism knowledge
      question: "Torque vectoring improves cornering by:",
      options: [
        "Increasing total engine output",
        "Sending more torque to the outside wheel to assist yaw rotation",
        "Locking all four wheels during turns",
        "Cutting power to all wheels equally",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Directing torque to the outside rear wheel creates a yaw moment that rotates the vehicle into the corner more naturally, reducing understeer.",
    },
    {
      id: "jp-q5-3",
      // Tests method distinction
      question:
        "Which of these is an example of mechanical (passive) torque vectoring?",
      options: [
        "Brake-based electronic yaw control",
        "A helical limited-slip differential",
        "Active rear-axle steering",
        "Electronic throttle mapping",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A helical LSD uses gear geometry to passively bias torque toward the wheel with more grip — no electronic actuation required.",
    },
  ]),

  makeQuiz("jp-q6", "jp-l6", "Pre-Collision Systems and Sensor Fusion Quiz", [
    {
      id: "jp-q6-1",
      // Tests radar advantage knowledge
      question:
        "Why is radar preferred over cameras for long-range object detection in pre-collision systems?",
      options: [
        "Radar is cheaper to manufacture",
        "Radar is more tolerant of rain, fog, and low light than cameras",
        "Radar can read road signs directly",
        "Radar has higher resolution for lane markings",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Radar uses radio waves that penetrate rain, fog, and darkness, making it reliable in adverse weather where cameras struggle.",
    },
    {
      id: "jp-q6-2",
      // Tests sensor fusion concept
      question: "Sensor fusion in a pre-collision system means:",
      options: [
        "Using only one sensor type to reduce cost",
        "Combining data from radar, cameras, and sometimes lidar to build a more accurate environmental model",
        "Fusing the radar and camera into a single physical unit",
        "Using GPS map data instead of real-time sensors",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Sensor fusion merges complementary data sources so the system is more confident and accurate than any single sensor could be alone.",
    },
    {
      id: "jp-q6-3",
      // Tests system action sequence
      question:
        "In a pre-collision sequence, what typically happens before the friction brakes fully engage?",
      options: [
        "The transmission downshifts immediately",
        "The system does nothing until driver input",
        "Throttle is reduced and brakes are pre-charged to reduce response time",
        "The parking brake is applied",
      ],
      correctAnswerIndex: 2,
      explanation:
        "Systems pre-charge the brake lines and close the throttle before full braking — this reduces the time between detection and full braking force.",
    },
  ]),

  // ── European Unit 3 Quizzes ───────────────────────────────────────────────

  makeQuiz("eu-q5", "eu-l5", "Adaptive Damping Quiz", [
    {
      id: "eu-q5-1",
      // Tests adjustment speed knowledge
      question:
        "How quickly can electronically controlled dampers adjust their stiffness?",
      options: [
        "Over several seconds as the vehicle settles",
        "Within milliseconds, faster than a single body-motion cycle",
        "Only during scheduled maintenance intervals",
        "Once per key-on cycle",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Electronic damping systems react in milliseconds — well within one body oscillation cycle — allowing real-time adaptation to road conditions.",
    },
    {
      id: "eu-q5-2",
      // Tests sensor inputs
      question:
        "Which sensors commonly feed data to an adaptive damping control unit?",
      options: [
        "Fuel level sensor and oil pressure sensor only",
        "Accelerometers, steering angle sensors, and wheel speed sensors",
        "Exhaust temperature and coolant sensors",
        "Seat occupancy and door lock sensors",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Accelerometers detect body motion, steering angle indicates driver intent, and wheel speed reveals traction state — all inform damper adjustments.",
    },
    {
      id: "eu-q5-3",
      // Tests key benefit vs fixed dampers
      question:
        "The key advantage of adaptive dampers over fixed-rate dampers is:",
      options: [
        "They eliminate the need for springs entirely",
        "They can be both comfortable on smooth roads and stiff during cornering without a fixed tradeoff",
        "They reduce total vehicle weight significantly",
        "They remove the need for wheel alignment",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Fixed dampers force a compromise between comfort and handling. Adaptive systems optimize each independently by adjusting in real time.",
    },
  ]),

  makeQuiz("eu-q6", "eu-l6", "Active Aerodynamics Quiz", [
    {
      id: "eu-q6-1",
      // Tests downforce vs drag tradeoff
      question:
        "At high speed, deploying active aerodynamic surfaces primarily achieves:",
      options: [
        "Reduced tire wear on the inside wheels",
        "Increased downforce for improved grip and stability",
        "Lower engine coolant temperature",
        "Reduced turbo boost pressure",
      ],
      correctAnswerIndex: 1,
      explanation:
        "At speed, extended spoilers and diffusers generate downforce that presses tires harder into the road, improving cornering grip and straight-line stability.",
    },
    {
      id: "eu-q6-2",
      // Tests drag reduction at low speed
      question:
        "At low speeds, active aero surfaces typically retract or flatten to:",
      options: [
        "Improve driver visibility",
        "Reduce aerodynamic drag and improve fuel efficiency",
        "Lower the vehicle's center of gravity",
        "Activate the parking sensors",
      ],
      correctAnswerIndex: 1,
      explanation:
        "At low speed, downforce provides minimal benefit but drag still hurts fuel economy — retracting surfaces reduces drag.",
    },
    {
      id: "eu-q6-3",
      // Tests system trigger understanding
      question:
        "Active aero adjustments can be triggered by which of the following inputs?",
      options: [
        "Vehicle speed, cornering force, or driver-selected mode",
        "Cabin temperature and seat position",
        "Fuel grade selection only",
        "Wiper speed and headlight status",
      ],
      correctAnswerIndex: 0,
      explanation:
        "Speed, lateral g-force, and driver mode selection all signal when to deploy or retract aerodynamic surfaces.",
    },
  ]),

  // ── Korean Quizzes ────────────────────────────────────────────────────────

  makeQuiz("ko-q1", "ko-l1", "Smartstream GDI and Turbo Quiz", [
    {
      id: "ko-q1-1",
      // Tests injector positioning benefit
      question:
        "What advantage does a centrally mounted GDI injector provide over a side-mounted design?",
      options: [
        "It allows fuel to bypass the catalytic converter",
        "It improves spray targeting and reduces carbon buildup on intake valves",
        "It increases injector size for more fuel volume",
        "It eliminates the high-pressure pump requirement",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A central injector position directs spray symmetrically into the combustion chamber, reducing fuel impingement on cylinder walls and minimizing carbon deposits.",
    },
    {
      id: "ko-q1-2",
      // Tests twin-scroll turbo principle
      question: "A twin-scroll turbocharger reduces lag by:",
      options: [
        "Using two separate turbines on different exhaust manifolds",
        "Separating exhaust pulses from paired cylinders to maintain consistent turbine energy",
        "Adding a second compressor wheel to double airflow",
        "Reducing oil pressure to the turbo bearings",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Twin-scroll designs keep exhaust pulses from cylinders that fire close together separated, ensuring the turbine receives more consistent energy and responds faster.",
    },
    {
      id: "ko-q1-3",
      // Tests overall architecture benefit
      question:
        "In Hyundai-Kia's Smartstream 1.6T, central GDI plus twin-scroll turbo primarily delivers:",
      options: [
        "Maximum horsepower at the expense of efficiency",
        "Strong mid-range torque with improved thermal efficiency",
        "A fully mechanical (non-electronic) injection system",
        "Natural aspiration with variable displacement",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The combined design targets usable torque in the everyday driving RPM range alongside competitive fuel economy through better combustion efficiency.",
    },
  ]),

  makeQuiz("ko-q2", "ko-l2", "Theta II Engine and Oil Management Quiz", [
    {
      id: "ko-q2-1",
      // Tests root cause understanding
      question: "The Theta II GDI engine failures were primarily linked to:",
      options: [
        "Overuse of synthetic oil",
        "Metal debris contamination and oil supply starvation at connecting rod bearings",
        "Incorrect spark plug gap settings",
        "Excessive valve spring tension",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Metal machining debris in new engines and oil starvation under aggressive driving starved connecting rod bearings, leading to premature wear and seizure.",
    },
    {
      id: "ko-q2-2",
      // Tests knock sensor protection response
      question:
        "Hyundai and Kia's response to Theta II failures included adding:",
      options: [
        "A second oil filter in the return line",
        "Knock sensor-based engine protection to warn drivers before catastrophic failure",
        "A higher-capacity fuel pump",
        "An auxiliary coolant reservoir",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Knock sensor detection software was updated to identify the abnormal combustion signatures preceding bearing failure and alert the driver to stop driving.",
    },
    {
      id: "ko-q2-3",
      // Tests core engineering lesson
      question:
        "The primary engineering lesson from the Theta II case is that engine reliability depends on:",
      options: [
        "Maximizing compression ratio above all else",
        "Manufacturing cleanliness and oil delivery system design as much as component materials",
        "Using premium unleaded fuel exclusively",
        "Reducing engine displacement to lower stress",
      ],
      correctAnswerIndex: 1,
      explanation:
        "No matter how well-designed the combustion system, debris contamination or inadequate oil supply at bearings will cause failure — lubrication system integrity is fundamental.",
    },
  ]),

  makeQuiz("ko-q3", "ko-l3", "HTRAC AWD System Quiz", [
    {
      id: "ko-q3-1",
      // Tests normal operating behavior
      question: "In normal driving conditions, HTRAC primarily operates as:",
      options: [
        "A 50/50 locked AWD system",
        "A front-wheel-drive system for efficiency, with rear torque available on demand",
        "A rear-wheel-drive system with optional front engagement",
        "A permanent four-wheel-drive system with no variation",
      ],
      correctAnswerIndex: 1,
      explanation:
        "HTRAC stays front-biased under normal conditions to maximize fuel efficiency, only engaging rear torque when traction or dynamics require it.",
    },
    {
      id: "ko-q3-2",
      // Tests clutch pack mechanism
      question: "HTRAC transfers torque between axles using:",
      options: [
        "A viscous coupling fluid clutch",
        "A multi-plate wet clutch pack controlled by an electronic module",
        "A mechanical locking differential",
        "A hydraulic pump linked to steering input",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The electronically controlled multi-plate wet clutch pack allows precise, continuously variable torque transfer between front and rear axles.",
    },
    {
      id: "ko-q3-3",
      // Tests trigger conditions
      question: "HTRAC will shift torque rearward in response to:",
      options: [
        "Low ambient temperature only",
        "Front wheel slip, aggressive handling inputs, or driver-selected Sport mode",
        "Increasing cabin temperature",
        "Gear selection by the transmission",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The system monitors wheel slip signals, steering angle, yaw rate, and driver mode to decide when rear torque improves dynamics or recovers traction.",
    },
  ]),

  makeQuiz("ko-q4", "ko-l4", "Hyundai N Performance Quiz", [
    {
      id: "ko-q4-1",
      // Tests N suspension philosophy
      question:
        "Hyundai N models use a multi-link rear suspension tuned specifically for:",
      options: [
        "Maximum cargo capacity",
        "Corner entry stability and controlled rotation on corner exit",
        "Lowest possible ride height only",
        "Isolation of road noise above all else",
      ],
      correctAnswerIndex: 1,
      explanation:
        "N-tuned multi-link geometry is optimized for predictable corner entry and controlled rear rotation — handling traits valued in track-capable sport compact cars.",
    },
    {
      id: "ko-q4-2",
      // Tests e-LSD function
      question: "The electronic LSD on N models primarily helps by:",
      options: [
        "Locking the rear axle fully on corner entry",
        "Reducing understeer and allowing more controlled rotation on corner exit",
        "Increasing engine braking on downshifts",
        "Balancing front-to-rear brake bias",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The e-LSD sends torque to the outside rear wheel during cornering, reducing the natural tendency for the car to push wide (understeer) and allowing rotation through the corner.",
    },
    {
      id: "ko-q4-3",
      // Tests N philosophy conclusion
      question:
        "The key takeaway of Hyundai N's engineering approach is that performance handling is primarily determined by:",
      options: [
        "Engine displacement and peak horsepower",
        "Precise geometry tuning and software calibration, not hardware cost",
        "Vehicle weight alone",
        "The number of driven wheels",
      ],
      correctAnswerIndex: 1,
      explanation:
        "N models achieve competitive lap times using precise alignment geometry, spring rates, and electronic software on relatively affordable components — engineering insight over expensive hardware.",
    },
  ]),

  // ── EV & Hybrid Quizzes ───────────────────────────────────────────────────

  makeQuiz("ev-q1", "ev-l1", "Battery Cell Chemistry Quiz", [
    {
      id: "ev-q1-1",
      // Tests chemistry tradeoff knowledge
      question:
        "Compared to NMC cells, LFP (lithium iron phosphate) cells primarily offer:",
      options: [
        "Higher energy density for more range",
        "Better thermal stability and longer cycle life at the cost of some energy density",
        "Faster charge rates in all conditions",
        "Lower manufacturing cost with no other tradeoffs",
      ],
      correctAnswerIndex: 1,
      explanation:
        "LFP chemistry is thermally more stable and tolerates more charge cycles before degradation, making it suited for high-mileage use — but it offers lower energy density than NMC.",
    },
    {
      id: "ev-q1-2",
      // Tests pack architecture awareness
      question: "Battery pack design must balance which competing factors?",
      options: [
        "Color selection and interior trim level",
        "Energy density, thermal behavior, cycle life, and structural integration",
        "Gear ratio and final drive ratio",
        "Only energy density and cost",
      ],
      correctAnswerIndex: 1,
      explanation:
        "All four factors interact: maximizing energy density may compromise thermal stability; improving longevity may reduce density — pack design is always a multi-variable tradeoff.",
    },
    {
      id: "ev-q1-3",
      // Tests cell format awareness
      question:
        "The physical format of a battery cell (cylindrical, prismatic, or pouch) primarily affects:",
      options: [
        "The type of lithium chemistry that can be used",
        "Packaging efficiency, thermal management complexity, and crash structure integration",
        "Only the cell's nominal voltage",
        "Whether the BMS is required",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Cell format shapes how modules are assembled, how cooling channels are routed, and how the pack integrates with the vehicle's structural crash zones.",
    },
  ]),

  makeQuiz("ev-q2", "ev-l2", "BMS Operation Quiz", [
    {
      id: "ev-q2-1",
      // Tests BMS primary monitoring role
      question: "The BMS monitors individual cell parameters to prevent:",
      options: [
        "Excessive wiper speed",
        "Overcharge, over-discharge, and thermal runaway",
        "Road noise entering the cabin",
        "Tire pressure loss",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Overcharge causes lithium plating and fire risk; over-discharge damages cell chemistry; thermal runaway can cause catastrophic pack failure — BMS prevents all three.",
    },
    {
      id: "ev-q2-2",
      // Tests balancing method distinction
      question:
        "Passive cell balancing differs from active cell balancing in that passive balancing:",
      options: [
        "Transfers excess charge from high-SOC cells to low-SOC cells",
        "Burns off excess energy as heat to equalize cell states",
        "Uses no electrical components",
        "Charges all cells simultaneously at maximum rate",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Passive balancing dissipates excess charge from high-SOC cells as heat via resistors — simple but wasteful. Active balancing moves that energy to lower-SOC cells instead.",
    },
    {
      id: "ev-q2-3",
      // Tests BMS charging interaction
      question:
        "When the BMS restricts fast charging rate at a DC fast charger, it is primarily protecting against:",
      options: [
        "Charger hardware damage",
        "Heat-induced cell degradation from excessive current at the pack's thermal limit",
        "Driver inconvenience",
        "Navigation system interference",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Fast charging generates heat inside cells. The BMS's thermal model limits current when cell temperature would rise to levels that accelerate degradation.",
    },
  ]),

  makeQuiz("ev-q3", "ev-l3", "Motor Types and Inverter Control Quiz", [
    {
      id: "ev-q3-1",
      // Tests PMSM vs induction motor tradeoff
      question:
        "A key reason most EVs prefer permanent magnet synchronous motors (PMSM) over induction motors is:",
      options: [
        "PMSM motors require no power electronics to operate",
        "PMSM motors offer higher efficiency and power density",
        "PMSM motors do not generate heat during operation",
        "PMSM motors cost less than induction motors",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Permanent magnet designs are more efficient (less rotor losses) and more power-dense for a given motor size — important in vehicles where range and weight matter.",
    },
    {
      id: "ev-q3-2",
      // Tests inverter function
      question: "The inverter in an EV drivetrain converts:",
      options: [
        "AC from the motor back to DC for the battery",
        "DC battery voltage to variable-frequency AC to control motor speed and torque",
        "Mechanical energy to hydraulic pressure",
        "High voltage to 12V for accessories only",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The inverter's core job is DC-to-AC conversion with variable frequency — changing the frequency changes motor speed, and controlling current magnitude changes torque.",
    },
    {
      id: "ev-q3-3",
      // Tests response advantage
      question:
        "Electric motors respond to throttle inputs faster than combustion engines primarily because:",
      options: [
        "Electric motors have more cylinders",
        "Current is controlled electronically — no fuel, spark, or combustion event delays",
        "Electric motors use lighter pistons",
        "Electric motors run on higher octane fuel",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Combustion requires a sequence of events (injection, ignition, expansion) with inherent delays. Electric current responds in microseconds, enabling nearly instant torque delivery.",
    },
  ]),

  makeQuiz(
    "ev-q4",
    "ev-l4",
    "Regenerative Braking and Thermal Management Quiz",
    [
      {
        id: "ev-q4-1",
        // Tests regen principle
        question:
          "During regenerative braking, the traction motor functions as:",
        options: [
          "A heat exchanger",
          "A generator that converts kinetic energy back to electrical energy",
          "A hydraulic pump",
          "A friction pad backup system",
        ],
        correctAnswerIndex: 1,
        explanation:
          "When the motor is spun by vehicle momentum during deceleration, it acts as a generator — the electrical energy produced is returned to the battery.",
      },
      {
        id: "ev-q4-2",
        // Tests thermal management temperature window
        question:
          "EV battery thermal management aims to keep cells within what general temperature range for optimal performance and longevity?",
        options: ["0–10°C", "20–40°C", "60–80°C", "Above 100°C"],
        correctAnswerIndex: 1,
        explanation:
          "Below 20°C, lithium-ion cells lose charge acceptance and range; above 40°C sustained, degradation accelerates. The 20–40°C window balances performance and longevity.",
      },
      {
        id: "ev-q4-3",
        // Tests cold weather pre-conditioning
        question:
          "Battery pre-conditioning in cold weather is important because it:",
        options: [
          "Warms the cabin faster",
          "Restores charge acceptance rate so the vehicle can accept regeneration and fast charging normally",
          "Increases engine idle speed",
          "Activates all-wheel drive",
        ],
        correctAnswerIndex: 1,
        explanation:
          "Cold lithium-ion cells have high internal resistance, which limits how fast they can accept current. Pre-heating restores charge acceptance before driving begins.",
      },
    ],
  ),

  // ── Diesel & Heavy-Duty Quizzes ───────────────────────────────────────────

  makeQuiz("dh-q1", "dh-l1", "Common-Rail Direct Injection Quiz", [
    {
      id: "dh-q1-1",
      // Tests rail pressure range knowledge
      question:
        "Modern common-rail diesel systems typically operate at fuel rail pressures of:",
      options: [
        "100–200 bar (comparable to port injection)",
        "1,600–2,500+ bar",
        "50–80 bar",
        "300–500 bar",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Common-rail systems require extreme pressure — 1,600 to over 2,500 bar — to atomize diesel fuel finely enough for efficient, clean combustion.",
    },
    {
      id: "dh-q1-2",
      // Tests pilot injection benefit
      question:
        "The purpose of a pilot injection event before the main injection is to:",
      options: [
        "Test injector electrical resistance",
        "Reduce combustion noise by initiating a small pre-ignition before the main charge arrives",
        "Prime the rail pressure sensor",
        "Flush carbon from the injector tip",
      ],
      correctAnswerIndex: 1,
      explanation:
        "A small pilot injection starts combustion gently before the large main injection, reducing the abrupt pressure rise ('diesel knock') that causes noise.",
    },
    {
      id: "dh-q1-3",
      // Tests multi-event injection benefit
      question:
        "The ability to fire multiple injection events per combustion cycle primarily enables:",
      options: [
        "Simplified injector design",
        "Simultaneous optimization of combustion noise, power, and emissions",
        "Elimination of the common rail",
        "Reduced fuel pump speed",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Each injection event serves a different purpose — noise reduction, power, or aftertreatment assistance — allowing the ECU to balance all three objectives simultaneously.",
    },
  ]),

  makeQuiz("dh-q2", "dh-l2", "VGT Turbocharger Quiz", [
    {
      id: "dh-q2-1",
      // Tests VGT mechanism
      question:
        "A variable geometry turbocharger (VGT) eliminates the need for a wastegate by:",
      options: [
        "Using a second compressor to bypass excess air",
        "Adjusting turbine vane angles to control exhaust energy flow to the turbine",
        "Running at a fixed shaft speed regardless of engine RPM",
        "Using a hydraulic coupling between turbine and compressor",
      ],
      correctAnswerIndex: 1,
      explanation:
        "VGT vanes change angle to control how much exhaust energy reaches the turbine — closing vanes accelerates the turbine at low RPM; opening vanes limits boost at high RPM.",
    },
    {
      id: "dh-q2-2",
      // Tests exhaust brake function
      question: "When a VGT acts as an exhaust brake, it slows the vehicle by:",
      options: [
        "Applying friction to the turbine shaft",
        "Closing vanes to restrict exhaust flow and create backpressure against the pistons",
        "Reversing the compressor airflow direction",
        "Injecting water into the exhaust",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Closing VGT vanes restricts exhaust exit — the engine must work against this backpressure on each exhaust stroke, slowing the vehicle without friction brakes.",
    },
    {
      id: "dh-q2-3",
      // Tests compound turbo benefit
      question:
        "A compound (series-sequential) turbocharger system uses two turbos in series primarily to:",
      options: [
        "Double the maximum boost pressure beyond safe limits",
        "Achieve both low-RPM response (small high-pressure turbo) and high-RPM airflow capacity (large low-pressure turbo)",
        "Eliminate VGT vane control",
        "Allow the engine to run without an intercooler",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The small turbo spools quickly for low-RPM response; the large turbo flows enough air for high-load operation — together they cover the full RPM and load range better than either alone.",
    },
  ]),

  makeQuiz("dh-q3", "dh-l3", "DEF/SCR Aftertreatment Quiz", [
    {
      id: "dh-q3-1",
      // Tests DEF chemistry
      question: "Diesel exhaust fluid (DEF) is a solution of:",
      options: [
        "Diesel fuel and water",
        "Urea and deionized water",
        "Ammonia and hydrochloric acid",
        "Ethanol and mineral oil",
      ],
      correctAnswerIndex: 1,
      explanation:
        "DEF is a 32.5% urea / 67.5% deionized water solution — when injected into hot exhaust, urea decomposes to ammonia, which is the active NOx reductant.",
    },
    {
      id: "dh-q3-2",
      // Tests SCR reaction
      question: "The SCR catalyst converts NOx into:",
      options: [
        "Carbon dioxide and hydrogen",
        "Nitrogen gas and water vapor",
        "Sulfur dioxide and oxygen",
        "Carbon monoxide and steam",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Ammonia from DEF reacts with NOx in the SCR catalyst to produce harmless nitrogen (N₂) and water vapor (H₂O).",
    },
    {
      id: "dh-q3-3",
      // Tests DPF regeneration process
      question: "A diesel particulate filter (DPF) regenerates by:",
      options: [
        "Chemically dissolving soot with DEF",
        "Burning accumulated soot off the filter at high exhaust temperatures",
        "Mechanically vibrating to shake soot loose",
        "Rinsing with engine coolant",
      ],
      correctAnswerIndex: 1,
      explanation:
        "During regeneration, exhaust temperature is raised (via late injection or external heating) to oxidize accumulated soot particles, clearing the filter.",
    },
  ]),

  makeQuiz("dh-q4", "dh-l4", "Air Brakes and AMT Quiz", [
    {
      id: "dh-q4-1",
      // Tests air brake fail-safe principle
      question:
        "A critical safety advantage of air brake systems is that they fail in which direction?",
      options: [
        "Fail open — brakes release when air pressure is lost",
        "Fail applied — spring-applied brakes engage when air pressure is lost",
        "Fail neutral — brakes hold current position",
        "Fail to reduced pressure — partial braking maintained",
      ],
      correctAnswerIndex: 1,
      explanation:
        "Spring-applied parking brakes engage automatically when air pressure drops — the system fails to the safe (stopped) state, preventing a runaway heavy vehicle.",
    },
    {
      id: "dh-q4-2",
      // Tests why air over hydraulic
      question:
        "Why is compressed air preferred over hydraulic fluid in heavy commercial vehicle braking?",
      options: [
        "Hydraulic fluid is flammable and cannot be used on trucks",
        "Air is continuously replenished by the compressor and lines can safely flex or disconnect",
        "Air brakes weigh less than hydraulic systems",
        "Hydraulic brakes overheat faster at low speeds",
      ],
      correctAnswerIndex: 1,
      explanation:
        "The compressor continuously replenishes air supply, flex hoses allow trailer attachment/detachment safely, and line disconnection does not cause complete brake failure.",
    },
    {
      id: "dh-q4-3",
      // Tests AMT benefit
      question:
        "Automated manual transmissions (AMT) in heavy trucks improve fuel economy by:",
      options: [
        "Adding more gears than a driver could manually operate",
        "Optimizing shift points based on load and grade rather than driver judgment",
        "Reducing engine displacement",
        "Allowing the engine to run at a fixed RPM only",
      ],
      correctAnswerIndex: 1,
      explanation:
        "AMT control units select optimal gear ratios based on vehicle load, grade, and target speed — consistently making better fuel economy decisions than a fatigued human driver.",
    },
  ]),
];

export const quizzesById = Object.fromEntries(
  quizzes.map((quiz) => [quiz.id, quiz]),
);
