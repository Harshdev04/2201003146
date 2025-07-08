import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { logEvent } from "../logging/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        await logEvent("frontend", "info", "page", `Redirecting for shortcode: ${shortcode}`);
        
        const res = await axios.get(`http://20.244.56.144/url/${shortcode}`);
        const longUrl = res.data.longUrl;

        // Log redirection
        await logEvent("frontend", "info", "page", `Redirecting to: ${longUrl}`);

        // Redirect
        window.location.href = longUrl;
      } catch (error) {
        await logEvent("frontend", "error", "page", `Invalid shortcode: ${shortcode}`);
        alert("⚠️ Invalid or expired shortcode.");
        navigate("/");
      }
    };

    fetchAndRedirect();
  }, [shortcode, navigate]);

  return (
    <div style={{ padding: 30 }}>
      <h3>🔄 Redirecting...</h3>
    </div>
  );
};

export default RedirectHandler;
