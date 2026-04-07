  export default function HighLightText({
    text,
    highlight,
  }: {
    text: string;
    highlight: string;
  }) {
    if (!highlight.trim()) return <>{text}</>;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="font-bold text-black">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }
