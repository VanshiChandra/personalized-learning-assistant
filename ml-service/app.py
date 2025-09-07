from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

resources = {
    "Math": ["Khan Academy Math", "PatrickJMT videos"],
    "Physics": ["HyperPhysics", "MIT OpenCourseWare"],
    "Chemistry": ["ChemGuide", "CrashCourse Chemistry"],
    "English": ["Grammarly Blog", "BBC Learning English"],
}

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json['scores']
    df = pd.DataFrame(data)
    
    if df.empty:
        return jsonify({'recommended_subjects': [], 'study_plan': {}})
    
    avg_score = df['score'].mean()
    df['diff'] = avg_score - df['score']
    df = df.sort_values('diff', ascending=False)
    
    recommended_subjects = df.head(3)['subject'].tolist()
    study_plan = {sub: f"Spend 2-3 hours on {sub}. Recommended resources: {', '.join(resources.get(sub, []))}" for sub in recommended_subjects}
    
    # Optional: simple progress tracking
    progress = {sub: df[df['subject']==sub]['score'].values[0] for sub in recommended_subjects}
    
    return jsonify({
        'recommended_subjects': recommended_subjects,
        'study_plan': study_plan,
        'progress': progress
    })

if __name__ == '__main__':
    app.run(port=8000)
