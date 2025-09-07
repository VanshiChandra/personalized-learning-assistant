from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

# Sample resource recommendations
resources = {
    "Math": ["Khan Academy Math", "PatrickJMT videos"],
    "Physics": ["HyperPhysics", "MIT OpenCourseWare"],
    "Chemistry": ["ChemGuide", "CrashCourse Chemistry"],
    "English": ["Grammarly Blog", "BBC Learning English"],
}

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json.get('scores', [])
        df = pd.DataFrame(data)

        if df.empty:
            return jsonify({'recommended_subjects': [], 'study_plan': {}, 'progress': {}})

        # Simple weakest subjects calculation
        avg_score = df['score'].mean()
        df['diff'] = avg_score - df['score']
        df = df.sort_values('diff', ascending=False)

        recommended_subjects = df.head(3)['subject'].tolist()
        study_plan = {
            sub: f"Spend 2-3 hours on {sub}. Recommended resources: {', '.join(resources.get(sub, []))}" 
            for sub in recommended_subjects
        }

        progress = {sub: df[df['subject']==sub]['score'].values[0] for sub in recommended_subjects}

        return jsonify({
            'recommended_subjects': recommended_subjects,
            'study_plan': study_plan,
            'progress': progress
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Use Railway / cloud PORT or fallback to 8000 for local testing
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
