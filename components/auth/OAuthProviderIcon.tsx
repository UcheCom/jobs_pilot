type Props = {
  provider: "google" | "github";
};

export function OAuthProviderIcon({ provider }: Props) {
  if (provider === "github") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
        fill="currentColor"
        className="text-info-dark"
      />
      <path
        d="M12 22c2.7 0 4.98-.9 6.64-2.43l-3.25-2.52c-.9.6-2.05.96-3.39.96-2.6 0-4.82-1.76-5.61-4.13H3.04v2.6A10 10 0 0 0 12 22Z"
        fill="currentColor"
        className="text-success"
      />
      <path
        d="M6.39 13.88A6.02 6.02 0 0 1 6.07 12c0-.65.11-1.29.32-1.88v-2.6H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.6Z"
        fill="currentColor"
        className="text-warning"
      />
      <path
        d="M12 5.99c1.47 0 2.8.5 3.84 1.5l2.88-2.88A9.67 9.67 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.6C7.18 7.75 9.4 5.99 12 5.99Z"
        fill="currentColor"
        className="text-error"
      />
    </svg>
  );
}
