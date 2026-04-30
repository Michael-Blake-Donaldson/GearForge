// Encyclopedia entries for GearForge's reference library.
// Expanded from 6 → 48 entries across 9 categories.
// Each entry has a stable id, human-readable name, category, description,
// functional summary, and 2–3 concise keyFacts.

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

export const encyclopediaEntries: EncyclopediaEntry[] = [
  // ── Engine Types (7) ───────────────────────────────────────────────────────
  {
    id: "enc-inline4",
    name: "Inline-4 Engine",
    category: "Engine Types",
    description:
      "A four-cylinder engine with all cylinders in a single row sharing one cylinder block.",
    function:
      "Provides compact transverse packaging and inherent balance for efficient front-wheel-drive and all-wheel-drive platforms.",
    keyFacts: [
      "Primary and secondary imbalance forces are naturally cancelled by balanced cylinder pairs.",
      "Dominant in compact and mid-size passenger cars worldwide.",
      "Commonly paired with variable valve timing to broaden power and efficiency range.",
    ],
  },
  {
    id: "enc-v6",
    name: "V6 Engine",
    category: "Engine Types",
    description:
      "A six-cylinder engine with two banks of three cylinders arranged in a V configuration.",
    function:
      "Balances performance, packaging, and smoothness for mid-size and performance vehicles.",
    keyFacts: [
      "60° and 90° bank angles require different balance shaft strategies.",
      "Often used as a base engine in trucks and mid-size SUVs.",
      "Provides more low-end torque than an inline-4 of similar displacement.",
    ],
  },
  {
    id: "enc-v8",
    name: "V8 Engine",
    category: "Engine Types",
    description:
      "An eight-cylinder engine with two banks of four cylinders arranged in a 90° V.",
    function:
      "Delivers high torque output for performance, towing, and truck applications.",
    keyFacts: [
      "Naturally balanced firing order produces smooth operation with no balance shafts needed.",
      "Common in American performance and truck platforms.",
      "Pushrod V8s offer low-height packaging benefits for muscle car hoods.",
    ],
  },
  {
    id: "enc-inline6",
    name: "Inline-6 Engine",
    category: "Engine Types",
    description:
      "A six-cylinder engine with all cylinders in a single straight row.",
    function:
      "Provides inherent primary and secondary balance for exceptional smoothness.",
    keyFacts: [
      "Perfect primary and secondary balance — no balance shafts required.",
      "Longer packaging makes it better suited to longitudinal (RWD/AWD) layouts.",
      "Favored in premium and heavy-duty truck applications for refinement and durability.",
    ],
  },
  {
    id: "enc-flat4",
    name: "Horizontally Opposed (Boxer) Engine",
    category: "Engine Types",
    description:
      "An engine with opposing piston pairs that travel horizontally outward from a central crankshaft.",
    function:
      "Achieves a very low center of gravity for improved handling and balanced weight distribution.",
    keyFacts: [
      "Pistons on opposite sides cancel reciprocating forces horizontally.",
      "Wider physical footprint than inline or V arrangements.",
      "Associated with Subaru and Porsche for handling advantages.",
    ],
  },
  {
    id: "enc-diesel-engine",
    name: "Diesel Engine",
    category: "Engine Types",
    description:
      "A compression-ignition engine that ignites fuel without a spark plug, relying on high compression heat.",
    function:
      "Provides exceptional torque density and fuel efficiency, especially under sustained load.",
    keyFacts: [
      "Compression ratios typically 16:1 to 23:1 versus 9:1–12:1 for gasoline engines.",
      "Higher thermal efficiency than gasoline engines due to lean combustion.",
      "Requires aftertreatment (DPF, SCR) to meet modern emissions standards.",
    ],
  },
  {
    id: "enc-rotary-engine",
    name: "Rotary (Wankel) Engine",
    category: "Engine Types",
    description:
      "An engine using a triangular rotor orbiting inside an eccentric housing to replace pistons and connecting rods.",
    function:
      "Achieves very high RPM capability and an exceptional power-to-weight ratio in a compact package.",
    keyFacts: [
      "Each rotor face acts as a separate combustion chamber.",
      "Higher fuel consumption than piston engines due to sealing challenges.",
      "Used in Mazda RX-7 and RX-8 sports cars; being revisited as a range-extender in EVs.",
    ],
  },

  // ── Transmission Types (6) ─────────────────────────────────────────────────
  {
    id: "enc-dct",
    name: "Dual-Clutch Transmission (DCT)",
    category: "Transmission Types",
    description:
      "A transmission using two separate clutches — one for odd gears, one for even — to preselect the next ratio.",
    function:
      "Enables extremely fast gear changes by engaging the next gear before the current one disengages.",
    keyFacts: [
      "Mechatronic hydraulic module controls clutch overlap timing.",
      "Can be tuned for comfort (soft overlap) or performance (sharp overlap).",
      "Wet DCTs (oil-cooled clutch packs) handle higher torque than dry designs.",
    ],
  },
  {
    id: "enc-cvt",
    name: "Continuously Variable Transmission (CVT)",
    category: "Transmission Types",
    description:
      "A transmission that adjusts drive ratio continuously using expanding/contracting pulleys and a steel belt or chain.",
    function:
      "Keeps the engine near its most efficient RPM point throughout acceleration.",
    keyFacts: [
      "No discrete gear steps — ratio varies along a continuous spectrum.",
      "Control software calibration determines perceived drivability.",
      "Commonly paired with naturally aspirated and small-turbocharged engines for efficiency.",
    ],
  },
  {
    id: "enc-automatic",
    name: "Torque Converter Automatic",
    category: "Transmission Types",
    description:
      "A traditional automatic transmission using a fluid torque converter for launch and multiple planetary gear sets for ratios.",
    function:
      "Provides smooth, automatic ratio selection with seamless creep behavior for everyday driving comfort.",
    keyFacts: [
      "Torque converter multiplies torque at low speeds, then locks up for efficiency.",
      "Modern units have 8–10 speeds for improved fuel economy.",
      "Lock-up clutch eliminates hydraulic slip losses at highway cruise.",
    ],
  },
  {
    id: "enc-manual",
    name: "Manual Transmission",
    category: "Transmission Types",
    description:
      "A gearbox where the driver selects ratios manually via a gear lever and controls clutch engagement through a pedal.",
    function:
      "Gives the driver direct control over power delivery and allows mechanical efficiency with no hydraulic torque losses.",
    keyFacts: [
      "Lower mechanical complexity and often lower weight versus automatics.",
      "Driver skill directly affects shift quality and clutch longevity.",
      "Declining in new vehicles but retained in enthusiast and commercial applications.",
    ],
  },
  {
    id: "enc-amt",
    name: "Automated Manual Transmission (AMT)",
    category: "Transmission Types",
    description:
      "A conventional synchronized gearbox with pneumatic or electrohydraulic actuators that select gears automatically.",
    function:
      "Delivers the fuel efficiency of a manual with automatic operation — dominant in commercial trucks.",
    keyFacts: [
      "No clutch pedal for the driver; the system manages clutch and gear actuation.",
      "Common in Class 6–8 heavy commercial trucks with 10–18 forward gears.",
      "Shift points are optimized for load and grade to improve fuel economy.",
    ],
  },
  {
    id: "enc-eaxle",
    name: "Electric Drive Axle (e-Axle)",
    category: "Transmission Types",
    description:
      "An integrated assembly combining an electric motor, single-speed reduction gearset, and differential into one unit.",
    function:
      "Provides EV propulsion in a compact, high-efficiency package without a multi-ratio transmission.",
    keyFacts: [
      "Single gear ratio works because electric motors produce full torque from zero RPM.",
      "Integration reduces drivetrain friction losses versus a separate motor-gearbox-differential.",
      "Used in dedicated EV platforms for both front and rear axles.",
    ],
  },

  // ── Systems (7) ──────────────────────────────────────────────────────────
  {
    id: "enc-differential",
    name: "Differential",
    category: "Systems",
    description:
      "A gear assembly that allows wheels on the same axle to rotate at different speeds.",
    function:
      "Prevents tire scrub during cornering by accommodating different inner and outer wheel arc lengths.",
    keyFacts: [
      "Open, limited-slip (LSD), and locking variants exist.",
      "LSD designs bias torque toward the wheel with more traction.",
      "Electronic LSDs use clutch packs or brake intervention for active torque distribution.",
    ],
  },
  {
    id: "enc-turbocharger",
    name: "Turbocharger",
    category: "Systems",
    description:
      "A forced-induction device that uses exhaust energy to spin a turbine, which drives a compressor to pressurize intake air.",
    function:
      "Increases intake air mass for greater torque potential from a given displacement.",
    keyFacts: [
      "Turbine and compressor are on the same shaft — no mechanical connection to the crankshaft.",
      "Wastegate or VGT vanes control maximum boost pressure.",
      "Intercooler downstream cools compressed air to increase density and reduce knock risk.",
    ],
  },
  {
    id: "enc-supercharger",
    name: "Supercharger",
    category: "Systems",
    description:
      "A positive-displacement or centrifugal compressor driven directly by the engine crankshaft to pressurize intake air.",
    function:
      "Delivers forced induction with immediate response because boost is directly coupled to engine RPM.",
    keyFacts: [
      "Roots and twin-screw designs produce boost from idle; centrifugal builds boost with RPM.",
      "Mechanical drive means the engine powers the compressor — a parasitic load on output.",
      "No exhaust lag, but efficiency is slightly lower than turbocharging at high load.",
    ],
  },
  {
    id: "enc-intercooler",
    name: "Intercooler",
    category: "Systems",
    description:
      "A heat exchanger positioned between the turbocharger/supercharger outlet and the engine intake.",
    function:
      "Cools compressed (hot) charge air to increase air density and reduce knock risk before combustion.",
    keyFacts: [
      "Lower charge temperature improves air density — more mass per volume for better power.",
      "Air-to-air and air-to-water designs exist depending on packaging constraints.",
      "Larger intercoolers reduce heat soak under sustained boost.",
    ],
  },
  {
    id: "enc-obd2",
    name: "OBD-II Diagnostic System",
    category: "Systems",
    description:
      "A standardized on-board diagnostic protocol required on US vehicles since 1996.",
    function:
      "Monitors emission-related systems and stores fault codes to enable efficient diagnosis.",
    keyFacts: [
      "16-pin DLC connector is standardized across all manufacturers.",
      "Readiness monitors must complete before an emissions test will pass.",
      "Generic PIDs (Parameter IDs) provide real-time engine data to any scan tool.",
    ],
  },
  {
    id: "enc-bms",
    name: "Battery Management System (BMS)",
    category: "Systems",
    description:
      "The electronic control system that monitors and manages every aspect of an EV or hybrid battery pack.",
    function:
      "Protects cells from overcharge, over-discharge, and thermal runaway while balancing state of charge.",
    keyFacts: [
      "Monitors individual cell voltage, temperature, and internal resistance.",
      "Passive balancing burns excess cell energy as heat; active balancing transfers it.",
      "Communicates with charger and powertrain ECU to enforce safe operating limits.",
    ],
  },
  {
    id: "enc-adas",
    name: "Advanced Driver Assistance Systems (ADAS)",
    category: "Systems",
    description:
      "A collection of sensor-based systems that assist drivers and mitigate collision risk.",
    function:
      "Reduces crash frequency and severity through automated alerts and intervention.",
    keyFacts: [
      "Common systems: AEB, lane keep assist, adaptive cruise, blind-spot monitoring.",
      "Effectiveness depends on sensor fusion quality (radar + camera + lidar).",
      "Require regular calibration, especially after windshield or bumper repairs.",
    ],
  },

  // ── Car Parts (6) ────────────────────────────────────────────────────────
  {
    id: "enc-catalytic-converter",
    name: "Catalytic Converter",
    category: "Car Parts",
    description:
      "An exhaust component containing precious metal catalysts that convert harmful combustion byproducts into less harmful gases.",
    function:
      "Oxidizes CO and HC, and reduces NOx before exhaust exits the tailpipe.",
    keyFacts: [
      "Three-way catalysts handle CO, HC, and NOx simultaneously only near stoichiometric AFR.",
      "Requires operating temperature above ~400°C for full efficiency.",
      "Platinum, palladium, and rhodium are the primary catalyst metals.",
    ],
  },
  {
    id: "enc-oxygen-sensor",
    name: "Oxygen Sensor (Lambda Sensor)",
    category: "Car Parts",
    description:
      "An electrochemical sensor in the exhaust that measures residual oxygen content to indicate combustion air/fuel ratio.",
    function:
      "Provides closed-loop feedback to the ECU to maintain stoichiometric combustion for efficiency and catalytic converter effectiveness.",
    keyFacts: [
      "Wideband (UEGO) sensors measure AFR across a wide range; narrowband switch near stoichiometry.",
      "Downstream sensors monitor catalyst efficiency, not mixture control.",
      "Response time degrades with sensor aging — slow sensors cause poor fuel trims.",
    ],
  },
  {
    id: "enc-throttle-body",
    name: "Throttle Body",
    category: "Car Parts",
    description:
      "A valve assembly in the intake tract that regulates the volume of air entering the engine.",
    function:
      "Controls engine power output by varying airflow in response to driver accelerator input.",
    keyFacts: [
      "Modern electronic throttle bodies (drive-by-wire) replace mechanical cable linkage.",
      "Carbon buildup on the throttle plate can cause idle instability and hesitation.",
      "Idle air is controlled by the ECU through the throttle plate position, not a separate IAC in most modern engines.",
    ],
  },
  {
    id: "enc-fuel-injector",
    name: "Fuel Injector",
    category: "Car Parts",
    description:
      "An electronically controlled valve that sprays precisely metered fuel into the intake port or combustion chamber.",
    function:
      "Delivers accurate fuel quantities at the correct timing and atomization for efficient combustion.",
    keyFacts: [
      "Port injectors spray into the intake manifold; direct injectors spray into the cylinder.",
      "Injector flow rate (cc/min) must match engine demand — undersized injectors limit power.",
      "Dirty or worn injector tips degrade spray pattern and combustion quality.",
    ],
  },
  {
    id: "enc-timing-chain",
    name: "Timing Chain / Belt",
    category: "Car Parts",
    description:
      "A mechanical link that synchronizes crankshaft and camshaft rotation to maintain correct valve timing.",
    function:
      "Ensures valves open and close at precisely the right points relative to piston position.",
    keyFacts: [
      "Timing belts are lighter and quieter but require replacement at intervals (typically 60–100k miles).",
      "Timing chains are metal and typically last the life of the engine with proper oil maintenance.",
      "Failure of either causes valve-to-piston contact in interference engines, resulting in catastrophic damage.",
    ],
  },
  {
    id: "enc-crankshaft",
    name: "Crankshaft",
    category: "Car Parts",
    description:
      "The main rotating shaft that converts the linear motion of pistons into rotational torque.",
    function:
      "Transmits combustion force into usable rotational output for the drivetrain.",
    keyFacts: [
      "Counterweights opposite each crank pin reduce vibration from reciprocating mass.",
      "Main bearing journals ride on film of pressurized engine oil — oil starvation causes rapid wear.",
      "Stroke length is defined by crank pin offset from center — longer stroke increases displacement and torque.",
    ],
  },

  // ── Suspension (6) ──────────────────────────────────────────────────────
  {
    id: "enc-macpherson",
    name: "MacPherson Strut Suspension",
    category: "Suspension",
    description:
      "A front suspension design combining the damper, spring, and upper mount into a single strut unit.",
    function:
      "Provides a compact, lightweight front suspension geometry suitable for FWD platforms.",
    keyFacts: [
      "Strut acts as both damper and upper kingpin locator.",
      "Fewer components than double-wishbone but less camber control during cornering.",
      "Dominant front suspension on compact and mid-size FWD vehicles worldwide.",
    ],
  },
  {
    id: "enc-double-wishbone",
    name: "Double-Wishbone Suspension",
    category: "Suspension",
    description:
      "A suspension design using two A-shaped control arms (wishbones) to independently locate the wheel hub.",
    function:
      "Allows precise camber, caster, and toe control throughout the suspension travel for superior handling geometry.",
    keyFacts: [
      "More packaging space and complexity than MacPherson, but better geometry control.",
      "Negative camber gain under compression improves cornering grip.",
      "Common on performance, luxury, and higher-end platforms.",
    ],
  },
  {
    id: "enc-multilink",
    name: "Multi-Link Suspension",
    category: "Suspension",
    description:
      "A rear suspension design using three or more links to independently control wheel position in multiple axes.",
    function:
      "Provides independently adjustable camber, toe, and caster for precise dynamic behavior.",
    keyFacts: [
      "Higher component count than trailing arm but offers exceptional tuning flexibility.",
      "Common rear suspension on performance sedans, sports cars, and crossovers.",
      "Alignment parameters can be fine-tuned to balance stability and agility.",
    ],
  },
  {
    id: "enc-torsion-beam",
    name: "Torsion Beam (Twist Beam) Suspension",
    category: "Suspension",
    description:
      "A semi-independent rear suspension where two trailing arms are joined by a cross-beam that flexes under load.",
    function:
      "Provides simple, lightweight rear suspension with predictable behavior for compact vehicles.",
    keyFacts: [
      "Less independent than multi-link — beam twist couples left and right wheel motion.",
      "Cost and weight advantages make it common on economy cars.",
      "Well-tuned torsion beams can achieve competitive ride and handling on light vehicles.",
    ],
  },
  {
    id: "enc-air-suspension",
    name: "Air Suspension",
    category: "Suspension",
    description:
      "A suspension system that uses air-filled bellows (airbags) instead of coil or leaf springs.",
    function:
      "Allows electronically controlled ride height adjustment and continuously variable spring rate.",
    keyFacts: [
      "Height can be raised for off-road clearance or lowered for aerodynamics.",
      "Compressor and reservoir maintain system pressure; valve blocks route air to each corner.",
      "Used in luxury sedans, SUVs, and commercial vehicles for ride quality and load leveling.",
    ],
  },
  {
    id: "enc-stabilizer-bar",
    name: "Stabilizer Bar (Anti-Roll Bar)",
    category: "Suspension",
    description:
      "A torsional spring connecting left and right suspension corners to resist body roll.",
    function:
      "Reduces lateral body roll during cornering by transferring load between inner and outer wheels.",
    keyFacts: [
      "Stiffer bar reduces roll but can reduce independent wheel compliance on bumps.",
      "Active anti-roll bar systems (found in some luxury vehicles) vary stiffness electronically.",
      "Front and rear bar sizes are tuned to influence understeer/oversteer balance.",
    ],
  },

  // ── Brakes (5) ──────────────────────────────────────────────────────────
  {
    id: "enc-disc-brake",
    name: "Disc Brake",
    category: "Brakes",
    description:
      "A braking system that clamps friction pads against a rotating iron or carbon disc attached to the wheel hub.",
    function:
      "Converts vehicle kinetic energy into heat through friction to decelerate or stop the vehicle.",
    keyFacts: [
      "Superior heat dissipation versus drum brakes — less fade under repeated use.",
      "Vented rotors have internal cooling fins to increase airflow and heat rejection.",
      "Brake pad material (organic, semi-metallic, ceramic) affects noise, dust, and fade characteristics.",
    ],
  },
  {
    id: "enc-abs",
    name: "Anti-Lock Braking System (ABS)",
    category: "Brakes",
    description:
      "An electronic system that modulates brake pressure at individual wheels to prevent tire lock-up during braking.",
    function:
      "Maintains tire rolling contact during hard braking so the driver retains steering control.",
    keyFacts: [
      "Wheel speed sensors detect deceleration spikes indicating impending lock-up.",
      "Hydraulic control unit (HCU) rapidly releases and re-applies brake pressure.",
      "Modern ABS is the foundation for traction control (TCS) and electronic stability control (ESC).",
    ],
  },
  {
    id: "enc-brake-caliper",
    name: "Brake Caliper",
    category: "Brakes",
    description:
      "The hydraulic actuator that houses the brake pads and pistons, clamping them against the rotor.",
    function:
      "Converts brake fluid hydraulic pressure into mechanical clamping force on the rotor.",
    keyFacts: [
      "Floating (sliding) calipers use one or two pistons; fixed calipers have pistons on both sides.",
      "More pistons spread clamping force more evenly — beneficial on larger rotors.",
      "Caliper bleeder valves must be bled when air enters the hydraulic circuit.",
    ],
  },
  {
    id: "enc-brake-fluid",
    name: "Brake Fluid",
    category: "Brakes",
    description:
      "A hygroscopic hydraulic fluid that transmits pedal force through the brake lines to calipers and wheel cylinders.",
    function:
      "Provides incompressible force transmission from the brake master cylinder to the friction elements.",
    keyFacts: [
      "DOT ratings define dry and wet boiling points — higher DOT numbers = higher boiling point.",
      "Brake fluid absorbs moisture over time, lowering its boiling point — this causes vapor lock risk.",
      "Flush intervals vary by manufacturer but typically 2 years or when water content exceeds 3%.",
    ],
  },
  {
    id: "enc-brake-bias",
    name: "Brake Bias",
    category: "Brakes",
    description:
      "The ratio of braking force applied to the front versus rear axles.",
    function:
      "Balances deceleration forces to prevent premature rear wheel lock-up and maintain directional stability.",
    keyFacts: [
      "Front-biased (typically 60–70% front) matches the weight transfer forward during braking.",
      "Proportioning valves or electronic brake force distribution (EBD) apply the bias automatically.",
      "Incorrect rear bias causes rear wheel lock and tail-out instability under hard braking.",
    ],
  },

  // ── Electrical (6) ──────────────────────────────────────────────────────
  {
    id: "enc-ecu",
    name: "Engine Control Unit (ECU)",
    category: "Electrical",
    description:
      "The primary engine management computer that processes sensor data and controls fuel, ignition, and emission systems.",
    function:
      "Calculates optimal fuel delivery, ignition timing, and boost targets in real time for every combustion event.",
    keyFacts: [
      "Processes hundreds of sensor inputs per second to deliver accurate control.",
      "Closed-loop control using oxygen sensors adjusts fuel trim for efficiency and emissions.",
      "Knock sensors allow ECU to retard ignition timing before damage occurs.",
    ],
  },
  {
    id: "enc-can-bus",
    name: "CAN Bus",
    category: "Electrical",
    description:
      "Controller Area Network — a vehicle communication protocol that allows multiple ECUs to share data over a single serial bus.",
    function:
      "Enables real-time data sharing between engine, transmission, ABS, body, and safety modules without dedicated point-to-point wiring.",
    keyFacts: [
      "Two-wire differential signaling provides noise immunity in the harsh vehicle electrical environment.",
      "Message priority is determined by arbitration — lower-numbered IDs win bus access.",
      "High-speed CAN (500 kbps) serves powertrain; low-speed CAN handles body electronics.",
    ],
  },
  {
    id: "enc-alternator",
    name: "Alternator",
    category: "Electrical",
    description:
      "An engine-driven AC generator that charges the 12V battery and powers vehicle electrical loads.",
    function:
      "Converts crankshaft rotation into electrical energy to sustain battery state of charge while the engine runs.",
    keyFacts: [
      "A voltage regulator maintains output between 13.5–14.5V regardless of engine RPM.",
      "Load-response control in modern vehicles reduces alternator load during acceleration.",
      "A failed alternator will drain the battery within minutes to hours depending on electrical load.",
    ],
  },
  {
    id: "enc-inverter",
    name: "Power Inverter (EV)",
    category: "Electrical",
    description:
      "A high-voltage power electronics module that converts DC battery power to variable-frequency AC for the traction motor.",
    function:
      "Controls motor speed and torque by varying the frequency and amplitude of three-phase AC output.",
    keyFacts: [
      "Uses IGBTs or SiC MOSFETs for switching — SiC allows higher switching frequency and lower loss.",
      "Field-oriented control (FOC) algorithms enable fast, precise torque response.",
      "Generates significant heat — requires dedicated liquid cooling circuit.",
    ],
  },
  {
    id: "enc-hv-battery",
    name: "High-Voltage Battery Pack",
    category: "Electrical",
    description:
      "The primary energy storage system in EVs and plug-in hybrids, consisting of lithium-ion cells in modules.",
    function:
      "Stores electrical energy for propulsion and provides sustained high current output to the drive system.",
    keyFacts: [
      "Typical pack voltages range from 400V (most EVs) to 800V (Porsche Taycan, Hyundai IONIQ 5/6).",
      "800V architecture enables faster charging rates with less current (less heat).",
      "BMS continuously monitors every cell in the pack for protection and balancing.",
    ],
  },
  {
    id: "enc-starter-motor",
    name: "Starter Motor",
    category: "Electrical",
    description:
      "A high-torque DC motor that cranks the engine to initiate combustion.",
    function:
      "Provides the initial rotation needed for compression and first combustion events at engine start.",
    keyFacts: [
      "Draws 100–200A from the 12V battery during cranking.",
      "Solenoid engages the starter pinion with the ring gear before the motor spins.",
      "Stop-start systems require enhanced starters rated for frequent engagement cycles.",
    ],
  },

  // ── Tools (4) ────────────────────────────────────────────────────────────
  {
    id: "enc-multimeter",
    name: "Digital Multimeter (DMM)",
    category: "Tools",
    description:
      "A handheld electrical test instrument capable of measuring DC/AC voltage, resistance, current, and continuity.",
    function:
      "Enables circuit validation, sensor testing, and fault isolation across all vehicle electrical systems.",
    keyFacts: [
      "Input protection (CAT II, III) rating defines the safe measurement environment.",
      "True-RMS models accurately measure non-sinusoidal waveforms found in automotive electronics.",
      "High impedance input (10 MΩ) prevents the meter from loading and distorting sensitive circuits.",
    ],
  },
  {
    id: "enc-scan-tool",
    name: "OBD-II Scan Tool",
    category: "Tools",
    description:
      "A diagnostic interface that communicates with vehicle ECUs via the standardized OBD-II DLC port.",
    function:
      "Reads and clears fault codes, displays live sensor data, and monitors readiness test status.",
    keyFacts: [
      "Generic scan tools access standardized OBD-II PIDs; enhanced tools access manufacturer-specific data.",
      "Bidirectional control tools can command actuators and run component tests actively.",
      "Required for emissions testing and effective fault diagnosis on all modern vehicles.",
    ],
  },
  {
    id: "enc-torque-wrench",
    name: "Torque Wrench",
    category: "Tools",
    description:
      "A fastening tool that applies a precise, measured amount of rotational force to a fastener.",
    function:
      "Ensures critical fasteners are tightened to manufacturer specifications for safety and clamping integrity.",
    keyFacts: [
      "Click-type wrenches provide tactile feedback when target torque is reached.",
      "Torque specs must be followed for cylinder head bolts, wheel lugs, and suspension fasteners.",
      "Store click wrenches at minimum setting to preserve spring calibration.",
    ],
  },
  {
    id: "enc-pressure-gauge",
    name: "Compression / Pressure Gauge",
    category: "Tools",
    description:
      "A gauge instrument for measuring cylinder compression, fuel pressure, oil pressure, or tire pressure.",
    function:
      "Provides quantitative pressure readings to verify component condition or operating within specification.",
    keyFacts: [
      "Compression testing identifies worn rings, valve sealing, or head gasket failure.",
      "Fuel pressure testing confirms pump output and regulator function.",
      "Calibrated gauges should be checked against a reference periodically for accuracy.",
    ],
  },

  // ── Fluids (4) ──────────────────────────────────────────────────────────
  {
    id: "enc-coolant",
    name: "Engine Coolant",
    category: "Fluids",
    description:
      "A heat-transfer fluid, typically a 50/50 blend of ethylene glycol and deionized water, circulated through the engine and radiator.",
    function:
      "Removes combustion heat and protects the cooling system from freeze, boiling, corrosion, and scale.",
    keyFacts: [
      "50/50 mix provides freeze protection to approximately −37°C and boil protection to approximately 106°C.",
      "OAT, HOAT, and IAT chemistries use different corrosion inhibitors — mixing types can cause inhibitor reaction.",
      "Coolant degrades over time — regular flushing prevents acidic coolant from corroding aluminum components.",
    ],
  },
  {
    id: "enc-engine-oil",
    name: "Engine Oil",
    category: "Fluids",
    description:
      "A lubricating fluid that forms a protective film between metal engine surfaces to minimize wear and remove heat.",
    function:
      "Lubricates bearings and moving components, cleans deposits, cools pistons, and protects against corrosion.",
    keyFacts: [
      "Viscosity grade (e.g., 5W-30) defines cold-start flow and operating film thickness.",
      "API and ACEA specifications define additive package requirements for different engine types.",
      "Extended drain intervals require full synthetic oil with adequate additive reserve life.",
    ],
  },
  {
    id: "enc-transmission-fluid",
    name: "Transmission Fluid (ATF/MTF)",
    category: "Fluids",
    description:
      "A specialized lubricant for automatic or manual transmissions that provides lubrication, hydraulic actuation, and clutch friction control.",
    function:
      "Lubricates gears and bearings, actuates hydraulic shift circuits, and controls clutch pack engagement friction.",
    keyFacts: [
      "ATF specs (e.g., Dexron, Mercon, ZF LifeGuard) are not interchangeable between manufacturers.",
      "Using incorrect ATF can cause shift quality problems and clutch wear.",
      "DCT fluids are formulated specifically for high-frequency clutch engagement — standard ATF is not suitable.",
    ],
  },
  {
    id: "enc-def",
    name: "Diesel Exhaust Fluid (DEF)",
    category: "Fluids",
    description:
      "A 32.5% urea in deionized water solution injected into diesel exhaust upstream of the SCR catalyst.",
    function:
      "Provides the ammonia precursor required for selective catalytic reduction of NOx into nitrogen and water.",
    keyFacts: [
      "Freezes at −11°C — vehicles have heated DEF tanks and lines for cold climate operation.",
      "Contaminant-free DEF is required — mineral water or other urea concentrations damage the SCR catalyst.",
      "DEF consumption is approximately 2–6% of diesel fuel volume depending on load and operating temperature.",
    ],
  },

  // ── Emissions (5) ──────────────────────────────────────────────────────
  {
    id: "enc-dpf",
    name: "Diesel Particulate Filter (DPF)",
    category: "Emissions",
    description:
      "A wall-flow filter in the diesel exhaust system that traps soot particles before they exit the tailpipe.",
    function:
      "Captures greater than 99% of soot particles to meet particulate matter emission standards.",
    keyFacts: [
      "Periodic regeneration burns off accumulated soot — passive (high exhaust temperature) or active (late injection).",
      "DPF clogging from excessive short-trip driving triggers active regeneration or, if neglected, expensive replacement.",
      "Ash from oil combustion is non-regenerable — DPF must be cleaned or replaced at high mileage.",
    ],
  },
  {
    id: "enc-scr",
    name: "Selective Catalytic Reduction (SCR)",
    category: "Emissions",
    description:
      "An aftertreatment system that uses ammonia (from DEF) to chemically reduce NOx in diesel exhaust.",
    function:
      "Converts nitrogen oxides (NOx) into harmless nitrogen gas and water vapor at the SCR catalyst.",
    keyFacts: [
      "Requires exhaust temperature above approximately 200°C for sufficient ammonia conversion.",
      "NOx sensors upstream and downstream of the catalyst monitor conversion efficiency.",
      "SCR systems allow diesel combustion to be optimized for power and economy independent of NOx emissions.",
    ],
  },
  {
    id: "enc-egr",
    name: "Exhaust Gas Recirculation (EGR)",
    category: "Emissions",
    description:
      "A system that routes a controlled amount of cooled exhaust gas back into the engine intake.",
    function:
      "Dilutes the intake charge with inert exhaust gas to lower peak combustion temperature and reduce NOx formation.",
    keyFacts: [
      "Lower combustion temperatures directly reduce thermal NOx production.",
      "Cooled EGR (passing exhaust through a heat exchanger before intake) is more effective than hot EGR.",
      "Excessive EGR causes combustion instability — dosing is carefully controlled by the ECU as a function of load and temperature.",
    ],
  },
  {
    id: "enc-evap",
    name: "EVAP System (Evaporative Emissions Control)",
    category: "Emissions",
    description:
      "A sealed system that captures fuel vapor from the tank and routes it to the engine intake for combustion rather than venting to atmosphere.",
    function:
      "Prevents volatile hydrocarbon emissions from the fuel tank from escaping into the atmosphere.",
    keyFacts: [
      "A charcoal canister adsorbs fuel vapor; a purge valve releases it into the intake under certain conditions.",
      "The OBD-II EVAP monitor checks for leaks as small as 0.020 inches in diameter.",
      "A loose fuel cap is one of the most common causes of EVAP leak codes and check engine lights.",
    ],
  },
  {
    id: "enc-three-way-catalyst",
    name: "Three-Way Catalyst (TWC)",
    category: "Emissions",
    description:
      "A catalytic converter that simultaneously oxidizes CO and HC and reduces NOx, requiring operation near stoichiometric AFR.",
    function:
      "Converts three pollutants (CO, HC, NOx) into CO₂, H₂O, and N₂ in a single catalyst bed.",
    keyFacts: [
      "Effective only within a narrow window (~±0.1 λ) around stoichiometry — closed-loop fuel control is essential.",
      "Warm-up catalysts (close-coupled) position the TWC near the exhaust manifold for fast light-off.",
      "Oxygen storage capacity (OSC) of the catalyst smooths transient AFR swings — diminishes as the catalyst ages.",
    ],
  },
];
