export default function createBrowserAdapter(
  url = "http://localhost:5000/__termi_log__"
) {
  return {
    write(entry) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    },
  };
}
