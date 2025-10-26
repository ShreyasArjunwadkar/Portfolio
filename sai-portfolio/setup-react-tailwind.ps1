# ================================
# PowerShell Script: Fresh React + Tailwind Setup
# ================================

# Step 0: Define your paths
$ProjectFolder = "E:\Portfolio\sai-portfolio"

# Step 1: Remove old project (optional)
if (Test-Path $ProjectFolder) {
    Write-Host "Removing old project folder..."
    Remove-Item -Recurse -Force $ProjectFolder
}

# Step 2: Remove Node and npm global folders
Write-Host "Removing old Node and npm files..."
$NodeFolders = @(
    "C:\Program Files\nodejs",
    "$env:APPDATA\npm",
    "$env:APPDATA\npm-cache"
)

foreach ($folder in $NodeFolders) {
    if (Test-Path $folder) {
        Remove-Item -Recurse -Force $folder
        Write-Host "Removed $folder"
    }
}

# Step 3: Install Node LTS manually
Write-Host "`nPlease download and install Node.js LTS from https://nodejs.org/en/"
Write-Host "During installation, check 'Add to PATH'."
Write-Host "Press Enter after installation is complete..."
Read-Host

# Step 4: Verify Node and npm
Write-Host "`nVerifying Node and npm versions..."
node -v
npm -v

# Step 5: Create fresh React project
Write-Host "`nCreating new React project..."
cd E:\Portfolio
npx create-react-app sai-portfolio

# Step 6: Go into project folder
cd sai-portfolio

# Step 7: Verify React project runs
Write-Host "`nStarting React project to verify..."
npm start

# Step 8: Install Tailwind
Write-Host "`nAfter closing the React app, installing Tailwind..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Write-Host "`nSetup complete! React + Tailwind ready at $ProjectFolder"
