import { BusinessConfig, MovingType } from '../types';

export const BUSINESS_INFO: BusinessConfig = {
  businessName: 'JJJ Packers & Movers',
  tagline: 'Moving Your World, Safely & Smoothly.',
  phone: '7010033771',
  whatsapp: '7010033771',
  email: 'uv.dineshkumar01@gmail.com',
  address: '#16 GST Road, Guduvancheri – 603202, Tamil Nadu, India',
  hours: '24 Hours',
  stats: {
    movesCompleted: '[XX+]',
    citiesCovered: '[XX+]',
    happyCustomers: '[XX+]',
    customerRating: '[XX/5]',
  },
  announcement: 'Serving Chennai & all major destinations across India with 24/7 booking support.'
};

export interface ServiceItem {
  id: string;
  name: MovingType;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  process: string[];
  icon: string;
  badge: string;
  image: string;
  whatsappMessage: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'home-shifting',
    name: 'Home Shifting',
    shortDesc: 'Comprehensive residential relocation with multi-layer protective packing for furniture and household goods.',
    longDesc: 'From fragile glassware to heavy living room furniture, our residential moving crew handles every household item with proven protective packing techniques, safe loading, and orderly room-by-room placement.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Multi-layer bubble wrap & corrugated sheet packing',
      'Careful handling of electronics & sensitive items',
      'Dismantling and reassembly of modular furniture',
      'Door-to-door transit coordination'
    ],
    process: [
      'Pre-move inventory assessment',
      'Protective packing with specialized materials',
      'Systematic loading onto covered moving truck',
      'Safe transport and room-wise delivery placement'
    ],
    icon: 'Home',
    badge: 'Popular',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need a quote for home shifting.'
  },
  {
    id: 'office-shifting',
    name: 'Office Shifting',
    shortDesc: 'Structured corporate and commercial office moves designed to minimize operational downtime.',
    longDesc: 'We coordinate office relocations with labeled department packaging, server rack precautions, ergonomic furniture disassembly, and weekend or off-hour shifting options to keep your business running smoothly.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Systematic color-coded desk & department labeling',
      'Anti-static bubble wrap for IT hardware & servers',
      'Confidential document & file archive transfer',
      'Flexible off-peak and weekend moving schedules'
    ],
    process: [
      'Site audit & floor-plan coordination',
      'IT hardware & workstation packing',
      'Secure transit with dedicated commercial fleet',
      'Re-setup and modular desk reassembly'
    ],
    icon: 'Building2',
    badge: 'Corporate',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need a quote for office relocation.'
  },
  {
    id: 'local-shifting',
    name: 'Local Shifting',
    shortDesc: 'Prompt same-day relocation services across Chennai, Guduvancheri, and surrounding suburban areas.',
    longDesc: 'Moving within Chennai or neighboring zones? Our local shifting team provides swift transit, suitable vehicle sizing (from mini-trucks to large covered containers), and prompt loading-to-unloading cycles.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Same-day pickup and delivery options',
      'Familiarity with Chennai traffic zones & apartment guidelines',
      'Appropriate vehicle sizing to prevent overload',
      'Professional lifting team for elevator & stair navigation'
    ],
    process: [
      'Quick phone/WhatsApp requirement confirmation',
      'Morning arrival and swift packing',
      'Direct point-to-point transit',
      'Prompt unloading and handover'
    ],
    icon: 'MapPin',
    badge: 'Same Day',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need a quote for local shifting in Chennai.'
  },
  {
    id: 'intercity-shifting',
    name: 'Intercity Shifting',
    shortDesc: 'Reliable long-distance relocation from Chennai to cities across Tamil Nadu and all states in India.',
    longDesc: 'Our intercity network connects Chennai with Bengaluru, Hyderabad, Mumbai, Delhi, Kolkata, and beyond with weatherproof container trucks, highway transit safety protocols, and continuous status communication.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Covered weatherproof container fleet',
      'Trained drivers experienced with national highways',
      'Real-time transit updates & toll corridor routing',
      'Optional transit risk coverage documentation'
    ],
    process: [
      'Comprehensive inventory audit & weight planning',
      'Heavy-duty export-grade packing & strapping',
      'Container loading & security sealing',
      'Highway dispatch and destination doorstep unloading'
    ],
    icon: 'Truck',
    badge: 'Pan-India',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need a quote for intercity relocation.'
  },
  {
    id: 'vehicle-transportation',
    name: 'Vehicle Transportation',
    shortDesc: 'Dedicated two-wheeler and four-wheeler carriers with specialized wheel chocks and protective wrapping.',
    longDesc: 'Your motorcycle or car is transported inside enclosed carriers with wheel clamps, bubble cushioning, and custom scratch guards to prevent road vibration strain or surface damage.',
    image: '/assets/aistudio/IMG-20260928-WA0023_c9fb786e.jpg',
    benefits: [
      'Specialized two-wheeler wooden crating & multi-layer film packaging',
      'Enclosed car carrier trucks with hydraulic ramps',
      'Tire locks and safety tie-down harness belts',
      'Pre-transport physical condition inspection report'
    ],
    process: [
      'Vehicle inspection and exterior condition marking',
      'Multi-layer bubble wrap & corrugated protection wrapping',
      'Hydraulic loading and wheel-chock belt anchoring',
      'Destination delivery and physical handover verification'
    ],
    icon: 'Car',
    badge: 'Enclosed',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need a quote for vehicle transport (bike/car).'
  },
  {
    id: 'loading-unloading',
    name: 'Loading & Unloading',
    shortDesc: 'Trained loading crews equipped with hydraulic trolleys, moving blankets, and heavy-furniture straps.',
    longDesc: 'Eliminate the risk of personal injury or property scuffs. Our seasoned moving crew utilizes dollies, heavy-duty straps, and ergonomic lifting techniques to safely navigate stairwells and freight elevators.',
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Trained handling personnel with years of field experience',
      'Use of hand trucks, lifting belts & furniture sliders',
      'Doorframe and floor protection during moves',
      'Systematic truck stacking based on weight distribution'
    ],
    process: [
      'Pre-loading pathway clearance & door padding',
      'Heavy base loading followed by lighter upper placement',
      'Internal cargo ratchet strapping',
      'Careful unloading and room placement at new premises'
    ],
    icon: 'Boxes',
    badge: 'Expert Crew',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need professional loading and unloading service.'
  },
  {
    id: 'packing-unpacking',
    name: 'Packing & Unpacking',
    shortDesc: 'Systematic material-based packing with 5-ply cartons, bubble wrap, edge guards, and labeled containers.',
    longDesc: 'From delicate bone china and crystal to large modular wardrobes, we bring high-grade packing materials directly to your home and systematically package, label, unpack, and clear packing debris.',
    image: '/assets/aistudio/IMG-20260928-WA0032_5bcc5b8b.jpg',
    benefits: [
      'Premium 5-ply corrugated cartons and foam rolls',
      'Color-coded box labeling for easy unpacking',
      'Anti-scratch edge protectors for wooden corners',
      'Debris cleanup and packing material removal'
    ],
    process: [
      'Sorting and category-wise material selection',
      'Fragile item bubble wrapping & cushioned box packing',
      'Labeling each carton with item descriptions and destination room',
      'Unpacking, inventory check, and disposal of materials'
    ],
    icon: 'PackageCheck',
    badge: 'Full Service',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need packing and unpacking services.'
  },
  {
    id: 'storage-warehouse',
    name: 'Storage / Warehouse',
    shortDesc: 'Secure, clean, and pest-controlled short-term and long-term storage facilities for household and office goods.',
    longDesc: 'Need temporary storage while waiting for apartment possession or renovating? Our monitored warehouse depots offer moisture-controlled, pest-treated storage bays with palletized stacking.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    benefits: [
      '24/7 CCTV surveillance and security guards',
      'Pest-controlled and moisture-monitored facilities',
      'Palletized storage preventing floor dampness',
      'Flexible weekly, monthly, or yearly storage terms'
    ],
    process: [
      'Full protective packaging of items for storage',
      'Detailed barcoded or numbered inventory ledger',
      'Pallet placement inside secured warehouse section',
      'Scheduled redelivery whenever you are ready'
    ],
    icon: 'Warehouse',
    badge: 'Secure',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need storage or warehouse facility space.'
  },
  {
    id: 'commercial-shifting',
    name: 'Commercial Shifting',
    shortDesc: 'End-to-end relocation for retail showrooms, industrial machinery, institutions, and healthcare clinics.',
    longDesc: 'Commercial moves demand precision and schedule discipline. We coordinate heavy equipment shifting, merchandise handling, display unit dismantling, and rapid transfer to keep business interruptions at a minimum.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Heavy machinery and industrial fixture shifting',
      'Retail inventory packaging and security sealing',
      'Off-peak overnight transit to avoid business disruption',
      'Dedicated commercial move coordinator'
    ],
    process: [
      'Commercial site survey and logistics feasibility plan',
      'Machinery dismounting and industrial crating',
      'Heavy-duty transport with GPS-monitored fleet',
      'Floor placement and commercial handover'
    ],
    icon: 'Layers',
    badge: 'Industrial',
    whatsappMessage: 'Hi JJJ Packers & Movers, I need commercial logistics or shifting service.'
  }
];

