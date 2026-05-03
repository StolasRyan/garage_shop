import { baseUrl } from "@/utils/baseUrl";
import { ArticlePageData } from "../../types";
import { getServerUserId } from "@/utils/getServerUserId";
import { getUserById } from "@/utils/auth-helpers";

export async function fetchArticlePageData(
  categorySlug: string,
  articleSlug: string,
): Promise<ArticlePageData | { error: string }> {
  const currentUserId = await getServerUserId();

  let currentUserData = null;
  if (currentUserId) {
    try {
      currentUserData = await getUserById(currentUserId);
    } catch (error) {
      console.error("Not autorized", error);
    }
  }

  const currentUserRole = currentUserData?.role || "user";

  try {
    const response = await fetch(
      `${baseUrl}/api/blog/${categorySlug}/${articleSlug}?role=${currentUserRole}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 404) {
        return { error: errorData.error || "Article not found" };
      }
      return { error: errorData.error || `Error ${response.status}` };
    }
    const data: ArticlePageData = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch artcles category: ${error}`);
    return { error: "Network error" };
  }
}
