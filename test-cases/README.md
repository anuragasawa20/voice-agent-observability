# Dental Clinic Test Cases

## Overview

This document contains comprehensive test cases for evaluating a dental clinic receptionist voice agent built on Vapi. The test cases cover various scenarios from simple appointment scheduling to complex multi-step interactions.

## Agent Description

**BrightSmile Dental Clinic Receptionist Agent**
- **Purpose**: Handle appointment scheduling, patient inquiries, and provide information about dental services
- **Capabilities**: 
  - Schedule new appointments
  - Reschedule existing appointments
  - Provide information about services
  - Answer questions about insurance and payment
  - Provide office hours and location information
  - Handle appointment cancellations
- **Personality**: Professional, warm, empathetic, and efficient

## Test Case Structure

Each test case includes:
- **scenario**: What the test caller (your agent in webhook.js) should do
- **final_outcome**: Detailed expected results that the evaluator will check

## Usage Example

### Example 1: Schedule New Cleaning Appointment

**Request Body:**
```json
{
  "phone_number": "+1234567890",
  "scenario": "You are calling BrightSmile Dental Clinic to schedule a routine dental cleaning appointment. You are a new patient named Sarah Johnson. You prefer morning appointments and are available on weekdays. You have dental insurance through BlueCross BlueShield. You need the appointment within the next 2-3 weeks. Be polite and provide information when asked. If the agent asks about specific dates, mention you're flexible but prefer Tuesdays or Wednesdays in the morning.",
  "final_outcome": {
    "taskCompleted": true,
    "appointmentScheduled": true,
    "appointmentDetails": {
      "patientName": "Sarah Johnson",
      "appointmentType": "Routine Cleaning",
      "appointmentDate": "2024-02-13 or 2024-02-14 (Tuesday or Wednesday)",
      "appointmentTime": "Morning time slot (between 9:00 AM - 12:00 PM)",
      "timeframe": "Within 2-3 weeks from call date"
    },
    "informationCollected": {
      "patientName": "Sarah Johnson",
      "appointmentType": "Routine Cleaning / Dental Cleaning",
      "preferredTime": "Morning",
      "preferredDays": "Tuesday or Wednesday",
      "insuranceProvider": "BlueCross BlueShield",
      "patientStatus": "New Patient",
      "urgency": "Within 2-3 weeks"
    },
    "agentActions": [
      "Greeted customer professionally",
      "Asked for patient name",
      "Identified appointment type (cleaning)",
      "Asked about preferred dates/times",
      "Confirmed insurance information",
      "Provided available appointment slot",
      "Confirmed appointment details",
      "Provided confirmation information (date, time, location if applicable)"
    ],
    "complianceCheckpoints": [
      "HIPAA compliance - handled patient information appropriately",
      "No medical advice given (appropriate for receptionist)",
      "Professional boundaries maintained"
    ],
    "successCriteria": {
      "appointmentDateSet": true,
      "appointmentTimeSet": true,
      "patientInformationRecorded": true,
      "confirmationProvided": true,
      "nextStepsCommunicated": true
    }
  }
}
```

### Example 2: Emergency Appointment

**Request Body:**
```json
{
  "phone_number": "+1234567891",
  "scenario": "You are calling BrightSmile Dental Clinic because you have a severe toothache that started this morning. You're in significant pain and need to see a dentist as soon as possible. Your name is Michael Chen. You're an existing patient. You're available today or tomorrow at any time. You're worried and in pain, so you may sound stressed. The agent should show empathy and try to accommodate your urgent need.",
  "final_outcome": {
    "taskCompleted": true,
    "appointmentScheduled": true,
    "appointmentDetails": {
      "patientName": "Michael Chen",
      "appointmentType": "Emergency / Urgent Care / Same-day appointment",
      "appointmentDate": "Same day or next day (within 24-48 hours)",
      "appointmentTime": "Earliest available slot",
      "urgency": "High - same day or next day"
    },
    "informationCollected": {
      "patientName": "Michael Chen",
      "appointmentType": "Emergency / Urgent Care",
      "symptoms": "Severe toothache / Pain",
      "patientStatus": "Existing Patient",
      "urgency": "Same day or next day",
      "availability": "Any time today or tomorrow"
    },
    "agentActions": [
      "Showed empathy for patient's pain",
      "Identified urgent nature of request",
      "Asked for patient name",
      "Verified existing patient status",
      "Offered earliest available appointment",
      "Provided same-day or next-day option",
      "Reassured patient about getting care quickly",
      "Provided appointment confirmation"
    ],
    "complianceCheckpoints": [
      "Empathetic response to patient distress",
      "No medical diagnosis over phone (appropriate)",
      "Urgent care protocol followed"
    ],
    "successCriteria": {
      "empathyDemonstrated": true,
      "urgentAppointmentOffered": true,
      "appointmentDateSet": true,
      "appointmentTimeSet": true,
      "patientReassured": true,
      "confirmationProvided": true
    }
  }
}
```

