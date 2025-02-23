"use client"
import { useState } from "react"
import { Copy, QrCode, Check } from "lucide-react"
import QRCode from 'react-qr-code';
import { ImCross } from "react-icons/im";

export default function FileShare({ publicUrl, handleClose }: { publicUrl: string, handleClose: () => void }) {
    const [copied, setCopied] = useState(false)
    const [showQRCode, setShowQRCode] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(publicUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div onClick={() => {
        }} className="min-h-screen z-10 absolute top-0 left-0 bg-neutral-800/50 backdrop-blur-lg w-full flex items-center justify-center p-4">
            {
                showQRCode && <div onClick={()=> {
                    setShowQRCode(false)
                }} className="w-screen h-screen z-50 bg-black/80 backdrop-blur-md flex justify-center items-center absolute top-0 left-0">
                    <QRCode className="z-50 border rounded-lg p-0 md:p-4" value={publicUrl} />
                </div>
            }
            <div className="w-full z-40 relative max-w-2xl bg-black/80 backdrop-blur-sm rounded-3xl p-8 space-y-8">
                <ImCross onClick={handleClose} className="p-2 size-8 absolute top-4 right-4 text-white/50 duration-500 ease-out hover:text-white transition-colors" />
                <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-b from-neutral-50 to-neutral-300 text-transparent bg-clip-text">
                    Your file is ready to share!
                </h1>
                <div className="space-y-4">
                    <h2 className="text-2xl text-white text-center">Copy the link to share your file</h2>
                    <div className="flex gap-2 flex-col sm:flex-row">
                        <input
                            type="text"
                            value={publicUrl}
                            readOnly
                            className="flex-1 px-4 py-3 outline-none focus:ring-0 rounded-xl bg-black/50 text-white border border-white/10"
                        />
                        <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-xl font-medium transition-colors"
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            Copy link
                        </button>
                    </div>

                    <div className="w-full">
                        <button onClick={()=> setShowQRCode(true)} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors">
                            <QrCode className="w-5 h-5" />
                            Show QR code
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-white">
                    <span>Your file will be deleted</span>
                    <select className="bg-white/5 rounded-lg px-3 py-2 appearance-none">
                        <option>in 1 hour</option>
                        <option>in 6 hours</option>
                        <option>in 12 hours</option>
                        <option>in 24 hours</option>
                    </select>
                    <span>or after</span>
                    <select className="bg-white/5 rounded-lg px-3 py-2 appearance-none">
                        <option>10 downloads</option>
                        <option>20 downloads</option>
                        <option>50 downloads</option>
                        <option>100 downloads</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Check className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-emerald-500">Encrypted</h3>
                            <p className="text-white/70">End-to-end encrypted</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Check className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-blue-500">Uploaded</h3>
                            <p className="text-white/70">You can close this page now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

