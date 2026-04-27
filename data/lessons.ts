import { Lesson } from "@/types/Lesson";

export const lessons: Lesson[] = [
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
];
