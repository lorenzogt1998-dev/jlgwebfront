export type PostCard = {
  id: string;
  title: string;
  href: string;
  date: string;     // ISO o texto
  author: string;
  excerpt: string;
  image?: string;
  comments?: number;
};

export const tickerPosts: Pick<PostCard, "id" | "title" | "href">[] = [
  { id: "1", title: "SET A DATE", href: "/posts/school-concerts" },
  { id: "2", title: "RESERVE TICKET", href: "/posts/tour-highlights" },
];

export const latestPosts: PostCard[] = [
  {
    id: "p1",
    title: "SET A DATE",
    href: "/posts/setadate",
    date: "2024-10-12",
    author: "JLG",
    excerpt: "A quick look at the upcoming tour dates and activities…",
    image: "/images/piano_concert_hall_steinway-588611.jpg",
    comments: 12,
  },
  {
    id: "p2",
    title: "RESERVE TICKET",
    href: "/posts/reserveTicket",
    date: "2024-09-21",
    author: "JLG",
    excerpt: "We’ve seen excitement and engagement grow with music in the classroom…",
    image: "/images/DSC06892-Editarff.jpg",
    comments: 0,
  },
];
