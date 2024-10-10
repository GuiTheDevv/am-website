interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function Subtitle({ children, className }: BodyTextProps) {
  return (
    <p className={`font-poppins text-pretty text-gray-300 ${className}`}>
      {children}
    </p>
  );
}
