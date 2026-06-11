$dl = 'C:\AnchorAI\downloads'
New-Item -Path $dl -ItemType Directory -Force | Out-Null

$index = Invoke-RestMethod -Uri 'https://nodejs.org/dist/index.json'
$lts = $index | Where-Object { $_.lts } | Select-Object -First 1
if (-not $lts) {
    Write-Error 'No LTS found on nodejs.org'
    exit 1
}

$ver = $lts.version
$url = "https://nodejs.org/dist/$ver/node-$ver-x64.msi"
$out = Join-Path $dl 'node-lts.msi'
Write-Host "Downloading $ver from $url to $out"

Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing

if (Test-Path $out) {
    $size = (Get-Item $out).Length
    Write-Host ([string]::Format('Downloaded: {0} ({1} bytes)', $out, $size))
} else {
    Write-Error 'Download failed'
}