export interface RouteCity {
  id: string;
  name: string;
  state: string;
  distanceKm: number;
  typicalTime: string;
  x: number; // SVG coordinate percent
  y: number; // SVG coordinate percent
  highlight: string;
}

export const INDIA_ROUTES: RouteCity[] = [
  { id: 'kashmir', name: 'Srinagar / Kashmir', state: 'Jammu & Kashmir', distanceKm: 3120, typicalTime: '6-7 Days', x: 38, y: 15, highlight: 'Northernmost NH-44 highway express route' },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', distanceKm: 2180, typicalTime: '5-6 Days', x: 40, y: 25, highlight: 'North India major transit line' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', distanceKm: 345, typicalTime: '1-2 Days', x: 42, y: 76, highlight: 'Regular weekly scheduled departures' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', distanceKm: 625, typicalTime: '2-3 Days', x: 48, y: 62, highlight: 'Direct container service via NH16/NH44' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', distanceKm: 1330, typicalTime: '3-4 Days', x: 30, y: 55, highlight: 'West coast corporate corridor' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', distanceKm: 1180, typicalTime: '3-4 Days', x: 33, y: 58, highlight: 'Automotive & IT relocation route' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', distanceKm: 1670, typicalTime: '4-5 Days', x: 74, y: 45, highlight: 'Eastern coast expressway corridor' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', distanceKm: 1720, typicalTime: '4-5 Days', x: 26, y: 44, highlight: 'Industrial logistics connection' },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', distanceKm: 690, typicalTime: '2 Days', x: 38, y: 88, highlight: 'Southern corridor relocation line' },
  { id: 'kanyakumari', name: 'Kanyakumari', state: 'Tamil Nadu', distanceKm: 705, typicalTime: '2 Days', x: 44, y: 94, highlight: 'Southern apex corridor connection' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Tell Us What You Need',
    desc: 'Submit our online quotation form, call 7010033771, or send your moving details via WhatsApp.',
    highlight: 'Quick 2-minute request'
  },
  {
    step: '02',
    title: 'Get Your Quote',
    desc: 'The JJJ team reviews your inventory, distance, and property size to provide a transparent, personalized quotation.',
    highlight: 'Clear & honest assessment'
  },
  {
    step: '03',
    title: 'We Pack & Move',
    desc: 'Our trained crew arrives on schedule with premium packing materials, loads safely, and initiates covered transit.',
    highlight: 'Careful multi-layer packing'
  },
  {
    step: '04',
    title: 'Arrive & Unpack',
    desc: 'Your belongings reach your new location safely, followed by unloading and requested placement assistance.',
    highlight: 'Smooth final delivery'
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Careful Packing',
    desc: 'Using high-GSM corrugated boxes, multi-layer bubble wrap, and waterproof stretch wraps tailored for each item.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Reliable Transportation',
    desc: 'Clean, well-maintained commercial moving trucks driven by experienced route drivers.',
    icon: 'Truck'
  },
  {
    title: 'Door-to-Door Service',
    desc: 'Complete end-to-end relocation management from your pickup doorstep to your destination room.',
    icon: 'Home'
  },
  {
    title: 'Professional Handling',
    desc: 'Trained loading personnel who respect your possessions, furniture corners, and building premises.',
    icon: 'Users'
  },
  {
    title: 'Flexible Moving Solutions',
    desc: 'Customized plans for studio apartments, family villas, corporate offices, or single heavy vehicles.',
    icon: 'Sparkles'
  },
  {
    title: 'Pan-India Service',
    desc: 'Based in Chennai (Guduvancheri) with logistics transit capabilities across all states in India.',
    icon: 'Globe'
  },
  {
    title: '24/7 Enquiry Support',
    desc: 'Direct phone and WhatsApp helpline active round the clock for urgent shifting requirements.',
    icon: 'Clock'
  },
  {
    title: 'Dedicated Customer Assistance',
    desc: 'Direct communication with your moving coordinator throughout pickup, transit, and delivery.',
    icon: 'Headphones'
  }
];

