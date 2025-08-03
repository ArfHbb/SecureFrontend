import DOMPurify from 'dompurify';

export function purify(html) {
  return DOMPurify.sanitize(html);
}
