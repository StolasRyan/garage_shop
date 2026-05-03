import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const db = await getDB();
    const { id } = await params;

    const rawData = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 },
      );
    }

    if (!rawData.name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Category name is required" },
        { status: 400 },
      );
    }

    if (!rawData.slug?.trim()) {
      return NextResponse.json(
        { success: false, message: "Category slug is required" },
        { status: 400 },
      );
    }

    const name = rawData.name.trim();
    const slug = rawData.slug.trim().toLowerCase();
    const categoryId = new ObjectId(id);

    const existingCategory = await db
      .collection("article-category")
      .findOne({ slug, _id: { $ne: categoryId } });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category with this slug already exists",
        },
        { status: 400 },
      );
    }

    const processKeywords = (keywords: unknown): string[] => {
      if (!keywords) return [];

      if (Array.isArray(keywords)) {
        return keywords.map((keyword) =>
          typeof keyword === "string" ? keyword.trim() : String(keyword).trim(),
        ).filter((keyword) => keyword.length > 0);
      }
      return [];
    };

    const updateFields = {
        name,
        slug,
        updatedAt: new Date().toISOString(),

        ...(rawData.description !== undefined && {
          description: rawData.description.trim(),
        }),
        ...(rawData.keywords !== undefined && {
            keywords: processKeywords(rawData.keywords),
        }),
        ...(rawData.image !== undefined && {
          image: rawData.image.trim(),
        }),
        ...(rawData.imageAlt !== undefined && {
          imageAlt: rawData.imageAlt.trim(),
        }),
    };

    const updateFilter = {$set: updateFields};

    const result = await db
      .collection("article-category")
      .updateOne({ _id: categoryId }, updateFilter);

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, message: "Category updated successfully", categoryId:id });
  } catch (error) {
    console.error("Error updating category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating category",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const db = await getDB();
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 },
      );
    }

    const categoryId = new ObjectId(id);

    const articlesCount = await db.collection("articles").countDocuments({
      categoryId: id,
    });

    if (articlesCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete category with ${articlesCount} articles`,
        },
        { status: 400 },
      );
    }

    const result = await db.collection("article-category").deleteOne({
      _id: categoryId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting category", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting category",
      },
      { status: 500 },
    );
  }
}
