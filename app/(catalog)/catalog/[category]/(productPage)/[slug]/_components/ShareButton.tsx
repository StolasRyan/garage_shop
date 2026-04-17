'use client'
import { TelegramShareButton, TelegramIcon, VKShareButton, VKIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { Share2Icon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react'

interface ShareButtonPros {
    title: string;
    className?: string;
}

const ShareButton = ({ title, className = '' }: ShareButtonPros) => {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUrl(window.location.href);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        };

        if (showShareMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showShareMenu]);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowShareMenu(!showShareMenu);
    };

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <div 
                onClick={toggleMenu}
                className='flex flex-row flex-wrap gap-2 items-center cursor-pointer hover:opacity-80 transition-opacity'
            >
                <Share2Icon className='w-5 h-5'/>
                <p className='text-sm select-none'>Share</p>
            </div>
            
            {showShareMenu && currentUrl && (
                <div className='absolute top-full left-0 bg-white shadow-lg rounded-md p-3 z-50 mt-2 border border-gray-200'>
                    <div className='flex gap-3'>
                        <TelegramShareButton
                            url={currentUrl}
                            title={title}
                            className="hover:opacity-70 transition-opacity"
                        >
                            <TelegramIcon size={32} round />
                        </TelegramShareButton>

                        <VKShareButton
                            url={currentUrl}
                            title={title}
                            className="hover:opacity-70 transition-opacity"
                        >
                            <VKIcon size={32} round />
                        </VKShareButton>

                        <WhatsappShareButton
                            url={currentUrl}
                            title={title}
                            className="hover:opacity-70 transition-opacity"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShareButton