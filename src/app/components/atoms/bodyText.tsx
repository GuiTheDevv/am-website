interface BodyTextProps {
  children: React.ReactNode;
}

export default function Subtitle({ children }: BodyTextProps) {
  return <p className="text-pretty text-gray-900 ">{children}</p>;
}
