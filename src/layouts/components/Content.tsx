type ContentProps = {
  children?: React.ReactNode;
};
const Content = ({ children }: ContentProps) => <div className="p-8 bg-slate-100">{children}</div>;

export { Content };
