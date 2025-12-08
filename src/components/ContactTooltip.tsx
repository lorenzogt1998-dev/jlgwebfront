import { useState } from "react";

export default function ContactTooltip({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyInfo = async () => {
    await navigator.clipboard.writeText(`Email: ${email}\nPhone: ${phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Texto visible (NO LINK) */}
      <span className="font-medium text-[#243f4a] cursor-default hover:text-[#1a2e36] transition">
        {name}
      </span>

      {/* Tooltip */}
      {show && (
        <div className="absolute left-1/2 -translate-x-1/2 top-7 z-50 bg-white shadow-xl border border-gray-200 rounded-xl p-4 w-64 text-sm animate-fadeIn">
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {phone}
          </p>

          <button
            onClick={copyInfo}
            className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-[#df6a47] to-[#f58c6c] text-white hover:opacity-90 active:scale-95 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
