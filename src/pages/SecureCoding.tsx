"use client";
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SimulationPanel from '@/components/SimulationPanel';

export default function SecureCoding() {
  const [selectedDemo, setSelectedDemo] = useState('Caesar Cipher');

  return (
    <div className="flex min-h-screen bg-seccode-dark">
      <Sidebar onSelect={setSelectedDemo} />
      <SimulationPanel selectedDemo={selectedDemo} />
    </div>
  );
}