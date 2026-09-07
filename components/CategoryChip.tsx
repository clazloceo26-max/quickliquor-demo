interface CategoryChipProps {
  label: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryChip({
  label,
  icon,
  isActive = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition ${
        isActive
          ? 'bg-primary text-white'
          : 'bg-white text-dark hover:bg-light'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-semibold whitespace-nowrap">{label}</span>
    </button>
  );
}