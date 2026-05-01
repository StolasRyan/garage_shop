import { getDB } from "@/utils/api-routes";
import { sanitizeArticleHTML } from "@/utils/sanitizeArticleHTML";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { processArticleImages } from "../../articles/utils/processArticleImages";

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
    const isFeatured = data.isFeatured || false;
    const status = data.status || "draft";

    const db = await getDB();

    const query:Record<string, unknown> = {slug};

    if(data._id && data._id !== ""){
      query._id = {$ne: ObjectId.createFromHexString(data._id)}
    }

    const existingArticle = await db.collection("articles").findOne(query);

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
    };

    const saniteszedContent = sanitizeArticleHTML(data.content || "");

    // if(!saniteszedContent || saniteszedContent.trim() === '' || saniteszedContent === "<p></p>"){
    //     return NextResponse.json(
    //         { success: false, message: "Article content is required" },
    //         { status: 400 },
    //       );
    // };

    const finalContent = await processArticleImages(saniteszedContent);

    if(data._id && data._id.trim() !== ''){
      try {
        const objectId = ObjectId.createFromHexString(data._id);

        const updateData = {
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
          content: finalContent,
          isFeatured,
          status,
          updatedAt: new Date().toISOString(),
          ...(status === 'published' && { publishedAt: new Date().toISOString() }),
        };

        const result = await db.collection("articles").updateOne({_id: objectId}, {$set: updateData});

        if(result.matchedCount === 0){
          return NextResponse.json(
            { success: false, message: "Article not found" },
            { status: 404 },
          );
        }

        return NextResponse.json(
          { success: true, message: "Article updated successfully" },
          { status: 200 },
        );
      } catch (error) {
        console.error("Error updating article:", error);
        return NextResponse.json(
          { success: false, message: "Error updating article" },
          { status: 500 },
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
      content: finalContent,
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
