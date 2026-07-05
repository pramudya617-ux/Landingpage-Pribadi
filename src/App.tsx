import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Clapperboard,
  Home,
  Mail,
  Share2,
} from "lucide-react";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import AnimatedGradientFrame from "@/components/ui/animated-gradient-frame";
import SpotlightCard from "@/components/ui/spotlight-card";
import GradientMenu from "@/components/ui/gradient-menu";

const experiences = [
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
  { title: "Experience", icon: <Briefcase size={22} />, href: "#experience" },
  { title: "Media", icon: <Clapperboard size={22} />, href: "#media" },
  { title: "Social", icon: <Share2 size={22} />, href: "#media" },
  {
    title: "Contact",
    icon: <Mail size={22} />,
    href: "mailto:pramudya617@student.ub.ac.id",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
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
    <div className="min-h-dvh bg-[#050505] text-white">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
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

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 pb-16 pt-28"
      >
        <ThermodynamicGrid />

        <div className="relative z-10 w-full max-w-4xl">
          <AnimatedGradientFrame>
            <div className="flex flex-col items-center px-6 py-14 text-center sm:px-12 md:py-20">
              <span className="mb-6 rounded-full border border-[#67F3CE]/30 bg-[#67F3CE]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#67F3CE]">
                Portofolio Pribadi
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                Cerita, Karya, dan
                <br />
                <GradientText>Pengalaman</GradientText> Saya
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Mahasiswa Universitas Brawijaya yang aktif di bidang media,
                desain, dan dokumentasi. Selamat datang di ruang pamer
                pengalaman saya.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <a
                  href="#experience"
                  className="
                    group inline-flex min-h-11 items-center gap-2 rounded-full
                    bg-[linear-gradient(135deg,#67F3CE,#4899EA)] px-7 py-3
                    font-display text-sm font-semibold text-[#050505]
                    transition-shadow duration-300
                    hover:shadow-[0_0_35px_-5px_rgba(103,243,206,0.7)]
                  "
                >
                  Lihat Pengalaman
                  <ArrowDown
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
                <a
                  href="#media"
                  className="
                    inline-flex min-h-11 items-center gap-2 rounded-full border
                    border-white/15 px-7 py-3 font-display text-sm font-semibold
                    text-white transition-colors duration-300
                    hover:border-[#4899EA]/60 hover:text-[#67F3CE]
                  "
                >
                  Media & Sosial
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Media yang dipegang */}
              <div className="mt-14 w-full">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
                  Media yang Dipegang
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
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
              </div>
            </div>
          </AnimatedGradientFrame>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────── */}
      <section id="experience" className="relative px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-3 md:mb-16">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#4899EA]">
              01 — Pengalaman
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Selected <GradientText>Experience</GradientText>
            </h2>
            <p className="max-w-lg text-white/50">
              Beberapa pengalaman terpilih di bidang organisasi, media, dan
              kreatif.{" "}
              <span className="md:hidden">Geser ke samping untuk melihat →</span>
            </p>
          </div>

          {/* Mobile: horizontal snap-scroll. Desktop: alternating stacked rows. */}
          <div
            className="
              -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4
              md:mx-0 md:flex-col md:gap-10 md:overflow-visible md:px-0 md:pb-0
            "
          >
            {experiences.map((exp, index) => (
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

      {/* ── MEDIA / SOCIAL ─────────────────────────────────────── */}
      <section id="media" className="relative px-5 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <AnimatedGradientFrame>
            <div className="flex flex-col items-center gap-10 px-6 py-14 text-center sm:px-12 md:py-16">
              <div className="flex flex-col gap-3">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[#4899EA]">
                  02 — Media & Sosial
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
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer id="contact" className="relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#67F3CE]/60 to-transparent" />
        <div className="bg-[#0D0D0D] px-5 py-14">
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
  );
}
