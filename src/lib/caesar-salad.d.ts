declare module 'caesar-salad' {
    export const Caesar: {
      Cipher(shift: number): { crypt(text: string): string };
      Decipher(shift: number): { crypt(text: string): string };
    };
    export const Vigenere: {
      Cipher(key: string): { crypt(text: string): string };
      Decipher(key: string): { crypt(text: string): string };
    };
  }