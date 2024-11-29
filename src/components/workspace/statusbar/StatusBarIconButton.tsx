type StatusBarIconButtonProps = {
  children: React.ReactNode;
  label?: string;
  isActive?: boolean;
}

const StatusBarIconButton: React.FC<StatusBarIconButtonProps> = ({ children, label, isActive }) => {
  return (
    <div className={
      `w-fit h-full px-1 flex items-center hover:bg-gray-3` +
      ` ${isActive ? 'text-accent-11' : 'text-gray-11'}`
    }>{children}</div>
  )
}

export default StatusBarIconButton;