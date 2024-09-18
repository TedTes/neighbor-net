from src import db
class InventoryItem(db.Model):
    __tablename__ = 'inventory_items'
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(255), nullable= False)
    description = db.Column(db.Text, nullable = True)
    price = db.Column(db.Float, nullable= False)
    quantity = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return f'<InventoryItem {self.name}>'