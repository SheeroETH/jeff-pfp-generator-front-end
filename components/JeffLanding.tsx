import React, { useState } from 'react';
import { X, ShieldCheck, Wand2, Image as ImageIcon, Sparkles, Download } from 'lucide-react';

const JeffLanding: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setGeneratedImage(null); // Reset previous image

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate jeff');
            }

            const data = await response.json();
            setGeneratedImage(data.result);

        } catch (error) {
            console.error("Generation error:", error);
            alert("Failed to create Jeff. Please try again."); // Simple feedback
        } finally {
            setIsGenerating(false);
        }
    };

    // Original Jeff Image (Base)
    const baseImage = "/jeff-original.png";

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-transparent text-[#1a1a1a] font-space selection:bg-orange-200">

            {/* Background Image with Blur & Grain Overlay - REMOVED for Video Background */}
            {/* <div className="absolute inset-0 z-0 select-none pointer-events-none"> ... </div> */}

            {/* Wireframe / Perspective Lines (SVG Overlay) */}
            {/* Wireframe / Perspective Lines (SVG Overlay) - REMOVED */}
            {/* <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
                <svg className="w-full h-full max-w-6xl" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                    <line x1="500" y1="150" x2="200" y2="550" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                    <line x1="500" y1="150" x2="800" y2="550" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                </svg>
            </div> */}

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full min-h-screen pb-10 px-4">

                {/* Generator Header Section */}
                <div className="flex flex-col items-center text-center max-w-3xl animate-fade-in-up">

                    {/* Live Counter Pill */}
                    <div className="relative mb-6 mt-12">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/50 bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide text-gray-900 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            420 jeffs generated today
                        </div>
                    </div>

                    <h1 className="font-space text-3xl md:text-5xl font-medium text-[#1a1a1a] tracking-tight drop-shadow-sm select-none leading-tight">
                        Create your own <span className="font-chewy text-6xl md:text-7xl mx-2">Jeff pfp</span> <br className="hidden md:block" /> in just one click!
                    </h1>
                </div>

                {/* Input Bar Section */}
                <div className="w-full max-w-2xl mt-10 relative z-20 group">
                    {/* Glow effect behind input */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-[35px] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                    <div className="relative flex items-center p-2 bg-[#Fdfbf7]/90 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-xl">

                        {/* Text Input */}
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your Jeff PFP (e.g. A Jeff astronaut on mars)..."
                            className="flex-1 bg-transparent border-none outline-none px-6 text-[#1a1a1a] placeholder:text-gray-400 font-medium text-sm md:text-base h-12 w-full"
                        />

                        {/* Action Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="flex-shrink-0 flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-[#F3F0E6] px-6 py-3.5 rounded-[24px] font-bold text-sm shadow-lg shadow-black/10 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Cooking...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Jeff</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Generator Display Section (Grid) */}
                <div className="relative w-full max-w-5xl mt-12 px-2 md:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">

                        {/* LEFT CARD: ORIGINAL */}
                        <div className="flex flex-col gap-3">
                            <div className="relative aspect-square rounded-[40px] p-3 bg-gradient-to-b from-white/40 to-white/10 border border-white/50 backdrop-blur-sm shadow-sm transition-transform hover:scale-[1.01] duration-500">
                                <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                                    <img src={baseImage} className="w-full h-full object-cover" alt="Original Jeff" />
                                    {/* Overlay Label */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-xs font-bold tracking-widest border border-white/10">
                                        Original
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CARD: GENERATED */}
                        <div className="flex flex-col gap-3">
                            <div className="relative aspect-square rounded-[40px] p-3 bg-gradient-to-b from-white/40 to-white/10 border border-white/50 backdrop-blur-sm shadow-sm transition-transform hover:scale-[1.01] duration-500 group">

                                <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#EAE4D3]/50 flex items-center justify-center relative">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center gap-4 animate-pulse">
                                            <Sparkles className="text-amber-600/50 w-12 h-12 animate-bounce" />
                                            <p className="text-amber-900/40 font-chewy text-xl">jeff is evolving...</p>
                                        </div>
                                    ) : generatedImage ? (
                                        <>
                                            <img src={generatedImage} className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" alt="Generated Jeff" />
                                            {/* Action overlay for generated image */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                                                <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                    <Download size={16} /> Download PFP
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-6 opacity-40">
                                            <div className="w-20 h-20 mb-4 rounded-full bg-black/5 flex items-center justify-center">
                                                <ImageIcon className="text-[#1a1a1a] w-8 h-8" />
                                            </div>
                                            <p className="font-medium text-[#1a1a1a]">Your jeff will appear here</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Icons */}
                {/* Footer Icons - REMOVED */}
                {/* <div className="mt-16 pb-8 flex items-center gap-4">
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#fdfbf7] rounded-xl shadow-sm border border-black/5 hover:scale-110 transition-transform text-[#1a1a1a]">
                        <X size={20} strokeWidth={2} />
                    </a>
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#fdfbf7] rounded-xl shadow-sm border border-black/5 hover:scale-110 transition-transform text-[#1a1a1a]">
                        <ShieldCheck size={20} strokeWidth={2} />
                    </a>
                    <div className="text-xs font-medium text-black/40 ml-2">
                        powered by $jeff ai
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default JeffLanding;