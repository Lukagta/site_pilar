export function Blog() {
    const posts = [
        {
            title: "A importância da Medicina Funcional",
            excerpt: "Entenda como a abordagem sistêmica pode transformar sua saúde e prevenir doenças crônicas.",
            date: "15 Mai, 2024",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKzEkLTfczbHYiRo_ZvRlfP4iycaXKnKmduHuyqWnRk2Oo7WpoNDqVQ2l9sJAiCB9vuwxH9v-E5WAjw2mqQkZsD-qRE5YETou9bpNQbTE43Oy8aM_Nf9rxcr4c_B8dILzhmBkr0ZLMAL0vBlXF_CJyTFvClqPKMEtFN4Sf9EG9ylJihuXV6vjRARGRudxvPlmIzj9z8HnF5tzJ2ChK27u2PyntzAqyvkEora_qgdPAxCPKUxaZI0evlGIedKxlrpzQGsab4kZkpkM"
        },
        {
            title: "Nutrologia e Performance Esportiva",
            excerpt: "Como a alimentação personalizada influencia diretamente nos seus resultados nos treinos.",
            date: "10 Mai, 2024",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_1laH4RO2_IJUDa-ovvGr-SB6y6yYO4XGpByOWwAhfZN3syCDVIlPuEXvACuBY0QUer9CIRJfjEtPND4Z4SQFa1EE-yKj_s_rcVsHzChoAV_fwYFyXe3jw5arblkU9PqUL-AUjP3nU90dFKE8y6zO144MuiULSlRiI8fkNBLk5j4E3H72rwZLOGiP2aZsJ3J1HFQjaHFfyaHaWWmbCYfZF-2id42ANaOMoSnJLbQrL9GrIOlAN-TxfOcCzODbn_x1v54fImyojqY"
        }
    ];

    return (
        <section id="blog" className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl text-deep-blue">Blog & Novidades</h2>
                        <p className="mt-4 text-med-blue font-medium">Conteúdo atualizado sobre saúde e bem-estar.</p>
                    </div>
                    <button className="hidden sm:block text-primary font-bold hover:text-med-blue transition-colors">Ver tudo →</button>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    {posts.map((post, idx) => (
                        <article key={idx} className="group flex flex-col gap-6 lg:flex-row">
                            <div className="overflow-hidden rounded-3xl lg:w-1/2">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col justify-center gap-4 lg:w-1/2">
                                <span className="text-xs font-bold uppercase tracking-wider text-teal-health">{post.date}</span>
                                <h3 className="text-2xl font-bold text-deep-blue group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-med-blue/80 font-medium line-clamp-2">{post.excerpt}</p>
                                <button className="self-start font-bold text-deep-blue hover:text-primary transition-colors flex items-center gap-2">
                                    Leia mais <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
