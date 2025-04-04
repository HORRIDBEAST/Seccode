import { Caesar, Vigenere } from 'caesar-salad';
import AES from 'crypto-js/aes';
import SHA256 from 'crypto-js/sha256';
import encUtf8 from 'crypto-js/enc-utf8';
import encHex from 'crypto-js/enc-hex';

export class SecuritySimulation {
  private alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private freqEnglish: { [key: string]: number } = {
    a: 0.082, b: 0.015, c: 0.028, d: 0.043, e: 0.127,
    f: 0.022, g: 0.020, h: 0.061, i: 0.070, j: 0.002,
    k: 0.008, l: 0.040, m: 0.024, n: 0.067, o: 0.075,
    p: 0.019, q: 0.001, r: 0.060, s: 0.063, t: 0.091,
    u: 0.028, v: 0.010, w: 0.024, x: 0.002, y: 0.020, z: 0.001,
  };

  secureInput(input: string, maxLength = 20): string | null {
    if (input.length > maxLength) return null;
    if (!/^[a-zA-Z0-9\s]*$/.test(input)) return null;
    return input;
  }

  caesarEncrypt(text: string, shift: number): string {
    return Caesar.Cipher(shift).crypt(text);
  }

  caesarDecrypt(text: string, shift: number): string {
    return Caesar.Decipher(shift).crypt(text);
  }

  vigenereEncrypt(text: string, key: string): string {
    return Vigenere.Cipher(key).crypt(text);
  }

  vigenereDecrypt(text: string, key: string): string {
    return Vigenere.Decipher(key).crypt(text);
  }

  private generateRandomIV(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  aesEncrypt(text: string, key: string): { ciphertext: string; iv: string } {
    const iv = this.generateRandomIV(16);
    const encrypted = AES.encrypt(text, key, { iv: encUtf8.parse(iv) }).toString();
    return { ciphertext: encrypted, iv };
  }

  aesDecrypt(ciphertext: string, key: string, iv: string): string {
    return AES.decrypt(ciphertext, key, { iv: encUtf8.parse(iv) }).toString(encUtf8);
  }

  calculateEntropy(text: string): number {
    if (!text) return 0;
    const counter: { [key: string]: number } = {};
    for (const char of text.toLowerCase()) {
      counter[char] = (counter[char] || 0) + 1;
    }
    const length = text.length;
    const entropy = -Object.values(counter).reduce((sum, count) => {
      const p = count / length;
      return sum + (p > 0 ? p * Math.log2(p) : 0);
    }, 0);
    return isNaN(entropy) ? 0 : entropy;
  }

  frequencyAnalysis(text: string): { [key: string]: number } {
    const letterCount: { [key: string]: number } = {};
    const totalLetters = text.toLowerCase().replace(/[^a-z]/g, '').length;
    if (totalLetters === 0) return {};
    for (const char of text.toLowerCase()) {
      if (/[a-z]/.test(char)) letterCount[char] = (letterCount[char] || 0) + 1;
    }
    return Object.fromEntries(
      Object.entries(letterCount).map(([k, v]) => [k, v / totalLetters])
    );
  }

  breakCaesarCipher(encrypted: string): { shift: number; decrypted: string } {
    let bestShift = 0;
    let lowestChiSquare = Infinity;

    for (let shift = 0; shift < 26; shift++) {
      const decrypted = this.caesarDecrypt(encrypted, shift);
      const freq = this.frequencyAnalysis(decrypted);
      let chiSquare = 0;
      for (const [letter, f] of Object.entries(freq)) {
        const expected = this.freqEnglish[letter] || 0.001;
        chiSquare += (f - expected) ** 2 / expected;
      }
      if (chiSquare < lowestChiSquare) {
        lowestChiSquare = chiSquare;
        bestShift = shift;
      }
    }
    return { shift: bestShift, decrypted: this.caesarDecrypt(encrypted, bestShift) };
  }

  hashPassword(password: string, salt: string): string {
    return SHA256(salt + password).toString();
  }

  anonymizeData(name: string, email: string, phone: string) {
    return {
      name: `***${name.slice(-3)}`,
      email: `${email[0]}***@${email.split('@')[1]}`,
      phone: `XXX-XXX-${phone.slice(-4)}`,
    };
  }

  differentialPrivacy(count1: number, count2: number): number {
    const sensitiveCount = Math.abs(count1 - count2);
    const epsilon = 1.0;
    const sensitivity = 1.0;
    const scale = sensitivity / epsilon;
    const noise = this.laplaceNoise(scale);
    return sensitiveCount + noise;
  }

  private laplaceNoise(scale: number): number {
    const u = Math.random() - 0.5;
    return -Math.sign(u) * scale * Math.log(1 - 2 * Math.abs(u));
  }
}

export const simulation = new SecuritySimulation();