import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const db = new Database('./database/database.sqlite');

// Create table if not exists
db.exec(`
    CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        vapi_call_id TEXT,
        target_phone TEXT NOT NULL,
        scenario TEXT NOT NULL,
        expected_outcome TEXT,
        status TEXT DEFAULT 'pending',
        transcript TEXT,
        recording_url TEXT,
        stereo_recording_url TEXT,
        duration_seconds INTEGER,
        result TEXT,
        result_reason TEXT,
        cost REAL,
        ended_reason TEXT,
        raw_response TEXT,
        evaluation_results TEXT,
        overall_score REAL,
        passed INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

// Add new columns if they don't exist (for existing databases)
try {
    db.exec(`
        ALTER TABLE tests ADD COLUMN evaluation_results TEXT;
        ALTER TABLE tests ADD COLUMN overall_score REAL;
        ALTER TABLE tests ADD COLUMN passed INTEGER DEFAULT 0;
    `);
} catch (e) {
    // Columns already exist, ignore error
}

// Create a new test
export function createTest({ targetPhone, scenario, expectedOutcome, vapiCallId }) {
    // Validate required parameters
    if (!targetPhone || !scenario) {
        throw new Error('Missing required parameters: targetPhone and scenario are required');
    }

    const id = uuidv4();
    const stmt = db.prepare(`
        INSERT INTO tests (id, vapi_call_id, target_phone, scenario, expected_outcome, status)
        VALUES (?, ?, ?, ?, ?, 'calling')
    `);
    // Ensure all values are defined (use null for optional fields)
    stmt.run(
        id,
        vapiCallId || null,
        targetPhone,
        scenario,
        expectedOutcome || null
    );
    return id;
}

// Update test with results
export function updateTestResults(vapiCallId, data) {
    const stmt = db.prepare(`
        UPDATE tests SET
            status = ?,
            transcript = ?,
            recording_url = ?,
            stereo_recording_url = ?,
            duration_seconds = ?,
            cost = ?,
            ended_reason = ?,
            raw_response = ?,
            evaluation_results = ?,
            overall_score = ?,
            passed = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE vapi_call_id = ?
    `);
    stmt.run(
        data.status || 'completed',
        data.transcript,
        data.recordingUrl,
        data.stereoRecordingUrl,
        data.durationSeconds,
        data.cost,
        data.endedReason,
        JSON.stringify(data.rawResponse),
        data.evaluationResults ? JSON.stringify(data.evaluationResults) : null,
        data.overallScore || null,
        data.passed ? 1 : 0,
        vapiCallId
    );
}

// Get test by ID
export function getTestById(id) {
    const stmt = db.prepare('SELECT * FROM tests WHERE id = ?');
    return stmt.get(id);
}

// Get test by VAPI call ID
export function getTestByVapiCallId(vapiCallId) {
    const stmt = db.prepare('SELECT * FROM tests WHERE vapi_call_id = ?');
    return stmt.get(vapiCallId);
}

// Get all tests
export function getAllTests() {
    const stmt = db.prepare('SELECT * FROM tests ORDER BY created_at DESC');
    return stmt.all();
}

// Get all tests with parsed evaluation results
export function getAllTestsWithEvaluations() {
    const tests = getAllTests();
    return tests.map(test => {
        if (test.evaluation_results) {
            try {
                test.evaluation = JSON.parse(test.evaluation_results);
            } catch (e) {
                test.evaluation = null;
            }
        }
        return test;
    });
}

// Get test by ID with parsed evaluation
export function getTestByIdWithEvaluation(id) {
    const test = getTestById(id);
    if (test && test.evaluation_results) {
        try {
            test.evaluation = JSON.parse(test.evaluation_results);
        } catch (e) {
            test.evaluation = null;
        }
    }
    return test;
}

export default db;