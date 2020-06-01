import { Item } from '../cart/cart';

export class Order {
    public item: Item;
    public totalAmount: number;
    public orderId: string;
    public status: string;
    public deliveryDate: Date;
    public orderPlacedDate: Date;
}
