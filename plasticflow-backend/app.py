import os
import time

from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}}
)


def get_mysql_config():
    return {
        "host": os.getenv("MYSQL_HOST", "localhost"),
        "port": int(os.getenv("MYSQL_PORT", "3306")),
        "user": os.getenv("MYSQL_USER", "root"),
        "password": os.getenv("MYSQL_PASSWORD", ""),
        "database": os.getenv("MYSQL_DATABASE", "plasticflow"),
    }


def connect_mysql(retries=30, delay=2):
    """Connect to MySQL with retries so Docker Compose can wait for DB startup."""
    config = get_mysql_config()
    last_error = None

    for attempt in range(1, retries + 1):
        try:
            connection = mysql.connector.connect(**config)
            print(
                f"Connected to MySQL at {config['host']}:{config['port']} "
                f"(attempt {attempt})"
            )
            return connection
        except Error as exc:
            last_error = exc
            print(
                f"MySQL not ready at {config['host']}:{config['port']} "
                f"(attempt {attempt}/{retries}): {exc}"
            )
            time.sleep(delay)

    raise last_error


db = connect_mysql()
cursor = db.cursor(dictionary=True)


@app.route("/")
def root():
    return jsonify({
        "service": "PlasticFlow API",
        "status": "ok",
        "endpoints": {
            "dashboard": "/api/dashboard",
            "plants": "/api/plants",
            "analytics": "/api/analytics",
            "monitoring": "/api/monitoring",
            "alerts": "/api/alerts",
        },
    })


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
    app.run(host="0.0.0.0", port=5000, debug=True)
