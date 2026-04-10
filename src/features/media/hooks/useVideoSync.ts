"use client";

import { useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";

export function useVideoSync(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
    const gatilhoPlayMuted = useSelectionStore((state) => state.gatilhoPlayMuted);

    useEffect(() => {
        if (gatilhoPlayMuted > 0 && iframeRef.current?.contentWindow) {

            const target = iframeRef.current.contentWindow;

            // 1. Comando de Mute
            target.postMessage(
                JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*'
            );

            // 2. Comando de Play
            target.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*'
            );
        }
    }, [gatilhoPlayMuted, iframeRef]);
}