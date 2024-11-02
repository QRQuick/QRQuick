import AccordionComponent from "@/components/AccordionComponent";
import Features from "@/components/Features";
import UrlShortenerCards from "@/components/UrlShortenerCards";
import Link from "next/link";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Home() {
    return (
        <main>
            <div className="max-w-screen-md mx-auto px-4">
                <h1 className="mt-16 text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-blue-300">QRQuick <span className="text-neutral-900 font-bold text-2xl sm:text-3xl md:text-5xl"> Make every connection quick</span></h1>
                <div className="mx-auto mt-2 md:mt-4">
                    <p className="text-center font-semibold sm:text-lg md:text-xl text-neutral-500">
                        Easily create QR Codes with any types, share them anywhere.
                    </p>
                </div>
            </div>

            <div className="max-w-screen-md mx-auto px-4 md:px-0">
                <UrlShortenerCards />
            </div>

            <Features className="mt-28" />

            <AccordionComponent className="mt-28 max-w-screen-lg mx-auto px-4" />

            <footer className="mt-10 mb-2 font-semibold max-w-screen-lg mx-auto px-4 border-t-[1px] border-neutral-400">
                <div className="mt-2 flex justify-between items-center">
                    <div>
                        <p className="text-neutral-500 text-lg leading-tight">© 2024 QRQuick.</p>
                        <p className="text-neutral-500 text-lg leading-tight">'QR Code' is a trademark of DENSO WAVE INCORPORATED.</p>
                    </div>

                    <div className="flex justify-center gap-3">
                        <Link href={"https://www.linkedin.com/in/qrquick-cooperation/"}>
                            <FaLinkedin className="size-5 text-neutral-500 hover:text-neutral-900" />
                        </Link>

                        <Link href={"mailto:qrquicks@gmail.com"}>
                            <IoMdMail className="size-5 text-neutral-500 hover:text-neutral-900" />
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
