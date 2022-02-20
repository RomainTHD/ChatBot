import {Logger} from "@nestjs/common";
import {ChatEntity} from "chat/chat.entity";
import {
    Configuration,
    OpenAIApi,
} from "openai";

/**
 * GPT-3 bot using OpenAI API
 */
export class GPTBot {
    /**
     * Singleton instance
     * @private
     */
    private static _instance: GPTBot | null = null;

    /**
     * Logger instance
     * @private
     */
    private readonly _logger: Logger;

    /**
     * OpenAI API
     * @private
     */
    private readonly _openAIApi: OpenAIApi;

    /**
     * Constructor
     * @private
     */
    private constructor() {
        this._logger = new Logger("GPTBot");

        this._openAIApi = new OpenAIApi(new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        }));
    }

    /**
     * Get singleton instance
     * @private
     * @returns Singleton
     */
    private static get instance(): GPTBot {
        if (!GPTBot._instance) {
            GPTBot._instance = new GPTBot();
        }

        return GPTBot._instance;
    }

    /**
     * Get logger
     * @private
     * @returns Logger
     */
    private static get logger(): Logger {
        return GPTBot.instance._logger;
    }

    /**
     * Generate text
     * @param discussion Previous discussion
     * @param fromUser Client user
     * @param toBot Bot user
     * @returns Either null or generated text
     */
    public static async generateText(
        discussion: ChatEntity[],
        fromUser: string,
        toBot: string,
    ): Promise<string | null> {
        const MAX_PROMPT_LENGTH = 1024;

        /*
        Parse the discussion to an array like
        ```
        human: Hi!
        bot: Hello!
        human: How are you?
        bot: I'm fine.
        ```
        */
        const promptArray = discussion.map((chat) => {
            return `${chat.from}: ${chat.content}`;
        });

        let prompt = "";

        for (let i = promptArray.length - 1; i >= 0; --i) {
            if (prompt.length + promptArray[i].length > MAX_PROMPT_LENGTH) {
                // Avoid too long text
                break;
            }

            prompt = `${promptArray[i]}\n${prompt}`;
        }

        prompt += `${toBot}: `;
        // End the prompt with a "bot:"

        // Start the prompt with a quick description of the AI behavior
        prompt = "" +
            "The following is a conversation with a teenager user. " +
            `'${toBot}' is very friendly and teasing.` +
            "\n" +
            "\n" +
            `${prompt}`;

        try {
            const response = await this.instance._openAIApi.createCompletion(
                "text-davinci-001",
                {
                    prompt: prompt,
                    max_tokens: 1024,
                    temperature: 1.,
                    frequency_penalty: 1.,
                    presence_penalty: 1.,
                    stop: [
                        ` ${fromUser}: `,
                        ` ${toBot}: `,
                    ],
                });

            return response.data.choices[0].text.trim();
        } catch (error) {
            // Needs investigation, but probably a rate limit error
            if (error.response) {
                this.logger.warn("OpenAI API error with response:");
                this.logger.warn(error.response.status);
                this.logger.warn(error.response.data);
            } else {
                this.logger.warn("OpenAI API error without response:");
                this.logger.warn(error.message);
            }

            return null;
        }
    }
}
