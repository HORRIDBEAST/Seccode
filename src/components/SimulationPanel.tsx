import { useState } from 'react';
import { simulation } from '../utils/securitySimulation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SimulationPanelProps {
  selectedDemo: string;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ selectedDemo }) => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState<string | object | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [firstHash, setFirstHash] = useState<string | null>(null);
  const [salt, setSalt] = useState<string | null>(null);

  const demoDescriptions: { [key: string]: string } = {
    'Caesar Cipher': 'Encrypts your text using a Caesar Cipher by shifting each letter by a specified number. Enter a message (e.g., "hello") and a shift value (e.g., 3).',
    'Vigenère Cipher': 'Encrypts your text using a Vigenère Cipher with a keyword. Enter a message (e.g., "hello") and a key (e.g., "key").',
    'Entropy Calculation': 'Calculates the entropy (randomness) of your text in bits. Enter a string (e.g., "hello world") to see its entropy.',
    'Break Caesar Cipher': 'Attempts to break a Caesar Cipher by analyzing letter frequencies. Enter an encrypted message (e.g., "khoor") to find the shift and decrypt it.',
    'Entropy Comparison': 'Compares the entropy of different sample texts (English, Repeated, Random, Caesar, Vigenère). No input needed; just click "Run Simulation".',
    'Information Leakage': 'Demonstrates how encryption time and length can leak information. No input needed; just click "Run Simulation".',
    'Password Storage': 'Hashes a password with a salt and verifies it. Enter a password (e.g., "mypassword") to hash, then re-enter to verify.',
    'Data Anonymization': 'Anonymizes personal data like name, email, and phone. Enter a name (e.g., "John Doe") to see it anonymized.',
    'Differential Privacy': 'Applies differential privacy to two group sizes by adding noise. Enter two numbers (e.g., 100 and 90) to compare the original and privatized difference.',
    'TLS Handshake': 'Shows a simplified TLS handshake process. No input needed; just click "Run Simulation".',
    'Vulnerability Examples': 'Shows common vulnerabilities in different programming languages. Select a language (e.g., Python) to see examples.',
    'AES Encryption': 'Encrypts your text using AES (Advanced Encryption Standard), a secure symmetric encryption algorithm. Enter a message (e.g., "hello") and a key of 16, 24, or 32 characters (e.g., "mysecretkey12345" for 16 characters).',
  };

  const inputPlaceholders: { [key: string]: string } = {
    'Caesar Cipher': 'Message (e.g., "hello")',
    'Vigenère Cipher': 'Message (e.g., "hello")',
    'Entropy Calculation': 'Text (e.g., "hello world")',
    'Break Caesar Cipher': 'Encrypted text (e.g., "khoor")',
    'Entropy Comparison': 'No input needed',
    'Information Leakage': 'No input needed',
    'Password Storage': firstHash ? 'Enter the password again to verify' : 'Password (e.g., "mypassword")',
    'Data Anonymization': 'Name (e.g., "John Doe")',
    'Differential Privacy': 'Group 1 Size (e.g., 100)',
    'TLS Handshake': 'No input needed',
    'Vulnerability Examples': 'Select a language below',
    'AES Encryption': 'Message (e.g., "hello")',
  };

  const keyPlaceholders: { [key: string]: string } = {
    'Caesar Cipher': 'Shift (e.g., 3)',
    'Vigenère Cipher': 'Key (e.g., "key")',
    'AES Encryption': 'Key (16, 24, or 32 chars, e.g., "mysecretkey12345")',
    'Differential Privacy': 'Group 2 Size (e.g., 90)',
  };

  const handleSubmit = () => {
    setOutput(null);
    setChartData(null);

    const validatedInput = simulation.secureInput(input);
    if (!validatedInput && selectedDemo !== 'Password Storage') {
      setOutput('Invalid input: Max 20 characters, only letters, numbers, and spaces allowed.');
      return;
    }

    switch (selectedDemo) {
      case 'Caesar Cipher': {
        const shift = parseInt(key) || 3;
        const encrypted = simulation.caesarEncrypt(validatedInput as string, shift);
        const decrypted = simulation.caesarDecrypt(encrypted, shift);
        const originalEntropy = simulation.calculateEntropy(validatedInput as string);
        const encryptedEntropy = simulation.calculateEntropy(encrypted);
        setOutput({ encrypted, decrypted, originalEntropy, encryptedEntropy });
        break;
      }
      case 'Vigenère Cipher': {
        const keyValidated = simulation.secureInput(key) || 'key';
        const encrypted = simulation.vigenereEncrypt(validatedInput as string, keyValidated);
        const decrypted = simulation.vigenereDecrypt(encrypted, keyValidated);
        const originalEntropy = simulation.calculateEntropy(validatedInput as string);
        const encryptedEntropy = simulation.calculateEntropy(encrypted);
        setOutput({ encrypted, decrypted, originalEntropy, encryptedEntropy });
        break;
      }
      case 'Entropy Calculation': {
        const entropy = simulation.calculateEntropy(validatedInput as string);
        setOutput(`Entropy: ${entropy.toFixed(4)} bits`);
        break;
      }
      case 'Break Caesar Cipher': {
        const { shift, decrypted } = simulation.breakCaesarCipher(validatedInput as string);
        const freqEncrypted = simulation.frequencyAnalysis(validatedInput as string);
        const freqDecrypted = simulation.frequencyAnalysis(decrypted);
        setOutput({ shift, decrypted });
        setChartData({
          labels: Object.keys(freqEncrypted),
          datasets: [
            {
              label: 'Encrypted Text Frequencies',
              data: Object.values(freqEncrypted),
              backgroundColor: '#6366f1',
            },
            {
              label: 'Decrypted Text Frequencies',
              data: Object.values(freqDecrypted),
              backgroundColor: '#10b981',
            },
          ],
        });
        break;
      }
      case 'Entropy Comparison': {
        const samples = {
          'English': 'The quick brown fox jumps over the lazy dog',
          'Repeated': 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          'Random': Array(40).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join(''),
          'Caesar': simulation.caesarEncrypt('The quick brown fox jumps over the lazy dog', 3),
          'Vigenère': simulation.vigenereEncrypt('The quick brown fox jumps over the lazy dog', 'KEY'),
        };
        const entropies = Object.fromEntries(
          Object.entries(samples).map(([k, v]) => [k, simulation.calculateEntropy(v)])
        );
        setOutput(entropies);
        setChartData({
          labels: Object.keys(entropies),
          datasets: [
            {
              label: 'Entropy',
              data: Object.values(entropies),
              backgroundColor: '#10b981',
            },
          ],
        });
        break;
      }
      case 'Information Leakage': {
        const messages = [
          'short msg',
          'this is a medium length message',
          'this is a very long message that contains much more information than the others',
        ];
        const times = messages.map((m) => m.length * 0.01 + Math.random() * 0.1);
        const lengths = messages.map((m) => simulation.vigenereEncrypt(m, 'key').length);
        setOutput(messages.map((m, i) => ({ message: m, time: times[i].toFixed(4), length: lengths[i] })));
        setChartData({
          labels: messages.map((m) => m.slice(0, 10) + (m.length > 10 ? '...' : '')),
          datasets: [
            {
              label: 'Encryption Time (s)',
              data: times,
              backgroundColor: '#f87171',
            },
            {
              label: 'Encrypted Length (scaled)',
              data: lengths.map((l) => l / 10),
              backgroundColor: '#fbbf24',
            },
          ],
        });
        break;
      }
      case 'Password Storage': {
        const validatedPassword = simulation.secureInput(input);
        if (!validatedPassword) {
          setOutput('Invalid password: Max 20 characters, only letters, numbers, and spaces allowed.');
          return;
        }

        if (!firstHash) {
          const newSalt = Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          const hashed = simulation.hashPassword(validatedPassword, newSalt);
          setSalt(newSalt);
          setFirstHash(hashed);
          setOutput({ salt: newSalt, hashedPassword: hashed, message: 'Please enter the password again to verify.' });
          setInput('');
        } else {
          const validatedSecondPassword = simulation.secureInput(input);
          if (!validatedSecondPassword) {
            setOutput('Invalid password: Max 20 characters, only letters, numbers, and spaces allowed.');
            return;
          }

          const hashedSecond = simulation.hashPassword(validatedSecondPassword, salt!);
          if (hashedSecond === firstHash) {
            setOutput({ message: 'Password verified successfully!' });
          } else {
            setOutput({ message: 'Password verification failed.' });
          }
          setFirstHash(null);
          setSalt(null);
          setInput('');
        }
        break;
      }
      case 'Data Anonymization': {
        const email = 'test@example.com';
        const phone = '1234567890';
        const anon = simulation.anonymizeData(validatedInput as string, email, phone);
        setOutput(anon);
        break;
      }
      case 'Differential Privacy': {
        const count1 = parseInt(validatedInput as string) || 100;
        const count2 = parseInt(key) || 90;
        const privatized = simulation.differentialPrivacy(count1, count2);
        setOutput({ original: Math.abs(count1 - count2), privatized: privatized.toFixed(2) });
        break;
      }
      case 'TLS Handshake': {
        setOutput(
          'Simplified TLS Handshake:\n1. ClientHello\n2. ServerHello\n3. Certificate Validation\n4. Key Exchange\n5. Secure Communication'
        );
        break;
      }
      case 'Vulnerability Examples': {
        const examples: { [key: string]: { [key: string]: string } } = {
          python: {
            'SQL Injection': "query = 'SELECT * FROM users WHERE id = %s' % user_id",
            'XSS': "render_template_string('<h1>Hello {{ username }}!</h1>', username=request.args.get('username'))",
          },
          java: {
            'SQL Injection': "String query = \"SELECT * FROM users WHERE username = '\" + username + \"'\"",
            'XSS': "out.println(\"<h1>Hello, \" + request.getParameter(\"username\") + \"!</h1>\")",
          },
          'c++': {
            'Buffer Overflow': 'char buffer[10]; strcpy(buffer, user_input)',
            'Format String': 'printf(user_input)',
          },
        };
        setOutput(examples[language] || { 'No examples': 'No vulnerability examples for this language.' });
        break;
      }
      case 'AES Encryption': {
        // Validate the key length
        if (!key) {
          setOutput('Please provide an encryption key.');
          return;
        }
        if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
          setOutput('AES key must be 16, 24, or 32 characters long.');
          return;
        }
        const { ciphertext, iv } = simulation.aesEncrypt(validatedInput as string, key);
        const decrypted = simulation.aesDecrypt(ciphertext, key, iv);
        const originalEntropy = simulation.calculateEntropy(validatedInput as string);
        const encryptedEntropy = simulation.calculateEntropy(ciphertext);
        setOutput({ ciphertext, iv, decrypted, originalEntropy, encryptedEntropy });
        break;
      }
    }
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <Card className="bg-seccode-blue/40 backdrop-blur-md border-seccode-cyan/20 shadow-lg">
        <CardHeader>
          <h2 className="text-3xl font-bold text-gradient">{selectedDemo}</h2>
          <p className="text-gray-400 mt-2">{demoDescriptions[selectedDemo]}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedDemo !== 'Vulnerability Examples' && selectedDemo !== 'Entropy Comparison' && selectedDemo !== 'Information Leakage' && selectedDemo !== 'TLS Handshake' && (
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholders[selectedDemo]}
                className="w-full bg-seccode-blue text-seccode-light border-seccode-cyan/30 focus:ring-seccode-cyan"
                disabled={selectedDemo === 'Entropy Comparison' || selectedDemo === 'Information Leakage' || selectedDemo === 'TLS Handshake'}
              />
            )}

            {(selectedDemo === 'Caesar Cipher' || selectedDemo === 'Vigenère Cipher' || selectedDemo === 'AES Encryption' || selectedDemo === 'Differential Privacy') && (
              <Input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder={keyPlaceholders[selectedDemo]}
                className="w-full bg-seccode-blue text-seccode-light border-seccode-cyan/30 focus:ring-seccode-cyan"
              />
            )}

            {selectedDemo === 'Vulnerability Examples' && (
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-full bg-seccode-blue text-seccode-light border-seccode-cyan/30 focus:ring-seccode-cyan">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="bg-seccode-blue text-seccode-light border-seccode-cyan/30">
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-seccode-cyan to-seccode-purple text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {selectedDemo === 'Password Storage' && firstHash ? 'Verify Password' : 'Run Simulation'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="mt-6 bg-seccode-blue/40 backdrop-blur-md border-seccode-cyan/20 shadow-lg">
          <CardHeader>
            <h3 className="text-xl font-semibold text-seccode-cyan">Results</h3>
          </CardHeader>
          <CardContent>
            <pre className="text-seccode-light whitespace-pre-wrap">{JSON.stringify(output, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      {chartData && (
        <Card className="mt-6 bg-seccode-blue/40 backdrop-blur-md border-seccode-cyan/20 shadow-lg">
          <CardContent>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { labels: { color: '#fff' } },
                  title: { display: true, text: `${selectedDemo} Graph`, color: '#fff', font: { size: 18 } },
                },
                scales: {
                  x: { ticks: { color: '#fff' } },
                  y: { ticks: { color: '#fff' }, beginAtZero: true },
                },
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimulationPanel;