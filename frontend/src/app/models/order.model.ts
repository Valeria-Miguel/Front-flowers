export interface Order {
    id?: number;
    customer?: number;
    created_at?: string;
    updated_at?: string;
    delivery_address: string;
    delivery_date: string;
    current_state: 'PENDING' | 'IN_PREPARATION' | 'READY' | 'DELIVERED' | 'CANCELLED';
    current_state_display?: string;
    notes?: string;
    items: OrderItem[];
    total_price?: string;
  }
  
  export interface OrderItem {
    id?: number;
    flower: number;
    quantity: number;
    unit_price?: string;
    subtotal?: number;
  }