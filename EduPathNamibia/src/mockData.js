export const MOCK_POINT_SCALE = [
  { level: 'NSSCO', grade: 'A*', points: 8 },
  { level: 'NSSCO', grade: 'A', points: 7 },
  { level: 'NSSCO', grade: 'B', points: 6 },
  { level: 'NSSCO', grade: 'C', points: 5 },
  { level: 'NSSCO', grade: 'D', points: 4 },
  { level: 'NSSCO', grade: 'E', points: 3 },
  { level: 'NSSCO', grade: 'F', points: 2 },
  { level: 'NSSCO', grade: 'G', points: 1 },
  { level: 'NSSCAS', grade: 'a', points: 9 },
  { level: 'NSSCAS', grade: 'b', points: 8 },
  { level: 'NSSCAS', grade: 'c', points: 7 },
  { level: 'NSSCAS', grade: 'd', points: 6 },
  { level: 'NSSCAS', grade: 'e', points: 5 },
];

export const MOCK_SUBJECT_LIST = [
  'Mathematics',
  'English Second Language',
  'Oshindonga First Language',
  'Oshikwanyama First Language',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Design & Technology',
  'Geography',
  'Development Studies',
  'Agriculture',
  'Accounting',
  'Economics',
  'Business Studies',
  'Afrikaans',
  'Otjiherero First Language'
];

export const MOCK_UNIVERSITIES = [
  { id: 'u1', name: 'University of Namibia (UNAM)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop' },
  { id: 'u2', name: 'Namibia University of Science and Technology (NUST)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop' },
  { id: 'u3', name: 'International University of Management (IUM)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop' },
  { id: 'u5', name: 'Namibian Institute of Mining and Technology (NIMT)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop' },
  { id: 'u6', name: 'Vocational Training Centre (VTC / Windhoek VTC)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=100&h=100&fit=crop' },
  { id: 'u4', name: 'University of Cape Town (UCT)', type: 'International', country: 'South Africa', logo_url: 'https://images.unsplash.com/photo-14982436915f1-85584852028e?w=100&h=100&fit=crop' },
];

export const MOCK_COURSES = [
  {
    id: 'c1',
    university_id: 'u2',
    course_name: 'BSc Cybersecurity',
    field_of_study: 'IT',
    minimum_points: 25,
    employment_rate: 88.0,
    duration_years: 4,
    universities: { name: 'Namibia University of Science and Technology (NUST)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Mathematics', minimum_level: 'NSSCO', minimum_grade: 'C' },
      { subject_name: 'English Second Language', minimum_level: 'NSSCO', minimum_grade: 'C' }
    ]
  },
  {
    id: 'c2',
    university_id: 'u1',
    course_name: 'Bachelor of Education',
    field_of_study: 'Education',
    minimum_points: 22,
    employment_rate: 65.0,
    duration_years: 4,
    universities: { name: 'University of Namibia (UNAM)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'English Second Language', minimum_level: 'NSSCO', minimum_grade: 'D' }
    ]
  },
  {
    id: 'c3',
    university_id: 'u1',
    course_name: 'B.Eng Mining Engineering',
    field_of_study: 'Engineering',
    minimum_points: 30,
    employment_rate: 92.0,
    duration_years: 4,
    universities: { name: 'University of Namibia (UNAM)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Mathematics', minimum_level: 'NSSCAS', minimum_grade: 'c' },
      { subject_name: 'Physics', minimum_level: 'NSSCAS', minimum_grade: 'c' }
    ]
  },
  {
    id: 'c4',
    university_id: 'u3',
    course_name: 'Bachelor of Nursing',
    field_of_study: 'Health Sciences',
    minimum_points: 24,
    employment_rate: 80.0,
    duration_years: 4,
    universities: { name: 'International University of Management (IUM)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Biology', minimum_level: 'NSSCO', minimum_grade: 'C' },
      { subject_name: 'English Second Language', minimum_level: 'NSSCO', minimum_grade: 'C' }
    ]
  },
  {
    id: 'c5',
    university_id: 'u4',
    course_name: 'Bachelor of Business Science',
    field_of_study: 'Business & Commerce',
    minimum_points: 34,
    employment_rate: 85.0,
    duration_years: 3,
    universities: { name: 'University of Cape Town (UCT)', type: 'International', country: 'South Africa', logo_url: 'https://images.unsplash.com/photo-14982436915f1-85584852028e?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Mathematics', minimum_level: 'NSSCAS', minimum_grade: 'b' },
      { subject_name: 'English Second Language', minimum_level: 'NSSCO', minimum_grade: 'B' }
    ]
  },
  {
    id: 'c6',
    university_id: 'u5',
    course_name: 'National Diploma in Mining Electrical & Instrumentation',
    field_of_study: 'Engineering',
    minimum_points: 20,
    employment_rate: 91.0,
    duration_years: 3,
    universities: { name: 'Namibian Institute of Mining and Technology (NIMT)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Mathematics', minimum_level: 'NSSCO', minimum_grade: 'D' },
      { subject_name: 'Physics', minimum_level: 'NSSCO', minimum_grade: 'E' }
    ]
  },
  {
    id: 'c7',
    university_id: 'u6',
    course_name: 'National Technical Certificate in Mechanical Fitting & Turning',
    field_of_study: 'Engineering',
    minimum_points: 18,
    employment_rate: 84.0,
    duration_years: 3,
    universities: { name: 'Vocational Training Centre (VTC / Windhoek VTC)', type: 'Local', country: 'Namibia', logo_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=100&h=100&fit=crop' },
    prerequisites: [
      { subject_name: 'Mathematics', minimum_level: 'NSSCO', minimum_grade: 'E' },
      { subject_name: 'English Second Language', minimum_level: 'NSSCO', minimum_grade: 'E' }
    ]
  }
];

