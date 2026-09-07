import CategorySection from "../components/CategorySection";
import HeroSection from "../components/HeroSection";
import { categories } from "../utils/constants";

const Home = () => {
  return (
    <div className="space-y-10">
      <HeroSection />
      {categories.map((category) => (
        <CategorySection
          key={category.slug}
          title={category.title}
          tools={category.tools}
        />
      ))}
    </div>
  );
};

export default Home;
