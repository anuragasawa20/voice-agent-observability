import express from 'express';
import { buildAssistantPrompt } from '../services/prompt.js';
import { VapiClient } from "@vapi-ai/server-sdk";
import { createTest, updateTestResults, getAllTestsWithEvaluations, getTestByIdWithEvaluation } from '../database/index.js';
import { evaluateTest } from '../services/evaluator.js';

const router = express.Router();


router.post('/test/run', async (req, res) => {
    try {
        console.log('Request body received:', JSON.stringify(req.body, null, 2));

        const { phone_number, scenario, final_outcome } = req.body;

        if (!phone_number || !scenario) {
            return res.status(400).json({
                message: 'Missing required fields',
                required: ['phone_number', 'scenario'],
                received: Object.keys(req.body)
            });
        }

        const prompt = buildAssistantPrompt(scenario);
        console.log(prompt);
        const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });

        const call = await vapiClient.calls.create({
            assistant: {
                model: {
                    provider: "openai",
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: prompt
                        }
                    ]
                },
                "voice": {
                    "voiceId": "Elliot",
                    "provider": "vapi"
                },
                firstMessage: "Hi, I'm calling about an appointment.",
                endCallMessage: "Thank you, goodbye.",
                maxDurationSeconds: 180,
                server: {
                    url: `${process.env.WEBHOOK_URL}`
                }
            },
            phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
            customer: {
                number: phone_number
            }
        });

        // Validate call was created successfully
        if (!call || !call.id) {
            throw new Error('Call creation failed: No call ID returned from VAPI');
        }

        // Save to database
        // Convert final_outcome object to JSON string if it's an object
        let expectedOutcomeString = final_outcome;
        if (typeof final_outcome === 'object' && final_outcome !== null) {
            expectedOutcomeString = JSON.stringify(final_outcome);
        }

        const testId = createTest({
            targetPhone: phone_number,
            scenario: scenario,
            expectedOutcome: expectedOutcomeString,
            vapiCallId: call.id
        });

        console.log('Call created:', call.id);
        res.status(200).json({ message: 'Call created', callId: call.id, testId: testId });
    } catch (error) {
        console.error('Error creating call:', error);
        res.status(500).json({ message: 'Error creating call', error: error.message });
    }
    // const call = await vapiClient.calls.get({ id: '019b54e0-00c9-777a-8531-9524da3ca0b2' }); // callId
    // console.log(call);

    //  res.status(200).json({ message: 'Call results' });
});

router.post('/get-call-recordings', async (req, res) => {
    try {
        const { callId, expectedOutcome, script } = req.body;

        if (!callId) {
            return res.status(400).json({
                message: 'Missing required field: callId'
            });
        }

        const vapiClient = new VapiClient({ token: process.env.VAPI_API_KEY });
        const recording = await vapiClient.calls.get({ id: callId });

        if (!recording || !recording.transcript) {
            return res.status(404).json({
                message: 'Call recording not found or transcript not available'
            });
        }

        console.log('Transcript:', recording.transcript);

        // Evaluate the test
        const evaluation = await evaluateTest(recording.transcript, script, expectedOutcome);

        // Store evaluation results in database
        updateTestResults(callId, {
            status: 'evaluated',
            transcript: recording.transcript,
            recordingUrl: recording.recordingUrl || null,
            stereoRecordingUrl: recording.stereoRecordingUrl || null,
            durationSeconds: recording.durationSeconds || null,
            cost: recording.cost || null,
            endedReason: recording.endedReason || null,
            rawResponse: recording,
            evaluationResults: evaluation,
            overallScore: evaluation.overallScore || null,
            passed: evaluation.passed || false
        });

        console.log('Evaluation stored in database for call:', callId);

        res.status(200).json({
            message: 'Recordings',
            recordings: recording.transcript,
            evaluation: evaluation
        });
    } catch (error) {
        console.error('Error getting call recordings:', error);
        res.status(500).json({
            message: 'Error getting call recordings',
            error: error.message
        });
    }
});

// Get all tests for dashboard
router.get('/tests', async (req, res) => {
    try {
        const tests = getAllTestsWithEvaluations();
        res.status(200).json({
            message: 'Tests retrieved successfully',
            count: tests.length,
            tests: tests
        });
    } catch (error) {
        console.error('Error getting tests:', error);
        res.status(500).json({
            message: 'Error getting tests',
            error: error.message
        });
    }
});

// Get single test by ID
router.get('/tests/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const test = getTestByIdWithEvaluation(id);

        if (!test) {
            return res.status(404).json({
                message: 'Test not found'
            });
        }

        res.status(200).json({
            message: 'Test retrieved successfully',
            test: test
        });
    } catch (error) {
        console.error('Error getting test:', error);
        res.status(500).json({
            message: 'Error getting test',
            error: error.message
        });
    }
});

export default router;