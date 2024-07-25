const dev = process.env.NODE_ENV !== "production";

export const server = dev 
    ? "http://localhost:3000" 
    : "http://65.2.106.71:8001";
