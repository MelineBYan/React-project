export default function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
