import { PostGenerationForm } from "@/components/PostGenerationForm";
import { H1 } from "@/components/ui/typography";

const HomePage = () => {
  return (
    <>
      {/* Form Section */}
      <section className="flex flex-col gap-6">
        <H1>Generate Translation</H1>
        <PostGenerationForm />
      </section>
      {/* Recent Post Section */}
      <section>

      </section>
    </>
  );
};

export default HomePage;
