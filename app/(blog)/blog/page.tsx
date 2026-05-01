import { Metadata } from "next";
import { baseUrl } from "@/utils/baseUrl";
import PageHeader from "./categories/_components/PageHeader";
import CategoriesList from "./categories/_components/CategoriesList";
import StatsInfo from "./categories/_components/StatsInfo";
import EmptyState from "./categories/_components/EmptyState";
import { getCategories } from "./categories/utils/getCategories";
import CategoriesSidebar from "./categories/sidebar/CategoriesSidebar";

const truncate = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + "...";
};

export async function generateMetadata(): Promise<Metadata> {
  const categories = await getCategories();
  const categoryNames = categories.map((category) => category.name);

  const title =
    categoryNames.length > 0
      ? truncate(`Blog: ${categoryNames.slice(0, 3).join(", ")}`, 60)
      : "Blog";

  const description =
    categoryNames.length > 0
      ? truncate(
          `Read articles by categories: ${categoryNames.slice(0, 8).join(", ")}`,
          160,
        )
      : truncate("Blog with careful articles", 160);

  const keywords = [...categoryNames.map((name) => name.toLowerCase())];

  return {
    metadataBase: new URL(`${baseUrl}/blog`),
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
    keywords: [...new Set(keywords)],
    openGraph: {
      title: "Garage Shop Blog",
      description,
      type: 'website',
      url: `${baseUrl}/blog`,
    },
  };
}

export default async function BlogPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <PageHeader />
        {categories.length === 0 ? (
          <EmptyState/>
        ) : (
          <>
            <CategoriesList categories={categories} />
            <StatsInfo count={categories.length} />
          </>
        )}
        <CategoriesSidebar categories={categories}/>
      </div>
    </div>
  );
}