export const FAQ_DATA = [
  {
    q: 'What services does JJJ Packers & Movers provide?',
    a: 'JJJ Packers & Movers provides complete relocation solutions including Home Shifting, Office Shifting, Local Shifting within Chennai, Intercity Shifting across India, Vehicle (Car & Bike) Transportation, Loading & Unloading, Packing & Unpacking, Storage/Warehousing, and Commercial Shifting.'
  },
  {
    q: 'Do you provide home shifting?',
    a: 'Yes. We specialize in household moving of all sizes (1 BHK, 2 BHK, 3 BHK, 4 BHK, and independent villas). We take care of dismantling furniture, wrapping delicate chinaware, and reassembling essentials at the destination.'
  },
  {
    q: 'Do you provide office relocation?',
    a: 'Yes. We handle corporate office moves with structured labeling for desktop computers, confidential files, conference furniture, and department assets, with weekend moving options to prevent workday disruption.'
  },
  {
    q: 'Do you move vehicles?',
    a: 'Yes, we provide dedicated two-wheeler and four-wheeler transport using specialized car carrier trucks and protective bike packaging with tie-down straps.'
  },
  {
    q: 'Do you provide packing and unpacking?',
    a: 'Yes. We supply high-grade corrugated boxes, bubble wrap, foam, and stretch film. Our team can also unpack your items and arrange them in the respective rooms at your new address.'
  },
  {
    q: 'Do you provide interstate relocation?',
    a: 'Yes. While based in Chennai, Tamil Nadu, we provide relocation and logistics services to destinations across all Indian states with covered container trucks and transit documentation.'
  },
  {
    q: 'How can I request a quotation?',
    a: 'You can submit the online quotation form on this website, tap the WhatsApp button, or directly call our team at 7010033771. We respond promptly with a personalized quote.'
  },
  {
    q: 'How is the moving price determined?',
    a: 'Moving prices depend on the volume and type of goods, distance between locations, property floor levels, elevator availability, packing material requirements, and vehicle type. We provide honest estimates based on your exact requirements.'
  },
  {
    q: 'How early should I book my move?',
    a: 'For local Chennai moves, booking 1–3 days in advance is helpful. For intercity moves across India or month-end shifting, booking 3–7 days in advance ensures your preferred schedule and dedicated vehicle allocation.'
  },
  {
    q: 'Do you provide storage?',
    a: 'Yes, we offer clean, secure short-term and long-term storage facilities for household belongings, corporate assets, or vehicles awaiting possession of your new premises.'
  },
  {
    q: 'How can I contact JJJ Packers & Movers?',
    a: 'You can call or WhatsApp us 24/7 at 7010033771, email us at uv.dineshkumar01@gmail.com, or visit our office at #16 GST Road, Guduvancheri – 603202, Tamil Nadu.'
  }
];

