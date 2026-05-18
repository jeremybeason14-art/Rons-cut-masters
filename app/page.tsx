'use client';

import { useEffect, useRef, useState } from 'react';

const elevatorFloors = [
  { id: 'hero', label: 'Hero' },
  { id: 'feature', label: 'Features' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'contact', label: 'Contact' },
];

function ElevatorIntro({
  onOpenStart,
  onOpenComplete,
}: {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const openElevator = () => {
    setIsOpen(true);
    onOpenStart();
    window.setTimeout(() => {
      setShowIntro(false);
      onOpenComplete();
    }, 1500);
  };

  if (!showIntro) {
    return null;
  }

  return (
    <div
      className={`elevator-intro-overlay ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Vertical Solutions elevator intro"
    >
      <div className="elevator-intro-door elevator-intro-door-left"></div>
      <div className="elevator-intro-door elevator-intro-door-right"></div>
      <div className="elevator-intro-seam" aria-hidden="true"></div>
      <div className="elevator-intro-panel">
        <div className="elevator-intro-indicator" aria-hidden="true">
          <span></span>
        </div>
        <p className="elevator-intro-kicker">Premium Elevator & Escalator Services</p>
        <h1>Vertical Solutions</h1>
        <button type="button" onClick={openElevator} className="elevator-intro-button">
          Open Elevator
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const snapPageRef = useRef<HTMLElement | null>(null);
  const contactFormRef = useRef<HTMLDivElement | null>(null);
  const snapRestoreTimeoutRef = useRef<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFloor, setActiveFloor] = useState(0);
  const [elevatorProgress, setElevatorProgress] = useState(0);
  const [introPhase, setIntroPhase] = useState<'closed' | 'opening' | 'done'>('closed');
  const [isContactHighlighted, setIsContactHighlighted] = useState(false);

  const featureOptions = [
    {
      label: 'Elevator Systems',
      title: 'Smart elevator service from cab to controller',
      description:
        'Preventive maintenance, diagnostics, modernization planning, and urgent repairs built around uptime for commercial properties.',
      stats: ['24/7 dispatch', 'Code-focused work', 'Modernization ready'],
    },
    {
      label: 'Escalator Systems',
      title: 'Escalator programs for high-traffic buildings',
      description:
        'Inspection, cleaning, adjustment, and repair workflows designed for retail, transit-adjacent, and office environments.',
      stats: ['Step-chain checks', 'Handrail service', 'Safety calibration'],
    },
  ];

  useEffect(() => {
    const snapPage = snapPageRef.current;

    if (!snapPage) {
      return;
    }

    const sections = Array.from(snapPage.querySelectorAll<HTMLElement>('.reveal-section, .story-reveal'));
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      snapPage.dataset.scrollDir = currentScrollY >= lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    };

    updateScrollDirection();
    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.setAttribute('data-visible', 'true'));
      return () => window.removeEventListener('scroll', updateScrollDirection);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          target.dataset.scrollDir = snapPage.dataset.scrollDir ?? 'down';

          if (entry.isIntersecting) {
            target.setAttribute('data-visible', 'true');
          } else {
            target.setAttribute('data-visible', 'false');
          }
        });
      },
      {
        root: null,
        rootMargin: '-8% 0px -18% 0px',
        threshold: 0.28,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const getFloorElements = () =>
      elevatorFloors
        .map((floor) => document.getElementById(floor.id))
        .filter((section): section is HTMLElement => Boolean(section));

    const updateElevatorPosition = () => {
      const sections = getFloorElements();

      if (sections.length < 2) {
        return;
      }

      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      const sectionTops = sections.map((section) => section.offsetTop);
      let currentIndex = 0;

      for (let index = 0; index < sectionTops.length - 1; index += 1) {
        if (viewportAnchor >= sectionTops[index] && viewportAnchor < sectionTops[index + 1]) {
          currentIndex = index;
          break;
        }

        if (viewportAnchor >= sectionTops[sectionTops.length - 1]) {
          currentIndex = sectionTops.length - 1;
        }
      }

      const nextIndex = Math.min(currentIndex + 1, sectionTops.length - 1);
      const currentTop = sectionTops[currentIndex];
      const nextTop = sectionTops[nextIndex];
      const betweenSections = nextTop > currentTop ? (viewportAnchor - currentTop) / (nextTop - currentTop) : 0;
      const progressIndex = currentIndex + Math.min(Math.max(betweenSections, 0), 1);
      const progress = (progressIndex / (sections.length - 1)) * 100;

      setElevatorProgress(progress);
    };

    const scheduleElevatorUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateElevatorPosition);
    };

    updateElevatorPosition();
    window.addEventListener('scroll', scheduleElevatorUpdate, { passive: true });
    window.addEventListener('resize', scheduleElevatorUpdate);

    if (!('IntersectionObserver' in window)) {
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('scroll', scheduleElevatorUpdate);
        window.removeEventListener('resize', scheduleElevatorUpdate);
      };
    }

    const activeFloorObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextFloor = elevatorFloors.findIndex((floor) => floor.id === visibleEntry.target.id);

        if (nextFloor >= 0) {
          setActiveFloor(nextFloor);
        }
      },
      {
        root: null,
        rootMargin: '-24% 0px -42% 0px',
        threshold: [0.25, 0.35, 0.5, 0.65],
      }
    );

    getFloorElements().forEach((section) => activeFloorObserver.observe(section));

    return () => {
      window.cancelAnimationFrame(frame);
      activeFloorObserver.disconnect();
      window.removeEventListener('scroll', scheduleElevatorUpdate);
      window.removeEventListener('resize', scheduleElevatorUpdate);
    };
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleBookNowClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsContactHighlighted(true);

    window.setTimeout(() => {
      contactFormRef.current?.focus({ preventScroll: true });
    }, 650);

    window.setTimeout(() => {
      setIsContactHighlighted(false);
    }, 2100);
  };

  const scrollToHeroImmediately = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setActiveFloor(0);
    setElevatorProgress(0);
  };

  const setScrollSnapEnabled = (enabled: boolean) => {
    document.documentElement.style.scrollSnapType = enabled ? '' : 'none';

    if (snapPageRef.current) {
      snapPageRef.current.style.scrollSnapType = enabled ? '' : 'none';
    }
  };

  const handleIntroOpenStart = () => {
    if (snapRestoreTimeoutRef.current) {
      window.clearTimeout(snapRestoreTimeoutRef.current);
    }

    setScrollSnapEnabled(false);
    scrollToHeroImmediately();
    setIntroPhase('opening');
  };

  const handleIntroOpenComplete = () => {
    setIntroPhase('done');
    scrollToHeroImmediately();

    window.requestAnimationFrame(() => {
      scrollToHeroImmediately();

      snapRestoreTimeoutRef.current = window.setTimeout(() => {
        scrollToHeroImmediately();
        setScrollSnapEnabled(true);
      }, 120);
    });
  };

  useEffect(() => {
    return () => {
      if (snapRestoreTimeoutRef.current) {
        window.clearTimeout(snapRestoreTimeoutRef.current);
      }

      document.documentElement.style.scrollSnapType = '';
    };
  }, []);

  return (
    <div
      className={`site-stage w-full bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d] ${
        introPhase === 'closed' ? 'intro-active' : ''
      } ${introPhase === 'opening' ? 'intro-opening' : ''}`}
    >
      {introPhase !== 'done' && (
        <ElevatorIntro
          onOpenStart={handleIntroOpenStart}
          onOpenComplete={handleIntroOpenComplete}
        />
      )}

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#c9a961]/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 flex justify-between items-center gap-3 sm:gap-6">
          <div className="min-w-0 text-base font-bold leading-tight sm:text-2xl">
            <span className="gradient-text">Vertical Solutions</span>
          </div>
          <div className="hidden md:flex gap-9 items-center text-sm">
            <a href="#feature" className="hover:text-[#c9a961] transition-smooth">
              Feature
            </a>
            <a href="#services" className="hover:text-[#c9a961] transition-smooth">
              Services
            </a>
            <a href="#why-us" className="hover:text-[#c9a961] transition-smooth">
              Why Us
            </a>
            <a href="#contact" className="hover:text-[#c9a961] transition-smooth">
              Contact
            </a>
          </div>
          <button type="button" onClick={handleBookNowClick} className="book-now-button">
            <span className="book-now-icon" aria-hidden="true"></span>
            Book Now
          </button>
        </nav>
      </header>

      <aside className="elevator-nav" aria-label="Section navigation">
        <div className="elevator-label" style={{ top: `${elevatorProgress}%` }}>
          Level {activeFloor + 1}: {elevatorFloors[activeFloor].label}
        </div>
        <div className="elevator-shaft" aria-hidden="true">
          <div className="elevator-cable"></div>
          <div className="elevator-car" style={{ top: `${elevatorProgress}%` }}>
            <span></span>
          </div>
        </div>
        <div className="elevator-floors">
          {elevatorFloors.map((floor, index) => (
            <a
              key={floor.id}
              href={`#${floor.id}`}
              className={`elevator-floor ${activeFloor === index ? 'is-active' : ''}`}
              aria-label={`Go to level ${index + 1}: ${floor.label}`}
              aria-current={activeFloor === index ? 'true' : undefined}
              style={{ top: `${(index / (elevatorFloors.length - 1)) * 100}%` }}
            >
              <span className="elevator-floor-dot"></span>
              <span className="elevator-floor-text">{index + 1}</span>
            </a>
          ))}
        </div>
      </aside>

      <main ref={snapPageRef} className="snap-page flex flex-col">
      {/* Hero Section */}
      <section
        id="hero"
        className="snap-section reveal-section order-1 relative min-h-[100dvh] w-full overflow-hidden px-4 pt-28 pb-16 sm:min-h-screen sm:px-0 sm:pb-20"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <div 
          className="hero-visual absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Animated Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-transparent to-[#1a1a1a]">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a961] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#8b7355] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div
          className="hero-content reveal-content relative z-10 flex flex-col items-center px-0 sm:px-8 lg:px-10"
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1 className="reveal-heading mx-auto w-full max-w-[23rem] text-center text-[3rem] font-bold leading-none sm:max-w-none sm:text-6xl sm:leading-[1.08] lg:text-7xl xl:text-8xl">
            <span className="gradient-text">Vertical</span> Elevation{' '}
            <span className="text-[#c9a961]">Excellence</span>
          </h1>
          <div className="mx-auto mt-6 mb-10 flex w-full max-w-[780px] justify-center text-center sm:mt-8 sm:mb-24">
            <p className="mx-auto w-full text-center text-base leading-7 text-gray-300 sm:text-xl sm:leading-8">
              Premium elevator and escalator solutions for the modern building. Trusted by over 500+ businesses across the DMV area.
            </p>
          </div>
          <div
            className="mx-auto flex w-full flex-col items-center gap-5 text-center sm:w-auto sm:flex-row"
            style={{
              justifyContent: 'center',
              marginTop: '32px',
            }}
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#c9a961] to-[#e5d4b8] text-black font-bold rounded-lg hover-lift animate-pulse-glow text-center"
            >
              Request Service
            </a>
            <a
              href="tel:+12024234218"
              className="w-full sm:w-auto px-9 py-4 bg-transparent border-2 border-[#c9a961] text-[#c9a961] font-bold rounded-lg hover:bg-[#c9a961] hover:text-black transition-smooth text-center"
            >
              Call Now: (202) 423-4218
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="snap-section reveal-section order-3 w-full min-h-0 px-4 py-24 sm:min-h-[100svh] sm:py-32 sm:px-8 lg:px-10 bg-black/40">
        <div className="reveal-content max-w-7xl mx-auto">
          <div className="reveal-heading text-center mb-12 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-400 text-base leading-7 sm:text-lg max-w-2xl mx-auto">
              Comprehensive elevator and escalator solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: 'Elevator Maintenance',
                description: 'Preventive maintenance programs to keep your elevators running smoothly and safely.',
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85',
                tone: 'maintenance',
              },
              {
                title: 'Elevator Repairs',
                description: 'Fast emergency and routine repair services to minimize downtime for your building.',
                image: 'https://images.pexels.com/photos/34734503/pexels-photo-34734503.jpeg?auto=compress&cs=tinysrgb&w=1200',
                tone: 'repair',
              },
              {
                title: 'New Installations',
                description: 'Expert installation of modern elevator systems for new construction and renovations.',
                image: 'https://images.pexels.com/photos/19697828/pexels-photo-19697828.jpeg?auto=compress&cs=tinysrgb&w=1200',
                tone: 'installation',
              },
              {
                title: 'Elevator Modernization',
                description: 'Upgrade aging systems with the latest technology and safety features.',
                image: 'https://images.pexels.com/photos/16026070/pexels-photo-16026070.jpeg?auto=compress&cs=tinysrgb&w=1200',
                tone: 'modernization',
              },
              {
                title: 'Escalator Services',
                description: 'Complete escalator installation, maintenance, and repair services.',
                image: 'https://images.pexels.com/photos/9504463/pexels-photo-9504463.jpeg?auto=compress&cs=tinysrgb&w=1200',
                tone: 'escalator',
              },
              {
                title: 'Emergency Service',
                description: '24/7 emergency response team available for critical situations.',
                image: 'https://images.pexels.com/photos/36140506/pexels-photo-36140506.jpeg?auto=compress&cs=tinysrgb&w=1200',
                tone: 'emergency',
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`service-card service-card-${service.tone} reveal-card group relative h-[340px] overflow-hidden rounded-lg border border-[#c9a961]/20 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] sm:h-[410px]`}
              >
                <div 
                  className="service-card-image absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                  }}
                ></div>
                <div className="service-card-overlay absolute inset-0"></div>
                <div className="service-card-glow absolute inset-0"></div>
                <div className="relative z-10 flex h-full flex-col justify-end p-8 text-left">
                  <h3 className="mb-5 text-2xl font-bold text-white">{service.title}</h3>
                  <p className="max-w-sm leading-relaxed text-gray-200">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Section */}
      <section id="feature" className="snap-section reveal-section order-2 w-full min-h-0 px-4 py-24 sm:min-h-[100svh] sm:py-28 sm:px-8 lg:py-32 lg:px-10">
        <div className="reveal-content mx-auto flex min-h-0 max-w-6xl items-center sm:min-h-[calc(100svh-12rem)]">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-24 xl:gap-28">
            <div className="reveal-item max-w-xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#c9a961]">Interactive Systems</p>
              <h2 className="reveal-heading mb-8 text-4xl font-bold leading-tight sm:mb-10 sm:text-5xl">
                Vertical mobility, <span className="gradient-text">presented clearly</span>
              </h2>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-5">
                {featureOptions.map((feature, index) => (
                  <button
                    key={feature.label}
                    type="button"
                    onClick={() => setActiveFeature(index)}
                    className={`feature-tab group rounded-lg border px-7 py-7 text-left transition-smooth ${
                      activeFeature === index
                        ? 'is-active border-[#f0d896] bg-gradient-to-br from-[#f0d896] via-[#c9a961] to-[#8b7355] text-black shadow-[0_24px_58px_rgba(201,169,97,0.32)]'
                        : 'border-[#c9a961]/55 bg-black/45 text-[#f5f5f5] hover:border-[#e5d4b8]/90 hover:bg-white/[0.08] hover:shadow-[0_22px_54px_rgba(201,169,97,0.18)]'
                    }`}
                    aria-pressed={activeFeature === index}
                  >
                    <span className="flex items-center gap-5">
                      <span className={`feature-tab-icon ${index === 0 ? 'feature-tab-icon-elevator' : 'feature-tab-icon-escalator'}`} aria-hidden="true">
                        <span></span>
                      </span>
                      <span>
                        <span className="block text-xl font-extrabold leading-tight">{feature.label}</span>
                        <span className={`mt-2 block text-xs font-semibold uppercase tracking-[0.18em] ${
                          activeFeature === index ? 'text-black/60' : 'text-[#c9a961]'
                        }`}>
                          Level 0{index + 1}
                        </span>
                        <span className="feature-tab-action mt-4 inline-flex text-[0.68rem] font-extrabold uppercase tracking-[0.2em]">
                          View System
                        </span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div key={activeFeature} className="feature-copy-panel glass-effect rounded-lg p-6 sm:p-10">
                <h3 className="mb-5 text-2xl font-bold leading-tight text-white">{featureOptions[activeFeature].title}</h3>
                <p className="mb-9 text-base leading-8 text-gray-300">{featureOptions[activeFeature].description}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {featureOptions[activeFeature].stats.map((stat) => (
                    <div key={stat} className="flex min-h-16 items-center rounded-lg border border-[#c9a961]/25 bg-black/35 px-5 py-4 text-sm font-semibold leading-snug text-[#e5d4b8]">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`feature-visual reveal-card relative min-h-[340px] overflow-hidden rounded-lg border border-[#c9a961]/25 bg-black/45 shadow-2xl shadow-black/30 sm:min-h-[560px] ${
              activeFeature === 0 ? 'is-elevator' : 'is-escalator'
            }`}>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0d0d0d]/70 to-black/90"></div>
              <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a961]/60 to-transparent"></div>
              <div className="relative z-10 flex h-full min-h-[340px] items-center justify-center p-6 sm:min-h-[560px] sm:p-12">
                <div className="feature-visual-stage relative h-[270px] w-full max-w-[18rem] sm:h-[440px] sm:max-w-md">
                  <div className="elevator-graphic absolute inset-0">
                    <div className="elevator-shaft-graphic"></div>
                    <div className="elevator-shaft-glow"></div>
                    <div className="elevator-indicator-light"></div>
                    <div className="elevator-cab-graphic">
                      <div className="absolute inset-x-5 top-5 h-12 rounded-lg border border-white/10 bg-gradient-to-b from-[#d8c18a]/20 to-black/30"></div>
                      <div className="absolute bottom-5 left-1/2 h-16 w-px -translate-x-1/2 bg-[#c9a961]/35"></div>
                      <div className="absolute bottom-5 left-6 right-6 h-px bg-[#c9a961]/25"></div>
                    </div>
                  </div>

                  <div className="escalator-graphic absolute inset-0">
                    <div className="escalator-path"></div>
                    <div className="escalator-path-glow"></div>
                    <div className="escalator-step escalator-step-1"></div>
                    <div className="escalator-step escalator-step-2"></div>
                    <div className="escalator-step escalator-step-3"></div>
                    <div className="escalator-step escalator-step-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="why-section snap-section reveal-section order-4 relative w-full min-h-0 overflow-hidden px-4 py-24 sm:min-h-[100svh] sm:py-36 sm:px-8 lg:py-44 lg:px-10">
        <div
          className="why-background absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/4483559/pexels-photo-4483559.jpeg?auto=compress&cs=tinysrgb&w=1800')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/72"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/82 via-[#0d0d0d]/60 to-[#0d0d0d]/88"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/36 to-black/72"></div>

        <div className="reveal-content relative z-10 mx-auto max-w-[1280px]">
          <h2 className="reveal-heading mb-12 text-center text-4xl sm:text-5xl font-bold lg:mb-24">
            Why <span className="gradient-text">Choose Us</span>
          </h2>

          <div className="why-feature-grid grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-x-16 lg:gap-y-10 xl:gap-x-24">
            {[
              {
                title: 'Experienced Technicians',
                description: 'Certified professionals with decades of combined field experience across commercial elevator and escalator systems.',
              },
              {
                title: 'Fast Response Times',
                description: 'Same-day emergency coordination and rapid deployment built to minimize downtime for busy properties.',
              },
              {
                title: 'Reliable Partnerships',
                description: 'Long-term service relationships with 500+ commercial clients who trust us for uptime, clarity, and follow-through.',
              },
              {
                title: 'Safety Focused',
                description: 'Every inspection, repair, and modernization is guided by current code requirements and rigorous safety standards.',
              },
              {
                title: 'Transparent Pricing',
                description: 'Straightforward scopes, upfront quotes, and practical recommendations without hidden fees or vague service language.',
              },
              {
                title: 'Serving DMV Area',
                description: 'A responsive regional team supporting Washington DC, Maryland, and Northern Virginia properties.',
              },
            ].map((item, index) => (
              <div key={index} className="why-feature reveal-card flex gap-5">
                <div className="why-feature-icon flex-shrink-0">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-7 text-gray-300 sm:text-[0.95rem]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="why-mission story-reveal relative mx-auto mt-28 max-w-none px-0 pt-24 text-center sm:mt-56 sm:pt-44 lg:mt-72 lg:pt-52">
            <div className="why-mission-divider" aria-hidden="true"></div>
            <div className="mission-atmosphere" aria-hidden="true"></div>
            <div className="relative z-10 mx-auto max-w-4xl">
              <p className="reveal-item mb-6 text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a961]">Our Mission</p>
              <h3 className="reveal-heading mb-10 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Built on <span className="gradient-text">trust</span>, measured in uptime
              </h3>

              <div className="mission-statement reveal-card">
                <p>
                  &ldquo;Our mission is to keep the DMV moving <span>safely</span>, <span>reliably</span>, and professionally through expert elevator and escalator service built on trust, rapid response, and long-term partnership. At Vertical Solutions, we believe every building deserves dependable vertical transportation backed by <span>craftsmanship</span>, communication, and care.&rdquo;
                </p>
              </div>
            </div>

            <div className="relative z-10 mx-auto mt-20 grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {['Safety First', 'Reliable Response', 'Long-Term Partnership', 'Precision Craftsmanship'].map((value) => (
                <div key={value} className="mission-value reveal-card">
                  <span></span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section snap-section reveal-section order-5 relative w-full min-h-0 overflow-hidden px-4 py-24 sm:min-h-[100svh] sm:px-8 sm:py-40 lg:px-10 lg:py-48">
        <div
          className="contact-background absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/76"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/92 via-[#0d0d0d]/68 to-[#050505]/86"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/78 via-transparent to-[#0d0d0d]/94"></div>

        <div className="reveal-content relative z-10 mx-auto grid min-h-0 max-w-7xl grid-cols-1 items-center gap-12 sm:min-h-[calc(100svh-18rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal-item max-w-2xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a961]">Start the conversation</p>
            <h2 className="reveal-heading mb-6 text-4xl font-bold leading-tight sm:mb-8 sm:text-5xl lg:text-6xl">
              Let&apos;s Move Your <span className="gradient-text">Building Forward</span>
            </h2>
            <p className="mb-12 max-w-xl text-lg leading-8 text-gray-300">
              Partner with a responsive elevator and escalator team built for safety, uptime, and clear communication from the first call through every service visit.
            </p>

            <div className="grid gap-5">
              {[
                {
                  label: 'Phone',
                  value: '(202) 423-4218',
                  detail: '(240) 347-1085',
                  type: 'phone',
                },
                {
                  label: 'Email',
                  value: 'VSecompany@gmail.com',
                  detail: 'Inquiries & Quotes',
                  type: 'mail',
                },
                {
                  label: 'Hours',
                  value: '24/7 Emergency Service',
                  detail: 'Office: Mon-Fri 8AM-5PM',
                  type: 'clock',
                },
              ].map((contact) => (
                <div key={contact.label} className="contact-detail reveal-card">
                  <span className={`contact-detail-icon contact-detail-icon-${contact.type}`} aria-hidden="true"></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a961]">{contact.label}</p>
                    <p className="mt-1 text-lg font-bold text-white">{contact.value}</p>
                    <p className="mt-1 text-sm text-gray-400">{contact.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={contactFormRef}
            tabIndex={-1}
            className={`contact-form-card reveal-card ${isContactHighlighted ? 'is-highlighted' : ''}`}
            aria-label="Request service form"
          >
            <div className="contact-form-glow" aria-hidden="true"></div>
            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a961]">Request service</p>
              <h3 className="mb-8 text-3xl font-bold text-white">Tell us what your building needs.</h3>

            {formSubmitted && (
              <div className="contact-success mb-7 rounded-lg border border-[#c9a961] bg-[#c9a961]/16 p-4 text-[#e5d4b8]">
                ✓ Thank you! We&apos;ll contact you within 24 hours.
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="contact-field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="contact-field"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="contact-field"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  required
                  className="contact-field"
                >
                  <option value="">Select a Service</option>
                  <option value="maintenance">Elevator Maintenance</option>
                  <option value="repair">Elevator Repairs</option>
                  <option value="installation">New Installations</option>
                  <option value="modernization">Elevator Modernization</option>
                  <option value="escalator">Escalator Services</option>
                  <option value="emergency">Emergency Service</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your project or concern..."
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={7}
                className="contact-field resize-none"
              ></textarea>

              <button
                type="submit"
                className="contact-submit"
              >
                <span>Request Service</span>
              </button>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="order-7 w-full bg-black border-t border-[#c9a961]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-10">
            <div>
              <h4 className="text-lg font-bold gradient-text mb-4">Vertical Solutions</h4>
              <p className="text-gray-400 text-sm">
                Premium elevator and escalator services serving the DMV area since 2004.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Maintenance</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Repairs</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Installation</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Modernization</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>(202) 423-4218</li>
                <li>(240) 347-1085</li>
                <li>VSecompany@gmail.com</li>
                <li>24/7 Emergency Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Service Area</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Washington, DC</li>
                <li>Maryland</li>
                <li>Northern Virginia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#c9a961]/20 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Vertical Solutions Elevator Company. All rights reserved. | Licensed & Insured | 24/7 Service</p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}
