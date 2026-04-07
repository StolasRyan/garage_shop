import { sendPriceAlertEmail } from "@/app/lib/priceDiscountEmail";
import { getDB } from "@/utils/api-routes";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config();

interface PriceAlert {
  _id: ObjectId;
  productId: string;
  email: string;
  productTitle: string;
  currentPrice: number;
  unsubscribeToken: string;
  createdAt: Date;
  lastNotified?: Date;
}

interface Product {
  _id: ObjectId;
  id: number;
  title: string;
  basePrice: number;
  discountPercent?: number;
}

export async function checkPriceAlerts(): Promise<void> {
  try {
    const db = await getDB();

    const activeAlerts = await db
      .collection<PriceAlert>("priceAlerts")
      .find({})
      .toArray();
    console.log(`${activeAlerts.length} subscribes found`);

    if (activeAlerts.length === 0) {
      console.log(`No active subscribes`);
      return;
    }

    let notificationsSent = 0;

    for (const alert of activeAlerts) {
      try {
        const product = await db
          .collection<Product>("products")
          .findOne({ id: parseInt(alert.productId) });

          if(!product){
            console.log(`Product with id ${alert.productId} not found`);
            continue;
          }
          console.log(alert.email);
          
          const currentPrice = product.discountPercent
          ? Math.round(product.basePrice * (1 - (product.discountPercent/100)))
          : product.basePrice;

          if(currentPrice < alert.currentPrice){
            const emailSent = await sendPriceAlertEmail({
                to: alert.email,
                productTitle: alert.productTitle,
                oldPrice: alert.currentPrice,
                newPrice: currentPrice,
                productId: alert.productId,
                unsubscribeToken:alert.unsubscribeToken,
            })
            if(emailSent){
                await db.collection<PriceAlert>('priceAlerts').updateOne(
                    {_id: alert._id},
                    {
                        $set:{
                            currentPrice: currentPrice,
                            lastNotified: new Date()
                        }
                    }
                );
                notificationsSent++;
            }
          };

          
      } catch (error) {
        console.error(`Failed to subscribe: ${error}`)
      }
    }
    console.log(`Cheking complete. Notifications sent: ${notificationsSent}`)
  } catch (error) {
    console.error(`Critical error: ${error}`);
    throw error;
  }
}
