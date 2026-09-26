/** Project data — portfolio project entries with case study content. */
const projects = [
  {
    id: 'torqvia',
    title: 'TORQVIA',
    subtitle: 'Intelligent ML-Powered Bike Ecosystem',
    category: 'Intelligent Bike Ecosystem / ML',
    shortDescription:
      'An intelligent, ML-powered bike ecosystem designed to help riders and prospective buyers understand bike valuation, receive personalized recommendations, and forecast maintenance requirements through model-driven intelligence.',
    fullDescription:
      'TORQVIA is an intelligent, ML-powered bike ecosystem that combines practical bike ownership and purchasing functionality with intelligent, data-driven features. The platform is designed to help users make better decisions about their bikes — whether they already own a motorcycle or are planning to acquire one.',
    status:
      'TORQVIA is currently under active development and its intelligent capabilities are under continuous refinement.',
    overview:
      'TORQVIA is an intelligent, ML-powered bike ecosystem designed to help users make better decisions about their bikes — whether they already own one or are planning to purchase one. The platform combines practical bike ownership, discovery, and purchasing functionality with data-driven intelligence.\n\nThe core purpose of TORQVIA revolves around helping users understand their bike’s real market value, choose a suitable motorcycle tailored to their individual needs, and proactively anticipate maintenance requirements through intelligent prediction and recommendation systems.',
    problem:
      'Bike owners and prospective buyers face multiple challenges throughout the motorcycle ownership and purchasing lifecycle:\n\n• Difficulty determining the current and fair market value of an owned bike due to unstandardized depreciation and opaque pricing.\n• Difficulty deciding which bike best matches an individual’s specific riding requirements, ergonomic needs, experience level, and budget.\n• Uncertainty around upcoming maintenance, including when maintenance may be required, why it is needed, and what the expected service costs will be.\n• Fragmented bike-related services, tools, and information spread across disconnected platforms.',
    solution:
      'TORQVIA brings these capabilities together into a single, cohesive bike ecosystem powered by three major intelligent capabilities:\n\n• Bike Value Prediction: A model-driven valuation system that estimates the current market value of a user’s bike based on relevant vehicle specifications, mileage, age, condition, and market attributes.\n• Bike Recommendation: An intelligent recommendation model that helps users identify which motorcycle is most suitable for them based on stated requirements, riding preferences, experience, and bike characteristics.\n• Maintenance Prediction: A predictive system that estimates when maintenance may be required, the specific service reason/type expected, and the projected maintenance cost.\n\nSupporting ecosystem features — including bike discovery, search, marketplace listings, buyer-seller communication, and inventory tools — operate as supporting components to deliver an end-to-end digital experience.',
    approach:
      'The platform follows a structured data science and engineering approach:\n\n1. Data Ingestion & Structuring: Collect and structure relevant bike specifications, user preference signals, market pricing histories, and maintenance-related indicators.\n2. Exploratory Analysis & Preprocessing: Process, clean, and analyze datasets using Python-based data science libraries.\n3. Feature Engineering: Engineer relevant domain features for the prediction and recommendation tasks (depreciation curves, power-to-weight ratios, price-per-cc, mileage-to-age indices).\n4. Model Development & Evaluation: Develop and evaluate suitable machine learning models for bike value prediction, personalized recommendation, and maintenance forecasting.\n5. Backend API Integration: Integrate the intelligent capabilities with the full-stack application through decoupled Django REST Framework backend APIs.\n6. User Interface & Delivery: Deliver predictions and recommendations through an accessible, fast, and responsive React single-page application.',
    features: [
      'Current Bike Value Prediction — Model-driven valuation estimating fair market value based on bike and market-related attributes',
      'Personalized Bike Recommendation — Matching individual user requirements, preferences, and riding profiles to suitable motorcycles',
      'Predictive Bike Maintenance — Forecasting upcoming maintenance dates, service reasons, and estimated maintenance costs',
      'Bike Discovery & Search — Comprehensive search and exploration across motorcycle specifications and variants',
      'Bike Listings & Marketplace — Verified pre-owned bike listings as a supporting ecosystem feature',
      'Buyer-Seller Communication — Direct communication and inquiry workflows between platform users',
      'Dealer & Inventory Functionality — Structured inventory management and dealer tools',
      'Authentication & Platform Services — Secure user authentication, cloud asset handling, and RESTful service architecture',
    ],
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'Matplotlib',
      'React',
      'Vite',
      'Django',
      'Django REST Framework',
      'MySQL',
      'Cloudinary',
      'Git',
      'GitHub',
    ],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 1,
  },
  {
    id: 'oncosphere',
    title: 'OncoSphere',
    category: 'Healthcare Platform / Full-Stack',
    problemHeading: 'The Problem',
    solutionHeading: 'The Solution',
    shortDescription:
      'A comprehensive healthcare platform designed to digitize and simplify cancer care, streamlining patient registration, appointments, specialist connections, and administrative workflows with scalable, AI-ready architecture.',
    fullDescription:
      'OncoSphere Cancer Institute is a comprehensive healthcare platform designed to digitize and simplify cancer care. The platform enables patients to book appointments, explore treatments, connect with specialists, access medical services, and receive a seamless digital healthcare experience. Built with a scalable architecture, it integrates modern UI, secure authentication, and AI-ready modules to support future intelligent healthcare solutions.',
    overview:
      'OncoSphere Cancer Institute is a comprehensive healthcare platform designed to digitize and simplify cancer care. The platform enables patients to book appointments, explore treatments, connect with specialists, access medical services, and receive a seamless digital healthcare experience. Built with a scalable architecture, it integrates modern UI, secure authentication, and AI-ready modules to support future intelligent healthcare solutions.',
    problem:
      'Many healthcare websites provide limited digital services, making appointment booking, treatment discovery, and patient interaction inefficient and difficult to manage.',
    solution:
      'Developed a scalable full-stack healthcare platform that streamlines patient registration, appointment scheduling, treatment information, doctor management, and administrative workflows while providing a clean, responsive, and accessible user experience.',
    features: [
      'Patient registration and profile management',
      'Specialist connection and appointment scheduling',
      'Treatment discovery and medical service catalog',
      'Administrative and doctor management workflows',
      'Secure authentication and scalable architecture',
      'AI-ready modular integration layer',
    ],
    technologies: ['Python', 'Django', 'React', 'MySQL'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 2,
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Prediction',
    category: 'Machine Learning',
    shortDescription:
      'A machine learning project that uses housing-related features to estimate property prices through data processing and model training.',
    fullDescription: `A machine learning project that uses housing-related features to estimate property prices. The project covers the full ML pipeline — dataset processing, feature preparation, model training, prediction, and evaluation.`,
    approach:
      'Followed a standard ML workflow: data exploration, preprocessing (handling missing values), feature selection, model training with Linear Regression, and evaluation using standard regression metrics.',
    problem:
      'Estimating property prices manually is time-consuming and inconsistent. ML models can provide data-driven price estimates based on housing features.',
    features: [
      'Dataset exploration and preprocessing',
      'Feature selection and preparation',
      'Linear Regression model training',
      'Prediction and evaluation pipeline',
      'Visualization of actual vs. predicted prices',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 3,
  },
];

export default projects;
