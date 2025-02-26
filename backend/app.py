from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///maintenance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)  


class MaintenanceRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_type = db.Column(db.String(100), nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.String(255), nullable=False)

# Create the database 
with app.app_context():
    db.create_all()

# Endpoint to add records
@app.route('/add_record', methods=['POST'])
def add_record():
    data = request.json
    print("📥 Received data:", data)  # Debugging log

    if 'user_id' not in data:  
        return jsonify({"error": "User ID is required."}), 400

    new_record = MaintenanceRecord(
        service_type=data['serviceType'], 
        mileage=data['mileage'], 
        date=data['date'],
        user_id=data['user_id']  
    )

    db.session.add(new_record)
    db.session.commit()  # Ensure the record is saved

    return jsonify({"message": "Record added successfully"})



# Endpoint to get all records
@app.route('/records', methods=['GET'])
def get_records():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    records = MaintenanceRecord.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": record.id,
        "service_type": record.service_type,
        "mileage": record.mileage,
        "date": record.date
    } for record in records])


@app.route('/records/<int:record_id>', methods=['DELETE'])
def delete_record(record_id):
    record = MaintenanceRecord.query.get(record_id)

    if not record:
        return jsonify({"message": "Record not found"}), 404
    
    db.session.delete(record)
    db.session.commit()
    return jsonify({"message": "Record deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