export interface GalleryPhotoItem {
  id: string;
  imageUrl: string;
  category: 'Bike & Vehicle' | 'Furniture & Antiques' | 'Household & Cartons';
  title: string;
  desc: string;
  tag: string;
  location: string;
  badge: string;
}

export const GALLERY_ITEMS: GalleryPhotoItem[] = [
  {
    id: 'bike-01',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0022_9b798782.jpg',
    category: 'Bike & Vehicle',
    title: 'Sports Bike Multi-Layer Protective Packaging',
    desc: 'Full motorcycle body contoured with thick corrugated cushion wrap and waterproof industrial film to prevent scratches during long-distance highway hauling.',
    tag: 'Two-Wheeler Transport',
    location: 'JJJ Logistics Hub, Chennai',
    badge: 'Zero-Scratch Wrap'
  },
  {
    id: 'bike-02',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0023_c9fb786e.jpg',
    category: 'Bike & Vehicle',
    title: 'Scooter / Activa Full Body Armour Wrapping',
    desc: 'Complete wrap encasing headlights, rearview mirrors, side cowls, and silencer in high-density cardboard and stretch film.',
    tag: 'Scooter Relocation',
    location: 'Warehouse Staging Bay 1',
    badge: 'Full Body Shield'
  },
  {
    id: 'bike-03',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0026_c4b657bd.jpg',
    category: 'Bike & Vehicle',
    title: 'Dual Bikes with Secure Helmet Harnessing',
    desc: 'Motorcycles packaged side-by-side with riding helmets safely cushioned and tethered directly to the seat cushion under stretch wrap.',
    tag: 'Consignment Transit',
    location: 'Dispatch Distribution Floor',
    badge: 'Helmet Secured'
  },
  {
    id: 'bike-04',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0024_f601dc81.jpg',
    category: 'Bike & Vehicle',
    title: 'Two-Wheeler Ready for Container Ramp Loading',
    desc: 'Carefully wrapped scooter staged at the container dock with handlebar alignment ready for wheeled rolling into the container truck.',
    tag: 'Container Loading',
    location: 'Covered Fleet Loading Bay',
    badge: 'Ready to Roll'
  },
  {
    id: 'bike-05',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0032_5bcc5b8b.jpg',
    category: 'Bike & Vehicle',
    title: 'Commuter Bike Precision Vibration Insulation',
    desc: 'Engine, fuel tank, and frame insulated with impact-absorbing corrugated padding while leaving disc brake assembly clear for safe maneuverability.',
    tag: 'Highway Fleet Prep',
    location: 'Chennai Dispatch Terminal',
    badge: 'Impact Absorbent'
  },
  {
    id: 'furn-01',
    imageUrl: '/assets/aistudio/IMG-20260620-WA0067_36c87197.jpeg',
    category: 'Furniture & Antiques',
    title: 'Luxury Living Room Sofa Suite Protective Encapsulation',
    desc: 'Handcrafted solid wood sofa and seating suite wrapped with heavy-gauge waterproof stretch film, edge corner protectors, and fabric preservation wrap.',
    tag: 'Luxury Furniture',
    location: 'On-Site Residence Relocation',
    badge: 'Fabric & Wood Shield'
  },
  {
    id: 'furn-02',
    imageUrl: '/assets/aistudio/IMG-20260620-WA0065_c33a79d7.jpeg',
    category: 'Furniture & Antiques',
    title: 'Carved Teakwood Rocking Chairs & Antique Wooden Furniture',
    desc: 'Intricately carved ornamental wooden rocking chairs cushioned with layered packing pads and double-strapped for safe vertical transit.',
    tag: 'Antique & Teakwood',
    location: 'Residence Relocation, Chennai',
    badge: 'Wood Carving Care'
  },
  {
    id: 'bike-06',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0027_fdbb2bae.jpg',
    category: 'Bike & Vehicle',
    title: 'Royal Enfield Bullet Heavy Cruiser Padding',
    desc: 'Classic cruiser motorcycle protected with heavy-duty multi-ply corrugated sleeves shielding the chrome exhaust, engine fins, and metallic tank.',
    tag: 'Cruiser Bike Shifting',
    location: 'Pan-India Transit Corridor',
    badge: 'Heavy Cruiser Prep'
  },
  {
    id: 'house-01',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0033_7404aa64.jpg',
    category: 'Household & Cartons',
    title: 'Household Relocation: Heavy-Duty Cartons & Luggage Staging',
    desc: 'Complete household consignment organized into stacked Freudenberg micronAir high-GSM corrugated boxes, hard-shell suitcases, and wrapped home appliances.',
    tag: 'Household Shifting',
    location: 'Apartment Staging Area',
    badge: 'Organized Cartons'
  },
  {
    id: 'bike-07',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0030_90fc9fed.jpg',
    category: 'Bike & Vehicle',
    title: 'Warehouse Fleet Inspection: Multi-Vehicle Consignment',
    desc: 'Two-wheelers systematically parked and labeled for pan-India interstate delivery across Bangalore, Hyderabad, Mumbai, and Delhi routes.',
    tag: 'Warehouse Operations',
    location: 'JJJ Central Hub, Guduvancheri',
    badge: 'Interstate Hub'
  },
  {
    id: 'bike-08',
    imageUrl: '/assets/aistudio/IMG-20260928-WA0031_f71d8f2d.jpg',
    category: 'Bike & Vehicle',
    title: 'Protected Motorcycle with Helmet Safety Straps',
    desc: 'Full side profile of commuter motorcycle wrapped with high-density padding and dual-cord strapped helmet on the rear seat for zero transit friction.',
    tag: 'Two-Wheeler Transport',
    location: 'JJJ Loading Terminal',
    badge: 'Strapped & Secured'
  }
];

