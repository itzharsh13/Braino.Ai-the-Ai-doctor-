# Creates shortcuts (Desktop + Start Menu) for all users to the Braino AI project folder on G:

$TargetPath = "G:\Braino AI"
$ShortcutName = "Braino AI.lnk"
$DesktopDir = "$env:Public\Desktop"
$StartMenuDir = "$env:ProgramData\Microsoft\Windows\Start Menu\Programs"

# Ensure destination directories exist
if (!(Test-Path -Path $DesktopDir)) { New-Item -ItemType Directory -Path $DesktopDir -Force | Out-Null }
if (!(Test-Path -Path $StartMenuDir)) { New-Item -ItemType Directory -Path $StartMenuDir -Force | Out-Null }

# Validate target path
if (!(Test-Path -Path $TargetPath)) {
    Write-Error "Target path not found: $TargetPath"
    exit 1
}

# Create COM object
$WshShell = New-Object -ComObject WScript.Shell

# Optional icon if available
$IconPath = Join-Path $TargetPath "braino.ico"
$HasIcon = Test-Path -Path $IconPath

# NEW: Use Explorer.exe as shortcut target to reliably open the folder
# $ExplorerExe = Join-Path $env:WINDIR "explorer.exe"

# Create Desktop shortcut (All Users)
$DesktopShortcutPath = Join-Path $DesktopDir $ShortcutName
if (Test-Path -Path $DesktopShortcutPath) {
    Remove-Item -Path $DesktopShortcutPath -Force
}
$DesktopShortcut = $WshShell.CreateShortcut($DesktopShortcutPath)
# CHANGED: Target explorer.exe + pass folder as arguments
# UPDATED: Point directly to folder and clear arguments for a working link
$DesktopShortcut.TargetPath = $TargetPath
$DesktopShortcut.Arguments = $null
$DesktopShortcut.WorkingDirectory = $TargetPath
$DesktopShortcut.Description = "Open Braino AI project"
if ($HasIcon) { $DesktopShortcut.IconLocation = "$IconPath,0" }
$DesktopShortcut.Save()

# Create Start Menu shortcut (All Users)
$StartMenuShortcutPath = Join-Path $StartMenuDir $ShortcutName
if (Test-Path -Path $StartMenuShortcutPath) {
    Remove-Item -Path $StartMenuShortcutPath -Force
}
$StartMenuShortcut = $WshShell.CreateShortcut($StartMenuShortcutPath)
# CHANGED: Target explorer.exe + pass folder as arguments
# UPDATED: Point directly to folder and clear arguments for a working link
$StartMenuShortcut.TargetPath = $TargetPath
$StartMenuShortcut.Arguments = $null
$StartMenuShortcut.WorkingDirectory = $TargetPath
$StartMenuShortcut.Description = "Braino AI project"
if ($HasIcon) { $StartMenuShortcut.IconLocation = "$IconPath,0" }
$StartMenuShortcut.Save()

Write-Host "Shortcuts created:"
Write-Host " - $DesktopShortcutPath"
Write-Host " - $StartMenuShortcutPath"