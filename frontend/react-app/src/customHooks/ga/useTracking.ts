import { useEffect } from "react";
import { useHistory } from "react-router-dom";

declare global {
    interface Window {
        gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
    }
}

export const useTracking: any = (trackingId: string) => {
    const { listen } = useHistory()

    useEffect(() => {
        const unlisten = listen((location) => {
          if (!window.gtag) return;
          if (!trackingId) {
            console.log(
              'Tracking not enabled',
            );
            return;
          }
          window.gtag('config', trackingId, { page_path: location.pathname });
        });
    
        return unlisten;
    }, [trackingId, listen]);

}