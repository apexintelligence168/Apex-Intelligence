#!/bin/bash
# Setup script for NextGen AI website

# Create directory structure
mkdir -p app/about app/services app/portfolio app/team app/blog app/contact
mkdir -p components
mkdir -p public/images

# Create placeholder files
touch app/globals.css
touch components/Header.tsx
touch components/Footer.tsx

echo "Directories created successfully!"
echo "Next, run: npm install"
echo "Then: npm run dev"
