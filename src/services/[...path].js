import fetch from 'node-fetch';

const DYNAMICS_BASE = "https://scujxlc8zs397019114-rs.su.retail.dynamics.com/Commerce";

export default async function handler(req, res) {
    try {
        // Capture the path after /api/commerce/*
        const { path = [] } = req.query;
        const queryString = req.url.split("?")[1] || "";
        const targetUrl = `${DYNAMICS_BASE}/${(Array.isArray(path) ? path.join("/") : path)}${queryString ? `?${queryString}` : ""}`;
// Forward headers (add your required headers like Authorization if needed)
        const headers = {
            "Content-Type": "application/json",
            ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {})
        };

        // Forward GET, POST, etc.
        const response = await fetch(targetUrl, {
            method: req.method,
            headers,
            body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
        });

        // Read response
        const data = await response.text();

        res.status(response.status).send(data);
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Proxy failed", details: error.message });
    }
}
