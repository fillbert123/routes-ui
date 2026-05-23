const MOBILE_MAX_WIDTH = 480;
const DESKTOP_MIN_WIDTH = 1280;

function getWidth(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  return window.innerWidth;
}

export function isMobile(): boolean {
  return getWidth() < MOBILE_MAX_WIDTH;
}

export function isTablet(): boolean {
  return getWidth() < DESKTOP_MIN_WIDTH && getWidth() >= MOBILE_MAX_WIDTH;
}

export function isDesktop(): boolean {
  return getWidth() >= DESKTOP_MIN_WIDTH;
}