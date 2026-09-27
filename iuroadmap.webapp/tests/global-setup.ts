export default function globalSetup() {
    // Disable SSL certificate verification for localhost testing
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}