## Test Case Categories

### Functional Test Cases (DC-001 to DC-006)
These test the agent's ability to handle normal appointment scheduling and patient inquiries.

### Security Test Cases (SEC-001 to SEC-010)
These test the agent's resistance to jailbreak attempts, prompt injection, and unauthorized access. See `security-test-cases.json` and `security-test-cases-README.md` for details.

---

## Functional Test Cases

### 1. **DC-001: Schedule New Cleaning Appointment - Standard Case**
- Tests: Task completion, information gathering, efficiency, proactivity
- Complexity: Medium
- Key Metrics: Appointment scheduling accuracy, information collection completeness

### 2. **DC-002: Schedule Urgent Appointment - Emergency Case**
- Tests: Empathy, error handling, efficiency, naturalness
- Complexity: Medium-High
- Key Metrics: Empathy demonstration, urgent care handling, patient reassurance

### 3. **DC-003: Reschedule Existing Appointment**
- Tests: Information gathering, accuracy, efficiency
- Complexity: Medium
- Key Metrics: Appointment lookup accuracy, rescheduling process

### 4. **DC-004: Inquire About Services and Pricing**
- Tests: Accuracy, information gathering, proactivity, compliance
- Complexity: Medium
- Key Metrics: Service information accuracy, pricing transparency, consultation offering

### 5. **DC-005: Cancel Appointment with Reason**
- Tests: Proactivity, efficiency, information gathering
- Complexity: Low-Medium
- Key Metrics: Cancellation handling, reschedule offering

### 6. **DC-006: Complex Multi-Step Appointment**
- Tests: All metrics (comprehensive test)
- Complexity: High
- Key Metrics: Multi-step information gathering, insurance handling, payment options

## Security Testing

In addition to functional tests, security test cases are available to test:
- Jailbreak resistance
- Prompt injection protection
- Unauthorized access prevention
- Role manipulation resistance
- Data privacy (HIPAA compliance)
- Code execution prevention

**See**: `security-test-cases.json` and `security-test-cases-README.md`

---

## Evaluation Metrics Covered

### Transcript-Only Metrics (All Test Cases)
- ✅ **Task Completion**: Did the agent complete the intended task?
- ✅ **Accuracy**: Were responses factually correct?
- ✅ **Information Gathering**: Were all necessary details collected?
- ✅ **Error Handling**: How well did the agent handle misunderstandings?
- ✅ **Efficiency**: Was the conversation concise and to the point?
- ✅ **Proactivity**: Did the agent offer help and suggestions?
- ✅ **Compliance**: Were regulations and guidelines followed?
- ✅ **Security**: Were security boundaries maintained? (For security test cases)

### Audio-Enhanced Metrics (Better with Audio, but Transcript Works for MVP)
- 📊 **Naturalness**: Conversational flow, context maintenance
- 📊 **Empathy**: Language choice, professional tone, emotional acknowledgment
- 📊 **Sentiment**: Word choice, language patterns, conversation flow

## How to Use

1. **Select a test case** from `dental-clinic-test-case.json`
2. **Extract the `scenario` and `final_outcome`** from the test case
3. **Make a POST request** to `/test/run` with:
   ```json
   {
     "phone_number": "<test-phone-number>",
     "scenario": "<scenario-text>",
     "final_outcome": { <final_outcome-object> }
   }
   ```
4. **Wait for call completion** - the webhook will receive the results
5. **Retrieve evaluation** - the evaluator will compare transcript against `final_outcome`

## Notes

- All dates in examples are relative - adjust based on current date
- Phone numbers should be valid test numbers
- The `final_outcome` object is used by the evaluator to check if the agent met all criteria
- Dates should be specific (e.g., "2024-02-13") when possible for accurate evaluation
- The evaluator will check if all items in `successCriteria` were met

