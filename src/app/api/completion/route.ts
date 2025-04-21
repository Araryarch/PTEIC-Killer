import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("deepseek-r1-distill-llama-70b"),
    messages: messages,
    temperature: 1,
    maxTokens: 131072,
    topP: 1,
    system: `
📚 Overview:
This dataset is compiled from four structured educational modules prepared by lecturers from the Electrical and Informatics Departments of Institut Teknologi Sepuluh Nopember (ITS), Indonesia. The aim is to train an AI model capable of understanding, explaining, and reasoning about foundational topics in electrical engineering, electronics, control systems, telecommunications, and computational thinking.

📘 1. ENERGY & POWER SYSTEMS
Author: Dr. Ir. Margo Pujiantara, IPU
Scope:
- Definition of energy: Energy is the ability to do work.
- Types of energy: Kinetic, potential, mechanical, thermal, electrical, nuclear, chemical, sound, light.
- Energy conversion: Fuel → Heat → Mechanical → Electrical (especially in PLTU / Steam Power Plants).
- Steam Power Plants (PLTU): Components (boiler, turbine, condenser, generator), working fluid (water), use of coal, advantages (flexibility, scalability, lifespan), and weaknesses (cooling water demand, cost, fuel dependency).
- Electrical energy transmission: Flow from generator to consumer, voltage levels (150 kV, 70 kV, 20 kV, 220V).
- Alternating Current (AC): RMS, power factor, real/reactive/apparent power.
- Indonesia's Energy Landscape: Installed capacity, Java-Bali grid, SAIDI & SAIFI reliability metrics.
- AI Goal: Understand energy types and transformations, power generation, AC properties, and national grid structure.

🔌 2. ELECTRONICS & CONTROL SYSTEMS
Source: Dept. of Electrical Engineering
Scope:
- Electronics:
  - Passive Components: Resistors (R), Inductors (L), Capacitors (C)
  - Active Components: Diodes, Transistors (BJT, FET), ICs
- Control Systems:
  - Structure: Controller, actuator, process, sensor
  - Open Loop vs Closed Loop Systems
  - Transfer Function (TF)
  - Types of Control: Analog and digital
  - Applications: Process control, motion control, servomechanisms, NC, robotics
- AI Goal: Understand component behavior, control system design, and feedback mechanisms.

📡 3. TELECOMMUNICATIONS
Source: Dr. Endroyono et al.
Scope:
- Human communication evolution: From primitive signals to 6G
- Telecom Eras: Analog → Digital → Networked → Software-defined
- Telecommunication Systems: Signals (analog/digital), components (modem, router), protocols (TCP/IP), challenges (latency, interference)
- Standards & Laws: ITU, IEEE, ETSI, and Indonesian laws (UU ITE, PDP, KIP)
- Applications: Smart cities, IoT, radar, marine & air comms, 5G → 6G architecture
- AI Goal: Understand telecom principles, evolution, challenges, and applications of modern networked systems.

🧠 4. COMPUTATIONAL THINKING
Source: Dr. Anny Yuniarti
Scope:
- Goal: Teach how computers simulate intelligence and logic
- Core CT Elements: Decomposition, pattern recognition, abstraction, algorithm design
- Real-world Relevance: Used in AI, recommendations, diagnostics
- Training CT: Involves structured, iterative problem solving
- AI Goal: Internalize logic-based reasoning, abstraction, and algorithm generation.
`,
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
  });

  return result.toDataStreamResponse();
}
