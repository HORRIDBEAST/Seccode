import { Buffer } from 'buffer';

// Polyfill Buffer globally
(window as any).Buffer = Buffer;