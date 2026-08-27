import React, { useState, useMemo } from 'react';
import { 
  MOCK_COURSES, 
  MOCK_POINT_SCALE, 
  MOCK_GRADUATE_COURSES, 
  MOCK_CAREER_PATHS, 
  MOCK_MASTERS_PROGRAMS,
  MOCK_SUBJECT_LIST
} from './mockData';
import { 
  GraduationCap, 
  Award, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Building2, 
  Globe, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight, 
  Briefcase, 
  Sparkles, 
  Building, 
  MapPin, 
  DollarSign, 
  Compass, 
  ArrowUpRight, 
  BadgeCheck, 
  ShieldCheck, 
  Target 
} from 'lucide-react';

export default function App() {
  // Main Portal View Mode: 'undergraduate' | 'postgraduate'
  const [portalMode, setPortalMode] = useState('undergraduate');

  // ==================== UNDERGRADUATE PORTAL STATE ====================
  // Start with 3 empty subject slots (max 6 allowed)
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', level: 'NSSCO', grade: 'C' },
    { id: 2, name: '', level: 'NSSCO', grade: 'C' },
    { id: 3, name: '', level: 'NSSCO', grade: 'C' },
  ]);

  // Trigger state to show/calculate results after user clicks the button
  const [hasCalculated, setHasCalculated] = useState(false);

  const [activeTab, setActiveTab] = useState('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('All');
  const [minEmploymentFilter, setMinEmploymentFilter] = useState(0);
  const [onlyQualified, setOnlyQualified] = useState(false);

  // ==================== POSTGRADUATE PORTAL STATE ====================
  const [selectedGradDegreeId, setSelectedGradDegreeId] = useState('g1');
  const [postgradTab, setPostgradTab] = useState('employers'); // 'employers' | 'masters'
  const [customDegreeSearch, setCustomDegreeSearch] = useState('');
  const [masterTypeFilter, setMasterTypeFilter] = useState('All'); // 'All' | 'Local' | 'International'

  // Point mapping dictionary
  const pointMap = useMemo(() => {
    const map = {};
    MOCK_POINT_SCALE.forEach(item => {
      map[`${item.level}-${item.grade}`] = item.points;
    });
    return map;
  }, []);

  // Calculate Total APS and Total Subjects (only for subjects that have a selected name)
  const { totalPoints, subjectCount, evaluatedSubjects } = useMemo(() => {
    const validSubjects = subjects.filter(s => s.name.trim() !== '');
    let points = 0;
    const evaluated = validSubjects.map(sub => {
      const key = `${sub.level}-${sub.grade}`;
      const pts = pointMap[key] || 0;
      points += pts;
      return { ...sub, points: pts };
    });
    return {
      totalPoints: points,
      subjectCount: validSubjects.length,
      evaluatedSubjects: evaluated
    };
  }, [subjects, pointMap]);

  // Handlers for subject input (Maximum 6 subjects)
  const addSubject = () => {
    if (subjects.length < 6) {
      setSubjects([...subjects, { id: Date.now(), name: '', level: 'NSSCO', grade: 'C' }]);
    }
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(sub => sub.id === id ? { ...sub, [field]: value } : sub));
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  // Evaluate prerequisites
  const evaluatePrerequisites = (coursePrereqs) => {
    if (!coursePrereqs || coursePrereqs.length === 0) return true;
    return coursePrereqs.every(req => {
      const studentSub = evaluatedSubjects.find(s => s.name.toLowerCase() === req.subject_name.toLowerCase() && s.level === req.minimum_level);
      if (!studentSub) return false;
      
      const studentGradePoints = pointMap[`${studentSub.level}-${studentSub.grade}`] || 0;
      const reqGradePoints = pointMap[`${req.minimum_level}-${req.minimum_grade}`] || 0;
      return studentGradePoints >= reqGradePoints;
    });
  };

  // Filter undergraduate courses
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      if (activeTab === 'local' && course.universities.type !== 'Local') return false;
      if (activeTab === 'international' && course.universities.type !== 'International') return false;

      if (searchQuery && !course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) && !course.universities.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (selectedField !== 'All' && course.field_of_study !== selectedField) {
        return false;
      }

      if (course.employment_rate < minEmploymentFilter) {
        return false;
      }

      if (onlyQualified && course.minimum_points > totalPoints) {
        return false;
      }

      return true;
    }).map(course => {
      const prerequisitesMet = evaluatePrerequisites(course.prerequisites);
      const pointsMet = totalPoints >= course.minimum_points;
      return {
        ...course,
        prerequisitesMet,
        pointsMet
      };
    }).sort((a, b) => b.employment_rate - a.employment_rate);
  }, [activeTab, searchQuery, selectedField, minEmploymentFilter, onlyQualified, totalPoints, evaluatedSubjects]);

  // Gauge styling helper
  const getDemandBadge = (rate) => {
    if (rate >= 75) {
      return { label: `High Demand (${rate}%)`, bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', barColor: 'bg-emerald-500' };
    } else if (rate >= 50) {
      return { label: `Medium Demand (${rate}%)`, bg: 'bg-amber-100 text-amber-800 border-amber-300', barColor: 'bg-amber-500' };
    } else {
      return { label: `Low Demand (${rate}%)`, bg: 'bg-slate-100 text-slate-700 border-slate-300', barColor: 'bg-slate-400' };
    }
  };

  // Active Graduate Career Path Data
  const currentCareerPath = useMemo(() => {
    return MOCK_CAREER_PATHS[selectedGradDegreeId] || MOCK_CAREER_PATHS['g1'];
  }, [selectedGradDegreeId]);

  // Relevant Master's Programs for selected degree
  const relevantMasters = useMemo(() => {
    return MOCK_MASTERS_PROGRAMS.filter(m => {
      const matchesDegree = m.targetDegrees.includes(selectedGradDegreeId);
      const matchesType = masterTypeFilter === 'All' || m.type === masterTypeFilter;
      const matchesCustom = !customDegreeSearch || m.programTitle.toLowerCase().includes(customDegreeSearch.toLowerCase()) || m.university.toLowerCase().includes(customDegreeSearch.toLowerCase());
      return matchesDegree && matchesType && matchesCustom;
    }).sort((a, b) => b.marketDemandRating - a.marketDemandRating);
  }, [selectedGradDegreeId, masterTypeFilter, customDegreeSearch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.svg" 
              alt="EduPath Namibia Logo" 
              className="w-10 h-10 rounded-xl shadow-md transform hover:scale-105 transition-all"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white">EduPath Namibia</h1>
                <span className="bg-blue-800/90 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-700">
                  v2.0 Career & Alumni Hub
                </span>
              </div>
              <p className="text-xs text-blue-200">High School APS Calculator & Postgraduate Market Intelligence</p>
            </div>
          </div>

          {/* Top Portal Switcher (High School / Undergrad vs Postgraduate / Alumni) */}
          <div className="flex items-center bg-blue-900/90 p-1.5 rounded-2xl border border-blue-800/80 shadow-inner">
            <button
              onClick={() => setPortalMode('undergraduate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                portalMode === 'undergraduate'
                  ? 'bg-amber-400 text-blue-950 shadow-md scale-105'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Grade 12 / APS Calculator</span>
            </button>
            <button
              onClick={() => setPortalMode('postgraduate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                portalMode === 'postgraduate'
                  ? 'bg-amber-400 text-blue-950 shadow-md scale-105'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Postgraduate & Graduate Careers</span>
              <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                New
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MODE 1: UNDERGRADUATE & HIGH SCHOOL APS PORTAL */}
      {/* ========================================================================= */}
      {portalMode === 'undergraduate' && (
        <div className="flex-grow">
          {/* Sub-Header APS Banner */}
          <div className="bg-blue-900 text-white border-b border-blue-800 py-3 px-4 shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Select your NSSCO / NSSCAS subjects to see matching universities (UNAM, NUST, IUM, NIMT, VTC).</span>
              </div>

              <div className="flex items-center gap-3 bg-blue-950/80 px-4 py-1.5 rounded-xl border border-blue-800">
                <div className="text-right">
                  <div className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Total APS Score</div>
                  <div className="text-xl font-black text-amber-400">{hasCalculated ? totalPoints : 0} pts</div>
                </div>
                <div className="h-6 w-px bg-blue-800"></div>
                <div className="text-left">
                  <div className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Selected Subjects</div>
                  <div className="text-lg font-bold text-white">{subjectCount} / 6</div>
                </div>
              </div>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
            {/* Left Column: Calculator & Subject Dropdown Entry Form */}
            <section className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      NSSCO / NSSCAS Subject Entry
                    </h2>
                    <p className="text-xs text-slate-500">Select your subjects (3 empty initial slots, max 6 allowed)</p>
                  </div>
                  {subjects.length < 6 && (
                    <button 
                      onClick={addSubject}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all"
                    >
                      + Add Subject ({subjects.length}/6)
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {subjects.map((sub, index) => (
                    <div key={sub.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject #{index + 1}</span>
                        {subjects.length > 3 && (
                          <button 
                            onClick={() => removeSubject(sub.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-12 gap-2">
                        {/* Subject Name Dropdown Selection */}
                        <select
                          value={sub.name}
                          onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                          className="col-span-5 bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">-- Select Subject --</option>
                          {MOCK_SUBJECT_LIST.map((subjectName, i) => (
                            <option key={i} value={subjectName}>
                              {subjectName}
                            </option>
                          ))}
                        </select>

                        {/* Level Select */}
                        <select
                          value={sub.level}
                          onChange={(e) => updateSubject(sub.id, 'level', e.target.value)}
                          className="col-span-4 bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="NSSCO">NSSCO (Ordinary)</option>
                          <option value="NSSCAS">NSSCAS (Advanced)</option>
                        </select>

                        {/* Grade Select */}
                        <select
                          value={sub.grade}
                          onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                          className="col-span-3 bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          {sub.level === 'NSSCO' ? (
                            <>
                              <option value="A*">A* (8 pts)</option>
                              <option value="A">A (7 pts)</option>
                              <option value="B">B (6 pts)</option>
                              <option value="C">C (5 pts)</option>
                              <option value="D">D (4 pts)</option>
                              <option value="E">E (3 pts)</option>
                              <option value="F">F (2 pts)</option>
                              <option value="G">G (1 pt)</option>
                            </>
                          ) : (
                            <>
                              <option value="a">a (9 pts)</option>
                              <option value="b">b (8 pts)</option>
                              <option value="c">c (7 pts)</option>
                              <option value="d">d (6 pts)</option>
                              <option value="e">e (5 pts)</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculate Results Action Button */}
                <div className="mt-6 space-y-4">
                  <button
                    onClick={() => setHasCalculated(true)}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-black py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <CheckCircle className="w-5 h-5" /> Calculate Points & Get University Results
                  </button>

                  {/* Score Summary Box */}
                  {hasCalculated && (
                    <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl text-white flex items-center justify-between shadow-md animate-fade-in">
                      <div>
                        <div className="text-xs text-blue-200 font-medium">Calculated APS Points</div>
                        <div className="text-3xl font-black text-amber-400">{totalPoints} <span className="text-sm font-normal text-white">APS</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-blue-200">Evaluated Subjects</div>
                        <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1">
                          <CheckCircle className="w-4 h-4" /> {subjectCount} subjects matched
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Right Column: Search, Filter, and Course List */}
            <section className="lg:col-span-7 space-y-6">
              {/* Local vs International Tabs */}
              <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-sm border">
                <button
                  onClick={() => setActiveTab('local')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'local' 
                      ? 'bg-blue-900 text-white shadow' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Local Institutions (UNAM, NUST, IUM, NIMT, VTC)
                </button>
                <button
                  onClick={() => setActiveTab('international')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'international' 
                      ? 'bg-blue-900 text-white shadow' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  International Universities (SADC & Global)
                </button>
              </div>

              {/* Filters & Search Controls */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by course name or institution (e.g. Cybersecurity, NIMT, VTC, UNAM)..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  {/* Field Filter */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Field of Study</label>
                    <select
                      value={selectedField}
                      onChange={(e) => setSelectedField(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="All">All Fields</option>
                      <option value="IT">IT & Computer Science</option>
                      <option value="Engineering">Engineering & Vocational</option>
                      <option value="Health Sciences">Health Sciences</option>
                      <option value="Education">Education</option>
                      <option value="Business & Commerce">Business & Commerce</option>
                    </select>
                  </div>

                  {/* Employment Demand Filter */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Min. Job Demand ({minEmploymentFilter}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      step="10"
                      value={minEmploymentFilter}
                      onChange={(e) => setMinEmploymentFilter(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Qualification Checkbox */}
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlyQualified}
                        onChange={(e) => setOnlyQualified(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Only Show Courses I Qualify For</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Course Listings */}
              {!hasCalculated ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 shadow-sm">
                  <Compass className="w-10 h-10 text-blue-600 mx-auto animate-bounce" />
                  <h3 className="font-bold text-slate-800 text-base">Select Your Subjects & Press Calculate</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Please select your subjects from the dropdown list on the left, then click the <strong>Calculate Points & Get University Results</strong> button to view matching programs at UNAM, NUST, IUM, NIMT, VTC, and international universities.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                      <h3 className="font-bold text-slate-800 text-base">No Matching Courses Found</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try lowering your minimum employment demand filter or clearing search queries.
                      </p>
                    </div>
                  ) : (
                    filteredCourses.map(course => {
                      const demand = getDemandBadge(course.employment_rate);
                      return (
                        <div 
                          key={course.id}
                          className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6 ${
                            course.pointsMet ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'
                          }`}
                        >
                          <div className="space-y-3 flex-grow">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-800">
                                <img 
                                  src={course.universities.logo_url} 
                                  alt="logo" 
                                  className="w-4 h-4 rounded-full object-cover"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span>{course.universities.name}</span>
                              </div>
                              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">
                                {course.field_of_study}
                              </span>
                              <span className="text-xs text-slate-500">
                                {course.duration_years} Years
                              </span>
                            </div>

                            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                              {course.course_name}
                            </h3>

                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                              <span className="font-medium text-slate-600">Prerequisites:</span>
                              {course.prerequisites && course.prerequisites.length > 0 ? (
                                course.prerequisites.map((req, idx) => (
                                  <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                    {req.subject_name} ({req.minimum_level} {req.minimum_grade}+)
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 italic">No special prerequisites</span>
                              )}

                              {course.prerequisitesMet ? (
                                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold ml-auto md:ml-0">
                                  <CheckCircle className="w-3.5 h-3.5" /> Prerequisites Met
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full font-bold ml-auto md:ml-0">
                                  <XCircle className="w-3.5 h-3.5" /> Prereqs Unmet
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[220px] gap-4">
                            <div className="flex md:flex-col items-center md:items-end justify-between w-full">
                              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Min Points Required</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-lg font-black text-slate-800">{course.minimum_points} pts</span>
                                {course.pointsMet ? (
                                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                    Qualified
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                                    Need {course.minimum_points - totalPoints} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="w-full space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-medium text-slate-500 flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3 text-slate-400" /> Job Market Demand
                                </span>
                                <span className="font-bold text-slate-800">{course.employment_rate}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${demand.barColor}`}
                                  style={{ width: `${course.employment_rate}%` }}
                                ></div>
                              </div>
                              <div className="text-[10px] text-right font-semibold text-slate-500">
                                {demand.label}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: POSTGRADUATE & ALUMNI CAREER INTEL PORTAL */}
      {/* ========================================================================= */}
      {portalMode === 'postgraduate' && (
        <div className="flex-grow bg-slate-100 pb-16">
          {/* Postgraduate Hero Header */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white py-10 px-4 border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-4 h-4" /> Graduate & Alumni Career Intelligence
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Postgraduate Career & Market-Favorable Master's Portal
              </h2>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                Already graduated with a Bachelor's degree? Enter your completed course to discover top employer opportunities in Namibia and SADC, or explore market-favorable Master's programs designed to accelerate your career instead of leaving you stranded.
              </p>

              {/* Undergraduate Degree Selector Bar */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4 text-xs font-semibold text-blue-200">
                  <label className="block text-slate-300 font-bold mb-1">Select Your Completed Degree / Course:</label>
                  <select
                    value={selectedGradDegreeId}
                    onChange={(e) => setSelectedGradDegreeId(e.target.value)}
                    className="w-full bg-slate-900 text-amber-300 font-bold border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-inner"
                  >
                    {MOCK_GRADUATE_COURSES.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-8 flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Market Outlook</span>
                    <div className="text-base font-extrabold text-emerald-400 flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-emerald-400" /> {currentCareerPath.marketStatus}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Est. Graduate Salary</span>
                    <div className="text-sm font-bold text-amber-300 flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-amber-400" /> {currentCareerPath.avgStartingSalary}
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Employment Rate</span>
                    <div className="text-base font-extrabold text-white">
                      {currentCareerPath.employmentDemand}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Postgraduate Content Area */}
          <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Postgraduate Feature Toggle Tabs */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setPostgradTab('employers')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                    postgradTab === 'employers'
                      ? 'bg-blue-950 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building className="w-4 h-4 text-amber-400" />
                  Target Employers & Career Opportunities ({currentCareerPath.employers.length})
                </button>
                <button
                  onClick={() => setPostgradTab('masters')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                    postgradTab === 'masters'
                      ? 'bg-blue-950 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Market-Favorable Master's Recommendations ({relevantMasters.length})
                </button>
              </div>

              {postgradTab === 'masters' && (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={masterTypeFilter}
                    onChange={(e) => setMasterTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="All">All Universities (Local & SADC)</option>
                    <option value="Local">Local Universities (UNAM/NUST/IUM)</option>
                    <option value="International">International / Distance (UCT/Global)</option>
                  </select>
                </div>
              )}
            </div>

            {/* TAB 1: TARGET EMPLOYERS & INDUSTRY MATCHING */}
            {postgradTab === 'employers' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      Companies & Industries Hiring {currentCareerPath.degreeName} Graduates
                    </h3>
                    <p className="text-xs text-slate-500">
                      Top Namibian and SADC enterprises actively recruiting graduates with your qualification.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCareerPath.roles.map((role, i) => (
                      <span key={i} className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCareerPath.employers.map((emp, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <img 
                              src={emp.logo} 
                              alt={emp.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div>
                              <h4 className="font-extrabold text-slate-900 text-base">{emp.name}</h4>
                              <span className="text-xs font-medium text-slate-500">{emp.sector}</span>
                            </div>
                          </div>
                          {emp.graduateProgram && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Grad Trainee Scheme
                            </span>
                          )}
                        </div>

                        <div className="pt-2 flex flex-wrap gap-2 text-xs">
                          <span className="flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {emp.locations.join(', ')}
                          </span>
                          <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg font-semibold">
                            <Target className="w-3.5 h-3.5 text-blue-500" /> {emp.hiringStatus}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Placement Potential</span>
                        <button className="text-blue-600 hover:text-blue-800 font-extrabold flex items-center gap-1 hover:underline">
                          View Graduate Portal <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MARKET-FAVORABLE MASTER'S & POSTGRADUATE RECOMMENDATIONS */}
            {postgradTab === 'masters' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl border border-amber-200 p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-amber-950 text-base">
                        Why Market-Favorable Master's Recommendations Matter
                      </h3>
                      <p className="text-xs text-amber-900/80 leading-relaxed">
                        Many graduates pursue general Master's degrees without checking industry demand, resulting in post-graduation unemployment. Our algorithm filters and suggests <strong>only high-ROI, market-aligned Master's degrees</strong> in Namibia and SADC that guarantee career advancement, executive salary upgrades, or specialized skill advantages.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {relevantMasters.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="font-bold text-slate-800">No Master's Programs Found</h4>
                      <p className="text-xs text-slate-500">Try changing the university location filter above.</p>
                    </div>
                  ) : (
                    relevantMasters.map(master => (
                      <div 
                        key={master.id}
                        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-5"
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> {master.marketTag}
                              </span>
                              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                {master.type} University
                              </span>
                              <span className="text-xs font-semibold text-slate-500">
                                Duration: {master.duration}
                              </span>
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight pt-1">
                              {master.programTitle}
                            </h3>
                            <div className="text-xs font-extrabold text-blue-700 flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" /> {master.university}
                            </div>
                          </div>

                          {/* Market Demand Gauge */}
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right min-w-[180px]">
                            <div className="text-[10px] text-slate-500 font-semibold uppercase">Market Alignment Index</div>
                            <div className="text-2xl font-black text-emerald-600">{master.marketDemandRating} / 100</div>
                            <div className="text-[10px] text-slate-400 font-medium">ROI Rating: {master.roiScore}</div>
                          </div>
                        </div>

                        {/* Analysis & Value Proposition */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-1">
                            <span className="font-extrabold text-blue-900 uppercase text-[10px] tracking-wider block">
                              Why This Master's Prevents Unemployment:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-medium">
                              {master.whyThisMaster}
                            </p>
                          </div>

                          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-1">
                            <span className="font-extrabold text-emerald-900 uppercase text-[10px] tracking-wider block">
                              Expected Executive Roles:
                            </span>
                            <p className="text-slate-700 leading-relaxed font-bold">
                              {master.careerAdvancement}
                            </p>
                          </div>
                        </div>

                        {/* Entry Prerequisites */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                          <div>
                            <span className="font-bold text-slate-800">Admission Prerequisite: </span>
                            <span>{master.entryRequirements}</span>
                          </div>
                          <button className="bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-900 transition-all flex items-center gap-1 self-end sm:self-auto">
                            View Admission Requirements <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Footer Instructions for Supabase Integration */}
      <footer className="bg-slate-900 text-slate-300 py-6 border-t border-slate-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 EduPath Namibia. Comprehensive High School & Postgraduate Career Intelligence Platform.</p>
          <div className="flex items-center gap-4">
            <span className="bg-slate-800 px-3 py-1 rounded text-slate-400 border border-slate-700">
              Supabase Backend Schema & Seed Script ready in <code>/supabase/schema_and_seed.sql</code>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
