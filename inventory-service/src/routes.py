from flask import Blueprint,request, jsonify
from src import db
from src.models import InventoryItem

inventory_blueprint = Blueprint('inventory',__name__,url_prefix="/api/v1")

@inventory_blueprint.route("/inventory",methods=['GET'])
def get_inventory_items():
    items = InventoryItem.query.all()
    return jsonify([{'id':item.id,
                     'name':item.name,
                     'description':item.description,
                     'price':item.price,
                      'quantity': item.quantity}for item in items]),200

@inventory_blueprint.route("/inventory",methods=['POST'])
def add_inventory_item():
    data = request.get_json()
    new_item = InventoryItem(name=data['name'],description=data.get('description',""),
                             price=data['price'],
                             quantity=data['quantity'])
    db.session.add(new_item)
    db.session.commit()

    return jsonify({'message':'Inventory item added successfully!'}),201
    