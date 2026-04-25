import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);

    if (!data.name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Article name is required" },
        { status: 400 },
      );
    }

    if (!data.slug?.trim()) {
      return NextResponse.json(
        { success: false, message: "Article slug is required" },
        { status: 400 },
      );
    }

    if (!data.author?.trim()) {
      return NextResponse.json(
        { success: false, message: "Article author is required" },
        { status: 400 },
      );
    }

    if (!data.categoryId?.trim()) {
      return NextResponse.json(
        { success: false, message: "Article category is required" },
        { status: 400 },
      );
    }

    const name = data.name.trim();
    const slug = data.slug.trim().toLowerCase();
    const description = data.description?.trim() || "";
    const keywords = Array.isArray(data.keywords)
      ? data.keywords
      : (data.keywords || "")
          .split(",")
          .map((keyword: string) => keyword.trim())
          .filter(Boolean);
    const image = data.image || "";
    const imageAlt = data.imageAlt || name;
    const author = data.author.trim();
    const categoryId = data.categoryId.trim();
    const categoryName = data.categoryName?.trim() || "";
    const categorySlug = data.categorySlug?.trim() || "";
    const content = data.content || "";
    const isFeatured = data.isFeatured || false;
    const status = data.status || "draft";

    const db = await getDB();

    const existingArticle = await db.collection("articles").findOne({ slug });

    if (existingArticle) {
      return NextResponse.json(
        { success: false, message: "Article with this slug already exists" },
        { status: 400 },
      );
    }

    if (categoryId) {
      const categoryExists = await db
        .collection("article-category")
        .findOne({ _id: ObjectId.createFromHexString(categoryId) });

      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: "Invalid category ID" },
          { status: 400 },
        );
      }
    }

    const result = await db
      .collection("articles")
      .aggregate([
        {
          $group: {
            _id: null,
            maxNumericId: { $max: "$numericId" },
          },
        },
      ])
      .toArray();

    let maxNumericId = 0;
    if (
      result.length > 0 &&
      result[0].maxNumericId !== null &&
      result[0].maxNumericId !== undefined
    ) {
      maxNumericId = result[0].maxNumericId;
    }

    const newNumericId = maxNumericId + 1;

    const newArticle = {
      _id: new ObjectId(),
      numericId: newNumericId,
      name,
      slug,
      description,
      keywords,
      image,
      imageAlt,
      author,
      categoryId,
      categoryName,
      categorySlug,
      content,
      isFeatured,
      status,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      ...(status === 'published' && { publishedAt: new Date().toISOString() }),
    };

    await db.collection("articles").insertOne(newArticle);

    const responseArticle = {
      ...newArticle,
      _id: newArticle._id.toString(),
    };

    return NextResponse.json({
      success: true,
      message: "Article created successfully",
      data: responseArticle,
    });
  } catch (error) {
    console.error("Failed to create article", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create article",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 },
    );
  }
}
