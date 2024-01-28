type WrapperProps = {
  children?: React.ReactNode;
};
const Wrapper = ({ children }: WrapperProps) =>(
<main className="grid grid-cols-[80px,calc(100%-90px)] bg-slate-100 h-full overflow-hidden">{children}</main>
) 

export { Wrapper };
