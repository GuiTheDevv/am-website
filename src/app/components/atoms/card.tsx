interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-lg shadow ${className}`}>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
