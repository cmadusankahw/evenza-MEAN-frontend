// this is to store helper functions for all modules

const productData = new FormData();
productData.append('product_id', product.product_id );
productData.append('business_name', product.business_name );
productData.append('product', product.product );
productData.append('product_category', product.product_category );
productData.append('qty_type', product.qty_type );
productData.append('description', product.description );
productData.append('created_date', product.created_date );
productData.append('created_time', product.created_date );
productData.append('availability', product.availability.toString() );
productData.append('inventory', product.inventory.toString() );
productData.append('rating', product.rating.toString() );
productData.append('no_of_ratings', product.no_of_ratings.toString() );
productData.append('no_of_orders', product.no_of_orders.toString() );
productData.append('delivery_service', product.delivery_service);
productData.append('price', product.price.toString() );
productData.append('payment_type', product.payment_type );
productData.append('image_01', product.product_id );
productData.append('image_02', product.product_id );
productData.append('image_03', product.product_id );

module.exports = { storage };
