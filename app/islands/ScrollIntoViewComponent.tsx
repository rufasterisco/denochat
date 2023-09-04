import { useEffect, useRef } from "preact/hooks";

const ScrollIntoViewComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={ref}>
    </div>
  );
};

export default ScrollIntoViewComponent;
