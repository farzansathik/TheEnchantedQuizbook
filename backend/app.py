from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS




app = Flask(__name__)
CORS(app)
# เชื่อม MongoDB ในเครื่องนี้
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["harry"]  # เปลี่ยนชื่อ database ตามต้องการ
collection = db["test"]  # เปลี่ยนชื่อ collection ตามต้องการ
collection2=db["KlQuiz"]
collection3=db["PnQuiz"]
collection4=db["LeaderBoard"]

@app.route("/")
def home():
    return "Flask API is running!"

@app.route("/data", methods=["GET"])
def get_data():
    data = list(collection.find({}, {"_id": 0}))  # ไม่แสดง _id
    return jsonify(data)

@app.route("/data", methods=["POST"])
def insert_data():
    try:
        new_data = request.get_json()
        if not new_data:
            raise BadRequest("No JSON data provided.")

        # ตรวจสอบว่ามี field ที่จำเป็นไหม เช่น name หรือ id
        # if "name" not in new_data:
        #     return jsonify({"status": "error", "message": "Missing 'name' field"}), 400

        result = collection.insert_one(new_data)
        new_data["_id"] = str(result.inserted_id)  # แปลง ObjectId เป็น string
        return jsonify({"status": "success", "data": new_data}), 201

    except BadRequest as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": "Internal server error", "details": str(e)}), 500

@app.route("/Kl", methods=["GET"])
def get_data2():
    data = list(collection2.find({}, {"_id": 0}))  # ไม่แสดง _id
    return jsonify(data)
@app.route("/Kl", methods=["POST"])
def insert_data2():
    new_data = request.json
    collection2.insert_one(new_data)
    return jsonify({"status": "success", "data": new_data}), 201

@app.route("/Pn", methods=["GET"])
def get_data3():
    data = list(collection3.find({}, {"_id": 0}))  # ไม่แสดง _id
    return jsonify(data)
@app.route("/Pn", methods=["POST"])
def insert_data3():
    new_data = request.json
    collection3.insert_one(new_data)
    return jsonify({"status": "success", "data": new_data}), 201

@app.route("/Ldb", methods=["GET"])
def get_data4():
    data = list(collection4.find({}, {"_id": 0}).sort("score", -1).limit(10))  # ไม่แสดง _id
    return jsonify(data)
@app.route("/Ldb", methods=["POST"])
def insert_data4():
    try:
        new_data = request.get_json()
        if not new_data:
            raise BadRequest("No JSON data provided.")

        # ตรวจสอบว่ามี field ที่จำเป็นไหม เช่น name หรือ id
        # if "name" not in new_data:
        #     return jsonify({"status": "error", "message": "Missing 'name' field"}), 400

        result = collection4.insert_one(new_data)
        new_data["_id"] = str(result.inserted_id)  # แปลง ObjectId เป็น string
        return jsonify({"status": "success", "data": new_data}), 201

    except BadRequest as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": "Internal server error", "details": str(e)}), 500

@app.route('/delete_all', methods=['DELETE'])
def delete_all():
    result = collection2.delete_many({})
    return jsonify({"message": f"Deleted {result.deleted_count} documents from collection."}), 200



# In-memory leaderboard (replace with a database in production)
leaderboard = []

@app.route('/submit', methods=['POST'])
def submit_score():
    data = request.get_json()

    username = data.get('username')
    score = data.get('score')

    if not username or score is None:
        return jsonify({'error': 'Missing username or score'}), 400

    leaderboard.append({'username': username, 'score': score})
    return jsonify({'message': 'Score submitted successfully'}), 200

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    # Sort by score descending
    sorted_board = sorted(leaderboard, key=lambda x: x['score'], reverse=True)
    return jsonify(sorted_board), 200


#class UserAnswers(BaseModel):
 #   answers: List[int]  # รับคำตอบเป็น List ของตัวเลข (เช่น [2, 0, 1, 3, 1, ...])

