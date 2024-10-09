interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={`${className} font-montserrattext-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl`}
    >
      {children}
    </h1>
  );
}
