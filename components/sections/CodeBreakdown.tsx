import { CodeBlock, Note } from '@/components/ui'

export function CodeBreakdown() {
  return (
    <section>
      <h2 id="code-breakdown" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        Code Breakdown
      </h2>
      <h3 className="text-[#5f6368] text-xl font-semibold">Imports</h3>
      <CodeBlock>{`import (
    "context"           // Request context (like request object)
    "encoding/base64"   // Base64 encoding
    "log/slog"          // Structured logging
    "net/http"          // HTTP server
    "os"                // OS operations (env vars, files)
    "path/filepath"    // Path manipulation
    "time"              // Time/date operations

    // Internal packages
    "taskflow-api/internal/api"
    "taskflow-api/internal/api/handler"
    "taskflow-api/internal/api/middleware"
    "taskflow-api/internal/auth"
    db "taskflow-api/internal/db/generated"
    "taskflow-api/internal/storage"

    // Third-party packages
    "github.com/go-chi/chi/v5"      // Router
    "github.com/go-chi/chi/v5/middleware"
    "github.com/go-chi/cors"
    "github.com/jackc/pgx/v5/pgxpool" // PostgreSQL
    "github.com/joho/godotenv"        // .env file loading
)`}</CodeBlock>

      <p>In JavaScript, you&apos;d write:</p>

      <CodeBlock>{`import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config(); // Load .env file`}</CodeBlock>

      <Note>
        <strong>Key Insight:</strong> In Go, imports must be used or the code won&apos;t compile. The blank identifier{' '}
        <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">_</code> is used to import packages for side effects only.
      </Note>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
