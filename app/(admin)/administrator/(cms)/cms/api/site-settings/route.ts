import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { SiteSettings } from "../../types/siteSettings";

export async function GET() {
  try {
    const db = await getDB();

    const result = await db
      .collection<SiteSettings>("site-settings")
      .findOneAndUpdate(
        {},
        {
          $setOnInsert: {
            siteKeywords: ["yor", "site", "keywords"],
            semanticCore: ["general", "site", "themes"],
            metaDescription: "Your site description",
            siteTitle: "Your site name",
            updatedAt: new Date().toISOString(),
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        },
      );

    if (!result) {
      const defaultSettings: SiteSettings = {
        _id: new ObjectId(),
        siteKeywords: ["yor", "site", "keywords"],
        semanticCore: ["general", "site", "themes"],
        metaDescription: "Your site description",
        siteTitle: "Your site name",
        updatedAt: new Date().toISOString(),
      };
      await db
        .collection<SiteSettings>("site-settings")
        .insertOne(defaultSettings);
      return NextResponse.json({
        success: true,
        data: { ...defaultSettings, _id: defaultSettings._id.toString() },
      });
    }

    return NextResponse.json({
      success: true,
      data: { ...result, _id: result._id.toString() },
    });
  } catch (error) {
    console.error("Failed to get site settings", error);
    return NextResponse.json(
      { success: false, message: "Failed to get site settings" },
      { status: 500 },
    );
  }
};


export async function PUT(request: Request){
    try {
        const db = await getDB();
        const data = await request.json();
        
        const result= await db.collection<SiteSettings>('site-settings').findOneAndUpdate(
            {},
            {
                $set:{
                    siteKeywords: data.siteKeywords || [],
                    semanticCore: data.semanticCore || [],
                    metaDescription: data.metaDescription || "",
                    siteTitle: data.siteTitle || "",
                    updatedAt: new Date().toISOString(),
                }
            },
            {
                upsert:true,
                returnDocument:"after"
            }
        );

        return NextResponse.json({
            success:true,
            message: result ? "Site settings updated" : "Site settings created",
            date: result ? {
                ...result,
                id: result._id.toString()
            } : null,
        });
    } catch (error) {
        console.error('Failed to save site settings', error);
        return NextResponse.json(
            { success: false, message: 'Failed to save site settings' },
            { status: 500 },
        );
    }
}
