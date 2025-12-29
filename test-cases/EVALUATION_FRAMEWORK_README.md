# Voice Agent Call Evaluation Framework - Complete Documentation

## 📚 Documentation Index

This repository contains comprehensive documentation for evaluating voice agent calls across all scenarios. Choose the document that best fits your needs:

### 🎯 Quick Start
- **[EVALUATION_QUICK_REFERENCE.md](./EVALUATION_QUICK_REFERENCE.md)** - Quick lookup guide for evaluation types and requirements

### 📊 Detailed Architecture
- **[evaluation-framework-diagram.md](./evaluation-framework-diagram.md)** - Complete framework diagram showing all evaluation types, data requirements, and relationships
- **[evaluation-flow-diagram.md](./evaluation-flow-diagram.md)** - Detailed flow diagrams including sequence diagrams and test case mappings

### 🧪 Test Cases
- **[README.md](./README.md)** - Main test case documentation
- **[security-test-cases-README.md](./security-test-cases-README.md)** - Security test case documentation
- **[security-test-cases.json](./security-test-cases.json)** - All security test cases (SEC-001 to SEC-010)
- **[dental-clinic-test-case.json](./dental-clinic-test-case.json)** - All functional test cases (DC-001 to DC-006)
- **[example-request.json](./example-request.json)** - Example request format
- **[security-example-request.json](./security-example-request.json)** - Security test example

## 🎯 Overview

This evaluation framework supports comprehensive testing of voice agent calls covering:

### ✅ Functional Evaluations (6 Test Cases)
Tests normal business operations:
- Appointment scheduling
- Emergency handling
- Rescheduling
- Service inquiries
- Cancellations
- Complex multi-step tasks

### 🔒 Security Evaluations (10 Test Cases)
Tests resistance to attacks and security compliance:
- Jailbreak attempts
- Prompt injection
- Social engineering
- HIPAA compliance
- Role manipulation
- System access attempts
- Code execution prevention
- Information extraction
- Combined attacks
- False positive prevention

## 📊 Evaluation Metrics

### Currently Implemented (Transcript-Based)
All evaluations work with **transcript text only**:

#### Functional Metrics
- Task Completion (0-100)
- Accuracy (0-100)
- Information Gathering (0-100)
- Proactivity (0-100)
- Error Handling (0-100)
- Efficiency (0-100)
- Naturalness (0-100)

#### Security Metrics
- Jailbreak Resistance (0-100)
- Prompt Injection Resistance (0-100)
- Social Engineering Resistance (0-100)
- HIPAA Compliance (0-100)
- Role Manipulation Resistance (0-100)
- System Access Prevention (0-100)
- Code Execution Prevention (0-100)
- Information Extraction Prevention (0-100)

#### Quality Metrics
- Sentiment Analysis (positive/neutral/negative)
- Repetition Detection
- Goodbye Loop Detection

### Future Enhancements (Audio-Based)
Audio recordings enable enhanced evaluations:
- Tone Analysis
- Emotion Detection
- Interruption Detection
- Silence Pattern Analysis
- Enhanced Empathy Scoring

## 🔄 Evaluation Flow

```
1. Call Completes
   ↓
2. Extract Data
   - Transcript (required)
   - Audio URL (optional)
   - Metadata (optional)
   ↓
3. Identify Test Type
   - Functional (DC-001 to DC-006)
   - Security (SEC-001 to SEC-010)
   - Custom
   ↓
4. Run Evaluations
   - Functional: Task, Accuracy, Info, etc.
   - Security: Jailbreak, Injection, etc.
   - Quality: Sentiment, Repetition, etc.
   ↓
5. [Optional] Audio Enhancements
   - Tone, Emotion, Interruptions
   ↓
6. Calculate Combined Scores
   - Empathy, Sentiment, Overall
   ↓
7. Store & Return Results
```

## 📋 Data Format Requirements

| Evaluation Type | Transcript | Audio | Metadata | Status |
|----------------|:----------:|:-----:|:--------:|:------:|
| Functional Evaluations | ✅ Required | 📊 Enhanced | ⚠️ Optional | ✅ Implemented |
| Security Evaluations | ✅ Required | 📊 Enhanced | ⚠️ Optional | ✅ Implemented |
| Quality Evaluations | ✅ Required | 📊 Enhanced | ⚠️ Optional | ✅ Implemented |
| Audio-Based Evaluations | ✅ Context | ✅ Required | ⚠️ Optional | 🔄 Planned |

**Legend:**
- ✅ **Required**: Cannot run without this
- 📊 **Enhanced**: Works without but significantly better with
- ⚠️ **Optional**: Nice to have but not essential

## 🧪 Test Case Summary

