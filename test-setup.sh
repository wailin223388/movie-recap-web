#!/bin/bash

# Test script to verify Movie Recap Web App setup

echo "🎬 Movie Recap Web App — Setup Test"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version
echo ""

# Check Python
echo "✓ Checking Python..."
python3 --version
echo ""

# Check project structure
echo "✓ Checking project structure..."
required_files=(
  "package.json"
  "vite.config.ts"
  "tsconfig.json"
  "requirements.txt"
  "index.html"
  "src/App.tsx"
  "src/main.tsx"
  "src/server.ts"
  "src/server/processor.py"
  "README.md"
  "DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (MISSING)"
  fi
done
echo ""

# Check build output
echo "✓ Checking build output..."
if [ -d "dist/client" ]; then
  echo "  ✓ dist/client exists"
  file_count=$(find dist/client -type f | wc -l)
  echo "    Contains $file_count files"
else
  echo "  ✗ dist/client not found (run 'pnpm build')"
fi
echo ""

# Check dependencies
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "  ✓ node_modules exists"
  pkg_count=$(ls node_modules | wc -l)
  echo "    Contains $pkg_count packages"
else
  echo "  ✗ node_modules not found (run 'pnpm install')"
fi
echo ""

echo "===================================="
echo "✓ Setup test completed!"
echo ""
echo "Next steps:"
echo "1. pnpm install          # Install dependencies"
echo "2. pnpm build            # Build frontend"
echo "3. pnpm dev              # Start development server"
echo ""
echo "Then open: http://localhost:5173"
