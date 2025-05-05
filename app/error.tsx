"use client";
import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8f8f8' }}>
      <h1 style={{ color: '#c00', fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
      <p style={{ color: '#333', marginBottom: '2rem' }}>{error?.message || 'An unexpected error occurred.'}</p>
      <button
        style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', borderRadius: '0.5rem', background: '#c00', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
} 