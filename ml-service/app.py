from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

resources = {
    "Math": ["Khan Academy Math", "PatrickJMT videos"],
    "Physics": ["HyperPhysics", "MIT OpenCourseWare"],
    "Chemistry": ["ChemGuide", "CrashCourse Chemistry"],
    "English": ["Grammarly Blog", "BBC Learning English"],
}

@app.route("/")
def home():
    return jsonify({"message": "ML Service is running 🚀"}), 200

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json.get("scores", [])
        df = pd.DataFrame(data)

        if df.empty:
            return jsonify({
                "recommended_subjects": [],
                "study_plan": {},
                "progress": {}
            })

        # Example: weakness analysis
        avg_score = df["score"].mean()
        df["diff"] = avg_score - df["score"]
        df = df.sort_values("diff", ascending=False)

        recommended_subjects = df.head(3)["subject"].tolist()
        study_plan = {
            sub: f"Spend 2-3 hours daily on {sub}. Resources: {', '.join(resources.get(sub, []))}"
            for sub in recommended_subjects
        }
        progress = {
            sub: int(df[df["subject"] == sub]["score"].values[0])
            for sub in recommended_subjects
        }

        return jsonify({
            "recommended_subjects": recommended_subjects,
            "study_plan": study_plan,
            "progress": progress
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=PORT)
