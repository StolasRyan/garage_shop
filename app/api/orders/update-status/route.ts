import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


interface UpdateData{
    updatedAt: Date;
    status?: string;
    paymentStatus?: string
};

export async function POST(request:Request) {
    try{
        const db = await getDB();
        const {orderId, status, paymentStatus} = await request.json();

        if(!orderId){
            return NextResponse.json(
                {message: 'Order ID required'},
                {status: 400}
            )
        };

        if(!status && !paymentStatus){
            return NextResponse.json(
                {message: 'Status or paymentStatus required, fill them'},
                {status: 400}
            )
        };

        const updateData:UpdateData = {
            updatedAt: new Date()
        };

        if(status){
            updateData.status = status;
        }

        if(paymentStatus){
            updateData.paymentStatus = paymentStatus;
        }

        const result = await db.collection('orders').updateOne(
            {_id: ObjectId.createFromHexString(orderId)},
            {$set: updateData}
        );

        if(result.modifiedCount === 0){
            return NextResponse.json(
                {message: 'Order not found'},
                {status: 404}
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Order status updated',
            updatedFields: Object.keys(updateData).filter(key=>key!=='updatedAt')
        })
    }catch(error){
        console.error('Error updating order status', error);
        return NextResponse.json(
            {message: 'Internal server Error'},
            {status: 500}
        )
    }
}