export const LOCATION_PAGES = [
  {
    slug: 'chennai',
    name: 'Chennai',
    title: 'Packers & Movers in Chennai',
    summary: 'Our primary base of operations located in Guduvancheri on GST Road, serving Anna Nagar, OMR, Velachery, Tambaram, Porur, and all Chennai regions.',
    popularRoutes: ['Chennai to Bengaluru', 'Chennai to Hyderabad', 'Chennai to Mumbai', 'Chennai to Coimbatore']
  },
  {
    slug: 'bangalore',
    name: 'Bengaluru',
    title: 'Packers & Movers Chennai to Bengaluru',
    summary: 'Frequent weekly relocation corridor connecting Chennai and Bengaluru (Whitefield, Electronic City, Indiranagar, HSR Layout).',
    popularRoutes: ['Bengaluru to Chennai', 'Chennai to Hosur', 'Chennai to Electronic City']
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    title: 'Packers & Movers Chennai to Hyderabad',
    summary: 'Seamless transit along NH16 & NH44 serving Gachibowli, Hitec City, Madhapur, and Secunderabad.',
    popularRoutes: ['Chennai to Hyderabad', 'Hyderabad to Chennai', 'Chennai to Vijayawada']
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    title: 'Packers & Movers Chennai to Mumbai',
    summary: 'Interstate commercial and residential relocation between Chennai and Mumbai / Navi Mumbai / Thane.',
    popularRoutes: ['Chennai to Mumbai', 'Chennai to Pune', 'Mumbai to Chennai']
  },
  {
    slug: 'delhi',
    name: 'Delhi NCR',
    title: 'Packers & Movers Chennai to Delhi NCR',
    summary: 'Long-haul container transport connecting Tamil Nadu with Delhi, Gurgaon, and Noida.',
    popularRoutes: ['Chennai to Delhi', 'Chennai to Gurgaon', 'Chennai to Noida']
  }
];
