import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Star, Phone, MapPin, Clock,
  Heart, Shield, Zap, Users, FlaskConical, Award,
  Stethoscope, Baby, Syringe, FileText, Activity,
  ArrowRight, CheckCircle, ChevronRight, Quote,
  Microscope, Pill, Clipboard, HeartPulse, Brain, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Insurance Plans", href: "#insurance" },
  { label: "Our Team", href: "#team" },
  { label: "Patient Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  { icon: Clipboard, label: "Annual Physical Exams", desc: "Comprehensive yearly health evaluations for all ages" },
  { icon: Stethoscope, label: "Treatment of Illness", desc: "Expert diagnosis and treatment for acute and chronic conditions" },
  { icon: Heart, label: "Wellness Visits", desc: "Preventive care focused on keeping you at your healthiest" },
  { icon: Baby, label: "Pediatric Care", desc: "Gentle, compassionate care for your little ones" },
  { icon: Syringe, label: "Vaccinations", desc: "Full immunization services for children and adults" },
  { icon: Activity, label: "Flu Shots", desc: "Seasonal flu vaccines to protect your whole family" },
  { icon: Microscope, label: "TB Tests", desc: "Tuberculosis testing for work, school, and travel" },
  { icon: FileText, label: "Preoperative Exams", desc: "Surgical clearance evaluations performed efficiently" },
  { icon: HeartPulse, label: "EKG", desc: "Electrocardiogram testing for heart health monitoring" },
  { icon: Shield, label: "Immigration Medical Exams", desc: "USCIS-compliant immigration health evaluations" },
  { icon: Brain, label: "Chronic Disease Management", desc: "Ongoing care plans for diabetes, hypertension, and more" },
  { icon: Eye, label: "Preventive Care", desc: "Screenings and education to prevent illness before it starts" },
];

const WHY_CARDS = [
  { icon: Award, title: "Experienced Physicians", desc: "19+ years of combined clinical expertise dedicated to your health" },
  { icon: Heart, title: "Personalized Care", desc: "Every treatment plan tailored specifically to your unique needs" },
  { icon: Shield, title: "Preventive Medicine", desc: "We focus on keeping you well, not just treating illness" },
  { icon: Zap, title: "Minimal Wait Times", desc: "Efficient scheduling so you spend less time waiting, more time living" },
  { icon: FlaskConical, title: "On-site Laboratory", desc: "Convenient in-house testing for fast, accurate results" },
  { icon: Users, title: "Trusted Community Clinic", desc: "Proudly serving the Anaheim community for nearly two decades" },
];

const INSURANCE = [
  "Medi-Cal", "Blue Shield", "Medicare", "Health Net",
  "Aetna", "Cigna", "UnitedHealthcare", "Tricare",
  "Anthem Blue Cross", "Humana", "MultiPlan", "CalOptima",
];

const TESTIMONIALS = [
  {
    name: "Maria G.",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format",
    text: "Dr. Marks has been our family doctor for over 8 years. She is incredibly thorough, compassionate, and always makes us feel heard. We wouldn't trust anyone else with our children's care.",
    role: "Patient since 2016",
  },
  {
    name: "James T.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    text: "Santa Marya Clinic is exceptional. Dr. Faltas caught a condition that two other doctors had missed. His attention to detail and genuine care for his patients is unmatched in Anaheim.",
    role: "Patient since 2019",
  },
  {
    name: "Linda R.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    text: "The entire staff is warm and welcoming. The clinic feels like a second home. They truly care about your long-term well-being, not just the appointment. I recommend them to everyone I know.",
    role: "Patient since 2014",
  },
];

