import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SituationFinder } from "@/components/SituationFinder";
import { HeroScene } from "@/components/launch/HeroScene";
import { TransformScene } from "@/components/launch/TransformScene";
import { InviteScene, LibraryScene } from "@/components/launch/LibraryScene";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main id="main" className="flex-1">
        <HeroScene />
        <TransformScene />

        <LibraryScene />

        <section id="tasks" className="container mx-auto scroll-mt-20 px-6 pb-24">
          <SituationFinder eyebrow="Start with a situation" />
        </section>

        <InviteScene />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
