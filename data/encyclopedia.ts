export type EncyclopediaEntry = {
  id: string;
  name: string;
  category: 'Car Parts' | 'Systems' | 'Tools' | 'Fluids' | 'Engine Types' | 'Transmission Types';
  description: string;
  function: string;
  keyFacts: string[];
};

export const encyclopediaEntries: EncyclopediaEntry[] = [
  {
    id: 'enc-differential',
    name: 'Differential',
    category: 'Systems',
    description: 'A drivetrain assembly that permits wheels on the same axle to rotate at different speeds.',
    function: 'Prevents tire scrub during cornering while distributing torque to driven wheels.',
    keyFacts: ['Open, limited-slip, and locking designs exist.', 'Essential for smooth turning behavior.'],
  },
  {
    id: 'enc-turbocharger',
    name: 'Turbocharger',
    category: 'Systems',
    description: 'A forced-induction device using exhaust energy to compress intake air.',
    function: 'Increases intake air mass, enabling greater torque and power potential.',
    keyFacts: ['Controlled by wastegate/boost strategies.', 'Thermal management is critical for durability.'],
  },
  {
    id: 'enc-multimeter',
    name: 'Digital Multimeter',
    category: 'Tools',
    description: 'An electrical test instrument for voltage, resistance, and continuity checks.',
    function: 'Supports circuit validation and fault isolation in electronic systems.',
    keyFacts: ['Input protection rating matters.', 'Correct range selection improves measurement accuracy.'],
  },
  {
    id: 'enc-coolant',
    name: 'Engine Coolant',
    category: 'Fluids',
    description: 'A heat-transfer fluid circulating through engine and radiator passages.',
    function: 'Removes combustion heat and protects against corrosion/freezing.',
    keyFacts: ['Mixture ratio affects freeze/boil margins.', 'Different chemistries should not be mixed casually.'],
  },
  {
    id: 'enc-inline4',
    name: 'Inline-4 Engine',
    category: 'Engine Types',
    description: 'A four-cylinder engine with cylinders aligned in a single row.',
    function: 'Offers compact packaging and efficiency for many vehicle classes.',
    keyFacts: ['Common in front-wheel-drive platforms.', 'Often paired with variable valve timing systems.'],
  },
  {
    id: 'enc-dct',
    name: 'Dual-Clutch Transmission (DCT)',
    category: 'Transmission Types',
    description: 'A transmission using two clutches to alternate odd/even gear engagement.',
    function: 'Enables rapid gear changes by preselecting the next ratio.',
    keyFacts: ['Mechatronic control is central to shift quality.', 'Can be tuned for efficiency or performance feel.'],
  },
];