const FAQS = [
  {
    q: "What services do you provide?",
    a: "We offer a comprehensive range of primary care services including annual physicals, illness treatment, wellness visits, pediatric care, vaccinations, flu shots, TB tests, preoperative exams, EKG, immigration medical exams, chronic disease management, and preventive care.",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes, we proudly accept most major insurance plans including Medi-Cal, Blue Shield, Medicare, Health Net, Aetna, Cigna, UnitedHealthcare, Tricare, Anthem Blue Cross, Humana, MultiPlan, and CalOptima. Please contact our office to verify your specific coverage.",
  },
  {
    q: "Do you provide physical exams?",
    a: "Absolutely. We provide comprehensive annual physical exams for patients of all ages, as well as sports physicals, school physicals, preoperative exams, and immigration medical exams.",
  },
  {
    q: "Do you offer vaccinations?",
    a: "Yes, we offer a full range of immunizations for both children and adults, including flu shots, TB tests, and standard childhood and adult vaccination schedules.",
  },
  {
    q: "What are your office hours?",
    a: "We are open Monday through Friday from 8:00 AM to 5:00 PM. We are closed on weekends. Same-day appointments are available for urgent needs — please call us as early as possible.",
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop&auto=format", alt: "Clinic reception area", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1758691462445-d03a94aa7656?w=400&h=400&fit=crop&auto=format", alt: "Doctor examining patient", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=500&fit=crop&auto=format", alt: "Laboratory equipment", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?w=600&h=400&fit=crop&auto=format", alt: "Doctor with patient family", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=400&h=300&fit=crop&auto=format", alt: "Medical team", span: "col-span-1" },
];

const BLOG_POSTS = [
  {
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=380&fit=crop&auto=format",
    tag: "Healthy Living",
    title: "5 Habits That Transform Your Long-Term Health",
    excerpt: "Small daily choices compound into life-changing outcomes. Our physicians share the evidence-backed habits they recommend to every patient.",
    date: "June 18, 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=380&fit=crop&auto=format",
    tag: "Preventive Care",
    title: "Why Annual Physicals Are Your Best Health Investment",
    excerpt: "Catching conditions early saves lives and costs. Learn what your doctor looks for during a comprehensive annual exam and why it matters.",
    date: "May 30, 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=380&fit=crop&auto=format",
    tag: "Vaccination Tips",
    title: "The Complete Vaccination Guide for Families in 2025",
    excerpt: "From newborns to grandparents, staying up-to-date on immunizations protects the whole family. Here is what you need to know this year.",
    date: "May 12, 2025",
  },
];

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-[#2E7FBF]/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2E7FBF] to-[#43B3AE] flex items-center justify-center shadow-lg shadow-[#2E7FBF]/25">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="leading-tight">
              <div
                className={`font-bold text-sm tracking-wide transition-colors ${
                  scrolled ? "text-[#0f2137]" : "text-white"
                }`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Santa Marya
              </div>
              <div
                className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
                  scrolled ? "text-[#2E7FBF]" : "text-white/70"
                }`}
              >
                Family Medicine
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[#2E7FBF]/10 ${
                  scrolled ? "text-[#0f2137] hover:text-[#2E7FBF]" : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Phone CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+17142369663"
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] text-white text-sm font-semibold shadow-lg shadow-[#2E7FBF]/30 hover:shadow-xl hover:shadow-[#2E7FBF]/40 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Phone className="w-4 h-4" />
              (714) 236-9663
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-[#0f2137]" : "text-white"
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-[#2E7FBF]/10 px-6 py-6"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => { scrollTo(link.href); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#0f2137] hover:text-[#2E7FBF] hover:bg-[#EBF4FB] transition-all"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2E7FBF]/10 mb-5">
      <div className="w-1.5 h-1.5 rounded-full bg-[#2E7FBF]" />
      <span className="text-[#2E7FBF] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </span>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1758691462126-2ee47c8bf9e7?w=1600&h=900&fit=crop&auto=format"
          alt="Doctor consulting with patient family"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2137]/85 via-[#0f2137]/60 to-[#2E7FBF]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2137]/40 via-transparent to-transparent" />
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#43B3AE]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[#6BCB77]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: headline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#6BCB77] animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>
              Now Accepting New Patients
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Healthcare Your
            <br />
            <span className="bg-gradient-to-r from-[#43B3AE] to-[#6BCB77] bg-clip-text text-transparent">
              Family Can Trust.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-white/75 leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Providing compassionate, comprehensive healthcare for every stage of life with experienced physicians dedicated to your family's well-being.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] text-white font-semibold text-base shadow-2xl shadow-[#2E7FBF]/40 hover:shadow-[#2E7FBF]/60 hover:-translate-y-1 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-base hover:bg-white/25 hover:-translate-y-1 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* Right: floating cards */}
        <div className="hidden lg:flex flex-col gap-4 items-end">
          {[
            { icon: "✓", title: "19+ Years Experience", sub: "Trusted clinical expertise" },
            { icon: "✓", title: "Same-Day Care", sub: "Urgent appointments available" },
            { icon: "✓", title: "Most Insurance Accepted", sub: "12+ major providers" },
            { icon: "✓", title: "Compassionate Medical Team", sub: "Doctors who truly listen" },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-xl hover:-translate-y-1 transition-transform duration-300 min-w-72"
              style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate` }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6BCB77] to-[#43B3AE] flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                {card.icon}
              </div>
              <div>
                <div className="text-white font-semibold text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>{card.title}</div>
                <div className="text-white/60 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{card.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

function WhySection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F8FBFD] blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Why Families Choose{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Santa Marya
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8] max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Delivering exceptional care with the warmth and expertise your family deserves — every visit, every time.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CARDS.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <div className="group bg-white border border-[#2E7FBF]/10 rounded-3xl p-8 hover:shadow-xl hover:shadow-[#2E7FBF]/10 hover:-translate-y-2 transition-all duration-400 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EBF4FB] to-[#EBF4FB] group-hover:from-[#2E7FBF] group-hover:to-[#43B3AE] flex items-center justify-center mb-6 transition-all duration-400">
                  <card.icon className="w-6 h-6 text-[#2E7FBF] group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="font-bold text-lg text-[#0f2137] mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {card.title}
                </h3>
                <p className="text-[#6b8fa8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {card.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const timeline = [
    { year: "2005", label: "Clinic Founded", desc: "Santa Marya opened its doors to serve the Anaheim community" },
    { year: "2010", label: "Expanded Services", desc: "Added on-site lab, EKG, and immigration medical exams" },
    { year: "2018", label: "Community Award", desc: "Recognized as a top family medicine practice in Orange County" },
    { year: "2024", label: "19+ Years Strong", desc: "Continuing to grow while staying true to our patient-first values" },
  ];

  return (
    <section id="about" className="py-28 bg-[#F8FBFD] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#43B3AE]/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <FadeUp className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#2E7FBF]/15">
              <img
                src="https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=800&h=640&fit=crop&auto=format"
                alt="Santa Marya medical team"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2137]/60 via-transparent to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 flex items-center gap-5">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-[#2E7FBF]" style={{ fontFamily: "Manrope, sans-serif" }}>19+</div>
                  <div className="text-xs text-[#6b8fa8] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Years Serving</div>
                </div>
                <div className="w-px h-12 bg-[#2E7FBF]/15" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-[#43B3AE]" style={{ fontFamily: "Manrope, sans-serif" }}>5,000+</div>
                  <div className="text-xs text-[#6b8fa8] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Families Served</div>
                </div>
                <div className="w-px h-12 bg-[#2E7FBF]/15" />
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-[#6BCB77]" style={{ fontFamily: "Manrope, sans-serif" }}>98%</div>
                  <div className="text-xs text-[#6b8fa8] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Patient Satisfaction</div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Content */}
          <div>
            <FadeUp delay={0.1}>
              <SectionLabel>About the Clinic</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-6 leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                Healing Lives,<br />
                <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
                  Nurturing Health
                </span>
              </h2>
              <p className="text-[#6b8fa8] leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Founded in 2005, Santa Marya Family Medicine Clinic has been a cornerstone of compassionate healthcare in Anaheim, CA. Led by Dr. Catherine Marks and Dr. Moussa Faltas — each with over 19 years of clinical experience — we deliver personalized care built on lasting relationships.
              </p>
              <p className="text-[#6b8fa8] leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
                We believe great healthcare goes beyond treating illness — it means understanding the whole person. Our comfortable environment and customized treatment plans ensure every patient feels heard, valued, and cared for.
              </p>
            </FadeUp>

            {/* Values */}
            <FadeUp delay={0.2} className="flex flex-col gap-3 mb-10">
              {[
                "Patient-centered care at every stage of life",
                "Preventive medicine to stop illness before it starts",
                "Long-term relationships built on trust",
                "Comfortable, welcoming clinic environment",
              ].map((val) => (
                <div key={val} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6BCB77]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-[#6BCB77]" />
                  </div>
                  <span className="text-[#0f2137] text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{val}</span>
                </div>
              ))}
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.3}>
              <div className="border-l-2 border-[#2E7FBF]/20 pl-6 space-y-6">
                {timeline.map((t, i) => (
                  <div key={t.year} className="relative">
                    <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-[#2E7FBF] shadow-md shadow-[#2E7FBF]/40" />
                    <div className="text-[#2E7FBF] text-xs font-bold tracking-wide mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{t.year}</div>
                    <div className="font-semibold text-[#0f2137] text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>{t.label}</div>
                    <div className="text-[#6b8fa8] text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Our Services</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Comprehensive Care for{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Every Need
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8] max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            From routine checkups to specialized procedures — all the primary care your family needs, under one roof.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.label} delay={i * 0.04}>
              <div className="group bg-[#F8FBFD] border border-[#2E7FBF]/8 rounded-3xl p-6 hover:bg-white hover:shadow-xl hover:shadow-[#2E7FBF]/12 hover:-translate-y-2 transition-all duration-400 cursor-default h-full">
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#2E7FBF] group-hover:to-[#43B3AE] shadow-sm flex items-center justify-center mb-5 transition-all duration-400">
                  <svc.icon className="w-5 h-5 text-[#2E7FBF] group-hover:text-white transition-colors duration-400" />
                </div>
                <h3 className="font-bold text-[#0f2137] text-sm mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {svc.label}
                </h3>
                <p className="text-[#6b8fa8] text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {svc.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const doctors = [
    {
      name: "Dr. Catherine Marks",
      specialty: "Family Medicine Physician",
      photo: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=500&h=500&fit=crop&auto=format",
      years: "19+ Years Experience",
      bio: "Dr. Marks brings warmth and clinical excellence to every patient interaction. Board-certified in Family Medicine, she is passionate about preventive care and helping patients achieve lifelong wellness.",
      badges: ["Board Certified", "Family Medicine", "Preventive Care"],
    },
    {
      name: "Dr. Moussa Faltas",
      specialty: "Family Medicine Physician",
      photo: "https://images.unsplash.com/photo-1584940120505-117038d90b05?w=500&h=500&fit=crop&auto=format",
      years: "19+ Years Experience",
      bio: "Dr. Faltas is known for his thorough diagnostic approach and compassionate bedside manner. He specializes in chronic disease management and believes deeply in building long-term patient relationships.",
      badges: ["Board Certified", "Chronic Disease", "Patient Advocacy"],
    },
  ];

  return (
    <section id="team" className="py-28 bg-[#F8FBFD] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2E7FBF]/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Meet Our Doctors</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Expert Physicians,{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Genuine Care
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8] max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Our physicians combine deep clinical expertise with a personal commitment to your health and happiness.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {doctors.map((doc, i) => (
            <FadeUp key={doc.name} delay={i * 0.15}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-[#2E7FBF]/8 border border-[#2E7FBF]/8 hover:shadow-xl hover:shadow-[#2E7FBF]/15 hover:-translate-y-1 transition-all duration-400">
                <div className="flex gap-6 p-8">
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[#EBF4FB] shadow-md">
                      <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-xl text-[#0f2137] mb-0.5" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {doc.name}
                    </h3>
                    <p className="text-[#2E7FBF] text-sm font-semibold mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                      {doc.specialty}
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-[#6BCB77]/15 px-3 py-1 rounded-full mb-4">
                      <Award className="w-3 h-3 text-[#6BCB77]" />
                      <span className="text-[#3a7a42] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{doc.years}</span>
                    </div>
                    <p className="text-[#6b8fa8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {doc.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {doc.badges.map((b) => (
                        <span key={b} className="px-3 py-1 rounded-full bg-[#EBF4FB] text-[#2E7FBF] text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsuranceSection() {
  return (
    <section id="insurance" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#EBF4FB_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Insurance Plans</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            We Proudly Accept Most{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Major Insurance Providers
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8] max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Quality healthcare should be accessible. We partner with leading insurers to make your visits affordable.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {INSURANCE.map((ins, i) => (
              <motion.div
                key={ins}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[#2E7FBF]/12 rounded-2xl p-5 flex items-center justify-center shadow-sm hover:shadow-lg hover:shadow-[#2E7FBF]/10 transition-shadow cursor-default"
              >
                <span className="text-[#0f2137] font-semibold text-sm text-center leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {ins}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2} className="mt-10 text-center">
          <p className="text-[#6b8fa8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Don't see your plan? Call us at{" "}
            <a href="tel:+17142369663" className="text-[#2E7FBF] font-semibold hover:underline">
              (714) 236-9663
            </a>{" "}
            — we may still be able to help.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="stories" className="py-28 bg-gradient-to-br from-[#0f2137] to-[#1a3a5c] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#2E7FBF]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#43B3AE]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#43B3AE]" />
            <span className="text-[#43B3AE] text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Patient Stories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Voices of Our{" "}
            <span className="bg-gradient-to-r from-[#43B3AE] to-[#6BCB77] bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Real patients, real results. Hear what families are saying about Santa Marya.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-3xl p-8 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300">
                <Quote className="w-8 h-8 text-[#43B3AE]/60 mb-5" />
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed text-sm mb-7" style={{ fontFamily: "Inter, sans-serif" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2E7FBF]/30 flex-shrink-0">
                    <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>{t.name}</div>
                    <div className="text-white/45 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 bg-[#F8FBFD]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8]" style={{ fontFamily: "Inter, sans-serif" }}>
            Everything you need to know before your visit.
          </p>
        </FadeUp>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="bg-white border border-[#2E7FBF]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
                >
                  <span className="font-semibold text-[#0f2137] text-base" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EBF4FB] flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-[#2E7FBF]" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6">
                        <div className="w-full h-px bg-[#2E7FBF]/10 mb-5" />
                        <p className="text-[#6b8fa8] leading-relaxed text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Visit Our Clinic</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            We Are Here{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              for You
            </span>
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <FadeUp>
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-[#2E7FBF]/12 border border-[#2E7FBF]/10 bg-[#EBF4FB] h-96 flex items-center justify-center relative">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #dce8f5 25%, #c8dcef 25%, #c8dcef 50%, #dce8f5 50%, #dce8f5 75%, #c8dcef 75%)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#2E7FBF] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#2E7FBF]/40">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-5 shadow-lg">
                  <div className="font-bold text-[#0f2137] text-lg mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>Santa Marya Family Medicine</div>
                  <div className="text-[#6b8fa8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>3400 W. Ball Rd, Suite 202</div>
                  <div className="text-[#6b8fa8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Anaheim, CA 92804</div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Info */}
          <FadeUp delay={0.15}>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  lines: ["3400 W. Ball Rd, Suite 202", "Anaheim, CA 92804"],
                  color: "#2E7FBF",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  lines: ["+1 (714) 236-9663"],
                  color: "#43B3AE",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  lines: ["Monday – Friday: 8:00 AM – 5:00 PM", "Saturday: Closed", "Sunday: Closed"],
                  color: "#6BCB77",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-[#F8FBFD] border border-[#2E7FBF]/8 hover:shadow-md transition-shadow">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2137] text-sm mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>{item.title}</div>
                    {item.lines.map((line) => (
                      <div key={line} className="text-[#6b8fa8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-28 bg-[#F8FBFD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137] mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>
            Our{" "}
            <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
              Clinic
            </span>
          </h2>
          <p className="text-lg text-[#6b8fa8] max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            A welcoming, modern environment designed for your comfort and care.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`${item.span} rounded-3xl overflow-hidden bg-[#EBF4FB] shadow-lg shadow-[#2E7FBF]/8`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function HealthTipsSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <SectionLabel>Health Tips</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0f2137]" style={{ fontFamily: "Manrope, sans-serif" }}>
              Insights for a{" "}
              <span className="bg-gradient-to-r from-[#2E7FBF] to-[#43B3AE] bg-clip-text text-transparent">
                Healthier Life
              </span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[#2E7FBF] font-semibold text-sm hover:gap-3 transition-all" style={{ fontFamily: "Inter, sans-serif" }}>
            View All Articles <ArrowRight className="w-4 h-4" />
          </button>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-7">
          {BLOG_POSTS.map((post, i) => (
            <FadeUp key={post.title} delay={i * 0.1}>
              <div className="group bg-white border border-[#2E7FBF]/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#2E7FBF]/12 hover:-translate-y-2 transition-all duration-400 cursor-default">
                <div className="overflow-hidden h-52 bg-[#EBF4FB]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <div className="inline-flex items-center gap-1.5 bg-[#2E7FBF]/10 px-3 py-1 rounded-full mb-4">
                    <span className="text-[#2E7FBF] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>{post.tag}</span>
                  </div>
                  <h3 className="font-bold text-[#0f2137] text-lg mb-3 leading-snug" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-[#6b8fa8] text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6b8fa8] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{post.date}</span>
                    <button className="flex items-center gap-1 text-[#2E7FBF] text-xs font-semibold hover:gap-2 transition-all" style={{ fontFamily: "Inter, sans-serif" }}>
                      Read More <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0f2137] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2E7FBF] to-[#43B3AE] flex items-center justify-center shadow-lg shadow-[#2E7FBF]/40">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white" style={{ fontFamily: "Manrope, sans-serif" }}>Santa Marya</div>
                <div className="text-[10px] font-medium tracking-widest uppercase text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>Family Medicine Clinic</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
              Healing Lives, Nurturing Health — serving the Anaheim community with compassion since 2005.
            </p>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-white/50 text-xs ml-2 self-center" style={{ fontFamily: "Inter, sans-serif" }}>5.0 Rating</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm text-white mb-5 tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 text-sm hover:text-[#43B3AE] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm text-white mb-5 tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((svc) => (
                <li key={svc.label}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-white/50 text-sm hover:text-[#43B3AE] transition-colors text-left"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {svc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm text-white mb-5 tracking-wide" style={{ fontFamily: "Manrope, sans-serif" }}>Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#43B3AE] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>3400 W. Ball Rd, Suite 202</div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Anaheim, CA 92804</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#43B3AE] flex-shrink-0 mt-0.5" />
                <a href="tel:+17142369663" className="text-white/70 text-sm hover:text-[#43B3AE] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                  +1 (714) 236-9663
                </a>
              </div>
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-[#43B3AE] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/70 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Mon – Fri: 8:00 AM – 5:00 PM</div>
                  <div className="text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Sat & Sun: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/35 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            © {year} Santa Marya Family Medicine Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-white/35 text-xs hover:text-white/60 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Privacy Policy
            </button>
            <button className="text-white/35 text-xs hover:text-white/60 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FBFD]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <HeroSection />
      <WhySection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <InsuranceSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <GallerySection />
      <HealthTipsSection />
      <Footer />
    </div>
  );
}
