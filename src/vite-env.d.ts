/// <reference types="vite/client" />

// Tells TS, that .png a "modul"
declare module '*.png' {
    const value: string;
    export default value;
}