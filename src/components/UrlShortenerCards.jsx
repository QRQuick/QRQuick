"use client";
import { useState, useRef } from "react";
import { Link, Wifi, FileText, Image, FileJson, Mail, Phone, User, MessageSquare, MapPin, AppWindow, BarChart3 } from "lucide-react";

export default function UrlShortenerCards({ className }) {
    const [menu, setMenu] = useState("qr");
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [qrType, setQrType] = useState("url");
    const [dragActive, setDragActive] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [qrWithWatermark, setQrWithWatermark] = useState(null);
    const [trackingDragActive, setTrackingDragActive] = useState(false);
    const [trackingImage, setTrackingImage] = useState(null);
    const [trackingData, setTrackingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [mapsForm, setMapsForm] = useState({
        location: "",
        label: ""
    });

    const [appsForm, setAppsForm] = useState({
        name: "",
        url: "",
        platform: ""
    });
    
    const [wifiForm, setWifiForm] = useState({
        ssid: "",
        password: "",
        encryption: "WPA"
    });
    
    const [fileDetails, setFileDetails] = useState({
        url: "",
        title: ""
    });

    const [emailForm, setEmailForm] = useState({
        to: "",
        subject: "",
        body: ""
    });

    const [smsForm, setSmsForm] = useState({
        phone: "",
        message: ""
    });

    const [whatsappForm, setWhatsappForm] = useState({
        phone: "",
        message: ""
    });

    const [vCardForm, setVCardForm] = useState({
        firstName: "",
        lastName: "",
        organization: "",
        title: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        note: ""
    });

    const QR_TYPES = [
        { id: 'url', name: 'URL', icon: Link },
        { id: 'wifi', name: 'WiFi', icon: Wifi },
        { id: 'pdf', name: 'PDF', icon: FileText },
        { id: 'image', name: 'Image', icon: Image },
        { id: 'gdocs', name: 'Google Docs', icon: FileJson },
        { id: 'gdrive', name: 'Google Drive', icon: FileJson },
        { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
        { id: 'email', name: 'Email', icon: Mail },
        { id: 'sms', name: 'SMS', icon: Phone },
        { id: 'vcard', name: 'vCard', icon: User },
        { id: 'maps', name: 'Maps', icon: MapPin },
        { id: 'apps', name: 'Apps', icon: AppWindow },
    ];

    const handleMapsFormChange = (e) => {
        const { name, value } = e.target;
        setMapsForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAppsFormChange = (e) => {
        const { name, value } = e.target;
        setAppsForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMenu = (event) => {
        const targetId = event.target.id;
        setMenu(targetId);
        setQrCodeUrl("");
    };

    const handleTypeChange = (type) => {
        setQrType(type);
        setQrCodeUrl("");
        if (type !== 'image') {
            setImageFile(null);
            setImagePreview(null);
        }
    };

    const handleWifiFormChange = (e) => {
        const { name, value } = e.target;
        setWifiForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailFormChange = (e) => {
        const { name, value } = e.target;
        setEmailForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSmsFormChange = (e) => {
        const { name, value } = e.target;
        setSmsForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleWhatsappFormChange = (e) => {
        const { name, value } = e.target;
        setWhatsappForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVCardFormChange = (e) => {
        const { name, value } = e.target;
        setVCardForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileDetailsChange = (e) => {
        const { name, value } = e.target;
        setFileDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        handleImageFile(file);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        handleImageFile(file);
    };

    const mockTrackingData = {
        totalScans: 1,
        uniqueUsers: 1,
        scansByDevice: {
            mobile: 1,
            desktop: 0,
            tablet: 0
        },
        scansByLocation: {
            "United States": 0,
            "Indonesia": 1,
            "Germany": 0,
            "Others": 0
        },
        recentScans: [
            { timestamp: "2024-03-03T14:23:00Z", device: "mobile", location: "Jakarta, Indonesia" },
            { timestamp: "2024-03-03T13:45:00Z", device: "desktop", location: "Yogyakarta, Indonesia" },
            { timestamp: "2024-03-03T12:30:00Z", device: "mobile", location: "Berlin, Germany" },
        ]
    };

    const handleTrackingDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setTrackingDragActive(true);
        } else if (e.type === "dragleave") {
            setTrackingDragActive(false);
        }
    };

    const handleTrackingDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTrackingDragActive(false);
        setError(null);

        const file = e.dataTransfer.files[0];
        await handleTrackingFile(file);
    };

    const handleTrackingUpload = async (e) => {
        const file = e.target.files[0];
        await handleTrackingFile(file);
    };

    const handleTrackingFile = async (file) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size should be less than 5MB');
                return;
            }

            setIsLoading(true);
            try {
                // Create preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setTrackingImage(reader.result);
                };
                reader.readAsDataURL(file);

                // Simulate API call to get tracking data
                await new Promise(resolve => setTimeout(resolve, 1500));
                setTrackingData(mockTrackingData);
            } catch (err) {
                setError('Failed to analyze QR code. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Please upload an image file');
        }
    };

    const renderTrackingStats = () => {
        if (!trackingData) return null;

        return (
            <div className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Total Scans</h3>
                        <p className="text-2xl font-bold">{trackingData.totalScans}</p>
                    </div>
                    <div className="bg-neutral-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Unique Users</h3>
                        <p className="text-2xl font-bold">{trackingData.uniqueUsers}</p>
                    </div>
                    <div className="bg-neutral-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Device Distribution</h3>
                        <div className="space-y-1">
                            {Object.entries(trackingData.scansByDevice).map(([device, count]) => (
                                <div key={device} className="flex justify-between">
                                    <span className="capitalize">{device}</span>
                                    <span>{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleImageFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                // Instead of setting the base64 directly, we'll create a temporary URL
                const imageUrl = URL.createObjectURL(file);
                setQrCodeValue(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file');
        }
    };

    const addWatermark = async (qrUrl) => {
        try {
            // Create a temporary canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Create a new image object for the QR code
            const qrImage = new Image();
            
            // Wait for the QR code to load
            await new Promise((resolve, reject) => {
                qrImage.onload = resolve;
                qrImage.onerror = reject;
                qrImage.src = qrUrl;
            });

            // Set canvas size to match QR code
            canvas.width = qrImage.width;
            canvas.height = qrImage.height;

            // Draw QR code
            ctx.drawImage(qrImage, 0, 0);

            // Add watermark text
            ctx.font = '10px Arial';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            
            // Get text metrics
            const text = 'QRQuick';
            const metrics = ctx.measureText(text);
            
            // Position watermark at bottom right with padding
            const padding = 5;
            const x = canvas.width - metrics.width - padding;
            const y = canvas.height - padding;

            // Draw watermark
            ctx.fillText(text, x, y);

            // Convert canvas to data URL
            const watermarkedDataUrl = canvas.toDataURL('image/png');
            setQrWithWatermark(watermarkedDataUrl);

        } catch (error) {
            console.error('Error adding watermark:', error);
            setQrWithWatermark(qrUrl); // Fallback to original QR code
        }
    };

    const generateVCardData = () => {
        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${vCardForm.lastName};${vCardForm.firstName}`,
            `FN:${vCardForm.firstName} ${vCardForm.lastName}`,
            `ORG:${vCardForm.organization}`,
            `TITLE:${vCardForm.title}`,
            `TEL:${vCardForm.phone}`,
            `EMAIL:${vCardForm.email}`,
            `ADR:;;${vCardForm.address}`,
            `URL:${vCardForm.website}`,
            `NOTE:${vCardForm.note}`,
            'END:VCARD'
        ].join('\n');

        return vcard;
    };

    const generateQRValue = () => {
        switch(qrType) {
            case 'wifi':
                return `WIFI:T:${wifiForm.encryption};S:${wifiForm.ssid};P:${wifiForm.password};;`;
            case 'whatsapp':
                const phone = whatsappForm.phone.replace(/[^\d]/g, '');
                return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappForm.message)}`;
            case 'email':
                return `mailto:${emailForm.to}?subject=${encodeURIComponent(emailForm.subject)}&body=${encodeURIComponent(emailForm.body)}`;
            case 'sms':
                return `SMS:${smsForm.phone}:${smsForm.message}`;
            case 'vcard':
                return generateVCardData();
            case 'pdf':
            case 'gdocs':
            case 'gdrive':
                return `${fileDetails.url}\nTitle: ${fileDetails.title}`;
            case 'maps':
                return `geo:0,0?q=${encodeURIComponent(mapsForm.location)}${mapsForm.label ? `(${encodeURIComponent(mapsForm.label)})` : ''}`;
            case 'apps':
                const platforms = {
                    'android': 'market://details?id=',
                    'ios': 'itms-apps://itunes.apple.com/app/id',
                    'web': ''
                };
                return `${platforms[appsForm.platform] || ''}${appsForm.url}`;
            case 'image':
                return qrCodeValue;
            default:
                return qrCodeValue;
        }
    };

    const handleGenerateQrCode = async () => {
        if (qrType === 'url' && !qrCodeValue.trim()) {
            alert('Silakan masukkan URL atau teks terlebih dahulu');
            return;
        }

        const value = generateQRValue();
        if (value) {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(value)}`;
            setQrCodeUrl(qrUrl);
            addWatermark(qrUrl);
        }
    };

    const downloadQRCode = async () => {
        try {
            const response = await fetch(qrWithWatermark || qrCodeUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode-${qrType}-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };

    const renderImageUpload = () => (
        <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {imagePreview ? (
                <div className="space-y-4">
                    <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto rounded-lg max-w-[200px] max-h-[200px] object-contain"
                    />
                    <button
                        onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setQrCodeValue("");
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        Remove Image
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        <Image className="mx-auto size-8 text-gray-400" />
                        <p className="text-gray-600">Drag and drop your image here, or</p>
                        <label className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-800">
                            Choose File
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Supports: JPG, PNG, GIF (max 5MB)</p>
                </>
            )}
        </div>
    );

    const renderForm = () => {
        switch(qrType) {
            case 'maps':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={mapsForm.location}
                                onChange={handleMapsFormChange}
                                placeholder="Enter address or coordinates"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Label (Optional)</label>
                            <input
                                type="text"
                                name="label"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={mapsForm.label}
                                onChange={handleMapsFormChange}
                                placeholder="Enter location name"
                            />
                        </div>
                    </div>
                );
            case 'apps':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Platform</label>
                            <select
                                name="platform"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={appsForm.platform}
                                onChange={handleAppsFormChange}
                            >
                                <option value="">Select Platform</option>
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                                <option value="web">Web</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">App URL or ID</label>
                            <input
                                type="text"
                                name="url"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={appsForm.url}
                                onChange={handleAppsFormChange}
                                placeholder="Enter app URL or ID"
                            />
                        </div>
                    </div>
                );
            case 'wifi':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Network Name (SSID)</label>
                            <input
                                type="text"
                                name="ssid"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={wifiForm.ssid}
                                onChange={handleWifiFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={wifiForm.password}
                                onChange={handleWifiFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Encryption</label>
                            <select
                                name="encryption"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={wifiForm.encryption}
                                onChange={handleWifiFormChange}
                            >
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">No Password</option>
                            </select>
                        </div>
                    </div>
                );
            case 'whatsapp':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number (with country code)</label>
                            <input
                                type="text"
                                name="phone"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={whatsappForm.phone}
                                onChange={handleWhatsappFormChange}
                                placeholder="e.g., +6281234567890"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                            <textarea
                                name="message"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={whatsappForm.message}
                                onChange={handleWhatsappFormChange}
                                rows="3"
                                placeholder="Enter your message"
                            />
                        </div>
                    </div>
                );
            case 'email':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">To</label>
                            <input
                                type="email"
                                name="to"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={emailForm.to}
                                onChange={handleEmailFormChange}
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={emailForm.subject}
                                onChange={handleEmailFormChange}
                                placeholder="Email subject"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Body</label>
                            <textarea
                                name="body"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={emailForm.body}
                                onChange={handleEmailFormChange}
                                rows="3"
                                placeholder="Email body"
                            />
                        </div>
                    </div>
                );
            case 'sms':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={smsForm.phone}
                                onChange={handleSmsFormChange}
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={smsForm.message}
                                onChange={handleSmsFormChange}
                                rows="3"
                                placeholder="Enter your message"
                            />
                        </div>

                        </div>
                );
            case 'vcard':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                    value={vCardForm.firstName}
                                    onChange={handleVCardFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                    value={vCardForm.lastName}
                                    onChange={handleVCardFormChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Organization</label>
                            <input
                                type="text"
                                name="organization"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.organization}
                                onChange={handleVCardFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title/Position</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.title}
                                onChange={handleVCardFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.phone}
                                onChange={handleVCardFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.email}
                                onChange={handleVCardFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <textarea
                                name="address"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.address}
                                onChange={handleVCardFormChange}
                                rows="2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Website</label>
                            <input
                                type="url"
                                name="website"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.website}
                                onChange={handleVCardFormChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Note</label>
                            <textarea
                                name="note"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={vCardForm.note}
                                onChange={handleVCardFormChange}
                                rows="2"
                            />
                        </div>
                    </div>
                );
            case 'pdf':
            case 'gdocs':
            case 'gdrive':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">File URL</label>
                            <input
                                type="text"
                                name="url"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={fileDetails.url}
                                onChange={handleFileDetailsChange}
                                placeholder={`Enter ${qrType.toUpperCase()} URL`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Title (Optional)</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full border border-neutral-300 rounded-lg px-4 py-2"
                                value={fileDetails.title}
                                onChange={handleFileDetailsChange}
                                placeholder="Enter file title"
                            />
                        </div>
                    </div>
                );
            case 'image':
                return renderImageUpload();
            default:
                return (
                    <input 
                        type="text" 
                        className="w-full border border-neutral-300 rounded-lg px-4 py-2 mt-2 font-semibold" 
                        placeholder="Enter URL or text"
                        value={qrCodeValue}
                        onChange={(e) => setQrCodeValue(e.target.value)}
                    />
                );
        }
    };

    return (
        <>
        <div className="flex justify-center gap-6 mt-10">
            <p className={`px-4 py-1 pb-2 ${menu === "qr" ? "bg-neutral-900" : "bg-neutral-500"} hover:bg-neutral-900 text-white rounded-lg font-semibold cursor-pointer`} id="qr" onClick={handleMenu}>
                QR Codes
            </p>
            <p className={`px-4 py-1 pb-2 ${menu === "clicks" ? "bg-neutral-900" : "bg-neutral-500"} hover:bg-neutral-900 text-white rounded-lg font-semibold cursor-pointer`} id="clicks" onClick={handleMenu}>
                Track QR Codes
            </p>
        </div>

            <div className={`${className} ${menu === "qr" ? "" : "hidden"} shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto mt-6 rounded-lg px-6 py-4 pb-6`}>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-6">
                    {QR_TYPES.map(type => (
                        <button
                            key={type.id}
                            onClick={() => handleTypeChange(type.id)}
                            className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-colors
                                ${qrType === type.id ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
                        >
                            <type.icon className="size-4" />
                            <span>{type.name}</span>
                        </button>
                    ))}
                </div>

                <h2 className="font-semibold text-lg mb-4">Enter {qrType.toUpperCase()} Details</h2>
                
                {renderForm()}

                <div className={`${!qrCodeUrl ? "hidden" : ""} mt-6`}>
                    <h2 className="font-semibold text-lg">Generated QR Code:</h2>
                    <div className="flex flex-col items-center mt-2">
                        <img 
                            src={qrWithWatermark || qrCodeUrl} 
                            alt="QR Code" 
                            className="mx-auto w-[150px] h-[150px]" 
                        />
                        <button 
                            onClick={downloadQRCode}
                            className="flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download QR Code
                        </button>
                    </div>
                </div>

                <button 
                className={`w-full bg-neutral-900 text-white font-semibold rounded-lg px-4 py-2 mt-6 text-lg
                    ${(qrType === 'url' && !qrCodeValue.trim()) || // Tambahan pengecekan untuk URL
                      (qrType === 'image' && !imageFile) ||
                      (qrType === 'wifi' && (!wifiForm.ssid || (wifiForm.encryption !== 'nopass' && !wifiForm.password))) ||
                      (qrType === 'whatsapp' && !whatsappForm.phone) ||
                      (qrType === 'email' && !emailForm.to) ||
                      (qrType === 'sms' && (!smsForm.phone || !smsForm.message)) ||
                      (qrType === 'vcard' && (!vCardForm.firstName || !vCardForm.lastName || !vCardForm.phone))
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-neutral-800'}`}
                onClick={handleGenerateQrCode}
                disabled={
                    (qrType === 'url' && !qrCodeValue.trim()) || // Tambahan pengecekan untuk URL
                    (qrType === 'image' && !imageFile) ||
                    (qrType === 'wifi' && (!wifiForm.ssid || (wifiForm.encryption !== 'nopass' && !wifiForm.password))) ||
                    (qrType === 'whatsapp' && !whatsappForm.phone) ||
                    (qrType === 'email' && !emailForm.to) ||
                    (qrType === 'sms' && (!smsForm.phone || !smsForm.message)) ||
                    (qrType === 'vcard' && (!vCardForm.firstName || !vCardForm.lastName || !vCardForm.phone))
                }
            >
                Generate QR Code
            </button>
            </div>

            <div className={`${className} ${menu === "clicks" ? "" : "hidden"} shadow-[0_0_10px_0_rgba(0,0,0,0.3)] mx-auto mt-6 rounded-lg px-6 py-4 pb-6`}>
                <h2 className="font-semibold text-lg mb-4">Track Your QR Code</h2>
                
                {!trackingImage ? (
                    <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center 
                            ${trackingDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onDragEnter={handleTrackingDrag}
                        onDragLeave={handleTrackingDrag}
                        onDragOver={handleTrackingDrag}
                        onDrop={handleTrackingDrop}
                    >
                        <div className="space-y-2">
                            <BarChart3 className="mx-auto size-8 text-gray-400" />
                            <p className="text-gray-600">Drag and drop your QR code image here, or</p>
                            <label className="inline-block bg-neutral-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-800">
                                Choose File
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleTrackingUpload}
                                />
                            </label>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Supports: JPG, PNG (max 5MB)</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <div className="relative">
                                <img 
                                    src={trackingImage} 
                                    alt="QR Code" 
                                    className="w-32 h-32 object-contain"
                                />
                                <button
                                    onClick={() => {
                                        setTrackingImage(null);
                                        setTrackingData(null);
                                        setError(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="text-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto"></div>
                                <p className="mt-2">Analyzing QR code...</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {renderTrackingStats()}
                    </div>
                )}
            </div>
        </>
    );
}
