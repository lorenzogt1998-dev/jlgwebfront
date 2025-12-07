import Sidebar from "./Sidebar";

export default function SidebarGeneral() {
  const widgets = [
    {
      id: "contact",
      title: "Need help?",
      content: (
        <p>
          Email us at{" "}
          <a href="mailto:concerts@justolamasgroup.com" className="text-blue-500">
            concerts@justolamasgroup.com
          </a>
        </p>
      ),
    },
    {
      id: "follow",
      title: "Follow us",
      content: (
        <div className="flex gap-2 text-blue-600">
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
      ),
    },
  ];

  return <Sidebar widgets={widgets} />;
}
