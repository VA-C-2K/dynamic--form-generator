import { MainLayout } from "@/layout/Main.layout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <MainLayout>{children}</MainLayout>
);

export default Layout;

