interface Props {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const NavLink = ({ href, children, active }: Props) => {
  return (
    <a href={href} className={`nav-link ${active ? 'active' : ''}`}>
      {children}
    </a>
  );
};
