export function getMobileAssetPath(path: string): string {
  const version = 'tp-v2026-09-19';
  const normalized = path.replace(/^\/?assets\/?(?:img\/)?/, '');
  const desktopPath = `/assets/img/${normalized}?v=${version}`;

  if (typeof window === 'undefined') {
    return desktopPath;
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  return isMobile ? `/assets/img/movil/${normalized}?v=${version}-mobile` : desktopPath;
}
