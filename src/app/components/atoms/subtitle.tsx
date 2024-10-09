interface SubtitleProps {
  children: React.ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <h3 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
      {children}
    </h3>
  );
}
