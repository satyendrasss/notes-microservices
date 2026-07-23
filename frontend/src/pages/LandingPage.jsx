import { Link } from "react-router-dom";

export default function LandingPage() {
    const notes = [
        "Meeting Notes",
        "Product Roadmap",
        "Design Ideas",
        "Travel Plans",
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                    <a href="/" className="text-lg font-semibold tracking-tight">
                        Notes
                    </a>

                    <nav className="hidden gap-8 text-sm text-neutral-600 md:flex dark:text-neutral-400">
                        <a href="#features" className="hover:text-neutral-900 dark:hover:text-white">
                            Features
                        </a>

                        <a href="#security" className="hover:text-neutral-900 dark:hover:text-white">
                            Security
                        </a>

                        <a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white">
                            Pricing
                        </a>
                    </nav>


                    <div className="flex items-center gap-3">

                        <Link to={`/login`} className="rounded-lg px-4 py-2 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-900">
                            Sign In
                        </Link>

                        <Link to={`/register`} className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black dark:bg-white dark:text-black">
                            Get Started
                        </Link>

                    </div>

                </div>
            </header>



            {/* Hero */}
            <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

                <div>
                    <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
                        Your notes. <br /> Simple. Secure. Private.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                        Write without distractions. Organize your ideas,
                        projects, and thoughts in one calm workspace.
                        Everything stays fast, simple, and accessible.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <button className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-black dark:bg-white dark:text-black">
                            Get Started
                        </button>

                        <button className="rounded-lg border border-neutral-300 px-6 py-3 font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* App Preview */}
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                        {/* Browser Bar */}
                        <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                            <span className="h-3 w-3 rounded-full bg-red-400" />
                            <span className="h-3 w-3 rounded-full bg-yellow-400" />
                            <span className="h-3 w-3 rounded-full bg-green-400" />
                        </div>

                        <div className="flex h-[520px]">
                            {/* Sidebar */}
                            <aside className="hidden w-64 border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 md:block">
                                <div className="space-y-3 border-b border-neutral-200 p-4 dark:border-neutral-800">
                                    <button className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
                                        + New Note
                                    </button>
                                    <input
                                        placeholder="Search notes..."
                                        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none dark:border-neutral-700 dark:bg-neutral-950"
                                    />
                                </div>

                                <div className="space-y-2 p-3">
                                    {notes.map((note, index) => (
                                        <div
                                            key={note}
                                            className={`rounded-lg p-3 text-sm transition ${index === 0
                                                    ? "border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950"
                                                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                }`}
                                        >

                                            <p className="font-medium"> {note} </p>
                                            <p className="mt-1 text-xs text-neutral-500"> Edited today </p>

                                        </div>
                                    ))}
                                </div>
                            </aside>

                            {/* Editor */}
                            <main className="flex-1 p-8">
                                <p className="text-sm text-neutral-500"> July 19, 2026 </p>
                                <h2 className="mt-3 text-3xl font-semibold"> Meeting Notes </h2>
                                <div className="mt-8 space-y-4 leading-7 text-neutral-600 dark:text-neutral-400">
                                    <p> Discuss quarterly planning and product milestones. </p>
                                    <p>• Finalize roadmap</p>
                                    <p>• Review design feedback</p>
                                    <p>• Assign engineering tasks</p>
                                    <p>Everything is automatically saved while you type.</p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}

            <section
                id="features"
                className="border-y border-neutral-200 py-24 dark:border-neutral-800"
            >

                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-semibold tracking-tight"> Built for focus.</h2>
                        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                            Everything you need to write, organize,
                            and manage your notes.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Simple",
                                text: "A distraction-free writing experience."
                            },
                            {
                                title: "Secure",
                                text: "Your notes stay protected and private."
                            },
                            {
                                title: "Fast",
                                text: "Instant search and quick access."
                            }
                        ].map((feature) => (

                            <div
                                key={feature.title}
                                className="rounded-xl border border-neutral-200 p-6 transition hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                            >

                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{feature.text}</p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}

            <section className="px-6 py-24 text-center">
                <h2 className="text-4xl font-semibold tracking-tight">Capture every idea.</h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                    Create your free workspace and start writing today.
                </p>

                <button className="mt-8 rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-black dark:bg-white dark:text-black">
                    Create Account
                </button>

            </section>

            {/* Footer */}

            <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-neutral-500 md:flex-row">
                    <p>© 2026 Notes. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}