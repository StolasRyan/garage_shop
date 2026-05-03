'use client'

import { useEffect, useState } from "react"
import { TelegramIcon, TelegramShareButton, VKIcon, VKShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";


const ShareButton = ()=>{
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        
        if(typeof window !== 'undefined'){
            setUrl(window.location.href);
            setTitle(document.title);
        }
    },[])

    if(!mounted) return null;
    return (
        <div className="fixed bg-white top-50 right-0 px-2 py-9 z-50 rounded-bl-[100px] rounded-tl-[100px] shadow-lg">
            <div className="flex flex-col gap-3">
                <TelegramShareButton
                url={url}
                title={title}
                className="hover:opacity-70 transition-opacity"
                aria-label="Share in Telegram"
                >
                    <TelegramIcon size={24} round />
                </TelegramShareButton>
                <VKShareButton
                url={url}
                title={title}
                className="hover:opacity-70 transition-opacity"
                aria-label="Share in VK"
                >
                    <VKIcon size={24} round />
                </VKShareButton>

                <WhatsappShareButton
                url={url}
                title={title}
                className="hover:opacity-70 transition-opacity"
                aria-label="Share in Whatsapp"
                >
                    <WhatsappIcon size={24} round />
                </WhatsappShareButton>
            </div>
        </div>
    )
}
export default ShareButton