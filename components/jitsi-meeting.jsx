"use client";

import { useEffect, useRef } from "react";

export default function JitsiMeeting({ roomName, userName, onClose }) {
  const containerRef = useRef(null);
  const jitsiRef = useRef(null);

  useEffect(() => {
    // Dynamically load Jitsi Meet External API script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = initJitsi;
    document.head.appendChild(script);

    function initJitsi() {
      if (!window.JitsiMeetExternalAPI) {
        console.error("Jitsi API not loaded");
        return;
      }

      if (!containerRef.current) return;

      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: containerRef.current,
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableSimulcast: false,
          enableWelcomePage: false,
          prejoinPageEnabled: false,
          toolbarButtons: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fouser-menu",
            "chat",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "tileview",
          ],
        },
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: "#000",
          HIDE_INVITE_PROMPT: false,
          MOBILE_APP_PROMO: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        },
        userInfo: {
          displayName: userName || "Guest",
        },
      };

      try {
        jitsiRef.current = new window.JitsiMeetExternalAPI(
          "meet.jit.si",
          options
        );

        // Listen for conference events
        jitsiRef.current.addEventListener("readyToClose", () => {
          if (onClose) {
            onClose();
          }
        });
      } catch (error) {
        console.error("Error initializing Jitsi:", error);
      }
    }

    return () => {
      // Cleanup Jitsi instance
      if (jitsiRef.current) {
        try {
          jitsiRef.current.dispose();
        } catch (e) {
          console.error("Error disposing Jitsi:", e);
        }
      }

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [roomName, userName, onClose]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
      }}
    />
  );
}
