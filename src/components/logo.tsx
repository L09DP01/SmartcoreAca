import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/brand/smartcore-logo.jpg"
        alt="Logo Smartcore Académique"
        width={compact ? 132 : 190}
        height={compact ? 42 : 60}
        className="h-auto rounded-sm object-contain"
        priority
      />
    </div>
  );
}
