import type { ReactNode } from "react";
import {
  Briefcase,
  Clapperboard,
  Home,
  Layers,
  Mail,
} from "lucide-react";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import FlowFieldBackground from "@/components/ui/flow-field-background";
import HorizontalScrollGallery, {
  type GalleryItem,
} from "@/components/ui/horizontal-scroll-gallery";
import CardStack, { type CardStackItem } from "@/components/ui/card-stack";
import AnimatedGradientFrame from "@/components/ui/animated-gradient-frame";
import SpotlightCard from "@/components/ui/spotlight-card";
import GradientMenu from "@/components/ui/gradient-menu";
import ScrollReveal from "@/components/ui/scroll-reveal";

const galleryItems: GalleryItem[] = [
  {
    title: "Staf Media & Informasi",
    caption:
      "Merancang narasi visual himpunan — dari kalender konten hingga engagement dua kali lipat.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Content Creator",
    caption: "Dari riset ide dan naskah, hingga cerita yang sampai ke layar.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Fotografi",
    caption: "Cahaya, komposisi, dan cerita dalam satu bingkai.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Dokumentasi Event",
    caption:
      "Mengabadikan momen yang tak terulang — seminar, orientasi, dan festival tahunan.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Videografi",
    caption: "Bergerak dalam 24 frame — dari liputan hingga aftermovie.",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Desain & Branding",
    caption: "Konsistensi brand di setiap piksel, poster, dan feed.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Kolaborasi",
    caption: "Jika mereka memberimu salib — pikul, dan bawa diam-diam ke puncak.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
];

const portfolioStack: CardStackItem[] = [
  {
    title: "Staf Media & Informasi — Himpunan Mahasiswa",
    category: "Organisasi",
    description:
      "Mengelola publikasi digital himpunan: merancang konten Instagram, menyusun kalender konten bulanan, dan menaikkan engagement akun hingga dua kali lipat dalam satu periode kepengurusan.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Content Creator — Media Kampus",
    category: "Media",
    description:
      "Memproduksi konten video pendek dan artikel untuk media kampus. Bertanggung jawab dari riset ide, penulisan naskah, pengambilan gambar, hingga editing akhir.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Dokumentasi & Videografi Event",
    category: "Event",
    description:
      "Menjadi tim dokumentasi resmi berbagai acara kampus — seminar nasional, orientasi mahasiswa baru, dan festival tahunan — menghasilkan aftermovie dan foto liputan.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Desain Publikasi & Branding",
    category: "Desain",
    description:
      "Merancang identitas visual kegiatan: poster, feed template, banner, dan merchandise. Menjaga konsistensi brand di seluruh kanal media sosial organisasi.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop",
  },
];

const mediaHandles = [
  { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com" },
  { icon: <FaTiktok />, label: "TikTok", href: "https://tiktok.com" },
  { icon: <FaYoutube />, label: "YouTube", href: "https://youtube.com" },
  { icon: <FaLinkedinIn />, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <FaGithub />, label: "GitHub", href: "https://github.com" },
];

const menuItems = [
  { title: "Home", icon: <Home size={22} />, href: "#home" },
  { title: "Portfolio", icon: <Layers size={22} />, href: "#portfolio" },
  { title: "Experience", icon: <Briefcase size={22} />, href: "#experience" },
  { title: "Media", icon: <Clapperboard size={22} />, href: "#media" },
  {
    title: "Contact",
    icon: <Mail size={22} />,
    href: "mailto:pramudya617@student.ub.ac.id",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Media", href: "#media" },
];

function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(90deg,#67F3CE,#4899EA)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh text-white">
      {/* Flow-field background behind the whole page */}
      <FlowFieldBackground className="z-0" intensity={0.5} />

      <div className="relative z-10">
        {/* ── NAVBAR ─────────────────────────────────────────── */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050505]/70 backdrop-blur-md">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
            <a
              href="#home"
              className="font-display text-xl font-bold tracking-tight"
            >
              Pramudya<GradientText>.</GradientText>
            </a>
            <ul className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-[#67F3CE]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:pramudya617@student.ub.ac.id"
              className="
                rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium
                transition-all duration-300
                hover:border-transparent hover:bg-[linear-gradient(135deg,#67F3CE,#4899EA)]
                hover:text-[#050505] hover:shadow-[0_0_25px_-5px_rgba(103,243,206,0.6)]
              "
            >
              Hubungi Saya
            </a>
          </nav>
        </header>

        {/* ── HERO: scroll-driven horizontal gallery ─────────── */}
        <div id="home">
          <HorizontalScrollGallery
            items={galleryItems}
            footer={
              <div className="flex items-center justify-between px-6 pb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/40 sm:px-10">
                <a
                  href="#portfolio"
                  className="min-h-11 py-3 transition-colors duration-200 hover:text-[#67F3CE]"
                >
                  Works
                </a>
                <a
                  href="#experience"
                  className="min-h-11 py-3 transition-colors duration-200 hover:text-[#67F3CE]"
                >
                  About
                </a>
                <a
                  href="#media"
                  className="min-h-11 py-3 transition-colors duration-200 hover:text-[#67F3CE]"
                >
                  Contact
                </a>
              </div>
            }
          >
            <a
              href="mailto:pramudya617@student.ub.ac.id"
              className="
                group mt-10 inline-flex min-h-11 items-center gap-1 px-4 py-2
                font-display text-sm font-semibold text-white
                transition-colors duration-300 hover:text-[#67F3CE]
              "
            >
              <GradientText>[</GradientText>
              <span className="mx-2">open for any collaborations</span>
              <GradientText>]</GradientText>
            </a>
          </HorizontalScrollGallery>
        </div>

        {/* ── PORTFOLIO: card stack ──────────────────────────── */}
        <section id="portfolio" className="relative px-5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#4899EA]">
                01 — Portofolio
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Sorotan <GradientText>Karya</GradientText>
              </h2>
              <p className="max-w-md leading-relaxed text-white/50">
                Tumpukan kartu ini berganti sendiri — atau klik kartunya untuk
                melihat karya berikutnya. Setiap kartu adalah satu bidang yang
                pernah saya kerjakan.
              </p>
              <div className="mt-2 h-px w-24 bg-[linear-gradient(90deg,#67F3CE,#4899EA)]" />
            </div>
            <CardStack items={portfolioStack} />
          </div>
        </section>

        {/* ── EXPERIENCE: spotlight cards ────────────────────── */}
        <section id="experience" className="relative px-5 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col gap-3 md:mb-16">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#4899EA]">
                02 — Pengalaman
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                Selected <GradientText>Experience</GradientText>
              </h2>
              <p className="max-w-lg text-white/50">
                Beberapa pengalaman terpilih di bidang organisasi, media, dan
                kreatif.{" "}
                <span className="md:hidden">
                  Geser ke samping untuk melihat →
                </span>
              </p>
            </div>

            {/* Mobile: horizontal snap-scroll. Desktop: alternating rows. */}
            <div
              className="
                -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4
                md:mx-0 md:flex-col md:gap-10 md:overflow-visible md:px-0 md:pb-0
              "
            >
              {portfolioStack.map((exp, index) => (
                <div
                  key={exp.title}
                  className={`
                    w-[85%] flex-shrink-0 snap-center
                    md:w-[82%] md:flex-shrink
                    ${index % 2 === 1 ? "md:self-end" : "md:self-start"}
                  `}
                >
                  <SpotlightCard className="h-full">
                    <article
                      className={`flex h-full flex-col ${
                        index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      <div className="relative h-52 w-full overflow-hidden md:h-auto md:w-2/5">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          loading="lazy"
                          width={900}
                          height={600}
                          className="
                            h-full w-full object-cover
                            transition-transform duration-500 group-hover:scale-105
                          "
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent md:bg-gradient-to-r" />
                      </div>
                      <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-10">
                        <span className="w-fit rounded-full border border-[#4899EA]/40 bg-[#4899EA]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#67F3CE]">
                          {exp.category}
                        </span>
                        <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
                          {exp.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                          {exp.description}
                        </p>
                      </div>
                    </article>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEDIA / SOCIAL — pops up on scroll ─────────────── */}
        <section id="media" className="relative px-5 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <AnimatedGradientFrame>
                <div className="flex flex-col items-center gap-10 px-6 py-14 text-center sm:px-12 md:py-16">
                  <div className="flex flex-col gap-3">
                    <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#4899EA]">
                      03 — Media & Sosial
                    </span>
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      Tetap <GradientText>Terhubung</GradientText>
                    </h2>
                    <p className="mx-auto max-w-md text-white/50">
                      Informasi pribadi, media yang saya kelola, dan cara
                      menghubungi saya. Arahkan kursor ke tombol untuk melihat
                      detail.
                    </p>
                  </div>

                  <GradientMenu items={menuItems} />

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {mediaHandles.map((media) => (
                      <a
                        key={media.label}
                        href={media.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={media.label}
                        className="
                          flex h-12 w-12 items-center justify-center rounded-xl
                          border border-white/10 bg-white/5 text-lg text-white/70
                          transition-all duration-300
                          hover:-translate-y-1 hover:border-[#67F3CE]/50
                          hover:text-[#67F3CE]
                          hover:shadow-[0_8px_25px_-8px_rgba(72,153,234,0.6)]
                        "
                      >
                        {media.icon}
                      </a>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-1 text-sm text-white/40">
                    <p className="font-medium text-white/70">
                      Pramudya — Universitas Brawijaya
                    </p>
                    <a
                      href="mailto:pramudya617@student.ub.ac.id"
                      className="transition-colors duration-200 hover:text-[#67F3CE]"
                    >
                      pramudya617@student.ub.ac.id
                    </a>
                  </div>
                </div>
              </AnimatedGradientFrame>
            </ScrollReveal>
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer id="contact" className="relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#67F3CE]/60 to-transparent" />
          <div className="bg-[#0D0D0D]/85 px-5 py-14 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
              <p className="font-display text-2xl font-bold tracking-[0.35em] sm:text-3xl">
                FOOT<GradientText>WORK</GradientText>
              </p>
              <p className="text-sm text-white/50">
                Informasi pribadi dan media sosial
              </p>
              <div className="mt-2 h-px w-24 bg-[linear-gradient(90deg,#67F3CE,#4899EA)]" />
              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} Pramudya. Dibuat dengan React,
                TypeScript & Tailwind CSS.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