export const MOCK_GRADUATE_COURSES = [
  { id: 'g1', name: 'BSc Computer Science / IT / Cybersecurity', category: 'IT & Software' },
  { id: 'g2', name: 'B.Eng Mining / Civil / Mechanical Engineering', category: 'Engineering & Energy' },
  { id: 'g3', name: 'Bachelor of Accounting / Finance / Economics', category: 'Business & Finance' },
  { id: 'g4', name: 'Bachelor of Nursing / Public Health', category: 'Health Sciences' },
  { id: 'g5', name: 'Bachelor of Education (Secondary/Primary)', category: 'Education' },
  { id: 'g6', name: 'Bachelor of Science in Environmental / Agricultural Science', category: 'Agriculture & Science' },
];

export const MOCK_CAREER_PATHS = {
  'g1': {
    degreeName: 'BSc Computer Science / IT / Cybersecurity',
    employmentDemand: 91,
    marketStatus: 'High Market Demand',
    avgStartingSalary: 'N$ 18,000 - N$ 32,000 / month',
    roles: ['Cybersecurity Analyst', 'Cloud Infrastructure Engineer', 'Full-Stack Developer', 'IT Systems Auditor', 'Data Engineer'],
    employers: [
      { name: 'MTC Namibia', sector: 'Telecommunications & ICT', locations: ['Windhoek'], hiringStatus: 'Actively Hiring Graduates', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop' },
      { name: 'Capricorn Group (Bank Windhoek)', sector: 'Financial Services & FinTech', locations: ['Windhoek'], hiringStatus: 'High Demand for Tech Grads', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop' },
      { name: 'Telecom Namibia', sector: 'Telecommunications', locations: ['Windhoek', 'Walvis Bay'], hiringStatus: 'Hiring IT Specialists', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop' },
      { name: 'PwC Namibia / Deloitte', sector: 'IT Risk Advisory & Audit', locations: ['Windhoek'], hiringStatus: 'Annual Graduate Intake', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop' }
    ]
  },
  'g2': {
    degreeName: 'B.Eng Mining / Civil / Mechanical Engineering',
    employmentDemand: 94,
    marketStatus: 'Critical Industry Skill',
    avgStartingSalary: 'N$ 25,000 - N$ 45,000 / month',
    roles: ['Mining Operations Engineer', 'Metallurgical Engineer', 'Project Manager', 'Safety & Environmental Engineer'],
    employers: [
      { name: 'Debmarine Namibia / De Beers', sector: 'Diamond Mining & Marine Technology', locations: ['Oranjemund', 'Offshore', 'Windhoek'], hiringStatus: 'High Priority Graduate Trainee Intake', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=100&h=100&fit=crop' },
      { name: 'Rössing Uranium / Swakop Uranium', sector: 'Uranium Energy Mining', locations: ['Arandis', 'Swakopmund'], hiringStatus: 'Actively Recruiting Engineers', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop' },
      { name: 'NamPower', sector: 'Energy & Electrical Infrastructure', locations: ['Windhoek', 'National Grid'], hiringStatus: 'Graduate Engineering Trainees', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop' }
    ]
  },
  'g3': {
    degreeName: 'Bachelor of Accounting / Finance / Economics',
    employmentDemand: 86,
    marketStatus: 'Steady High Demand',
    avgStartingSalary: 'N$ 16,000 - N$ 28,000 / month',
    roles: ['Financial Analyst', 'Trainee Accountant (CTA)', 'Credit Risk Officer', 'Tax Consultant', 'Management Accountant'],
    employers: [
      { name: 'First National Bank (FNB) Namibia', sector: 'Banking & Financial Markets', locations: ['Windhoek', 'Swakopmund'], hiringStatus: 'Graduate Leadership Program', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=100&h=100&fit=crop' },
      { name: 'Standard Bank Namibia', sector: 'Commercial & Investment Banking', locations: ['Windhoek'], hiringStatus: 'Actively Recruiting Finance Grads', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&h=100&fit=crop' },
      { name: 'Ernst & Young (EY) Namibia', sector: 'Professional Services & Audit', locations: ['Windhoek', 'Walvis Bay'], hiringStatus: 'Annual Trainee Intake', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop' }
    ]
  },
  'g4': {
    degreeName: 'Bachelor of Nursing / Public Health',
    employmentDemand: 89,
    marketStatus: 'High Healthcare Demand',
    avgStartingSalary: 'N$ 15,000 - N$ 25,000 / month',
    roles: ['Registered Nurse', 'Public Health Officer', 'Clinical Researcher', 'Occupational Health Advisor'],
    employers: [
      { name: 'Ministry of Health and Social Services (MoHSS)', sector: 'Public Healthcare', locations: ['Nationwide Hospitals'], hiringStatus: 'Immediate Placement Available', graduateProgram: false, logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop' },
      { name: 'Mediclinic Namibia', sector: 'Private Healthcare', locations: ['Windhoek', 'Swakopmund'], hiringStatus: 'Recruiting Qualified Nurses', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=100&h=100&fit=crop' },
      { name: 'CDC / WHO Country Office', sector: 'Global Public Health & NGOs', locations: ['Windhoek'], hiringStatus: 'Project-based Fellowships', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop' }
    ]
  },
  'g5': {
    degreeName: 'Bachelor of Education (Secondary/Primary)',
    employmentDemand: 68,
    marketStatus: 'Moderate Market Demand',
    avgStartingSalary: 'N$ 12,000 - N$ 20,000 / month',
    roles: ['Secondary School Teacher (STEM / Languages)', 'Curriculum Developer', 'Educational Consultant', 'Corporate Trainer'],
    employers: [
      { name: 'Ministry of Education, Arts & Culture', sector: 'Public Schools', locations: ['Nationwide'], hiringStatus: 'Regional Posting Recruitment', graduateProgram: false, logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop' },
      { name: 'Private Schools Association (St. Pauls, DHPS, Windhoek Gymnasium)', sector: 'Private Education', locations: ['Windhoek', 'Swakopmund'], hiringStatus: 'Selective Subject Hiring (Maths/Science)', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop' }
    ]
  },
  'g6': {
    degreeName: 'Bachelor of Science in Environmental / Agricultural Science',
    employmentDemand: 82,
    marketStatus: 'Emerging Green Economy',
    avgStartingSalary: 'N$ 14,000 - N$ 26,000 / month',
    roles: ['Environmental Impact Assessor', 'Agronomist', 'Sustainability Specialist', 'Green Hydrogen Analyst'],
    employers: [
      { name: 'Hyphen Hydrogen Energy / Green Hydrogen Project', sector: 'Green Energy & Renewables', locations: ['Lüderitz', 'Windhoek'], hiringStatus: 'High Priority Future Industry', graduateProgram: true, logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=100&h=100&fit=crop' },
      { name: 'Ministry of Environment, Forestry & Tourism', sector: 'Public Sector & Conservation', locations: ['Windhoek', 'National Parks'], hiringStatus: 'Field & Officer Positions', graduateProgram: false, logo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=100&h=100&fit=crop' }
    ]
  }
};

export const MOCK_MASTERS_PROGRAMS = [
  {
    id: 'm1',
    targetDegrees: ['g1'],
    programTitle: 'MSc Cybersecurity & Cloud Architecture',
    university: 'Namibia University of Science and Technology (NUST)',
    type: 'Local',
    duration: '2 Years (Part-Time / Full-Time)',
    marketDemandRating: 96,
    marketTag: 'High Market Demand',
    marketTagColor: 'emerald',
    roiScore: '9.4 / 10',
    whyThisMaster: 'Namibia and regional SADC financial sector faces a severe shortage of certified Cloud & Cyber Lead Architects. Guarantees top executive salary potential.',
    careerAdvancement: 'Senior CISO (Chief Info Security Officer), IT Director, Cloud Solutions Architect',
    entryRequirements: 'Bachelor degree in Computer Science, IT, or Electrical Engineering with 60%+ average.'
  },
  {
    id: 'm2',
    targetDegrees: ['g1', 'g3'],
    programTitle: 'Master of Science in Business Analytics & Artificial Intelligence',
    university: 'University of Cape Town (UCT) / Online distance available',
    type: 'International',
    duration: '18 Months (Distance Learning)',
    marketDemandRating: 95,
    marketTag: 'Future-Proof & High ROI',
    marketTagColor: 'emerald',
    roiScore: '9.6 / 10',
    whyThisMaster: 'Bridges computer science with business strategy. Corporate banking, mining, and telecoms pay premium rates for data-driven executive leadership.',
    careerAdvancement: 'Head of Data & AI, Lead Business Analytics Consultant, FinTech Founder',
    entryRequirements: 'Honours or Bachelor degree with quantitative background (IT, Accounting, Maths, Statistics).'
  },
  {
    id: 'm3',
    targetDegrees: ['g2'],
    programTitle: 'MSc Mineral Economics & Sustainable Mining',
    university: 'University of Namibia (UNAM) - Southern Campus',
    type: 'Local',
    duration: '2 Years (Modular / Block Release)',
    marketDemandRating: 93,
    marketTag: 'Critical Sector Leader',
    marketTagColor: 'emerald',
    roiScore: '9.2 / 10',
    whyThisMaster: 'Transitional mining laws and green hydrogen require engineering managers who understand international mineral economics and project finance.',
    careerAdvancement: 'Mine Manager, Mineral Asset Analyst, Director of Energy & Resource Planning',
    entryRequirements: 'B.Eng Degree in Mining, Metallurgy, Civil, or Earth Sciences.'
  },
  {
    id: 'm4',
    targetDegrees: ['g3'],
    programTitle: 'Master of Business Administration (MBA) in Financial Technology',
    university: 'International University of Management (IUM) / Business School',
    type: 'Local',
    duration: '2 Years (Evening / Weekend)',
    marketDemandRating: 90,
    marketTag: 'High Career Growth',
    marketTagColor: 'emerald',
    roiScore: '8.9 / 10',
    whyThisMaster: 'Prepares traditional accounting and finance graduates for executive leadership roles in modern digital banking and corporate strategy.',
    careerAdvancement: 'Chief Financial Officer (CFO), Bank Country Manager, Investment Director',
    entryRequirements: 'Bachelor degree in Accounting, Business, or Economics + 2 years work experience.'
  },
  {
    id: 'm5',
    targetDegrees: ['g4'],
    programTitle: 'Master of Public Health (MPH) in Epidemiology & Health Management',
    university: 'University of Namibia (UNAM)',
    type: 'Local',
    duration: '2 Years (Blended Learning)',
    marketDemandRating: 88,
    marketTag: 'High Market Demand',
    marketTagColor: 'emerald',
    roiScore: '8.8 / 10',
    whyThisMaster: 'Elevates bedside nursing practice into regional healthcare policymaking, WHO consultancy, and health facility directorship.',
    careerAdvancement: 'Hospital Administrator, Regional Health Director, WHO / UN Health Specialist',
    entryRequirements: 'Bachelor of Nursing, Medicine, or Pharmacy.'
  },
  {
    id: 'm6',
    targetDegrees: ['g5'],
    programTitle: 'Master of Education in STEM Curriculum & Educational Leadership',
    university: 'Namibia University of Science and Technology (NUST)',
    type: 'Local',
    duration: '2 Years (Part-Time)',
    marketDemandRating: 75,
    marketTag: 'Favorable Leadership Path',
    marketTagColor: 'amber',
    roiScore: '7.8 / 10',
    whyThisMaster: 'A plain Master in Education often yields limited corporate value. STEM & Educational Leadership specialization unlocks School Principal roles and NIED policy positions.',
    careerAdvancement: 'School Principal, NIED Senior Inspector, Higher Education Lecturer',
    entryRequirements: 'Bachelor of Education + 2 years teaching experience.'
  },
  {
    id: 'm7',
    targetDegrees: ['g6'],
    programTitle: 'MSc Environmental Management & Green Hydrogen Technologies',
    university: 'University of Namibia (UNAM) & German Partner University',
    type: 'Local',
    duration: '2 Years (Full-Time)',
    marketDemandRating: 97,
    marketTag: 'Top Market Demand (Green Hydrogen)',
    marketTagColor: 'emerald',
    roiScore: '9.8 / 10',
    whyThisMaster: 'Namibia is positioning itself as Africa\'s Green Hydrogen Capital. Graduates with this specialized MSc are directly headhunted by global energy consortiums.',
    careerAdvancement: 'Senior Sustainability Manager, Green Hydrogen Project Lead, ESG Director',
    entryRequirements: 'BSc in Environmental Science, Chemistry, Biology, Agriculture, or Chemical Engineering.'
  }
];

