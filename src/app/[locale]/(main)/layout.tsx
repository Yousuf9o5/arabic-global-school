import Footer from "@/components/footer";
import MobileFooter from "@/components/mobile-footer";
import Navbar from "@/components/navbar";
import TabletFooter from "@/components/tablet-footer";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <TabletFooter />
            <MobileFooter />
        </>
    );
}

export default Layout;
