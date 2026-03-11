export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    const abortController = new AbortController();
    document.addEventListener("mousedown", listener, {
      signal: abortController.signal,
    });
    document.addEventListener("touchstart", listener, {
      signal: abortController.signal,
    });
    return () => {
      abortController.abort();
    };
  });
}
