type ContainerProps = {
  children?: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => <div className="grid grid-rows-[60px, calc(100%-60px)]">{children}</div>;

export { Container };
