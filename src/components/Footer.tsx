type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`py-6 text-center text-sm text-white/60 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        © {new Date().getFullYear()} olkeri.space
      </div>
    </footer>
  );
}
