(function () {
  // === Config ===
  const SUPABASE_URL = "https://yyrotqflgzvyypgixywk.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cm90cWZsZ3p2eXlwZ2l4eXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTU2ODUsImV4cCI6MjA3MzE5MTY4NX0.Zi7jvcvc0yvz7Y5osKdjG-3fSyYdqCtrhRfUP7Z7b80";
  const FUNCTION = "processActivity";

  // Find the <script> tag including this tracker
  const currentScript = document.currentScript;
  const publicKey = currentScript?.getAttribute("data-publicKey") || "unknown";
  const mode = currentScript?.getAttribute("data-mode") || "allow";

  // Helper to post an activity
  async function logActivity(eventType, eventMeta = {}) {
    try {
      const payload = {
        public_key: publicKey,
        event_type: eventType,
        url: window.location.href,
        referrer: document.referrer,
        device_data: {
          ua: navigator.userAgent,
          lang: navigator.language,
          screen: { w: screen.width, h: screen.height },
        },
        event_meta: eventMeta,
      };

      await fetch(`${SUPABASE_URL}/functions/v1/${FUNCTION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          authorization: "Bearer " + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Activity log failed:", err);
    }
  }

  function addClickListener() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      console.log(e);
      if (target) {
        logActivity("click", {
          element: target.tagName,
          id: target.id,
          cls: target.className,
          innerText: target.innerText,
        });
      }
    });
  }

  function addLeaveListener() {
    window.addEventListener("beforeunload", () => {
      logActivity("pageleave");
    });
  }

  function enableTracking() {
    logActivity("pageview");
    addLeaveListener();
    addClickListener();
  }

  function init() {
    if (mode === "allow") {
      enableTracking();
    } else if (mode === "cmp") {
      // handle cmp
    }
  }

  init();

  window.ActivityTracker = { logActivity };
})();
