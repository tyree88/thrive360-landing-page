import * as React from "react";

export const SocialIcon = ({ platform, ...props }: { platform: string } & React.SVGProps<SVGSVGElement>) => {
  switch (platform) {
    case 'twitter':
      return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
          <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" fill="#1DA1F2" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
          <rect width="24" height="24" rx="4" fill="#0077B5" />
          <path d="M7.5 17h-3v-7h3v7zm-1.5-8.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zM20.5 17h-3v-3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V17h-3v-7h3v1.1c.41-.7 1.2-1.1 2-1.1 1.66 0 3 1.34 3 3V17z" fill="#fff" />
        </svg>
      );
    default:
      return null;
  }
};

export default SocialIcon;
