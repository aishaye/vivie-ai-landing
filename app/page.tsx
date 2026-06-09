import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Studio from '@/components/Studio';
import Community from '@/components/Community';
import Library from '@/components/Library';
import CTASection from '@/components/CTASection';
import Signup from '@/components/Signup';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Nav />
      <Hero />
      <Ticker />
      <Studio />
      <Community />
      <Library />
      <CTASection />
      <Signup />
      <Footer />
    </>
  );
}
