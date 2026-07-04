export interface FleetVehicle {
  name: string;
  capacity: string;
  desc: string;
  img: string;
  bestFor: string;
  advantages: string[];
  
  // Premium details for modal
  overview: string;
  suitableGoods: string;
  approxDimensions: string;
  idealRoutes: string;
  commercialApplications: string;
  safetyFeatures: string;
  gpsTracking: string;
  insuranceCoverage: string;
  loadingSupport: string;
  availability: string;
  recommendedCargoTypes: string;
  
  features: string[];
  specifications: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  gallery: string[];
}

export const fleet: FleetVehicle[] = [
  {
    name: "Tata Ace",
    capacity: "Local / Light",
    desc: "Ideal for intracity and fast local deliveries.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
    bestFor: "Small parcels, local shifting, intracity goods.",
    advantages: ["Quick navigation in city traffic", "Cost-effective for small loads", "High availability"],
    
    overview: "The Tata Ace is the gold standard for last-mile and intracity deliveries. Designed to navigate narrow city streets and heavy traffic with ease, it ensures that your goods reach their destination faster. Perfect for small businesses, local distributors, and personal shifting.",
    suitableGoods: "Lightweight commercial goods, FMCG products, electronic appliances, small furniture, and daily essential supplies.",
    approxDimensions: "7.2 ft (L) x 4.9 ft (W) x 5 ft (H)",
    idealRoutes: "Intracity, hyper-local deliveries, and short inter-district transits.",
    commercialApplications: "E-commerce last-mile delivery, local distributor supply chain, event management logistics, and rapid retail restocking.",
    safetyFeatures: "Weather-resistant tarpaulin cover options, secure lashing points, and trained local drivers.",
    gpsTracking: "Live GPS tracking available on select premium bookings for real-time visibility.",
    insuranceCoverage: "Standard transit insurance available for all commercial goods.",
    loadingSupport: "Driver-assisted loading/unloading available on request.",
    availability: "Extremely high. Usually available within 60 minutes of booking in major operating cities.",
    recommendedCargoTypes: "Cartons, small crates, loose consumer goods, and fragile electronics.",
    
    features: [
      "Compact size for easy city navigation",
      "Excellent fuel efficiency keeps costs low",
      "High frequency availability",
      "Perfect for last-minute dispatch"
    ],
    specifications: [
      { label: "Max Payload", value: "750 - 850 Kg" },
      { label: "Volume Capacity", value: "~175 CFT" },
      { label: "Body Type", value: "Open/Covered" },
      { label: "Transit Type", value: "Express Local" }
    ],
    faqs: [
      { q: "Can the Tata Ace enter city limits during the day?", a: "Yes, Tata Ace is classified as an LCV and is generally permitted within city limits at all times, making it perfect for daytime deliveries." },
      { q: "Is it suitable for shifting a 1BHK?", a: "Yes, it can comfortably accommodate standard 1BHK items including a fridge, washing machine, and bed (disassembled)." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586864387789-228f2162ce5a?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "Pickup",
    capacity: "Medium Load",
    desc: "Perfect for fast, medium-load transport.",
    img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=800&auto=format&fit=crop",
    bestFor: "FMCG delivery, medium commercial appliances, inter-district.",
    advantages: ["Higher payload than mini-trucks", "Excellent mileage", "Fast intercity transit"],
    
    overview: "The Pickup (e.g., Bolero Pickup or similar LCV) bridges the gap between light city transport and heavy intercity haulage. It offers exceptional ruggedness for rural and semi-urban terrains while maintaining highway speed, making it the top choice for regional distribution.",
    suitableGoods: "Agricultural produce, medium industrial equipment, bulk FMCG cartons, and construction materials.",
    approxDimensions: "8.5 ft (L) x 5.5 ft (W) x 6 ft (H)",
    idealRoutes: "Inter-district, semi-urban to urban connections, and medium-distance highways.",
    commercialApplications: "Agri-logistics, hardware distribution, textile transport, and mid-scale B2B deliveries.",
    safetyFeatures: "Strong reinforced cargo bed, driver-cabin partition, and optional weather sealing.",
    gpsTracking: "100% GPS enabled for complete transparency during transit.",
    insuranceCoverage: "Comprehensive cargo insurance recommended and available.",
    loadingSupport: "Self-loading or labor arrangement required; driver supervises load distribution.",
    availability: "High availability across industrial and agricultural hubs.",
    recommendedCargoTypes: "Sacks, heavy boxes, medium-sized machinery, and drums.",
    
    features: [
      "Robust suspension for rough terrains",
      "Higher speed limits on highways",
      "Versatile open-bed design",
      "Cost-effective for 1-1.5 ton payloads"
    ],
    specifications: [
      { label: "Max Payload", value: "1,200 - 1,500 Kg" },
      { label: "Volume Capacity", value: "~280 CFT" },
      { label: "Body Type", value: "Open Body" },
      { label: "Transit Type", value: "Inter-District Express" }
    ],
    faqs: [
      { q: "Is the Pickup suitable for long-distance intercity transport?", a: "While capable, it is best suited for regional transport (up to 300-500 km) to maintain cost efficiency and transit speed." },
      { q: "Do you provide tarpaulin covers for open pickups?", a: "Yes, all our open vehicles come equipped with heavy-duty tarpaulins to protect against rain and dust." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "14 Feet Truck",
    capacity: "Intercity",
    desc: "Versatile medium commercial vehicle.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
    bestFor: "Furniture, electronics, wholesale goods transport.",
    advantages: ["Weather-proof options available", "Balanced load capacity", "GPS Tracking Enabled"],
    
    overview: "The 14 Feet Truck is a versatile workhorse for intra-state and short inter-state transport. Offering a substantial increase in volume without sacrificing maneuverability, it is a favorite for mid-sized manufacturers and distributors moving finished goods.",
    suitableGoods: "White goods, electronics, large furniture shipments, wholesale garments, and auto parts.",
    approxDimensions: "14 ft (L) x 6 ft (W) x 6.5 ft (H)",
    idealRoutes: "Intra-state highways and regional industrial corridors.",
    commercialApplications: "Warehouse-to-retail distribution, event logistics, and standard FTL (Full Truck Load) requirements.",
    safetyFeatures: "Solid steel body construction, secure locking mechanisms for closed variants, and speed governors.",
    gpsTracking: "Standard on all 14ft trucks, providing live location and route history.",
    insuranceCoverage: "End-to-end transit insurance support provided.",
    loadingSupport: "Dock-level loading compatible.",
    availability: "High. Advance booking of 4-6 hours recommended.",
    recommendedCargoTypes: "Palletized goods (light), loose cartons, and standard commercial freight.",
    
    features: [
      "Excellent balance of volume and weight capacity",
      "Permitted on most major city arterial roads",
      "Available in both open and closed body types",
      "Reliable transit times for 500+ km distances"
    ],
    specifications: [
      { label: "Max Payload", value: "3,500 - 4,000 Kg" },
      { label: "Volume Capacity", value: "~540 CFT" },
      { label: "Body Type", value: "Open / Closed" },
      { label: "Transit Type", value: "Regional FTL" }
    ],
    faqs: [
      { q: "Can I get a closed body 14ft truck for electronics?", a: "Absolutely. We highly recommend and provide closed-body 14ft trucks specifically for weather-sensitive and high-value cargo like electronics." },
      { q: "How many standard pallets fit in a 14ft truck?", a: "It typically accommodates 4 to 6 standard pallets depending on the exact internal width and pallet dimensions." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "19 Feet Truck",
    capacity: "Heavy Load",
    desc: "Standard choice for intercity logistics.",
    img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=800&auto=format&fit=crop",
    bestFor: "Industrial goods, raw materials, heavy commercial cargo.",
    advantages: ["High volume capacity", "Long-distance reliability", "Pan-India permit"],
    
    overview: "The 19 Feet Truck is the backbone of India's long-haul transportation. Designed for heavy payloads and long distances, it is the standard choice for manufacturing industries moving raw materials or bulk finished goods across state borders.",
    suitableGoods: "Industrial raw materials, steel, cement bags, heavy machinery parts, and bulk agricultural yield.",
    approxDimensions: "19 ft (L) x 7 ft (W) x 7 ft (H)",
    idealRoutes: "National highways and cross-country logistics routes.",
    commercialApplications: "Heavy manufacturing supply chain, construction material transit, and nationwide FTL.",
    safetyFeatures: "Heavy-duty braking systems, experienced long-haul drivers, and multiple cargo lashing points.",
    gpsTracking: "Advanced telematics with route deviation alerts.",
    insuranceCoverage: "Mandatory transit insurance for all long-haul commercial bookings.",
    loadingSupport: "Compatible with crane loading (open body) and forklift operations.",
    availability: "Requires 12-24 hours advance notice for assured placement.",
    recommendedCargoTypes: "Heavy non-fragile goods, industrial coils, and dense cargo.",
    
    features: [
      "High payload capacity up to 7+ tons",
      "National permit for seamless interstate border crossing",
      "Engineered for fuel efficiency over long distances",
      "Experienced two-driver teams available for continuous transit"
    ],
    specifications: [
      { label: "Max Payload", value: "7,000 - 9,000 Kg" },
      { label: "Volume Capacity", value: "~930 CFT" },
      { label: "Body Type", value: "Mostly Open Body" },
      { label: "Transit Type", value: "National Long Haul" }
    ],
    faqs: [
      { q: "Do these trucks have National Permits?", a: "Yes, all our 19ft trucks and above carry valid National Permits, allowing uninterrupted travel across all Indian states." },
      { q: "Is crane loading possible?", a: "Yes, our open-body 19ft trucks are perfectly suited for overhead crane loading of heavy materials." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "20 Feet Container",
    capacity: "Secure Transit",
    desc: "Secure closed container for safe transit.",
    img: "https://images.unsplash.com/photo-1519003300449-4244b278ea82?q=80&w=800&auto=format&fit=crop",
    bestFor: "High-value goods, electronics, pharmaceuticals.",
    advantages: ["100% Weatherproof", "High Security & Locked Transit", "Zero Transshipment"],
    
    overview: "When security and weather-proofing are non-negotiable, the 20 Feet Container truck is the ultimate solution. Built with solid steel corrugated walls, it provides vault-like security for high-value cargo, making it indispensable for pharmaceuticals, FMCG, and electronics.",
    suitableGoods: "Pharmaceuticals, high-end electronics, branded apparel, cosmetics, and sensitive corporate assets.",
    approxDimensions: "20 ft (L) x 8 ft (W) x 8.5 ft (H)",
    idealRoutes: "Factory to regional distribution centers, port-to-warehouse transit.",
    commercialApplications: "High-value FMCG distribution, cold-chain (if refrigerated variant), and export/import container movement.",
    safetyFeatures: "Tamper-evident sealing, double-lock rear doors, 100% waterproof construction.",
    gpsTracking: "Real-time tracking with door-open/close sensor alerts on premium shipments.",
    insuranceCoverage: "Comprehensive high-value goods insurance partnerships available.",
    loadingSupport: "Dock-level forklift loading highly recommended.",
    availability: "High. Pre-booking of 12 hours ensures exact schedule alignment.",
    recommendedCargoTypes: "Palletized high-value boxes, sensitive equipment, and climate-protected goods.",
    
    features: [
      "Zero risk of water or dust damage",
      "Tamper-proof transit from origin to destination",
      "Standardized dimensions for perfect palletization",
      "Premium suspension for fragile cargo"
    ],
    specifications: [
      { label: "Max Payload", value: "6,500 - 7,000 Kg" },
      { label: "Volume Capacity", value: "~1,100 CFT" },
      { label: "Body Type", value: "Closed Container" },
      { label: "Transit Type", value: "Secure Long Haul" }
    ],
    faqs: [
      { q: "Can I lock the container with my own lock?", a: "Yes, you can apply your own padlock or security seal at the origin, which will only be broken by your receiver at the destination." },
      { q: "Is it suitable for palletized loading?", a: "Absolutely. 20ft containers are standardized for pallet loading via forklifts from loading docks." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519003300449-4244b278ea82?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "22 Feet Truck",
    capacity: "High Volume",
    desc: "Large volume open transport for heavy cargo.",
    img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=800&auto=format&fit=crop",
    bestFor: "Pipes, steel, construction materials, large machinery.",
    advantages: ["Easy loading/unloading via crane", "Heavy payload capacity", "Experienced Drivers"],
    
    overview: "The 22 Feet Truck is optimized for length and volume. When you have cargo that is too long for standard 19ft trucks but doesn't require a full-sized trailer, the 22ft truck provides the perfect balance of length, payload capacity, and maneuverability.",
    suitableGoods: "PVC/Steel pipes, scaffolding, long structural steel, oversized machinery, and automotive chassis.",
    approxDimensions: "22 ft (L) x 7.5 ft (W) x 7 ft (H)",
    idealRoutes: "Major industrial corridors and construction site deliveries.",
    commercialApplications: "Infrastructure project logistics, steel plant distribution, and heavy equipment transport.",
    safetyFeatures: "Heavy-duty chassis, multi-axle braking, and specialized lashing chains.",
    gpsTracking: "24/7 GPS tracking with route monitoring.",
    insuranceCoverage: "Standard transit insurance.",
    loadingSupport: "Primarily overhead crane or side-loading via forklift.",
    availability: "Requires 24 hours advance booking.",
    recommendedCargoTypes: "Long, dense, and heavy industrial materials.",
    
    features: [
      "Accommodates up to 22ft long unbroken cargo",
      "Multi-axle variants available for extreme weights",
      "Open body allows flexible loading angles",
      "Cost-effective alternative to flatbed trailers"
    ],
    specifications: [
      { label: "Max Payload", value: "10,000 - 14,000 Kg" },
      { label: "Volume Capacity", value: "~1,150 CFT" },
      { label: "Body Type", value: "Open Body (Multi-axle)" },
      { label: "Transit Type", value: "Industrial Heavy" }
    ],
    faqs: [
      { q: "What is the maximum length of pipes this can carry?", a: "It can safely transport pipes and materials up to 22 feet in length without overhang." },
      { q: "Are multi-axle options available for heavier loads?", a: "Yes, we provide 6-wheeler and 10-wheeler variants of the 22ft truck based on your payload weight." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "32 Feet Container",
    capacity: "Max Volume",
    desc: "Maximum capacity closed container for industrial goods.",
    img: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=800&auto=format&fit=crop",
    bestFor: "FMCG bulk, automotive parts, e-commerce long haul.",
    advantages: ["Maximum cargo volume", "Double door security", "GPS Tracking & Fully Insured"],
    
    overview: "The absolute pinnacle of high-volume secure transport. The 32 Feet Container (Single/Multi-axle) is the backbone of modern e-commerce and large-scale FMCG supply chains. It maximizes volumetric space while providing impenetrable security.",
    suitableGoods: "E-commerce parcels, automotive components, consumer electronics, textiles, and light-weight high-volume goods.",
    approxDimensions: "32 ft (L) x 8 ft (W) x 8.5 ft (H)",
    idealRoutes: "Expressway corridors and major logistics hubs (e.g., Delhi to Mumbai, Chennai to Kolkata).",
    commercialApplications: "E-commerce line-haul, FMCG primary distribution, and automotive milk-runs.",
    safetyFeatures: "GPS locks, rigid steel enclosure, anti-lock braking systems (ABS), and dual-driver operations.",
    gpsTracking: "Advanced telematics with geo-fencing and ETA prediction.",
    insuranceCoverage: "High-value comprehensive insurance cover options.",
    loadingSupport: "Warehouse dock loading only.",
    availability: "Requires 24-48 hours advance booking.",
    recommendedCargoTypes: "High-volume, low-density palletized or boxed goods.",
    
    features: [
      "Massive volumetric capacity lowers per-unit transport cost",
      "Highest level of transit security",
      "Standardized for large-scale warehouse operations",
      "Fastest transit times on national expressways"
    ],
    specifications: [
      { label: "Max Payload", value: "7,000 Kg (SXL) / 14,000 Kg (MXL)" },
      { label: "Volume Capacity", value: "~2,100 CFT" },
      { label: "Body Type", value: "Closed Container" },
      { label: "Transit Type", value: "Express Line Haul" }
    ],
    faqs: [
      { q: "What is the difference between SXL and MXL?", a: "SXL (Single Axle) is designed for lighter, high-volume goods (like e-commerce boxes) up to 7 tons. MXL (Multi Axle) can carry heavier dense cargo up to 14 tons." },
      { q: "Do you provide GPS access for the 32ft container?", a: "Yes, complete API integration and live tracking dashboard access is provided for all 32ft container line-haul movements." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "Trailer",
    capacity: "Oversized",
    desc: "Heavy duty trailers for oversized and project cargo.",
    img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop",
    bestFor: "Transformers, heavy machinery, project cargo.",
    advantages: ["Custom oversized load permits", "Escort vehicles available", "Expert handling"],
    
    overview: "For cargo that defies standard dimensions, our Flatbed and Lowbed Trailers are the ultimate solution. A P Star Movers specializes in Project Logistics, handling the transportation of massive, ultra-heavy, and irregularly shaped industrial equipment with precision engineering.",
    suitableGoods: "Power transformers, wind turbine blades, heavy earth-moving equipment, steel girders, and massive boilers.",
    approxDimensions: "40 ft to 60 ft (Length varies based on trailer type)",
    idealRoutes: "Specially surveyed and permitted routes avoiding low bridges and narrow turns.",
    commercialApplications: "Infrastructure development, power plant setups, and heavy machinery relocation.",
    safetyFeatures: "Hydraulic axles (on specialized trailers), escort vehicles, route surveys, and specialized lashing.",
    gpsTracking: "Continuous monitoring with dedicated control tower support.",
    insuranceCoverage: "Specialized project cargo insurance required.",
    loadingSupport: "Heavy crane loading under expert supervision.",
    availability: "Project-based. Requires extensive planning and 7-15 days advance notice.",
    recommendedCargoTypes: "Over Dimensional Cargo (ODC) and ultra-heavy machinery.",
    
    features: [
      "Capable of carrying 20 to 100+ tons based on axle configuration",
      "End-to-end route survey and clearance management",
      "Coordination with local authorities for smooth transit",
      "Highly experienced ODC specialized drivers"
    ],
    specifications: [
      { label: "Max Payload", value: "20,000 - 100,000+ Kg" },
      { label: "Platform Length", value: "40ft - 60ft" },
      { label: "Trailer Type", value: "Flatbed / Lowbed / Semi" },
      { label: "Transit Type", value: "ODC / Project Logistics" }
    ],
    faqs: [
      { q: "Do you handle the RTO permissions for oversized cargo?", a: "Yes, A P Star Movers provides end-to-end solutions including route surveys, RTO permissions, and escort vehicles for ODC transit." },
      { q: "What is the difference between a flatbed and lowbed trailer?", a: "Flatbeds are standard height for very long or heavy items. Lowbeds drop down close to the road, allowing the transport of extremely tall equipment without hitting bridges." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    name: "Oil Tanker",
    capacity: "Liquid / Bulk",
    desc: "Specialized tankers for liquid and bulk transportation.",
    img: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=800&auto=format&fit=crop",
    bestFor: "Chemicals, oils, industrial liquids.",
    advantages: ["Hazmat certified", "Leak-proof strict protocols", "Temperature control options"],
    
    overview: "Transporting liquids, chemicals, and hazardous materials requires uncompromising safety standards. Our fleet of specialized Oil and Liquid Tankers are engineered with internal baffles, high-grade steel/aluminum, and strict leak-proof protocols to ensure zero-loss, safe transit of bulk liquids.",
    suitableGoods: "Edible oils, petroleum products, industrial chemicals, liquid fertilizers, and dairy products.",
    approxDimensions: "Varies based on KL capacity (Typically 20ft - 30ft chassis)",
    idealRoutes: "Refinery/Plant to distribution depots.",
    commercialApplications: "Petrochemical logistics, food-grade liquid transport, and hazardous chemical transit.",
    safetyFeatures: "Anti-surge internal baffles, Hazmat certified drivers, emergency spill kits, and pressure relief valves.",
    gpsTracking: "Real-time tracking with geofencing.",
    insuranceCoverage: "Specialized liquid & hazardous material transit insurance.",
    loadingSupport: "Pump/Gravity based loading via authorized depot pipelines.",
    availability: "Requires dedicated contracts or 48 hours advance booking.",
    recommendedCargoTypes: "Bulk liquids, Hazmat, and food-grade liquids.",
    
    features: [
      "Available in multiple capacities (10 KL to 30 KL+)",
      "Strict compartmentalization to prevent liquid surge during transit",
      "Drivers trained in hazardous material handling and emergency response",
      "Food-grade stainless steel options available"
    ],
    specifications: [
      { label: "Max Capacity", value: "10,000 - 30,000+ Liters" },
      { label: "Body Type", value: "Cylindrical Tank" },
      { label: "Material", value: "Mild Steel / SS / Aluminum" },
      { label: "Transit Type", value: "Bulk Liquid Logistics" }
    ],
    faqs: [
      { q: "Are your drivers trained for hazardous chemicals?", a: "Yes, all tanker drivers transporting chemicals hold valid Hazmat licenses and undergo rigorous safety and emergency response training." },
      { q: "Do you provide dedicated tankers to prevent cross-contamination?", a: "Yes, we provide dedicated tankers for specific industries (e.g., separate fleets for edible oils and industrial chemicals) to ensure zero contamination." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];
