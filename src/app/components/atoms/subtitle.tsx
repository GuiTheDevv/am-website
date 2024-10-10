interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Subtitle({ children, className }: SubtitleProps) {
  return (
    <h3
      className={`font-poppins font-semibold text-balance text-2xl tracking-tight text-gray-200 sm:text-4xl ${className}`}
    >
      {children}
    </h3>
  );
}
