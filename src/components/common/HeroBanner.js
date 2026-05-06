import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function HeroBanner({ image, title, subtitle, height = "70vh", }) {
    return (_jsxs("section", { className: "relative w-full flex items-center justify-center", style: {
            height,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }, children: [_jsx("div", { className: "absolute inset-0 bg-black/40" }), _jsxs("div", { className: "relative z-10 text-center text-white px-4", children: [title && (_jsx("h1", { className: "text-4xl md:text-6xl font-bold drop-shadow-lg", children: title })), subtitle && (_jsx("p", { className: "mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow", children: subtitle }))] })] }));
}
