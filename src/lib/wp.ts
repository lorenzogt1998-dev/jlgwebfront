export type WpPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

const base = import.meta.env.VITE_WP_URL?.replace(/\/$/, "");

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  if (!base) throw new Error("VITE_WP_URL no está definido");
  const res = await fetch(`${base}/wp-json/wp/v2/pages?slug=${slug}`);
  if (!res.ok) throw new Error(`WP fetch error: ${res.status}`);
  const pages: WpPage[] = await res.json();
  return pages[0] ?? null;
}
