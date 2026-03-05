import type { SiteConfig } from "../services/api";

export function Header({ config }: { config: SiteConfig | null }) {
    const whatsapp = config?.whatsapp || '11999999999';
    return (
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-gray-light/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-3xl font-bold">medical_services</span>
                    <h1 className="text-xl font-extrabold tracking-tight text-deep-blue">
                        Pilar <span className="font-normal text-med-blue">Medicina</span>
                    </h1>
                </div>

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-deep-blue">
                    <a className="hover:text-primary transition-colors" href="#services">Especialidades</a>
                    <a className="hover:text-primary transition-colors" href="#about">Sobre</a>
                    <a className="hover:text-primary transition-colors" href="#doctors">Corpo Clínico</a>
                    <a className="hover:text-primary transition-colors" href="#blog">Blog</a>
                    <a className="hover:text-primary transition-colors" href="#contact">Contato</a>
                </nav>

                {/* CTA + avatar */}
                <div className="flex items-center gap-4">
                    <a
                        href="http://localhost:5173/agendar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden lg:flex items-center justify-center gap-1.5 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 focus:ring-4 focus:ring-primary/20"
                    >
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Agendar Consulta
                    </a>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
