type ContentProps = {
  children?: React.ReactNode;
};
const Content = ({ children }: ContentProps) => <div className="p-8  w-full max-w-4xl mx-auto">{children}</div>;

export { Content };
