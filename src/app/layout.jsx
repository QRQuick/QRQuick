import { Darker_Grotesque } from "next/font/google";
import "./globals.css";

const darkerGrotesque = Darker_Grotesque({ subsets: ["latin"] });

export const metadata = {
    title: "QRQuick | Create Your Free QR Codes",
    description: "Easily create QR Codes with any types, share them anywhere.",
    icons: {
        icon: ["/favicon/QRQuick grey 512.png"],
        apple: ["/favicon/QRQUICK 192x192.png"],
        shortcut: ["/favicon/QRQUICK 512x512.png"],
    },
    openGraph: {
        title: "QRQuick",
        description: "Easily create QR Codes with any types, share them anywhere.",
        url: "",
        siteName: "QRQuick",
        images: [
            {
                url: "public/OpenGraphIMG.jpg",
                width: 1260,
                height: 800,
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={darkerGrotesque.className}>{children}</body>
        </html>
    );
}