@app.route("/patronus", methods=['POST'])
def get_patronus():
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("No JSON data provided.")
        if "answers" not in data:
            raise BadRequest("Missing 'answers' field in JSON.")

        answers = data["answers"]

        score = {
            "wolf": 0, "lion": 0, "otter": 0, "cat": 0, "fox": 0,
            "eagle": 0, "horse": 0, "owl": 0, "hare": 0
        }

        questions = [ 
            # Full list of 15 questions (as in your original post)
            {
                "id": 1,
                "options": [
                    {
                        "scores": [
                            "eagle",
                            "otter"
                        ],
                        "text": "Shine"
                    },
                    {
                        "scores": [
                            "fox",
                            "owl"
                        ],
                        "text": "Shadow"
                    },
                    {
                        "scores": [
                            "cat",
                            "hare"
                        ],
                        "text": "Rain"
                    },
                    {
                        "scores": [
                            "horse",
                            "eagle"
                        ],
                        "text": "Wind"
                    }
                ],
                "question": "Choose instinctively."
            },
            {
                "id": 2,
                "options": [
                    {
                        "scores": [
                            "wolf",
                            "lion"
                        ],
                        "text": "Instinct"
                    },
                    {
                        "scores": [
                            "fox",
                            "owl"
                        ],
                        "text": "Planning"
                    },
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Courage"
                    },
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Helping others"
                    }
                ],
                "question": "In a crisis, how do you respond?"
            },
            {
                "id": 3,
                "options": [
                    {
                        "scores": [
                            "cat",
                            "fox"
                        ],
                        "text": "Forest"
                    },
                    {
                        "scores": [
                            "eagle",
                            "owl"
                        ],
                        "text": "Mountain"
                    },
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "City"
                    },
                    {
                        "scores": [
                            "otter",
                            "horse"
                        ],
                        "text": "Ocean"
                    }
                ],
                "question": "Which place brings you peace?"
            },
            {
                "id": 4,
                "options": [
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Fight"
                    },
                    {
                        "scores": [
                            "hare",
                            "cat"
                        ],
                        "text": "Hide"
                    },
                    {
                        "scores": [
                            "fox",
                            "owl"
                        ],
                        "text": "Outsmart"
                    },
                    {
                        "scores": [
                            "otter",
                            "horse"
                        ],
                        "text": "Negotiate"
                    }
                ],
                "question": "How do you face a challenge?"
            },
            {
                "id": 5,
                "options": [
                    {
                        "scores": [
                            "eagle",
                            "horse"
                        ],
                        "text": "Freedom"
                    },
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Strength"
                    },
                    {
                        "scores": [
                            "owl",
                            "fox"
                        ],
                        "text": "Wisdom"
                    },
                    {
                        "scores": [
                            "wolf",
                            "otter"
                        ],
                        "text": "Loyalty"
                    }
                ],
                "question": "Pick the word that fits you."
            },
            {
                "id": 6,
                "options": [
                    {
                        "scores": [
                            "owl",
                            "cat"
                        ],
                        "text": "Wait silently"
                    },
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Call out"
                    },
                    {
                        "scores": [
                            "hare",
                            "horse"
                        ],
                        "text": "Run"
                    },
                    {
                        "scores": [
                            "eagle",
                            "fox"
                        ],
                        "text": "Walk forward"
                    }
                ],
                "question": "You hear something in the dark. You:"
            },
            {
                "id": 7,
                "options": [
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Love"
                    },
                    {
                        "scores": [
                            "lion",
                            "fox"
                        ],
                        "text": "Ambition"
                    },
                    {
                        "scores": [
                            "owl",
                            "cat"
                        ],
                        "text": "Curiosity"
                    },
                    {
                        "scores": [
                            "wolf",
                            "eagle"
                        ],
                        "text": "Justice"
                    }
                ],
                "question": "What quality do you value most?"
            },
            {
                "id": 8,
                "options": [
                    {
                        "scores": [
                            "owl",
                            "fox"
                        ],
                        "text": "Time Turner"
                    },
                    {
                        "scores": [
                            "cat",
                            "wolf"
                        ],
                        "text": "Invisibility Cloak"
                    },
                    {
                        "scores": [
                            "lion",
                            "eagle"
                        ],
                        "text": "Elder Wand"
                    },
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Marauder's Map"
                    }
                ],
                "question": "Which magical item would you choose?"
            },
            {
                "id": 9,
                "options": [
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Face it"
                    },
                    {
                        "scores": [
                            "fox",
                            "owl"
                        ],
                        "text": "Outthink it"
                    },
                    {
                        "scores": [
                            "hare",
                            "cat"
                        ],
                        "text": "Avoid it"
                    },
                    {
                        "scores": [
                            "eagle",
                            "otter"
                        ],
                        "text": "Transform it"
                    }
                ],
                "question": "When danger comes, you:"
            },
            {
                "id": 10,
                "options": [
                    {
                        "scores": [
                            "lion",
                            "eagle"
                        ],
                        "text": "Leader"
                    },
                    {
                        "scores": [
                            "wolf",
                            "cat"
                        ],
                        "text": "Lone Wolf"
                    },
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Supporter"
                    },
                    {
                        "scores": [
                            "owl",
                            "fox"
                        ],
                        "text": "Observer"
                    }
                ],
                "question": "Your role in a group is usually:"
            },
            {
                "id": 11,
                "options": [
                    {
                        "scores": [
                            "wolf"
                        ],
                        "text": "Wolf"
                    },
                    {
                        "scores": [
                            "otter"
                        ],
                        "text": "Otter"
                    },
                    {
                        "scores": [
                            "horse"
                        ],
                        "text": "Horse"
                    },
                    {
                        "scores": [
                            "cat"
                        ],
                        "text": "Cat"
                    }
                ],
                "question": "Pick one creature."
            },
            {
                "id": 12,
                "options": [
                    {
                        "scores": [
                            "wolf",
                            "hare"
                        ],
                        "text": "Wild trail"
                    },
                    {
                        "scores": [
                            "fox",
                            "owl"
                        ],
                        "text": "Hidden alley"
                    },
                    {
                        "scores": [
                            "horse",
                            "eagle"
                        ],
                        "text": "Wide road"
                    },
                    {
                        "scores": [
                            "cat",
                            "otter"
                        ],
                        "text": "Narrow bridge"
                    }
                ],
                "question": "You’re walking alone. You choose:"
            },
            {
                "id": 13,
                "options": [
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Help it"
                    },
                    {
                        "scores": [
                            "owl",
                            "fox"
                        ],
                        "text": "Observe it"
                    },
                    {
                        "scores": [
                            "eagle",
                            "cat"
                        ],
                        "text": "Free it"
                    },
                    {
                        "scores": [
                            "lion",
                            "wolf"
                        ],
                        "text": "Ignore it"
                    }
                ],
                "question": "You see a trapped animal. You:"
            },
            {
                "id": 14,
                "options": [
                    {
                        "scores": [
                            "wolf",
                            "otter"
                        ],
                        "text": "Loss"
                    },
                    {
                        "scores": [
                            "fox",
                            "lion"
                        ],
                        "text": "Failure"
                    },
                    {
                        "scores": [
                            "cat",
                            "horse"
                        ],
                        "text": "Trapped"
                    },
                    {
                        "scores": [
                            "owl",
                            "hare"
                        ],
                        "text": "Forgotten"
                    }
                ],
                "question": "What do you fear most?"
            },
            {
                "id": 15,
                "options": [
                    {
                        "scores": [
                            "otter",
                            "hare"
                        ],
                        "text": "Hope"
                    },
                    {
                        "scores": [
                            "owl",
                            "eagle"
                        ],
                        "text": "Truth"
                    },
                    {
                        "scores": [
                            "fox",
                            "lion"
                        ],
                        "text": "Desire"
                    },
                    {
                        "scores": [
                            "cat",
                            "wolf"
                        ],
                        "text": "Compassion"
                    }
                ],
                "question": "Choose one word:"
            }
        ]

        if len(answers) > len(questions):
            raise BadRequest("Too many answers provided.")

        for i in range(len(answers)):
            selected_option = answers[i]
            animals = questions[i]["options"][selected_option]["scores"]
            for animal in animals:
                score[animal] += 1

        patronus = max(score, key=score.get)

        # Save to MongoDB
        collection.insert_one({"answers": answers, "patronus": patronus})
        patronus_animals= [
            {
                "description": "Brave and loyal, always protecting others.",
                "id": "wolf",
                "name": "Wolf"
            },
            {
                "description": "Strong and courageous, natural leader.",
                "id": "lion",
                "name": "Lion"
            },
            {
                "description": "Playful and social, intelligent and kind.",
                "id": "otter",
                "name": "Otter"
            },
            {
                "description": "Independent, curious, and intuitive.",
                "id": "cat",
                "name": "Cat"
            },
            {
                "description": "Clever and strategic, with sharp instincts.",
                "id": "fox",
                "name": "Fox"
            },
            {
                "description": "Free-spirited, powerful, and focused.",
                "id": "eagle",
                "name": "Eagle"
            },
            {
                "description": "Strong, calm, and values freedom.",
                "id": "horse",
                "name": "Horse"
            },
            {
                "description": "Wise and observant, thrives in mystery.",
                "id": "owl",
                "name": "Owl"
            },
            {
                "description": "Gentle, fast, and emotionally aware.",
                "id": "hare",
                "name": "Hare"
            }
        ]
        for animal in patronus_animals:
            if animal["id"] == patronus:
                x = animal["description"]
                y = animal["name"]
                break 

        return jsonify({
            "score": score,
            "patronus": y,
            "desccription":x

        }), 200

    except BadRequest as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": "Internal server error", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)