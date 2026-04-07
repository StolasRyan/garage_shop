import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import 'dotenv/config';


async function updateProducts() {
    try {
        const client = new MongoClient(process.env.GARAGE_SHOP_DB_URL!)
        await client.connect();
        console.log(`Connection!`);

        const db = client.db(process.env.GARAGE_SHOP_DB_NAME!)
        const productsCollection = await db.collection('products');

        const existingProducts = await productsCollection.find({}).toArray();
        console.log(`${existingProducts.length} products found`);

        const bulkUpdateOps = existingProducts.map(product=>{

            let manufacturer:string;
            if(product.isOurProduction === true){
                manufacturer = 'Belarus'
            }else{
                const manufacturers = ['Belarus', 'Kazahstan', 'Turkmenistan', 'Ukraine', 'China', 'Armenia', 'Geargya', 'Abhazia', 'Serbia'];
                manufacturer = faker.helpers.arrayElement(manufacturers)
            }

            const brands = ['Prostokvashino', 'Belakt', 'Savushkin-Product', '中国商店','Dobrynia', 'Something', 'Else', 'And', 'Etc'];

            const brand = faker.helpers.arrayElement(brands);

            return {
                updateOne:{
                    filter: {_id: product._id},
                    update:{
                        $set:{
                            manufacturer: manufacturer,
                            brand: brand
                        },
                        $unset:{isOurProduction: ''}
                    }
                }
            }
        });

        if(bulkUpdateOps.length > 0){
            const result = await productsCollection.bulkWrite(bulkUpdateOps);
            console.log(`${result.modifiedCount} objects updated`);
            console.log(`manufacturer,brand: added.\n isOurProduction: deleted`);
        }
        await client.close();
        console.log(`Connection stopped`);
        
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1)
    }
}
updateProducts()