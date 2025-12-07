import { site } from "@/config/site";

export function SocialBar() {
  const s = site.socials;
  const Item = ({ href, label, children }:{href:string; label:string; children:React.ReactNode}) =>
    href ? (
      <a href={href} aria-label={label} target="_blank" rel="noreferrer"
         className="p-2 hover:opacity-80">{children}</a>
    ) : null;

  return (
    <div className="flex items-center gap-1">
      <Item href={s.facebook ? `https://www.facebook.com/${s.facebook}` : ""} label="Facebook">FB</Item>
      <Item href={s.twitter ? `https://twitter.com/${s.twitter}` : ""} label="Twitter">X</Item>
      <Item href={s.instagram ? `https://instagram.com/${s.instagram}` : ""} label="Instagram">IG</Item>
      <Item href={s.pinterest ? `https://pinterest.com/${s.pinterest}` : ""} label="Pinterest">P</Item>
      <Item href={s.youtube ? `https://youtube.com/user/${s.youtube}` : ""} label="YouTube">YT</Item>
      <Item href={s.linkedin ? `https://www.linkedin.com/company/${s.linkedin}` : ""} label="LinkedIn">in</Item>
      <Item href={s.rss} label="RSS">RSS</Item>
    </div>
  );
}
