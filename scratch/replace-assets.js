const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app', 'src', 'App.tsx');
const navPath = path.join(__dirname, '..', 'app', 'src', 'components', 'site', 'Nav.tsx');

let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes('const baseUrl = import.meta.env.BASE_URL;')) {
  appContent = appContent.replace(
    'export default function App() {',
    'export default function App() {\n  const baseUrl = import.meta.env.BASE_URL;'
  );
}

appContent = appContent.replace(/src="\/?assets\/hero-final\.jpg"/g, 'src={baseUrl + "assets/hero-final.jpg"}');
appContent = appContent.replace(/src="\/?assets\/aurora-banner\.png"/g, 'src={baseUrl + "assets/aurora-banner.png"}');
appContent = appContent.replace(/src="\/?assets\/custom-gem\.jpg"/g, 'src={baseUrl + "assets/custom-gem.jpg"}');
appContent = appContent.replace(/src="\/?assets\/sanctuary\.mp4"/g, 'src={baseUrl + "assets/sanctuary.mp4"}');
appContent = appContent.replace(/poster="\/?assets\/sanctuary-poster\.jpg"/g, 'poster={baseUrl + "assets/sanctuary-poster.jpg"}');
appContent = appContent.replace(/src="\/?assets\/teeth\.mp4"/g, 'src={baseUrl + "assets/teeth.mp4"}');
appContent = appContent.replace(/poster="\/?assets\/teeth-poster\.jpg"/g, 'poster={baseUrl + "assets/teeth-poster.jpg"}');
appContent = appContent.replace(/src="\/?assets\/film-nocturne\.mp4"/g, 'src={baseUrl + "assets/film-nocturne.mp4"}');
appContent = appContent.replace(/poster="\/?assets\/poster-nocturne\.jpg"/g, 'poster={baseUrl + "assets/poster-nocturne.jpg"}');

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App.tsx paths updated successfully');

let navContent = fs.readFileSync(navPath, 'utf8');

if (!navContent.includes('const baseUrl = import.meta.env.BASE_URL;')) {
  navContent = navContent.replace(
    'export function Nav() {',
    'export function Nav() {\n  const baseUrl = import.meta.env.BASE_URL;'
  );
}

navContent = navContent.replace(/src="\/?assets\/logo\.png"/g, 'src={baseUrl + "assets/logo.png"}');

fs.writeFileSync(navPath, navContent, 'utf8');
console.log('Nav.tsx paths updated successfully');
