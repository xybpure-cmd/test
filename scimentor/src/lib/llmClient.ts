import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function* streamChat(messages: { role: string; content: string }[]): AsyncGenerator<string> {
  try {
    const stream = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      stream: true
    });
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) yield token;
    }
  } catch (error) {
    console.error(error);
    throw new Error('AI 服务暂时不可用，请稍后重试。');
  }
}
