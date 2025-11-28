CREATE TABLE IF NOT EXISTS cases (
    case_id INTEGER PRIMARY KEY,
    title TEXT,
    age INTEGER,
    sex TEXT,
    bmi REAL,
    smoker INTEGER,
    defect_length_cm REAL,
    donor_site TEXT,
    technique_summary TEXT,
    complications TEXT,
    notes TEXT,
    outcome_rating INTEGER,
    imaging_meta TEXT,
    synthetic INTEGER DEFAULT 0,
    blob_text TEXT,
    embed_model TEXT,
    embed_dims INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

