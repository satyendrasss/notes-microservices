import { useAuth } from "../context/AuthContext";

export default function HomePage() {
    const { user, logout } = useAuth();
    console.log('user:',user);
    const notes = [
        {
            id: 1,
            title: "Meeting Notes",
            content: "Discuss project timeline and deliverables for next sprint.",
            date: "July 19, 2026",
        },
        {
            id: 2,
            title: "Shopping List",
            content: "Milk, Eggs, Coffee, Bread, Fruits",
            date: "July 18, 2026",
        },
        {
            id: 3,
            title: "Ideas",
            content: "Build a notes app with markdown support and cloud sync.",
            date: "July 17, 2026",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <h1 className="text-3xl font-bold">📝 My Notes</h1>

                    <div className="flex items-center gap-3">
                        <button className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700">
                            + New Note
                        </button>
                        <button onClick={logout} className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700">
                            Logout 
                        </button>
                    </div>
                </div>
            </header>

            {/* Search */}
            <section className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-700"
                    />
                </div>

                {/* Notes Grid */}
                {notes.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                            >
                                <h2 className="mb-3 text-xl font-semibold">{note.title}</h2>

                                <p className="mb-5 line-clamp-4 text-gray-600 dark:text-gray-400">
                                    {note.content}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {note.date}
                                    </span>

                                    <button className="text-sm font-medium text-indigo-600 hover:underline">
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="mt-20 text-center">
                        <div className="mb-5 text-6xl">📝</div>

                        <h2 className="mb-2 text-2xl font-semibold">
                            No notes yet
                        </h2>

                        <p className="mb-6 text-gray-500 dark:text-gray-400">
                            Create your first note to get started.
                        </p>

                        <button className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
                            Create Note
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}