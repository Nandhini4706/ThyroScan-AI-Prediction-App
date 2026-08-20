export function normalizeAiText(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

export default function FormattedText({ value, className = "" }) {
  const text = normalizeAiText(value);

  if (!text) return null;

  return <span className={`whitespace-pre-line ${className}`}>{text}</span>;
}
