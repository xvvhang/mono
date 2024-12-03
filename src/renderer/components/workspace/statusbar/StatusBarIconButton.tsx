interface StatusBarIconButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  handleClick?: () => void;
};

const StatusBarIconButton: React.FC<StatusBarIconButtonProps> = ({
  children,
  isActive,
  handleClick,
}) => {
  return (
    <div
      className={
        `w-fit h-full px-1 flex items-center hover:bg-gray-3` +
        ` ${isActive ? "text-accent-11" : "text-gray-11"}`
      }
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default StatusBarIconButton;
