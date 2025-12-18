import { Mail, Phone, MessageCircle } from "lucide-react";
import Sidebar from "./Sidebar";

export default function SidebarGeneral() {
  const widgets = [
    {
      id: "contact",
      title: "Need help?",
      content: (
        <div className="space-y-3 text-sm">
          <a
            href="mailto:concerts@justolamasgroup.com"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition"
          >
            <Mail className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-800">Email</span>
            <span className="ml-auto text-blue-600">concerts@justolamasgroup.com</span>
          </a>

          <a
            href="tel:+16827101443"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition"
          >
            <Phone className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-800">Text only</span>
            <span className="ml-auto text-blue-600">(682) 710-1443</span>
          </a>

          <a
            href="https://wa.me/541150455615"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition"
          >
            <MessageCircle className="h-4 w-4 text-slate-600" />
            <span className="font-medium text-slate-800">WhatsApp</span>
            <span className="ml-auto text-blue-600">+54 11 5045-5615</span>
          </a>
        </div>
      ),
    },
    {
      id: "follow",
      title: "Follow us",
      content: (
        <div className="flex flex-col gap-2 text-sm">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition text-blue-600"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50 transition text-blue-600"
          >
            Instagram
          </a>
        </div>
      ),
    },
  ];

  return <Sidebar widgets={widgets} />;
}
