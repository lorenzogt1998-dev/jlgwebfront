const base = import.meta.env.VITE_WP_URL?.replace(/\/$/, "");
export async function getPageBySlug(slug) {
    if (!base)
        throw new Error("VITE_WP_URL no está definido");
    const res = await fetch(`${base}/wp-json/wp/v2/pages?slug=${slug}`);
    if (!res.ok)
        throw new Error(`WP fetch error: ${res.status}`);
    const pages = await res.json();
    return pages[0] ?? null;
}
