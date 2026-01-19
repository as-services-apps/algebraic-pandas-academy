import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuestionRequest {
  subject?: string;
  topic?: string;
  customTopic?: string;
  extraContext?: string;
  yearGroup: number;
  count: number;
}

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody: QuestionRequest = await req.json();
    const { subject, topic, customTopic, extraContext, yearGroup, count = 10 } = requestBody;
    
    // Determine if this is a custom topic request
    const isCustomTopic = Boolean(customTopic);
    
    console.log(`Generating ${count} questions for ${isCustomTopic ? `custom topic: ${customTopic}` : `${subject}/${topic}`} (Year ${yearGroup})`);
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Determine difficulty based on year group
    let difficulty = 'easy';
    let ageDescription = 'young children (ages 5-7)';
    if (yearGroup >= 4 && yearGroup <= 6) {
      difficulty = 'medium';
      ageDescription = 'children (ages 8-11)';
    } else if (yearGroup >= 7 && yearGroup <= 9) {
      difficulty = 'medium';
      ageDescription = 'teenagers (ages 11-14)';
    } else if (yearGroup >= 10) {
      difficulty = 'hard';
      ageDescription = 'older teenagers (ages 14-18)';
    }

    const systemPrompt = isCustomTopic 
      ? `You are an expert educational quiz question generator specializing in creating specific, targeted quiz questions about any topic a student wants to learn.

Rules:
1. Each question must have EXACTLY 4 options
2. Options must be plausible but only ONE is correct
3. Questions must be age-appropriate for ${ageDescription} (Year ${yearGroup} UK curriculum)
4. Questions should test real knowledge about the specific topic provided
5. Vary the position of correct answers (don't always put correct answer first)
6. Make questions interesting, educational, and SPECIFIC to the topic
7. Ensure factual accuracy - verify all facts carefully
8. Each question must be UNIQUE - cover different aspects of the topic
9. Focus on the most important and interesting facts about the topic
10. If extra context is provided, prioritize questions about those specific areas
11. ALWAYS include a brief "explanation" field (1-2 sentences) explaining why the correct answer is right - this helps students learn`
      : `You are an expert educational quiz question generator. Generate unique, engaging, and accurate multiple-choice questions for students.

Rules:
1. Each question must have EXACTLY 4 options
2. Options must be plausible but only ONE is correct
3. Questions must be age-appropriate for ${ageDescription} (Year ${yearGroup} UK curriculum)
4. Questions should test real knowledge, not trick questions
5. Vary the position of correct answers (don't always put correct answer first)
6. Make questions interesting and educational
7. Ensure factual accuracy - verify all facts
8. Each question must be UNIQUE and not repeat common questions
9. ALWAYS include a brief "explanation" field (1-2 sentences) explaining why the correct answer is right - this helps students learn`;

    const topicPrompts: Record<string, Record<string, string>> = {
      maths: {
        mental: 'mental arithmetic, quick calculations, number bonds',
        algebra: 'algebraic expressions, equations, variables',
        fractions: 'fractions, decimals, percentages conversions',
        percentages: 'percentage calculations, discounts, increases',
        geometry: 'shapes, angles, area, perimeter, volume',
        ratios: 'ratios, proportions, scaling',
        equations: 'solving equations, word problems',
        statistics: 'mean, median, mode, data interpretation',
        probability: 'probability, chance, likelihood',
        measurement: 'units, conversions, measuring',
      },
      science: {
        biology: 'living organisms, cells, human body, plants, animals, ecosystems',
        chemistry: 'elements, compounds, reactions, states of matter, atoms',
        physics: 'forces, energy, electricity, magnetism, light, sound',
        space: 'planets, solar system, stars, galaxies, space exploration',
        environment: 'climate, pollution, conservation, ecosystems',
        evolution: 'natural selection, adaptation, fossils, species',
      },
      english: {
        grammar: 'parts of speech, sentence structure, punctuation',
        vocabulary: 'word meanings, synonyms, antonyms, definitions',
        literature: 'famous authors, books, literary devices, poetry',
        reading: 'comprehension, inference, context clues',
        spelling: 'commonly misspelled words, spelling rules',
        writing: 'writing techniques, essay structure, paragraphs',
      },
      history: {
        ancient: 'Ancient Egypt, Greece, Rome, Mesopotamia',
        medieval: 'Middle Ages, Vikings, castles, knights',
        modern: '20th century, World Wars, civil rights, technology',
        british: 'Kings and Queens, British Empire, industrial revolution',
        world: 'world civilizations, major events, cultural history',
        inventions: 'famous inventions, inventors, scientific discoveries',
      },
      geography: {
        physical: 'mountains, rivers, volcanoes, earthquakes, landforms',
        human: 'cities, population, migration, culture',
        climate: 'weather, climate zones, seasons, natural disasters',
        countries: 'capitals, flags, continents, oceans',
        environment: 'ecosystems, conservation, sustainability',
        maps: 'map reading, coordinates, directions, scales',
      },
      french: {
        vocabulary: 'common French words, everyday objects, colors',
        numbers: 'French numbers, counting, dates',
        phrases: 'greetings, common expressions, conversations',
        grammar: 'basic French grammar, verb conjugation',
        culture: 'French culture, food, traditions, landmarks',
      },
      it: {
        coding: 'programming concepts, algorithms, debugging',
        internet: 'internet safety, websites, search engines',
        hardware: 'computer parts, devices, technology',
        software: 'applications, operating systems, file types',
        digital: 'digital citizenship, online safety, privacy',
      },
      general: {
        trivia: 'fun facts, general knowledge, world records',
        sports: 'sports rules, famous athletes, Olympics',
        nature: 'animals, plants, natural wonders',
        music: 'instruments, famous musicians, music theory',
        art: 'famous artists, art movements, techniques',
        food: 'cuisines, cooking, nutrition, famous foods',
      },
      quicklearn: {
        funfacts: 'amazing facts, unusual knowledge, surprising truths',
        brainteasers: 'logic puzzles, riddles, pattern recognition',
        lifeskills: 'practical knowledge, everyday skills, money management',
        current: 'current events, modern world, technology trends',
      },
    };

    const topicDescription = subject && topic ? (topicPrompts[subject]?.[topic] || topic) : '';

    let userPrompt: string;
    
    if (isCustomTopic) {
      const contextInfo = extraContext ? `\n\nSpecific focus areas: ${extraContext}` : '';
      userPrompt = `Generate ${count} unique multiple-choice questions about: "${customTopic}"${contextInfo}

Year Group: ${yearGroup} (UK curriculum)
Difficulty: ${difficulty}

IMPORTANT: 
- Generate questions that test specific knowledge about "${customTopic}"
- Cover different aspects and facts about this topic
- Make questions educational and engaging
- Ensure all facts are accurate and verifiable
- Include a helpful explanation for each question

Return a JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "difficulty": "${difficulty}",
    "explanation": "Brief 1-2 sentence explanation of why the correct answer is right"
  }
]

Make each question unique and interesting. Vary the correct answer position (0-3).`;
    } else {
      userPrompt = `Generate ${count} unique multiple-choice questions about ${topicDescription} for ${subject}.
    
Year Group: ${yearGroup} (UK curriculum)
Difficulty: ${difficulty}

Return a JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "difficulty": "${difficulty}",
    "explanation": "Brief 1-2 sentence explanation of why the correct answer is right"
  }
]

Make each question unique and interesting. Vary the correct answer position (0-3).`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9, // Higher temperature for more variety
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("Raw AI response:", content);
    
    // Parse the JSON from the response
    let questions: GeneratedQuestion[] = [];
    try {
      // Try to extract JSON from the response (may be wrapped in markdown code blocks)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        questions = JSON.parse(content);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI-generated questions");
    }

    // Validate and clean questions
    const validQuestions = questions
      .filter((q: any) => 
        q.question && 
        Array.isArray(q.options) && 
        q.options.length === 4 &&
        typeof q.correctAnswer === 'number' &&
        q.correctAnswer >= 0 && 
        q.correctAnswer <= 3
      )
      .map((q: any) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        difficulty: q.difficulty || difficulty,
        explanation: q.explanation || "The correct answer provides the accurate information based on the topic.",
      }));

    console.log(`Generated ${validQuestions.length} valid questions`);

    return new Response(JSON.stringify({ questions: validQuestions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Failed to generate questions" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
