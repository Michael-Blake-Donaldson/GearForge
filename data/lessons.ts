import { Lesson } from "@/types/Lesson";

// All lesson content for GearForge. Each lesson belongs to a unit and region,
// has educational content, a real-world context note, a key takeaway, and maps
// to a quiz and an XP reward.
export const lessons: Lesson[] = [
  // ── American Unit 1: Powertrain Foundations ───────────────────────────────
  {
    id: "am-l1",
    unitId: "am-1",
    regionId: "american",
    title: "Pushrod vs Overhead Cam in V Engines",
    shortExplanation: "Compare valvetrain geometry and packaging tradeoffs.",
    content:
      "Pushrod engines place the camshaft in the block and use lifters, pushrods, and rocker arms to actuate valves. Overhead cam engines place one or more camshafts near the valves. Pushrod designs are compact in height and often support strong low-end torque packaging, while overhead cam designs support aggressive valve timing control and high-RPM breathing.",
    realWorldContext:
      "Many truck and muscle platforms favor pushrod V8 layouts for packaging and torque delivery, while performance and efficiency-focused platforms adopt OHC for precise valve control.",
    keyTakeaway:
      "Valvetrain layout is a packaging and control strategy decision, not just a power decision.",
    quizId: "am-q1",
    order: 1,
    xpReward: 30,
  },
  {
    id: "am-l2",
    unitId: "am-1",
    regionId: "american",
    title: "RWD and 4WD Torque Flow",
    shortExplanation:
      "Understand transfer cases, driveshafts, and axle behavior.",
    content:
      "RWD systems send engine torque through a transmission and driveshaft to the rear differential. 4WD adds a transfer case to split torque between front and rear axles. The exact split strategy depends on part-time or full-time architecture and traction logic.",
    realWorldContext:
      "On low-traction surfaces, proper torque distribution reduces wheel slip and improves controlled acceleration.",
    keyTakeaway:
      "4WD systems add controlled torque routing, not just extra driven wheels.",
    quizId: "am-q2",
    order: 2,
    xpReward: 30,
  },

  // ── American Unit 2: Chassis and Utility ──────────────────────────────────
  {
    id: "am-l3",
    unitId: "am-2",
    regionId: "american",
    title: "Truck Suspension Load Handling",
    shortExplanation:
      "How springs and dampers are tuned for payload and stability.",
    content:
      "Heavy-duty suspension setups balance ride comfort, payload support, and towing stability. Spring rate and damping curves are selected so the vehicle remains stable under changing load conditions.",
    realWorldContext:
      "A truck that tows regularly requires suspension tuning to control pitch and maintain tire contact under load transfer.",
    keyTakeaway:
      "Suspension tuning is a compromise between comfort, control, and payload capability.",
    quizId: "am-q3",
    order: 1,
    xpReward: 35,
  },
  {
    id: "am-l4",
    unitId: "am-2",
    regionId: "american",
    title: "Brake Bias and Stability in Larger Vehicles",
    shortExplanation:
      "Why brake force distribution matters in trucks and SUVs.",
    content:
      "Brake bias controls how much braking force is applied front-to-rear. Larger vehicles often require careful calibration to maintain stability during heavy deceleration and changing load states.",
    realWorldContext:
      "If rear braking force is excessive under low load, the rear axle can destabilize during hard stops.",
    keyTakeaway:
      "Correct brake bias helps preserve directional stability and stopping confidence.",
    quizId: "am-q4",
    order: 2,
    xpReward: 35,
  },

  // ── American Unit 3: Performance and Emissions (Advanced) ─────────────────
  {
    id: "am-l5",
    unitId: "am-3",
    regionId: "american",
    title: "Supercharger vs Turbocharger on American V8s",
    shortExplanation:
      "Roots, twin-screw, and centrifugal superchargers vs exhaust-driven boost.",
    content:
      "American performance engines commonly use positive-displacement superchargers (Roots or twin-screw) for instant low-RPM boost, or centrifugal superchargers for top-end power. Turbochargers use exhaust energy but introduce lag. Each approach creates a different power delivery character suited to street driving, drag racing, or road course use.",
    realWorldContext:
      "A Roots supercharger on a 6.2L V8 provides linear, predictable power delivery that works well with a heavy vehicle's weight.",
    keyTakeaway:
      "Supercharger type shapes the power delivery curve as much as peak output numbers do.",
    quizId: "am-q5",
    order: 1,
    xpReward: 40,
  },
  {
    id: "am-l6",
    unitId: "am-3",
    regionId: "american",
    title: "OBD-II Diagnostics and Emission Readiness",
    shortExplanation:
      "How on-board diagnostics monitor systems and report readiness.",
    content:
      "OBD-II is a standardized diagnostic protocol required on vehicles since 1996. The ECU runs readiness monitors — self-tests of systems like catalytic converter efficiency, oxygen sensor response, evap leak detection, and EGR function. A failed monitor sets a DTC and illuminates the check engine light.",
    realWorldContext:
      "Before emissions inspection, all OBD-II monitors must complete. A recently reset ECU won't have completed monitors, causing an immediate inspection failure.",
    keyTakeaway:
      "Readiness monitors must complete before a vehicle passes emissions inspection.",
    quizId: "am-q6",
    order: 2,
    xpReward: 40,
  },

  // ── Japanese Unit 1: Efficiency Architecture ──────────────────────────────
  {
    id: "jp-l1",
    unitId: "jp-1",
    regionId: "japanese",
    title: "Inline-4 Balance and Efficiency",
    shortExplanation:
      "Why inline-4 architectures are common in reliability-focused designs.",
    content:
      "Inline-4 engines are compact, lightweight, and efficient to package in transverse platforms. Their simpler architecture can reduce manufacturing complexity and support long-term reliability when cooling and lubrication are well designed.",
    realWorldContext:
      "Many commuter-focused platforms prioritize predictable maintenance costs and fuel efficiency, making inline-4 systems a practical choice.",
    keyTakeaway:
      "Inline-4 layouts align packaging efficiency with long-term serviceability.",
    quizId: "jp-q1",
    order: 1,
    xpReward: 30,
  },
  {
    id: "jp-l2",
    unitId: "jp-1",
    regionId: "japanese",
    title: "VTEC and Variable Valve Timing Basics",
    shortExplanation: "How variable timing/lift broadens performance bands.",
    content:
      "Variable valve timing and lift systems shift cam phasing and valve events based on RPM and load. This improves low-speed efficiency and high-speed airflow by adapting valve operation to operating conditions.",
    realWorldContext:
      "Drivers feel this as improved throttle response across a wider range rather than a narrow power peak.",
    keyTakeaway:
      "Variable valvetrain control helps one engine behave efficiently in multiple operating regimes.",
    quizId: "jp-q2",
    order: 2,
    xpReward: 30,
  },

  // ── Japanese Unit 2: Drivability Systems ─────────────────────────────────
  {
    id: "jp-l3",
    unitId: "jp-2",
    regionId: "japanese",
    title: "CVT Ratio Control",
    shortExplanation:
      "How continuously variable ratios maintain efficient operation.",
    content:
      "A CVT adjusts drive ratio continuously rather than stepping through fixed gears. Control logic keeps engine operation near efficient or requested power bands depending on driver input and terrain.",
    realWorldContext:
      "During steady cruising, a CVT may lower engine RPM to reduce fuel consumption while still delivering required wheel torque.",
    keyTakeaway:
      "CVTs prioritize smooth ratio adaptation over fixed gear transitions.",
    quizId: "jp-q3",
    order: 1,
    xpReward: 35,
  },
  {
    id: "jp-l4",
    unitId: "jp-2",
    regionId: "japanese",
    title: "Hybrid Power Split Fundamentals",
    shortExplanation: "Combining engine and electric torque for efficiency.",
    content:
      "Hybrid systems blend internal combustion and electric motor output using control algorithms and power electronics. The objective is to use each power source where it is most efficient for the requested operating condition.",
    realWorldContext:
      "In stop-and-go traffic, electric assist and regenerative braking can reduce fuel consumption significantly.",
    keyTakeaway:
      "Hybrid efficiency comes from coordinated control, not just added components.",
    quizId: "jp-q4",
    order: 2,
    xpReward: 35,
  },

  // ── Japanese Unit 3: AWD and Safety (Advanced) ────────────────────────────
  {
    id: "jp-l5",
    unitId: "jp-3",
    regionId: "japanese",
    title: "Symmetrical AWD and Torque Vectoring",
    shortExplanation:
      "How equal-length driveshafts and yaw control improve all-weather handling.",
    content:
      "Symmetrical AWD layouts use balanced driveshaft lengths to reduce torque steer and improve traction symmetry. Torque vectoring systems — mechanical (helical LSD) or electronic (brake-based or clutch-pack) — redirect torque between wheels during cornering to improve yaw response and stability.",
    realWorldContext:
      "On a snowy mountain pass, torque vectoring actively pushes more torque to the outside rear wheel to rotate the vehicle through the corner more naturally.",
    keyTakeaway:
      "Symmetrical drivetrains reduce unwanted torque steer; vectoring actively controls yaw for better cornering.",
    quizId: "jp-q5",
    order: 1,
    xpReward: 40,
  },
  {
    id: "jp-l6",
    unitId: "jp-3",
    regionId: "japanese",
    title: "Pre-Collision Systems and Sensor Fusion",
    shortExplanation:
      "How radar, camera, and lidar work together to detect hazards.",
    content:
      "Modern Japanese safety platforms combine radar (long-range, weather-tolerant) with forward cameras (lane marking detection, sign recognition) and sometimes lidar for precise distance measurement. Sensor fusion algorithms merge these inputs to produce a confident model of the road environment, enabling pre-collision braking, adaptive cruise, and lane-keep assist.",
    realWorldContext:
      "At highway speed, the system detects a slowing vehicle ahead and begins reducing throttle and pre-charging the brakes before the driver reacts.",
    keyTakeaway:
      "Safety system effectiveness depends on sensor diversity and fusion quality, not any single sensor.",
    quizId: "jp-q6",
    order: 2,
    xpReward: 40,
  },

  // ── European Unit 1: Forced Induction and Fueling ─────────────────────────
  {
    id: "eu-l1",
    unitId: "eu-1",
    regionId: "european",
    title: "Turbocharging Response and Boost Control",
    shortExplanation:
      "Boost, airflow, and transient response in performance systems.",
    content:
      "Turbochargers increase intake air mass using exhaust energy. Wastegate and boost-control strategies regulate pressure to meet torque targets while protecting components from overboost and high thermal stress.",
    realWorldContext:
      "A well-calibrated boost strategy improves mid-range torque without sacrificing drivability.",
    keyTakeaway:
      "Turbo performance is primarily a control and thermal management challenge.",
    quizId: "eu-q1",
    order: 1,
    xpReward: 35,
  },
  {
    id: "eu-l2",
    unitId: "eu-1",
    regionId: "european",
    title: "Direct Injection Spray and Combustion",
    shortExplanation:
      "Fuel delivery timing and atomization under high pressure.",
    content:
      "Direct injection introduces fuel directly into the combustion chamber. Injection timing, pressure, and spray pattern are tuned to improve combustion efficiency, power density, and emissions behavior.",
    realWorldContext:
      "High-pressure pump and injector quality directly influence combustion consistency and cold-start behavior.",
    keyTakeaway:
      "DI precision depends on high-pressure control and accurate injection events.",
    quizId: "eu-q2",
    order: 2,
    xpReward: 35,
  },

  // ── European Unit 2: Electronic Networks ─────────────────────────────────
  {
    id: "eu-l3",
    unitId: "eu-2",
    regionId: "european",
    title: "DSG/DCT Shift Strategy",
    shortExplanation: "Dual-clutch operation and preselection logic.",
    content:
      "Dual-clutch transmissions use two clutches to preselect the next gear, allowing fast gear changes. Mechatronic control coordinates clutch engagement and torque requests to smooth shifts and maintain acceleration.",
    realWorldContext:
      "Compared with traditional automatics, DCT systems can deliver sharper response under performance calibration.",
    keyTakeaway:
      "DCT performance comes from synchronized clutch and gear preselection control.",
    quizId: "eu-q3",
    order: 1,
    xpReward: 40,
  },
  {
    id: "eu-l4",
    unitId: "eu-2",
    regionId: "european",
    title: "CAN Bus Communication Basics",
    shortExplanation: "How modules share data on a common network.",
    content:
      "Controller Area Network (CAN) enables multiple modules to communicate over a shared bus. Prioritized message arbitration ensures critical signals can transmit reliably even when the network is busy.",
    realWorldContext:
      "Powertrain, ABS, and body modules exchange real-time status data to coordinate vehicle behavior.",
    keyTakeaway:
      "CAN architecture enables synchronized, distributed vehicle control.",
    quizId: "eu-q4",
    order: 2,
    xpReward: 40,
  },

  // ── European Unit 3: Chassis Dynamics (Advanced) ──────────────────────────
  {
    id: "eu-l5",
    unitId: "eu-3",
    regionId: "european",
    title: "Adaptive Damping and Electronically Controlled Suspension",
    shortExplanation:
      "How continuously variable dampers improve ride and handling simultaneously.",
    content:
      "Electronic damping systems vary the flow resistance of damper fluid in milliseconds based on inputs from accelerometers, steering angle sensors, and wheel speed sensors. The control unit selects between comfort, sport, and track profiles to continuously optimize damper stiffness for each wheel independently.",
    realWorldContext:
      "On a smooth highway, the system softens dampers for comfort. When the driver enters a hard corner, it stiffens all four dampers within one body-motion cycle to reduce roll and improve turn-in precision.",
    keyTakeaway:
      "Adaptive dampers are not a comfort-vs-performance compromise — they optimize both simultaneously by reacting faster than mechanical springs alone.",
    quizId: "eu-q5",
    order: 1,
    xpReward: 45,
  },
  {
    id: "eu-l6",
    unitId: "eu-3",
    regionId: "european",
    title: "Active Aerodynamics and Downforce Management",
    shortExplanation:
      "Movable spoilers, diffusers, and air curtains that change with speed and mode.",
    content:
      "High-performance European vehicles use active aerodynamic surfaces — adjustable rear wings, front splitter flaps, and underbody diffusers — that change angle based on speed, cornering force, or driver-selected mode. At high speed, increased downforce improves grip and high-speed stability at the cost of drag. At lower speeds, surfaces retract to reduce drag and fuel consumption.",
    realWorldContext:
      "A sport coupe entering a motorway on-ramp at 120 km/h automatically extends its rear diffuser and front splitter for added stability before the driver even processes the sensation.",
    keyTakeaway:
      "Active aero replaces fixed performance tradeoffs with dynamic adjustments matched to operating conditions.",
    quizId: "eu-q6",
    order: 2,
    xpReward: 45,
  },

  // ── Korean Unit 1: Compact Efficiency ────────────────────────────────────
  {
    id: "ko-l1",
    unitId: "ko-1",
    regionId: "korean",
    title: "Smartstream GDI and Turbo Architecture",
    shortExplanation:
      "Hyundai-Kia's Smartstream engine family and its direct injection design.",
    content:
      "The Smartstream engine family uses gasoline direct injection with a centrally mounted injector to improve spray targeting and reduce carbon buildup compared to wall-wetting designs. Combined with a twin-scroll turbocharger — which separates exhaust pulses from paired cylinders to reduce turbo lag — the system delivers strong mid-range torque with improved thermal efficiency.",
    realWorldContext:
      "In the Sonata and Tucson, the 1.6T Smartstream delivers class-competitive power with real-world fuel economy benefits from the efficient combustion chamber design.",
    keyTakeaway:
      "Central-injector GDI combined with twin-scroll turbo design balances low-end torque with efficiency across the RPM range.",
    quizId: "ko-q1",
    order: 1,
    xpReward: 35,
  },
  {
    id: "ko-l2",
    unitId: "ko-1",
    regionId: "korean",
    title: "Theta II Engine Lessons and Oil Management",
    shortExplanation:
      "What failures in the Theta II engine teach about oil supply and piston design.",
    content:
      "The Theta II GDI engine experienced documented failures linked to metal debris contamination from machining residue in new engines and oil supply starvation under aggressive driving. This led to connecting rod bearing wear and, in some cases, engine seizure. The failures drove Hyundai and Kia to introduce knock sensor-based engine protection that detects abnormal combustion and warns the driver before catastrophic failure.",
    realWorldContext:
      "Understanding the Theta II case teaches a core engineering principle: oil delivery system design and manufacturing cleanliness are as important as power output targets.",
    keyTakeaway:
      "Bearing failures are often a lubrication system design or cleanliness problem, not just a materials issue.",
    quizId: "ko-q2",
    order: 2,
    xpReward: 35,
  },

  // ── Korean Unit 2: Platform Dynamics ─────────────────────────────────────
  {
    id: "ko-l3",
    unitId: "ko-2",
    regionId: "korean",
    title: "HTRAC AWD System Operation",
    shortExplanation:
      "Hyundai-Kia's torque-vectoring AWD system and its control logic.",
    content:
      "HTRAC is an electronically controlled AWD system that actively distributes torque between front and rear axles using a multi-plate wet clutch pack. In normal driving it operates primarily as FWD for efficiency. Under detected wheel slip, emergency handling inputs, or driver-selected sport mode, it shifts torque rearward for better balance and traction.",
    realWorldContext:
      "During wet-road acceleration from a stop, HTRAC detects front wheel slip within milliseconds and transfers torque rearward before the driver notices any degraded traction.",
    keyTakeaway:
      "Electronically controlled AWD prioritizes efficiency in normal conditions by staying front-biased and only engaging rear torque when dynamics demand it.",
    quizId: "ko-q3",
    order: 1,
    xpReward: 40,
  },
  {
    id: "ko-l4",
    unitId: "ko-2",
    regionId: "korean",
    title: "N-Performance Engineering and Multi-Link Tuning",
    shortExplanation:
      "How Hyundai N division extracts performance from compact platforms.",
    content:
      "Hyundai N performance models use a tuned multi-link rear suspension with specific spring rates and alignment geometry optimized for corner entry stability and adjustable trailing arm angles. The electronic limited-slip differential (e-LSD) controls torque vectoring across the rear axle to reduce understeer and allow more rotation on corner exit.",
    realWorldContext:
      "The Elantra N and i30 N use relatively affordable components tuned with precision geometry and software to achieve lap times competitive with much more expensive sport cars.",
    keyTakeaway:
      "Suspension geometry and software tuning, not hardware cost, determine handling character.",
    quizId: "ko-q4",
    order: 2,
    xpReward: 40,
  },

  // ── EV & Hybrid Unit 1: High Voltage Fundamentals ─────────────────────────
  {
    id: "ev-l1",
    unitId: "ev-1",
    regionId: "ev-hybrid",
    title: "Battery Cell Chemistry and Pack Architecture",
    shortExplanation:
      "Lithium-ion cell types, energy density tradeoffs, and module-to-pack design.",
    content:
      "EV battery packs consist of lithium-ion cells arranged into modules, which are grouped into a pack with integrated thermal management and a Battery Management System (BMS). Cell chemistry choices — NMC, LFP, or NCA — each offer different tradeoffs between energy density, cycle life, thermal stability, and cost. NMC cells offer high energy density. LFP cells prioritize longevity and thermal stability. The physical cell format (cylindrical, prismatic, or pouch) affects packaging, thermal management complexity, and crash structure integration.",
    realWorldContext:
      "A vehicle using LFP chemistry sacrifices some range versus NMC but gains significantly more charge cycles before capacity degradation — a practical advantage for high-mileage fleet vehicles.",
    keyTakeaway:
      "Battery pack design is a multi-variable optimization: energy density, thermal behavior, cycle life, and structural integration all compete.",
    quizId: "ev-q1",
    order: 1,
    xpReward: 40,
  },
  {
    id: "ev-l2",
    unitId: "ev-1",
    regionId: "ev-hybrid",
    title: "Battery Management System (BMS) Operation",
    shortExplanation:
      "How the BMS monitors, balances, and protects the high-voltage pack.",
    content:
      "The BMS monitors individual cell voltages, temperatures, and state of charge to protect cells from overcharge, over-discharge, and thermal runaway. Cell balancing — passive (burning excess energy as heat) or active (transferring energy between cells) — equalizes cell states so the entire pack reaches the same charge level. The BMS also communicates with the vehicle's charging system and propulsion controller to enforce safe operating limits.",
    realWorldContext:
      "When a fast charger attempts to push more current than the pack's thermal model allows, the BMS restricts the charge rate automatically, protecting cells from heat-induced degradation.",
    keyTakeaway:
      "The BMS is the nervous system of the battery pack — without it, even a physically perfect pack would degrade rapidly.",
    quizId: "ev-q2",
    order: 2,
    xpReward: 40,
  },

  // ── EV & Hybrid Unit 2: Electric Propulsion ───────────────────────────────
  {
    id: "ev-l3",
    unitId: "ev-2",
    regionId: "ev-hybrid",
    title: "Motor Types and Inverter Control",
    shortExplanation:
      "PMSM vs induction motors, and how the inverter creates variable frequency AC.",
    content:
      "Most EVs use permanent magnet synchronous motors (PMSM) for their high efficiency and power density, while some use induction motors (AC asynchronous) for their simplicity and robustness without rare earth magnets. The inverter converts the pack's DC voltage to variable-frequency AC to control motor speed and torque. Field-oriented control (FOC) algorithms in the inverter decouple torque and flux control for fast, precise response.",
    realWorldContext:
      "When the driver presses the accelerator, the inverter responds within milliseconds — far faster than any combustion engine — because it is electrically controlling current rather than waiting for fuel, spark, and combustion events.",
    keyTakeaway:
      "Electric motor performance is primarily an inverter control problem, not a motor hardware problem.",
    quizId: "ev-q3",
    order: 1,
    xpReward: 45,
  },
  {
    id: "ev-l4",
    unitId: "ev-2",
    regionId: "ev-hybrid",
    title: "Regenerative Braking and Thermal Management",
    shortExplanation:
      "Converting kinetic energy back to electricity and keeping the pack in safe temperature range.",
    content:
      "Regenerative braking uses the traction motor as a generator when decelerating, converting kinetic energy back to electrical energy and returning it to the battery. The blended braking system coordinates regeneration with friction brakes seamlessly. Thermal management — usually a liquid-cooled plate system — keeps cells within their optimal temperature window (typically 20–40°C) for both performance and longevity. In cold weather, battery heaters pre-condition the pack before driving to restore charge acceptance rate.",
    realWorldContext:
      "On a mountain descent, maximum regeneration can recover enough energy to meaningfully extend range while the friction brakes remain cool and ready for the next emergency stop.",
    keyTakeaway:
      "Regenerative braking and thermal management together are what make EV range practical and consistent across conditions.",
    quizId: "ev-q4",
    order: 2,
    xpReward: 45,
  },

  // ── Diesel & Heavy-Duty Unit 1: Combustion Science ────────────────────────
  {
    id: "dh-l1",
    unitId: "dh-1",
    regionId: "diesel-heavy",
    title: "Common-Rail Direct Injection",
    shortExplanation:
      "High-pressure fuel delivery, rail pressure control, and multi-event injection.",
    content:
      "Common-rail diesel systems maintain a shared high-pressure fuel reservoir (rail) at pressures from 1,600 to over 2,500 bar. Piezoelectric or solenoid injectors fire multiple events per combustion cycle — a pilot injection to reduce noise, the main injection for power, and a post injection to assist DPF regeneration. Precise rail pressure control enables the ECU to optimize combustion timing for efficiency, noise, and emissions simultaneously.",
    realWorldContext:
      "A modern diesel truck on the highway uses up to 5 injection events per cycle — invisible to the driver but critical for meeting noise and emissions targets while maintaining fuel economy.",
    keyTakeaway:
      "Common-rail injection's high pressure and multi-event capability give modern diesels both performance and low emissions.",
    quizId: "dh-q1",
    order: 1,
    xpReward: 40,
  },
  {
    id: "dh-l2",
    unitId: "dh-1",
    regionId: "diesel-heavy",
    title: "Variable Geometry Turbochargers in Heavy Diesel",
    shortExplanation:
      "VGT vane control, compound turbocharging, and exhaust brake operation.",
    content:
      "Heavy-duty diesel engines commonly use variable geometry turbochargers (VGT) that adjust vane angles to match turbo response to engine load without a wastegate. Some applications use compound (series-sequential) turbos — a small high-pressure turbo and a large low-pressure turbo in series — to achieve both low-RPM response and high-RPM airflow. The VGT can also act as an exhaust brake by restricting exhaust flow to create backpressure that slows the vehicle on downhill grades without friction brakes.",
    realWorldContext:
      "A loaded semi-truck descending a steep grade uses VGT exhaust braking to manage speed without overheating the service brakes — a critical safety feature for very heavy vehicles.",
    keyTakeaway:
      "VGT enables one turbocharger to serve multiple roles: boost control, response, and engine braking.",
    quizId: "dh-q2",
    order: 2,
    xpReward: 40,
  },

  // ── Diesel & Heavy-Duty Unit 2: Emissions and Drivetrains ─────────────────
  {
    id: "dh-l3",
    unitId: "dh-2",
    regionId: "diesel-heavy",
    title: "DEF/SCR Aftertreatment Systems",
    shortExplanation:
      "How diesel exhaust fluid and selective catalytic reduction eliminate NOx.",
    content:
      "Selective catalytic reduction (SCR) injects diesel exhaust fluid (DEF — a urea-water solution) into the exhaust stream upstream of a catalyst. The urea thermally decomposes into ammonia, which reacts with NOx in the SCR catalyst to produce nitrogen and water. A dosing controller adjusts DEF injection rate based on exhaust temperature, engine load, and NOx sensor feedback. The diesel particulate filter (DPF) upstream traps soot and periodically regenerates by burning it off at high exhaust temperatures.",
    realWorldContext:
      "Modern heavy commercial trucks must meet Tier 4 Final (US) or Euro VI emission standards — achieving these without SCR and DPF would require unacceptable combustion compromises that sacrifice power and fuel economy.",
    keyTakeaway:
      "SCR and DPF allow combustion to be optimized for power and efficiency while meeting strict emissions requirements.",
    quizId: "dh-q3",
    order: 1,
    xpReward: 45,
  },
  {
    id: "dh-l4",
    unitId: "dh-2",
    regionId: "diesel-heavy",
    title: "Air Brake Systems and Automated Manual Transmissions",
    shortExplanation:
      "Why air brakes are used in heavy vehicles and how AMTs reduce driver fatigue.",
    content:
      "Air brake systems use compressed air rather than hydraulic fluid to actuate brake chambers at each wheel. Air brakes are preferred because air is available in unlimited supply, the system fails to the applied position (spring-applied parking brake), and air lines can flex and disconnect safely. Automated manual transmissions (AMT) in heavy trucks use pneumatic or electrohydraulic actuators to shift a conventional synchronized gearbox without a clutch pedal — the driver selects direction and range only. AMTs improve fuel economy by optimizing shift points and reduce driver fatigue on long routes.",
    realWorldContext:
      "A Class 8 truck with 18 forward gears would be physically exhausting to drive manually in heavy traffic — AMT automation allows the driver to focus on traffic and safety while the system selects optimal gear ratios.",
    keyTakeaway:
      "Air brakes and AMTs are safety and practicality solutions designed around the unique demands of very heavy vehicle operation.",
    quizId: "dh-q4",
    order: 2,
    xpReward: 45,
  },
];