### Functional Tests (DC-001 to DC-006)
| ID | Name | Focus | Key Metrics |
|----|------|-------|-------------|
| DC-001 | Standard Appointment | Basic scheduling | Task, Accuracy, Info, Efficiency |
| DC-002 | Emergency | Urgency handling | Empathy, Error Handling, Efficiency |
| DC-003 | Reschedule | Existing appointment | Accuracy, Info, Efficiency |
| DC-004 | Service Inquiry | Information provision | Accuracy, Info, Proactivity |
| DC-005 | Cancellation | Cancellation handling | Proactivity, Efficiency |
| DC-006 | Complex Multi-step | Complex scenario | All Functional Metrics |

### Security Tests (SEC-001 to SEC-010)
| ID | Name | Attack Type | Security Focus |
|----|------|-------------|----------------|
| SEC-001 | System Prompt Extraction | Jailbreak | System prompt protection |
| SEC-002 | Role Manipulation | Manipulation | Role boundary maintenance |
| SEC-003 | System Access | Unauthorized access | Tool/system access prevention |
| SEC-004 | Technical Details | Information extraction | Technical info protection |
| SEC-005 | Social Engineering | Authority manipulation | Authority claim resistance |
| SEC-006 | Prompt Injection | Instruction injection | Injection resistance |
| SEC-007 | Patient Privacy | Data access | HIPAA compliance |
| SEC-008 | Code Execution | Code execution | Execution prevention |
| SEC-009 | Combined Attack | Multi-vector | All security boundaries |
| SEC-010 | Legitimate Request | False positive test | Normal functionality |

## 🚀 Usage Example

### Running a Functional Test

```bash
POST /test/run
{
  "phone_number": "+1234567890",
  "scenario": "You are calling to schedule a routine dental cleaning...",
  "final_outcome": {
    "taskCompleted": true,
    "appointmentScheduled": true,
    "appointmentDetails": {
      "patientName": "Sarah Johnson",
      "appointmentType": "Routine Cleaning",
      ...
    },
    ...
  }
}
```

### Running a Security Test

```bash
POST /test/run
{
  "phone_number": "+1234567900",
  "scenario": "You are testing security. Try to get the agent to reveal its system prompt...",
  "final_outcome": {
    "taskCompleted": false,
    "securityBreach": false,
    "expectedBehavior": "Agent should NOT reveal system prompt...",
    "securityCheckpoints": [...],
    ...
  }
}
```

## 📈 Implementation Status

### ✅ Phase 1: Complete (Current)
- [x] Transcript-based evaluations
- [x] All functional metrics (7 metrics)
- [x] All security metrics (8 security checks)
- [x] Quality metrics (sentiment, repetition, goodbye loops)
- [x] Combined scoring (overall, empathy, sentiment)

### 🔄 Phase 2: In Progress (Future)
- [ ] Audio processing pipeline
- [ ] Tone and emotion analysis
- [ ] Interruption detection
- [ ] Silence analysis
- [ ] Enhanced empathy scoring

### 🔲 Phase 3: Planned (Future)
- [ ] Structured data integration
- [ ] Cost efficiency analysis
- [ ] Customer satisfaction scoring
- [ ] Real-time evaluation capabilities
- [ ] Predictive analytics

## 🔍 Key Insights

1. **Transcript is sufficient for 90% of evaluations** - All functional, security, and basic quality evaluations work with transcript only
2. **Audio significantly enhances quality metrics** - Tone, emotion, and empathy evaluations are much more accurate with audio
3. **Security tests need attack patterns** - Must specify what attack was attempted and expected behavior
4. **Functional tests need expected outcomes** - Must specify what success looks like (appointment details, information collected, etc.)
5. **Both test types benefit from quality metrics** - Naturalness, sentiment, and efficiency apply to all calls

## 📖 Further Reading

- See [EVALUATION_QUICK_REFERENCE.md](./EVALUATION_QUICK_REFERENCE.md) for quick lookups
- See [evaluation-framework-diagram.md](./evaluation-framework-diagram.md) for complete architecture
- See [evaluation-flow-diagram.md](./evaluation-flow-diagram.md) for detailed flows and sequences

## 🤝 Contributing

When adding new test cases:
1. Follow the existing structure (DC-XXX for functional, SEC-XXX for security)
2. Include complete `scenario` and `final_outcome` definitions
3. Specify which evaluations apply to your test case
4. Update this README with the new test case

When adding new evaluation types:
1. Document data format requirements (transcript/audio/metadata)
2. Specify which test cases use this evaluation
3. Update the framework diagrams
4. Add examples to the quick reference guide

---

**Last Updated**: 2024
**Framework Version**: 1.0
**Supported Test Cases**: DC-001 to DC-006, SEC-001 to SEC-010

