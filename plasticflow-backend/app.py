from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="plasticflow"
)

cursor = db.cursor(dictionary=True)

CORS(
    app,
    resources={r"/*": {"origins": "*"}}
)

@app.route("/api/dashboard")
def dashboard():
    return jsonify({
        "production": "50.0 kt/d",
        "plants": 99,
        "yield": "100%",
        "uptime": "99.999%"
    })

@app.route("/api/plants")
def plants():
    cursor.execute("""
        SELECT id, name, status, output_tons
        FROM plants
    """)
    plants = cursor.fetchall()
    return jsonify(plants)

@app.route("/api/analytics")
def analytics():
    return jsonify([
        {"month": "Jan", "production": 120},
        {"month": "Feb", "production": 180},
        {"month": "Mar", "production": 240},
        {"month": "Apr", "production": 300},
        {"month": "May", "production": 280}
    ])

@app.route("/api/monitoring")
def monitoring():
    return jsonify({
        "cpu": 65,
        "memory": 72,
        "disk": 54,
        "containers": 8
    })

@app.route("/api/alerts")
def alerts():
    return jsonify([
        {
            "severity": "critical",
            "message": "Reactor pressure spike"
        },
        {
            "severity": "warning",
            "message": "Inventory below threshold"
        }
    ])

if __name__ == "__main__":
    app.run(debug=True)
