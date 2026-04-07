import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import 'dotenv/config';

async function seedDatabase(){
    try{
        const client = new MongoClient(process.env.GARAGE_SHOP_DB_URL!);
        await client.connect();

        const db = client.db(process.env.GARAGE_SHOP_DB_NAME!);
        const productCollection = db.collection("products");

        const existingProducts = await productCollection.find({}).toArray();

        const bulkUpdateOps = existingProducts.map((product)=>({
            updateOne:{
                filter: {_id: product._id},
                update:{
                    $set:{
                        isOurProduction: faker.datatype.boolean({probability:0.7}),
                        isHealthyFood: faker.datatype.boolean({probability:0.6}),
                        isNonGMO: faker.datatype.boolean({probability:0.8}),
                    }
                }
            }
        }));

        if(bulkUpdateOps.length > 0){
            const result = await productCollection.bulkWrite(bulkUpdateOps);
            console.log("Updated", result.modifiedCount, "products");
        }else{
            console.log(`No products for update`);
        }

        await client.close();
        console.log('connection closed');
        
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

seedDatabase();