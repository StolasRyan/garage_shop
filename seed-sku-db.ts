import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import 'dotenv/config';


async function addSkuField() {
    try {
        const client = new MongoClient(process.env.GARAGE_SHOP_DB_URL!)
        await client.connect();
        console.log("Connected to MongoDB")

        const db = client.db(process.env.GARAGE_SHOP_DB_NAME!)
        const productsCollection =  db.collection('products')


        const existingProducts = await productsCollection.find({}).toArray();
        console.log(`Found ${existingProducts.length} for changing!`)

        const bulkUpdateOps = existingProducts.map((product)=>{
            const skuNumber = faker.number.int({min: 0, max:999999});
            const sku = skuNumber.toString().padStart(6,'0');

            return{
                updateOne:{
                    filter: {_id: product._id},
                    update:{
                        $set:{
                            sku: sku
                        }
                    }
                }
            }
        });

        if(bulkUpdateOps.length > 0){
            const result = await productsCollection.bulkWrite(bulkUpdateOps);
            console.log(`Updated ${result.modifiedCount} products`)
            console.log('Added sku field with 6 characters numbers')
        }else{
            console.log('no products to update')
        }
        await client.close();
        console.log('Connection with MongoDB stopped.')
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit();
    }
}
addSkuField();