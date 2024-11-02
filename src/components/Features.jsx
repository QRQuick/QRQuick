import { FaAdversal, FaAffiliatetheme, FaChartLine, FaCompactDisc, FaDev, FaHeartCircleCheck, FaLink, FaRegistered, FaRegRegistered, FaServer } from "react-icons/fa6";
import { IoGitCompare, IoQrCode } from "react-icons/io5";

export default function Features({ className }) {
    return (
        <div className={className}>
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold px-4">Simplify Sharing with Free, Device-Ready QR Codes</h2>
            <div className="max-w-screen-sm mx-auto mt-2 px-4">
                <p className="text-center font-semibold md:text-lg text-neutral-500 leading-tight">Create high-quality QR Codes instantly, for free.
                Our platform is built to make sharing effortless,
                with QR Codes readable on any smartphone, tablet, or desktop.
                Fast, reliable, and easy-to-use. Join the community
                that trusts us for all their QR Code needs.</p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center lg:w-4/5 xl:w-1/2 mx-auto px-4">
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <FaServer className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">Secure</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">It is fast and secure, our service has HTTPS protocol and data encryption.</p>
                </div>

                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <IoGitCompare className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">Compatible</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">QRQuick is compatible for any devices and situations.</p>
                </div>

                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <FaHeartCircleCheck className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">Easy</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">QRQuick is easy and fast, enter the long link to get your QR Codes.</p>
                </div>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center lg:w-4/5 xl:w-1/2 mx-auto px-4">
                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <FaAdversal className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">Ad-free scanning</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">Provide a seamless user experience without distracting ads, ensuring users have a better experience in each scan.</p>
                </div>

                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <FaRegRegistered className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">No registration</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">You can create as many static QR Codes as you like without registering. With a free account, you can manage unlimited QR Codes.</p>
                </div>

                <div className="shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-lg px-4 py-8 text-center md:w-1/3">
                    <FaDev className="size-10 w-full" />
                    <h4 className="mt-6 text-xl font-bold">Developer Friendly</h4>
                    <p className="mt-4 leading-tight font-semibold text-neutral-500">API access available for developers to integrate QR functionality.</p>
                </div>
            </div>
        </div>
    );
}