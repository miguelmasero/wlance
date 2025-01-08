import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { ChatCompletionRequestMessage } from 'openai';

export const runtime = 'edge';

// Define your function
const functions = [
  {
    name: 'createBooking',
    description: 'Creates a new cleaning service booking',
    parameters: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
        time: { type: 'string', description: 'Time in HH:mm format' },
        duration: { type: 'number', description: 'Duration in hours (2 or 4)' }
      },
      required: ['date', 'time', 'duration']
    }
  }
];

export async function POST(req: Request) {
  try {
    const { messages = [], selectedDate } = await req.json();

    // Simplify the system message construction
    const systemMessage = `You are a helpful assistant for a cleaning service company. Assist users with booking, modifying, or canceling cleaning appointments. When asked to make a new booking, the date will be specified, but ask for the time and if the user wants 2 or 4 hours. If all booking details are provided, use the createBooking function to confirm the booking.${selectedDate ? ` The user selected this date: ${selectedDate}.` : ''}`;

    // Use a more concise way to create the payload
    const payload = [
      { role: 'system', content: systemMessage },
      ...messages.map(({ role, content }) => ({ role, content }))
    ];

    // Simplify the streamText call
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: payload,
      functions,
      functionCall: 'auto'
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

