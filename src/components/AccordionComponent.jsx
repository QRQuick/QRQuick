import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function AccordionComponent({ className }) {
    return (
        <div className={className}>
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">FAQ</h2>

            <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-bold text-lg">What is a QR Code?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">A QR code (Quick Response code) is a type of two-dimensional barcode that can store information such as URLs, text, or other data. It is made up of black squares arranged on a white background and can be scanned using a smartphone or QR code reader to quickly access the stored information. QR codes are widely used for contactless payments, marketing, and sharing links.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-bold text-lg">What can a QR Code do?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">
                            A QR code is a versatile tool that can store and share various types of information, such as website URLs, contact details, Wi-Fi credentials, and payment links. By scanning the code with a smartphone, users can quickly access this data, enabling functions like visiting websites, connecting to Wi-Fi, making payments, downloading apps, or sharing social media profiles and event information. QR codes are widely used for their convenience and efficiency in providing
                            instant access to digital content.
                        </AccordionContent>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-bold text-lg">What is a QR Code generator?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">A QR code generator is a software which stores data into a QR code (for example a text or a website address). E.g. this can be easily done with our online QR generator QRQuick: just create a QR code by typing in your data and download it as high resolution PNG or vector graphic (SVG, EPS). Now you may print your free QR code or embed it on your website to make it available to others.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-bold text-lg">How long are QR codes valid?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">From a technical perspective QR codes do not expire or get invalid: The information a QR code offers after scanning is stored in the graphic itself (hence QR codes also get larger and form a more complex pattern if there is more data to store). The stored data cannot be changed and therefore a QR code does not “expire” after a certain time.
                        Unfortunately, there are shady QR code providers and generators, who simply do not store the data entered by the user into the QR code. An example: When you type the web address http://www.example.com, these unscrupulous providers store a redirection address like http://[domain-of-the-provider]/www.example.com into the code without notifying the user about it. So after scanning the code, you’re sent to http://[domain-of-the-provider]/ and redirected to the real destination www.example.com afterwards. The business model of these QR providers normally is to switch off the redirection after a short time frame. So the QR code “expires” even though neither the QR code symbol nor the data it provides were changed. The redirection normally is reactivated after some payment. Sadly, many users are willing to pay because re-printing publicity material, leaflets and things like that often costs more.
                        However, there is nothing bad about QR code redirects in general (in fact, even our dynamic QR codes are based on redirects to make it possible to change the target URL after printing). But we think its bad manners to offer a “free” QR service but actually rely on the lack of knowledge of the customer to take the generated QR codes as “hostage” because the user created QR codes with expiration date without even noticing it.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="font-bold text-lg">Do QR codes have to be black and white?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">No. Most important is a good contrast between the light and dark modules / pixels. Furthermore, a colorized QR code should be no negative (in terms of color, the actually black pixels / modules have to be darker than the normally white pixels) as the dark modules / pixels contain the data and a negative will confuse many QR code readers.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="font-bold text-lg">How to read / scan a QR code?</AccordionTrigger>
                        <AccordionContent className="font-semibold text-base md:text-lg">A barcode scanner (or a mobile phone with camera and an appropriate reader app) which supports the QR code standard is required to scan a QR code. QR code reader apps are made available by different manufacturers and for different mobile devices, mostly for free.

There are many free QR code reader for Smartphones. However, they differ significantly in terms of usability, scanning speed and standards compliance (in particular regarding the processing of vCards). Therefore we provide an overview about recommendable QR code software.</AccordionContent>
                    </AccordionItem>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
