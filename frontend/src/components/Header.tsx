import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Calendar, Menu, X, User } from "lucide-react"
import type { SiteConfig } from "../services/api"

export function Header({ config }: { config: SiteConfig | null }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Especialidades", href: "#services" },
        { name: "Abordagem", href: "#about" },
        { name: "Corpo Docente", href: "#doctors" },
        { name: "Contato", href: "#contact" },
    ]

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "py-4 bg-white/80 backdrop-blur-xl border-b border-deep-blue/5 shadow-sm" : "py-8 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo Luxury */}
                <a href="/" className="flex items-center gap-3 group relative">
                    {config?.logo ? (
                        <div className="h-10 transition-transform group-hover:scale-105 duration-500">
                            <img
                                src={`http://localhost:3002${config.logo}`}
                                alt="Pilar Medicina"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    ) : (
                        <div className="bg-deep-blue p-2 rounded-lg transition-transform group-hover:rotate-12 duration-500">
                            <Stethoscope className="w-6 h-6 text-primary" strokeWidth={2.5} />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-display text-xl font-black text-deep-blue leading-none tracking-tighter">
                            PILAR
                        </span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none mt-1">
                            Medicina Integrada
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-black uppercase tracking-[0.3em] text-deep-blue/60 hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* Action Group */}
                <div className="flex items-center gap-6">
                    <a
                        href="/agendar"
                        className="hidden md:flex items-center gap-2 bg-deep-blue text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all transform hover:-translate-y-0.5 shadow-lg shadow-deep-blue/10"
                    >
                        <Calendar className="w-4 h-4" />
                        Agendar
                    </a>

                    <button className="w-10 h-10 rounded-full border border-deep-blue/10 flex items-center justify-center text-deep-blue hover:bg-deep-blue hover:text-white transition-all">
                        <User className="w-5 h-5" />
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-deep-blue"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-deep-blue/5 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-display font-bold text-deep-blue hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="/agendar"
                                className="bg-primary text-white text-center py-4 rounded-xl font-bold"
                            >
                                Agendar Consulta
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
